/**
 * Beholder — SillyTavern extension
 *
 * Tracks per-character physical state (worn items by body slot, held items,
 * wounds, species) by calling a local state-extractor
 * model on each inbound message, then injecting the running state into the
 * main RP prompt so the roleplay model stops forgetting what's worn / held / hurt.
 *
 * Pipeline:
 *   1. inbound RP message arrives → MESSAGE_RECEIVED event
 *   2. normalize() to canonical prose form (normalizer.js)
 *   3. ask extractor what changed given (canonical, prevState, persona)
 *   4. applyDelta() → new running state, persisted in chat_metadata
 *   5. setExtensionPrompt() to inject state JSON before next generation
 *
 * Each chat keeps its own state in chat_metadata[MODULE_NAME].state so
 * persistence is per-conversation and reload-safe.
 */

// Marinara port: the SillyTavern host seams are provided by ./st-shim.js so this
// file runs verbatim. This is the ONLY change to index.js besides removing the ST
// settings-drawer boot (loadSettingsHtml/bindSettingsUi) below.
import {
    eventSource,
    event_types,
    chat_metadata,
    extension_prompt_roles,
    extension_prompt_types,
    saveSettingsDebounced,
    getContext,
    extension_settings,
    saveMetadataDebounced,
} from './st-shim.js';

import { normalize } from './normalizer.js';
import {
    applyDelta,
    renameChar,
    filterLockedFromDelta,
    applyUserEdit,
    setSlotLock,
    lockKey,
    buildAliasLookup,
    resolveAliases,
    dropHidden,
    orderChars,
    withDependentMissing,
    isSlotLocked,
    foldDeltaToChar,
    graftUserEdits,
} from './state.js';
import {
    extract,
    EXTRACTION_SYSTEM_V2_SHORT,
    setExtractConcurrency,
} from './extractor.js';
import { SHORT_PASS_PROMPTS, LANE_ORDER, SHORT_PASS_TAG } from './short_pass_prompts.js';
import { applyValidator, sweepState } from './validator.js';
import { mountPanel, renderPanel as renderPanelRaw, setPanelVisible } from './panel.js';
import { wireNoteBox } from './views.js';

// Host-agnostic extraction engine + transports. The ST adapter (this file) is
// the only place that knows about SillyTavern; BeholderEngine runs the same
// normalize→extract→merge→inject→render loop for any host, driven by a selected
// transport (a custom OpenAI-compatible endpoint, or the in-browser WebLLM
// model) plus the HostAdapter built below.
import {
    BeholderEngine,
    RemoteOpenAITransport,
    WebLLMTransport,
    MODEL_CONFIG,
    isModelConfigured,
    toModelRecord,
    probeReadiness,
} from './engine/index.js';

const MODULE_NAME = 'beholder';
const MODULE_NAME_FANCY = 'Beholder';
const LOG = `[${MODULE_NAME_FANCY}]`;
// Mirrors manifest.json "version" — surfaced in the Doctor view's vitals.
// Keep in sync with manifest.json on release.
const EXTENSION_VERSION = '0.5.0';

// ─── Default settings ──────────────────────────────────────────────────────

// temperature and maxTokens are deliberately NOT here. They're hardcoded in
// extractor.js because the model was trained + evaluated at temperature 0
// with 512-token outputs — exposing them as knobs would let users degrade
// extraction quality with no upside. See extractor.js comment.
const DEFAULT_SETTINGS = {
    enabled: true,
    // Empty endpoint = use the in-browser model (the default path); a non-empty
    // endpoint is a custom OpenAI-compatible override that ALWAYS wins (see
    // getActiveTransport). The legacy literal localhost default is migrated to ''
    // once, in getSettings (D-BE-1) — a fresh install starts empty.
    endpoint: '',                           // '' = browser model; URL = override
    model: 'ChatML',                        // `model` field sent to a custom endpoint; operator default
    apiKey: '',
    // In-browser WebLLM model toggle. `enabled` is flipped on by a successful
    // Download / Enable in the Local-model card and off by Disable.
    // `fallbackToBrowser` is the §9.4 advanced "fall back to the browser model if
    // the custom endpoint is unreachable" option — stored + wired in the UI, but
    // the strict-by-default path (no silent fallback) is the only implemented
    // behavior in this scope; honoring the flag is a follow-up.
    browserModel: { enabled: false, fallbackToBrowser: false },
    // Private one-shot migration flag for the endpoint default change (D-BE-1).
    // Not surfaced in the UI.
    _endpointMigrated: false,
    // Private one-shot migration flag: rewrite a persisted BEFORE_PROMPT/IN_PROMPT
    // injection (block at the START of the context → full re-prefill every state change)
    // to IN_CHAT depth 1. Not surfaced in the UI.
    _injectMigrated: false,
    // Prompt-injection position. ONLY 'IN_CHAT' (honors `depth`) or 'NONE' are offered:
    // the front-of-context positions IN_PROMPT/BEFORE_PROMPT put a changing block at the
    // start and re-prefill the WHOLE context every state change (a full 50k+ reprocess on
    // a large-context / SWA local model). Inject at shallow depth (1 = one before the last
    // message) so it sits next to generation and small RP models still attend to it.
    injectionPosition: 'IN_CHAT',
    injectionDepth: 1,   // 1 = just before the last message (near generation); operator: "depth 1 or 2 at most"
    // Verbose console logging — useful while debugging the extractor wiring.
    debug: false,
    // Floating panel state (mounted at boot; user can drag/collapse/close).
    panel: { visible: true, collapsed: false, pos: null },

    // ─── UI / display preferences (panel views read these via getSettings) ──
    // Paper-doll layout mode. 'paired' = anatomical left/right grid (default),
    // 'columns' = two flat columns, 'list' = the compact digest. Persisted so
    // the panel restores the user's chosen layout across reloads.
    layout: 'paired',
    // Accent color source. false (default) = the extension's own gold accent;
    // true = inherit the active SillyTavern theme's quote color. The Settings
    // view toggles this; the panel applies it as an inline --bh-accent-pref.
    matchThemeAccent: false,
    // Global alias book — { canonicalName: [variantSpelling, ...] }. Collapses the
    // name variants the model emits (Katya / Yekaterina Sokolova → Yekaterina)
    // across ALL chats; per-chat overrides live in chat_metadata.characters.aliases.
    aliasBook: {},
    // Show colors the model inferred (vs. only colors stated verbatim in prose).
    // Display-only hint consumed by the panel's slot decoration.
    inferredColors: true,
    // Client-side validator (validator.js) — a parity mirror of the datagen
    // phase_e_validators (detect + strip invalid emissions before merge). ON by
    // default; the Doctor's Inspector shows per-turn findings.
    validator: { enabled: true },
    // Max in-flight extraction requests. DEFAULT 1: a single-slot local endpoint
    // (KoboldCpp/llama.cpp) processes one at a time, so parallelism only risks a 503
    // "server busy" with zero speed gain. Raise it ONLY for endpoints that truly
    // parallelise (vLLM / multi-slot). Applied to the extractor's global semaphore.
    concurrency: 1,
};

// Endpoint default change (D-BE-1): the default endpoint moved from the literal
// localhost vLLM URL to '' (empty = use the browser model). A user who never
// touched the setting was silently pinned to localhost:8000; this one-shot
// migration rewrites ONLY that exact legacy literal to '' so they fall through
// to the browser-model path. A user who deliberately typed localhost:8000/v1 is
// migrated once too (we can't distinguish intent), but the flag makes it a
// one-time event — re-typing it afterwards sticks.
const OLD_DEFAULT_ENDPOINT = 'http://localhost:8000/v1';

function getSettings() {
    if (!extension_settings[MODULE_NAME]) {
        extension_settings[MODULE_NAME] = structuredClone(DEFAULT_SETTINGS);
        saveSettingsDebounced();
    }
    const s = extension_settings[MODULE_NAME];
    // Backfill any missing fields when DEFAULT_SETTINGS grows
    for (const [k, v] of Object.entries(DEFAULT_SETTINGS)) {
        if (!(k in s)) {
            // Deep-clone object defaults so each install gets its own copy.
            s[k] = (v && typeof v === 'object') ? structuredClone(v) : v;
        }
    }
    // One-time endpoint migration (D-BE-1). Runs once per install; guarded by a
    // private flag so it never repeatedly wipes a deliberately-typed localhost.
    if (!s._endpointMigrated) {
        if (s.endpoint === OLD_DEFAULT_ENDPOINT) s.endpoint = '';
        s._endpointMigrated = true;
        saveSettingsDebounced();
    }
    // One-time injection-position migration. BEFORE_PROMPT / IN_PROMPT put the CHANGING
    // state block at the START of the context, so every state change re-prefills the
    // ENTIRE prompt — catastrophic on a large-context / SWA local model (a full 50k+
    // token reprocess per turn). The block must sit next to generation. Rewrite those to
    // IN_CHAT depth 1 (one before the last message). Those positions are also removed from
    // the UI, so this also heals any value still on disk from before that change.
    if (!s._injectMigrated) {
        if (s.injectionPosition === 'BEFORE_PROMPT' || s.injectionPosition === 'IN_PROMPT') {
            s.injectionPosition = 'IN_CHAT';
            if (!(Number(s.injectionDepth) >= 1)) s.injectionDepth = 1;
        }
        s._injectMigrated = true;
        saveSettingsDebounced();
    }
    return s;
}

// ─── Per-chat state ────────────────────────────────────────────────────────

function getChatState() {
    if (!chat_metadata[MODULE_NAME]) {
        chat_metadata[MODULE_NAME] = {
            state: {},
            lastMessageHash: null,
            deltasByMsg: {},
            // Per-slot user overrides. `locks` holds per-(char, slot) keys whose
            // value the model may NOT overwrite (the user's value wins until
            // they unlock). `userEdited` tracks slots the user has hand-edited
            // (purely a display badge — does NOT block model updates on its own).
            // Both persist in chat_metadata so they survive reload, and are
            // stored as JSON arrays (not Sets) so they serialize.
            locks: [],
            userEdited: [],
            // Inspector capture ring — persisted per-chat so a missed/odd extraction
            // is still inspectable after a reload or chat switch (it used to be an
            // in-memory global that vanished, and mixed across chats).
            capture: [],
        };
        saveMetadataDebounced();
    }
    const cs = chat_metadata[MODULE_NAME];
    // Backfill fields added after a chat's metadata was first written.
    if (!cs.deltasByMsg) cs.deltasByMsg = {};
    if (!Array.isArray(cs.locks)) cs.locks = [];
    if (!Array.isArray(cs.userEdited)) cs.userEdited = [];
    if (!Array.isArray(cs.capture)) cs.capture = [];
    return cs;
}

function setChatState(state) {
    getChatState().state = state;
    saveMetadataDebounced();
}

function setMessageDelta(messageId, delta) {
    if (messageId == null) return;
    const cs = getChatState();
    cs.deltasByMsg[messageId] = delta;
    saveMetadataDebounced();
}

function getMessageDelta(messageId) {
    return getChatState().deltasByMsg[messageId];
}

function clearAllMessageDeltas() {
    getChatState().deltasByMsg = {};
    saveMetadataDebounced();
}

// ─── Per-slot locks + user-edit tracking ────────────────────────────────────
// The panel lets the user lock a slot (a per-(char, slot) key) so the model can't
// overwrite their value, and marks slots they've hand-edited. The pure
// predicates live in state.js; persistence (in chat_metadata) lives here so
// locks survive reload AND so the model-delta filter can see them. The panel
// (views.js) is a pure CONSUMER via the callbacks passed into mountPanel —
// it never holds the canonical lock state itself.

function getLocks() {
    return getChatState().locks;
}

function setLock(char, slot, on) {
    const cs = getChatState();
    cs.locks = setSlotLock(cs.locks, char, slot, on);
    saveMetadataDebounced();
}

// ─── Character override layer: aliases / hidden / order ─────────────────────
// Persistence for the state.js pure helpers (buildAliasLookup / resolveAliases /
// dropHidden / orderChars). Per-chat block in chat_metadata; the alias book is ALSO
// global (settings.aliasBook) so a recurring character is reconciled once. Lazily
// initialized + backfilled so old chats gain the block on first touch.
function getCharOverrides() {
    const cs = getChatState();
    if (!cs.characters || typeof cs.characters !== 'object') cs.characters = {};
    const c = cs.characters;
    if (!c.aliases || typeof c.aliases !== 'object') c.aliases = {};
    if (!Array.isArray(c.hidden)) c.hidden = [];
    if (!Array.isArray(c.order)) c.order = [];
    return c;
}

// Flat { variantLower -> canonical } from the global book + per-chat overrides
// (per-chat wins on conflict).
function getAliasLookup() {
    return buildAliasLookup(getSettings().aliasBook, getCharOverrides().aliases);
}

// The host hook the engine calls on every incoming delta: collapse alias variants
// onto their canonical key, then drop hidden characters so they aren't re-added.
// DEMO: model-derived `missing` (severed/amputated limbs) misfires too often to ship, so strip it
// from EVERY model delta — `missing` is MANUAL-ONLY now. mapCharacters is the pre-apply chokepoint
// for both live message extraction (engine.js) and the card seed (seedFromCards), while the slot
// editor writes state directly and note-box directives take their own path — so those manual
// sources keep working. Drops the flag wherever it appears; a slot left empty by it is removed.
function stripModelMissing(delta) {
    for (const char of Object.keys(delta || {})) {
        const body = delta[char] && delta[char].body;
        if (!body || typeof body !== 'object') continue;
        for (const slot of Object.keys(body)) {
            const sd = body[slot];
            if (!sd || typeof sd !== 'object') continue;
            delete sd.missing;
            if (Object.keys(sd).length === 0) delete body[slot];
        }
    }
    return delta;
}
// A body part is never a WORN garment. The card-seed chunker keeps species/anatomy paragraphs so
// species can seed (angel/satyr/etc.), but that also lets the worn lane grab a body part — e.g. an
// angel's "white wings" filed as a worn item. Strip those from `worn`; exotic-slot stubs from the
// species lane handle the anatomy for the doll.
const ANATOMY_NOT_WORN = new Set([
    'wing', 'wings', 'tail', 'tails', 'horn', 'horns', 'claw', 'claws', 'talon', 'talons',
    'fang', 'fangs', 'hoof', 'hooves', 'paw', 'paws', 'snout', 'muzzle', 'mane', 'gill', 'gills',
    'fin', 'fins', 'tentacle', 'tentacles', 'antenna', 'antennae', 'scale', 'scales', 'feather', 'feathers', 'fur',
]);
function stripAnatomyWorn(delta) {
    for (const char of Object.keys(delta || {})) {
        const body = delta[char] && delta[char].body;
        if (!body || typeof body !== 'object') continue;
        for (const slot of Object.keys(body)) {
            const sd = body[slot];
            if (sd && Array.isArray(sd.worn)) {
                sd.worn = sd.worn.filter((w) => !(w && typeof w.item === 'string'
                    && ANATOMY_NOT_WORN.has(w.item.toLowerCase().trim())));
            }
        }
    }
    return delta;
}
function mapCharacters(delta) {
    return stripAnatomyWorn(stripModelMissing(dropHidden(resolveAliases(delta, getAliasLookup()), getCharOverrides().hidden)));
}

// Order + filter the running state for DISPLAY (persona first, hidden removed).
// Stored state stays canonical via the fold-path mapping + canonicalizeState; this
// only shapes what the doll/tabs show.
function applyCharView(state) {
    const ov = getCharOverrides();
    const personaName = getContext()?.name1 || null;
    const visible = dropHidden(state, ov.hidden);
    const out = {};
    for (const n of orderChars(Object.keys(visible), ov.order, personaName)) out[n] = visible[n];
    return out;
}

// All renderPanel(...) calls in this module funnel through here so the panel always
// shows the ordered/filtered view (the raw panel.js export is renderPanelRaw).
function renderPanel(state) {
    // Derived sleeve completion so the doll shows a jacket/coat actually covering the arms
    // (see withSleeveCoverage) — non-destructive, matches what the prompt serializer overlays.
    renderPanelRaw(applyCharView(withSleeveCoverageState(state)));
}

// Re-canonicalize the stored running state after an alias/hidden change so an
// already-split character (e.g. an existing "Katya") folds into its canonical key
// retroactively, and freshly-hidden characters disappear immediately.
function canonicalizeState() {
    const cs = getChatState();
    let next = resolveAliases(cs.state, getAliasLookup());
    next = dropHidden(next, getCharOverrides().hidden);
    if (next !== cs.state) {
        cs.state = next;
        saveMetadataDebounced();
    }
    injectStateIntoPrompt(cs.state);
    renderPanel(cs.state);
}

// ── setters the Characters manager UI calls ──
function addAlias(variant, canonical, { global = false } = {}) {
    variant = (variant || '').trim();
    canonical = (canonical || '').trim();
    if (!variant || !canonical || variant.toLowerCase() === canonical.toLowerCase()) return;
    const book = global ? (getSettings().aliasBook ||= {}) : getCharOverrides().aliases;
    if (!Array.isArray(book[canonical])) book[canonical] = [];
    if (!book[canonical].some(v => v.toLowerCase() === variant.toLowerCase())) {
        book[canonical].push(variant);
    }
    if (global) saveSettingsDebounced(); else saveMetadataDebounced();
    canonicalizeState();
}

function removeAlias(variant, canonical, { global = false } = {}) {
    const book = global ? (getSettings().aliasBook || {}) : getCharOverrides().aliases;
    const arr = book[canonical];
    if (!Array.isArray(arr)) return;
    const i = arr.findIndex(v => v.toLowerCase() === (variant || '').toLowerCase());
    if (i >= 0) arr.splice(i, 1);
    if (arr.length === 0) delete book[canonical];
    if (global) saveSettingsDebounced(); else saveMetadataDebounced();
    renderPanel(getChatState().state);
}

function setCharHidden(name, on) {
    const ov = getCharOverrides();
    const i = ov.hidden.indexOf(name);
    if (on && i < 0) ov.hidden.push(name);
    else if (!on && i >= 0) ov.hidden.splice(i, 1);
    saveMetadataDebounced();
    canonicalizeState();
}

function setCharOrder(order) {
    getCharOverrides().order = Array.isArray(order) ? order.slice() : [];
    saveMetadataDebounced();
    renderPanel(getChatState().state);
}

// Snapshot for the Characters manager view (views.js): the ordered VISIBLE names,
// the hidden list, and the per-chat + global alias books (deep-copied so the view
// can't mutate the store directly — it goes through the setters).
function getCharacterManagerData() {
    const ov = getCharOverrides();
    const state = getChatState().state || {};
    const personaName = getContext()?.name1 || null;
    const visible = orderChars(Object.keys(dropHidden(state, ov.hidden)), ov.order, personaName);
    return {
        persona: personaName,
        visible,
        hidden: ov.hidden.slice(),
        aliasesChat: JSON.parse(JSON.stringify(ov.aliases || {})),
        aliasesGlobal: JSON.parse(JSON.stringify(getSettings().aliasBook || {})),
    };
}

function getUserEdited() {
    return getChatState().userEdited;
}

function markUserEdited(char, slot) {
    const cs = getChatState();
    const key = lockKey(char, slot);
    if (!cs.userEdited.includes(key)) {
        cs.userEdited.push(key);
        saveMetadataDebounced();
    }
}

/**
 * Apply a user's manual slot edit from the panel editor. Routes through the
 * pure applyUserEdit() so it persists to chat_metadata (the panel must NOT
 * mutate the state object in place — that wouldn't survive reload), marks the
 * slot as user-edited, then re-injects + re-renders. The slot is NOT auto-
 * locked; the user locks separately via the editor's lock toggle.
 *
 * @param {string} char
 * @param {string} slot
 * @param {object} slotState  the new per-slot state (empty object => delete slot)
 */
function applyUserSlotEdit(char, slot, slotState) {
    const cs = getChatState();
    const newState = applyUserEdit(cs.state, char, slot, slotState);
    setChatState(newState);
    markUserEdited(char, slot);
    injectStateIntoPrompt(newState);
    renderPanel(newState);
    return newState;
}

// ─── Inspector capture buffer ───────────────────────────────────────────────
// A ring of the last few extractions, end to end, so the panel's Inspector /
// Doctor views can show the real system prompt, the exact model input, the raw
// model output, the parsed delta and per-turn latency. PERSISTED per-chat (in
// chat_metadata, via getChatState().capture) so a missed/odd extraction is still
// inspectable after a reload — the whole point of the Doctor is post-hoc debug.
const CAPTURE_LIMIT = 20;
// Cap the two big free-text fields per entry so a pathological turn can't bloat
// the persisted metadata. Generous — well above any normal prose/output.
const CAPTURE_FIELD_MAX = 16000;
const clipField = (v) => (typeof v === 'string' && v.length > CAPTURE_FIELD_MAX)
    ? `${v.slice(0, CAPTURE_FIELD_MAX)} …[+${v.length - CAPTURE_FIELD_MAX} chars]` : v;

function pushCapture(entry) {
    const cs = getChatState();
    cs.capture.push({ ...entry, user: clipField(entry.user), raw: clipField(entry.raw) });
    while (cs.capture.length > CAPTURE_LIMIT) cs.capture.shift();
    saveMetadataDebounced();
}

function getCapture() {
    return getChatState().capture;
}

function debugLog(...args) {
    if (getSettings().debug) console.log(LOG, ...args);
}

// ─── Inference transport + engine wiring ────────────────────────────────────
// Every model call goes through a SELECTED transport so the extraction path is
// pluggable: a user's own OpenAI-compatible endpoint (RemoteOpenAITransport) or
// the in-browser WebLLM model (WebLLMTransport). The ST-specific bookkeeping
// (capture buffer, per-message deltas, badges, panel render, prompt injection,
// locks, user edits) lives in the HostAdapter below; BeholderEngine runs the
// shared loop against the selected transport + that adapter.

// The WebLLM transport owns a Web Worker engine (VRAM-backed), so it's a single
// instance created on first Download/Enable — NOT rebuilt per call. The remote
// transport, by contrast, is cheap and rebuilt per pipeline entry so a runtime
// endpoint change is picked up immediately.
let webllmTransport = null;
// Cached result of the last probeReadiness() run (GPU/disk/RAM/CPU), surfaced to
// the Local-model card + Doctor vitals via callbacks. Populated at boot + on
// settings open; null until the first probe resolves.
let lastReadiness = null;

// Rolling window of recent browser-model turns for the Doctor "Performance" row
// (median TTFT + tok/s). Each entry is { ttftMs, tokensPerSec }. Only pushed
// when the active transport is the browser model — a custom endpoint or inactive
// state contributes nothing, so the Performance row stays honest.
const VITALS_TURNS_LIMIT = 10;
const vitalsTurns = [];

function recordVitalsTurn(turn) {
    // Only meaningful when the browser transport produced this turn. ttftMs is
    // sourced by host.onExtraction from the live transport's status(); if it's
    // null (endpoint / inactive) we don't record a perf sample.
    const ttftMs = turn?.ttftMs ?? null;
    if (ttftMs == null) return;
    const tps = (webllmTransport && getActiveTransport() === webllmTransport)
        ? (webllmTransport.status()?.tokensPerSec ?? null)
        : null;
    vitalsTurns.push({ ttftMs, tokensPerSec: tps });
    if (vitalsTurns.length > VITALS_TURNS_LIMIT) vitalsTurns.shift();
}

/**
 * §9.4 transport precedence. Returns the transport to use for this pipeline
 * entry, or null when no model is active ("inactive" → the no-model banner):
 *
 *   1. A non-empty custom endpoint ALWAYS wins (the advanced override).
 *   2. else the browser model, only when it's enabled AND loaded/ready.
 *   3. else null → inactive (caller early-returns unchanged state + banner).
 *
 * RemoteOpenAITransport is rebuilt each call (cheap, idempotent) so a runtime
 * endpoint edit is honored without caching a stale transport. The WebLLM
 * transport is the persistent singleton when returned.
 */
function getActiveTransport() {
    const settings = getSettings();
    const ep = (settings.endpoint || '').trim();
    const browserReady = !!(settings.browserModel?.enabled
        && webllmTransport
        && webllmTransport.status()?.state === 'ready');
    // An explicitly-set LOCAL ENDPOINT is the extractor and WINS over a Marinara connection —
    // clicking "Use" on the endpoint is a deliberate choice, so it must not be silently routed
    // through a leftover connection. Only a PROVEN-down endpoint with a browser model loaded
    // defers (else we'd hand back a dead transport while a working local model sits right there).
    // endpointConn only becomes 'down' after a real probe, so this never abandons it optimistically.
    if (ep !== '' && !(endpointConn === 'down' && browserReady)) {
        return new RemoteOpenAITransport({
            endpoint: ep,
            model: settings.model || 'ChatML',   // default when the field's left blank
            apiKey: settings.apiKey,
        });
    }
    // No local endpoint set → a KEYED Marinara connection routes through ME's server proxy
    // (the API key stays server-side and is never exposed to the extension).
    if (settings.meConnectionId && typeof window !== 'undefined' && typeof window.__bhMakeMeTransport === 'function') {
        const meT = window.__bhMakeMeTransport(settings.meConnectionId);
        if (meT) return meT;
    }
    if (browserReady) return webllmTransport;
    return null;
}

// The ST HostAdapter — the concrete mapping from the engine's host contract
// (engine/host.js) to this extension's chat_metadata state, prompt injection,
// panel render, Inspector capture buffer, per-message delta/badges, locks and
// user-edit tracking. The engine calls these; the per-message ST side-effects
// that historically lived inline in processMessage now live in host.render /
// host.onExtraction so the net behavior is unchanged (Phase-2 BEHAVIOR-IDENTICAL).
const hostAdapter = {
    getSettings: () => getSettings(),
    loadState: () => getChatState().state,
    saveState: (s) => setChatState(s),
    getLocks: () => getLocks(),
    mapCharacters: (delta) => mapCharacters(delta),
    injectState: (s) => injectStateIntoPrompt(s),
    render: (state, delta, turn) => {
        renderPanel(state);
        // Per-message badges + the stored delta are only for real message turns,
        // never for note-box directives (turn.directive set, no messageId).
        if (turn && turn.messageId != null && !turn.directive) {
            setMessageDelta(turn.messageId, turn.delta);
            renderBadgesForMessage(turn.messageId, turn.delta);
        }
    },
    onExtraction: (turn) => {
        // ttftMs is NOT on the engine's turn object (engine.js stays untouched —
        // a Phase-2 guardrail). Source it from the live transport when the active
        // transport is the browser model; null for endpoint / inactive.
        const ttftMs = (webllmTransport && getActiveTransport() === webllmTransport)
            ? (webllmTransport.status()?.ttftMs ?? null)
            : null;
        pushCapture({
            msgId: turn.messageId,
            kind: turn.kind || 'message',
            ts: Date.now(),
            system: turn.system,
            user: turn.user,
            raw: turn.raw,
            parsed: turn.parsed,
            delta: turn.delta,
            rawDelta: turn.rawDelta,
            latencyMs: turn.latencyMs,
            ttftMs,
            // Map the engine's parity-shape findings ({rule_id, path, severity}) to
            // the Inspector's display shape ({sev, rule, text}). 'error' → error,
            // everything else (warning/suggestion) → warn for the badge counts.
            validatorLog: (turn.validatorLog || []).map(f => ({
                sev: f.severity === 'error' ? 'error' : 'warn',
                rule: f.rule_id,
                text: f.path,
            })),
            validatorActive: turn.validatorActive === true,
            parseFailed: turn.parseFailed === true,
        });
        recordVitalsTurn({ ...turn, ttftMs });
        // Verbose per-turn trace (gated on the Doctor's "Verbose console logging").
        // Strings, not live objects, so it's readable + copyable straight from F12.
        debugLog(`extraction #${turn.messageId} (${turn.latencyMs ?? '?'}ms)`,
            '\n  input:  ', turn.user,
            '\n  raw:    ', turn.raw,
            '\n  applied:', JSON.stringify(turn.delta));
    },
    markUserEdited: (char, slot) => markUserEdited(char, slot),
    onError: (err) => console.warn(LOG, 'extraction failed; state unchanged:', err?.message),
    // A parse failure (truncated/runaway output) is a real, actionable problem —
    // ALWAYS console.warn it. A hallucinated-character drop self-corrects, so it
    // stays quiet (verbose-only).
    onWarn: (msg, meta) => {
        if (meta?.parseFailed) console.warn(LOG, msg, meta);
        else debugLog('guard:', msg, meta || '');
    },
};

/**
 * Build a fresh BeholderEngine bound to the currently-selected transport and the
 * ST host adapter. Transport selection is cheap + idempotent, so building per
 * pipeline entry avoids caching a stale transport across an endpoint↔browser
 * switch. Returns null when no model is active (the caller shows the banner and
 * leaves state unchanged).
 */
function getActiveEngine() {
    const transport = getActiveTransport();
    if (!transport) return null;
    return new BeholderEngine({ transport, host: hostAdapter });
}

// ─── Prompt injection ──────────────────────────────────────────────────────

/**
 * Serialize the state for prompt injection.
 *
 * We always emit the full JSON. The legacy "compact summary" path was v0.2-shape
 * (string holding, string wounds, exposure field) and didn't survive the v0.3+
 * schema bumps. Token cost of the JSON form is negligible vs the RP context,
 * and the RP model is better at reading structured state than the prose summary
 * anyway.
 */
// Prose renderer for the injected state — designed via the prose-state-renderer workflow (2026-07-09),
// verified by execution (13/13 edge cases). RP models, ESPECIALLY small finetunes, read prose far better than
// JSON (many can't parse JSON at all). Multi-slot garments dedup to one mention; both-sides collapse
// ("both your legs"); same-side siblings collapse ("your right arm and hand"); damage != pristine only.
function renderStateProse(state) {
  if (!state || typeof state !== "object") return "";

  const SLOT_LABEL = {
    head: "head", face: "face", neck: "neck", chest: "chest", back: "back",
    waist: "waist", mouth: "mouth", tail: "tail",
    left_shoulder: "left shoulder", right_shoulder: "right shoulder",
    left_arm: "left arm", right_arm: "right arm",
    left_hand: "left hand", right_hand: "right hand",
    left_leg: "left leg", right_leg: "right leg",
    left_foot: "left foot", right_foot: "right foot",
    left_eye: "left eye", right_eye: "right eye",
    left_ear: "left ear", right_ear: "right ear",
  };
  const label = (s) => SLOT_LABEL[s] || String(s).replace(/_/g, " ");

  // Plural-only / uncountable garments take no "a/an" article.
  const PLURALIA = /^(trousers|pants|jeans|shorts|leggings|tights|gloves|mittens|boots|shoes|sandals|sneakers|slippers|glasses|spectacles|goggles|briefs|panties|underwear|overalls|socks|stockings)$/i;

  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const startsVowel = (s) => /^[aeiou]/i.test(String(s).trim());
  const article = (phrase, item) =>
    PLURALIA.test(item) ? phrase : (startsVowel(phrase) ? "an " : "a ") + phrase;

  const listJoin = (arr) => {
    arr = arr.filter(Boolean);
    if (arr.length === 0) return "";
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr[0] + " and " + arr[1];
    return arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1];
  };

  // "left_arm" -> plural stem "arms" for both-sides collapse.
  const pluralPart = (p) => {
    if (/foot$/.test(p)) return p.replace(/foot$/, "feet");
    if (/(arm|hand|leg|eye|ear|shoulder)$/.test(p)) return p + "s";
    return p;
  };

  // Collapse slot keys into readable possessive body-part phrases:
  //   both-sides  -> "both your legs"
  //   same-side   -> "your right arm and hand"
  //   torso/other -> "your chest"
  // Returns { text, plural } for is/are verb agreement.
  const bodyPartList = (slots, posLow) => {
    const set = new Set(slots);
    const bySide = { left: [], right: [] };
    const none = [];
    const both = [];
    const consumed = new Set();

    for (const s of slots) {
      if (consumed.has(s)) continue;
      const m = /^(left|right)_(.+)$/.exec(s);
      if (m) {
        const part = m[2].replace(/_/g, " ");
        const other = (m[1] === "left" ? "right" : "left") + "_" + m[2];
        if (set.has(other)) { consumed.add(s); consumed.add(other); both.push(part); continue; }
        consumed.add(s); bySide[m[1]].push(part);
      } else { consumed.add(s); none.push(label(s)); }
    }

    const phrases = [];
    let plural = false;
    for (const p of both) { phrases.push("both " + posLow + " " + pluralPart(p)); plural = true; }
    for (const side of ["left", "right"]) {
      const parts = bySide[side];
      if (parts.length === 1) phrases.push(posLow + " " + side + " " + parts[0]);
      else if (parts.length > 1) { phrases.push(posLow + " " + side + " " + listJoin(parts)); plural = true; }
    }
    for (const p of none) phrases.push(posLow + " " + p);
    if (phrases.length > 1) plural = true;
    return { text: listJoin(phrases), plural };
  };

  // pristine is the default -> never surfaced. broken stays "broken"; anything
  // else non-pristine reads as "torn" (natural prose, no "damaged" jargon).
  const damageWord = (d) =>
    (!d || d === "pristine") ? "" : d === "broken" ? "broken" : "torn";

  // Garments naturally worn as a pair, one per foot/hand. When the dedup below collapses the
  // same item across a left+right pair of slots (e.g. left_foot + right_foot both = "boot"),
  // render it PLURAL with no article ("black boots") rather than "a black boot".
  const PAIRED = /^(boot|shoe|sandal|sneaker|slipper|heel|pump|loafer|clog|flat|glove|mitten|gauntlet|sock|stocking)$/i;
  const pluralizeItem = (it) => {
    if (/s$/i.test(it)) return it;                       // already plural
    if (/(sh|ch|x|z|ss)$/i.test(it)) return it + "es";
    if (/[^aeiou]y$/i.test(it)) return it.replace(/y$/i, "ies");
    return it + "s";
  };
  const wornPhrase = (g) => {
    const w = g.w;
    const parts = [];
    const dmg = damageWord(w.damage);
    if (dmg) parts.push(dmg);
    if (w.color) parts.push(w.color);       // color/material optional
    if (w.material) parts.push(w.material);
    const pair = g.slots.length >= 2 && PAIRED.test(w.item);
    parts.push(pair ? pluralizeItem(w.item) : w.item);
    return pair ? parts.join(" ") : article(parts.join(" "), w.item);
  };

  const woundSuffix = (wd) => {
    const bits = [];
    if (wd.severity) bits.push(wd.severity);
    if (wd.bleeding) bits.push("bleeding");
    return bits.length ? " (" + bits.join(", ") + ")" : "";
  };

  const out = [];

  for (const key of Object.keys(state)) {
    const entry = state[key];
    const isSelf = key === "self";
    const Subj = isSelf ? "You" : key;          // sentence-initial subject
    const subjPron = isSelf ? "you" : "they";   // mid-sentence subject pronoun (gender-neutral)
    const posLow = isSelf ? "your" : "their";   // possessive determiner (gender-neutral)
    const verbWear = isSelf ? "are wearing" : "is wearing";
    const verbHold = isSelf ? "are holding" : "is holding";
    const body = (entry && entry.body) || {};

    // Dedup multi-slot garments: one entry per identical {item,color,material,damage}.
    const wornGroups = new Map();
    const wounds = [];
    const holdings = [];
    const missing = [];
    const bare = [];

    for (const slot of Object.keys(body)) {
      const cell = body[slot] || {};
      if (Array.isArray(cell.worn)) {
        for (const w of cell.worn) {
          if (!w || !w.item) continue;
          const id = [w.item, w.color || "", w.material || "", w.damage || "pristine"].join("");
          const g = wornGroups.get(id);
          if (g) g.slots.push(slot);            // same garment on another slot (e.g. both feet)
          else wornGroups.set(id, { w, slots: [slot] });
        }
      }
      if (Array.isArray(cell.wounds)) {
        for (const wd of cell.wounds) { if (wd && wd.text) wounds.push({ slot, wd }); }
      }
      if (cell.holding && cell.holding.item) holdings.push(cell.holding.item);
      if (cell.missing === true) missing.push(slot);
      if (cell.bare === true) bare.push(slot);
    }

    // Clauses: 'subject' needs subject/pronoun prepended; 'plain' is self-contained.
    const clauses = [];

    if (wornGroups.size) {
      clauses.push({ kind: "subject", text: verbWear + " " + listJoin([...wornGroups.values()].map(wornPhrase)) });
    }

    for (const { slot, wd } of wounds) {
      clauses.push({ kind: "plain", text: posLow + " " + label(slot) + " has " + wd.text + woundSuffix(wd) });
    }

    if (holdings.length) {
      const items = holdings.map((i) => article(i, i));
      clauses.push({ kind: "subject", text: verbHold + " " + listJoin(items) });
    }

    if (missing.length) {
      const r = bodyPartList(missing, posLow);
      clauses.push({ kind: "plain", text: r.text + " " + (r.plural ? "are" : "is") + " gone" });
    }

    if (bare.length) {
      const r = bodyPartList(bare, posLow);
      clauses.push({ kind: "plain", text: r.text + " " + (r.plural ? "are" : "is") + " bare" });
    }

    // Species (non-human) → a leading sentence, so the RP model is told it AND it shows in the
    // injected block (the Inspector's "Injected into the RP model" pane). Plain human is stripped
    // on apply already; guard here too so "human"/"man"/"woman" never surface as a species line.
    const sp = entry && typeof entry.species === "string" ? entry.species.trim() : "";
    const showSpecies = sp && !/^(humans?|persons?|people|man|woman|men|women|boys?|girls?|guys?|lady|male|female)$/i.test(sp);

    if (!clauses.length && !showSpecies) continue;

    const rendered = clauses.map((c, i) => {
      if (c.kind === "plain") return i === 0 ? cap(c.text) : c.text;
      return i === 0 ? Subj + " " + c.text : subjPron + " " + c.text;
    });

    const speciesSentence = showSpecies ? `${Subj} ${isSelf ? "are" : "is"} a ${sp}.` : "";
    const bodySentence = rendered.length ? rendered.join("; ") + "." : "";
    out.push([speciesSentence, bodySentence].filter(Boolean).join(" "));
  }

  return out.join(" ").trim();   // empty state -> ""
}

// Long-sleeved TORSO garments cover the arms. The trained model's 5-pass worn prompt gives only a
// dress example (chest+back+waist+legs+shoulders — no arms) and no jacket/coat example, so it
// routinely lands a jacket/coat/sweater on chest+shoulders but SKIPS left_arm/right_arm. This
// DERIVED overlay (never persisted) copies such a garment onto both arms wherever it sits on the
// torso, so the doll + the model's own input show a jacket that actually covers the arms. Short/
// sleeveless tops (t-shirt/tank/vest) are deliberately excluded. Applied to BOTH the panel render
// and the prompt so the two agree and the model doesn't fight the completion.
const SLEEVED_TORSO = new Set([
    'jacket', 'coat', 'blazer', 'sweater', 'hoodie', 'cardigan', 'pullover', 'jumper', 'sweatshirt',
    'turtleneck', 'trenchcoat', 'trench coat', 'windbreaker', 'parka', 'peacoat', 'pea coat', 'overcoat', 'robe',
]);
const SLEEVE_TORSO_SLOTS = ['chest', 'back', 'left_shoulder', 'right_shoulder'];
const wornId = (w) => [w.item, w.color || '', w.material || '', w.damage || ''].join('|').toLowerCase();
function withSleeveCoverage(body) {
    if (!body || typeof body !== 'object') return body;
    const sleeved = new Map(); // id -> garment obj, deduped
    for (const slot of SLEEVE_TORSO_SLOTS) {
        const worn = body[slot] && body[slot].worn;
        if (!Array.isArray(worn)) continue;
        for (const w of worn) {
            if (w && w.item && SLEEVED_TORSO.has(String(w.item).toLowerCase().trim()) && !sleeved.has(wornId(w))) {
                sleeved.set(wornId(w), w);
            }
        }
    }
    if (!sleeved.size) return body;
    const out = { ...body };
    for (const arm of ['left_arm', 'right_arm']) {
        const cell = out[arm] ? { ...out[arm] } : {};
        if (cell.missing === true) continue; // no limb → can't wear a sleeve
        const worn = Array.isArray(cell.worn) ? cell.worn.slice() : [];
        const present = new Set(worn.filter((w) => w && w.item).map(wornId));
        let added = false;
        for (const [id, w] of sleeved) {
            if (!present.has(id)) { worn.push({ ...w }); added = true; }
        }
        if (added) { cell.worn = worn; if (cell.bare === true) cell.bare = false; out[arm] = cell; }
    }
    return out;
}
function withSleeveCoverageState(state) {
    if (!state || typeof state !== 'object') return state;
    const out = {};
    for (const [name, cs] of Object.entries(state)) {
        out[name] = cs && cs.body ? { ...cs, body: withSleeveCoverage(cs.body) } : cs;
    }
    return out;
}

function serializeStateForPrompt(state) {
    if (!state || Object.keys(state).length === 0) return '';
    // D30: overlay dependent-missing (a hand when the arm is gone) so the RP model sees the same implied loss
    // the panel shows. Derived, not persisted. Then render as PROSE (never JSON — see renderStateProse above).
    const derived = {};
    for (const [name, cs] of Object.entries(state)) {
        derived[name] = cs?.body ? { ...cs, body: withSleeveCoverage(withDependentMissing(cs.body)) } : cs;
    }
    const prose = renderStateProse(derived);
    return prose ? `Current physical state: ${prose}` : '';
}

function injectStateIntoPrompt(state) {
    const settings = getSettings();
    const ctx = getContext();
    const text = serializeStateForPrompt(state);
    // Fallback is IN_CHAT (near generation), NEVER a front-of-context position — a
    // changing block at the front re-prefills the whole context every state change.
    ctx.setExtensionPrompt(
        MODULE_NAME,
        text,
        extension_prompt_types[settings.injectionPosition] ?? extension_prompt_types.IN_CHAT,
        settings.injectionDepth ?? 1,
        false,
        extension_prompt_roles.SYSTEM,
    );
}

// ─── Diagnostics (Doctor / Settings "Test connection") ──────────────────────
// The panel's Doctor + Settings views read these. They surface only connection
// + build facts — never any roleplay prose — so the user can safely copy a
// diagnostic report.

/**
 * Probe the configured extractor endpoint. Hits the OpenAI-compatible
 * `/models` listing (cheap, no generation) and reports reachability, round-trip
 * latency, and the first served model id (so the user can confirm the endpoint
 * actually serves the model they configured).
 *
 * @returns {Promise<{ok: boolean, ms: number, servedModel: string|null, error?: string}>}
 */
let lastProbe = null; // last probeEndpoint() result {ok, ms, servedModel, error, at} — surfaced in the Doctor
async function probeEndpoint() {
    const settings = getSettings();
    const base = (settings.endpoint || '').replace(/\/+$/, '');
    if (!base) { setEndpointConn('unknown'); lastProbe = null; return { ok: false, ms: 0, servedModel: null, error: 'no endpoint configured' }; }
    const url = base + '/models';
    const headers = {};
    if (settings.apiKey) headers['Authorization'] = 'Bearer ' + settings.apiKey;
    const t0 = Date.now();
    try {
        const resp = await fetch(url, { method: 'GET', headers });
        const ms = Date.now() - t0;
        // ANY HTTP response means the server is REACHABLE. A 404/405/401 on /models just
        // means it doesn't implement that route (extraction uses /chat/completions) — NOT
        // that the extractor is down. Only a thrown fetch (connection refused / DNS /
        // timeout) is a real "not responding". Marking a merely-model-less endpoint 'down'
        // was leaving the "extractor isn't responding" banner stuck on working endpoints.
        let servedModel = null;
        try {
            const data = await resp.json();
            servedModel = data?.data?.[0]?.id ?? null;
        } catch { /* non-JSON / non-2xx body — still reachable, just no model list */ }
        setEndpointConn('ok');
        const r = { ok: true, ms, servedModel, error: resp.ok ? undefined : `reachable (HTTP ${resp.status} on /models)` };
        lastProbe = { ...r, at: Date.now() };
        return r;
    } catch (err) {
        setEndpointConn('down');
        const r = { ok: false, ms: Date.now() - t0, servedModel: null, error: err.message };
        lastProbe = { ...r, at: Date.now() };
        return r;
    }
}

/**
 * Reduce an endpoint URL to a NON-identifying kind for the Doctor / copy-paste
 * diagnostic report. A BYO endpoint can carry a private LAN IP, an internal
 * hostname, or a tunnel URL (ngrok / Tailscale / cloudflared); the report header
 * promises a paste-safe sanitized dump, so the raw URL must never appear. The API
 * key is already stripped elsewhere — this closes the same hole for the host.
 * Mirrors the "Active transport" row, which is kind-only by the same rule.
 *
 * @param {string} endpoint
 * @returns {string} one of 'localhost' | 'LAN IP' | 'remote host' | '(none)'
 */
function classifyEndpoint(endpoint) {
    const raw = (endpoint || '').trim();
    if (!raw) return '(none)';
    let host;
    try {
        host = new URL(raw).hostname;
    } catch {
        // Not a parseable URL — never echo the raw value; just say "configured".
        return 'configured (unparsed)';
    }
    const h = host.toLowerCase();
    if (h === 'localhost' || h === '127.0.0.1' || h === '::1' || h === '[::1]') {
        return 'localhost';
    }
    // RFC1918 private ranges + link-local + CGNAT — treat as a LAN/private host.
    if (/^10\./.test(h)
        || /^192\.168\./.test(h)
        || /^172\.(1[6-9]|2\d|3[01])\./.test(h)
        || /^169\.254\./.test(h)
        || /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(h)) {
        return 'LAN IP';
    }
    return 'remote host';
}

/**
 * Build the Doctor "vitals" rows. Each row is { dot, label, value } where
 * `dot` ∈ 'ok'|'warn'|'error' and `value` may contain (already-escaped) HTML.
 * Connection/served-model rows are static here (the live probe is a separate
 * button); this function reports the build + environment facts that don't
 * require a network round-trip. The panel may overwrite the endpoint/model
 * rows after a live probeEndpoint() call.
 *
 * @returns {{dot: string, label: string, value: string}[]}
 */
function getDoctorVitals() {
    const settings = getSettings();
    const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const ua = (navigator.userAgent.match(/(Firefox|Chrom(e|ium)|Safari)\/[\d.]+/) || ['unknown'])[0];
    const os = (navigator.userAgent.match(/\(([^);]+)/) || [, 'unknown'])[1];
    let stVersion = 'Marinara Engine';
    try { stVersion = getContext()?.version || stVersion; } catch { /* keep default */ }

    // ── New device / transport / model rows (PREPENDED) ──
    // The active transport is reported as a KIND only — never the endpoint URL —
    // so this row is safe regardless of where the vitals are surfaced.
    const transport = getActiveTransport();
    const browserActive = transport && transport === webllmTransport;
    const transportKind = transport
        ? (browserActive ? 'Browser model (WebLLM)' : 'Custom endpoint')
        : 'inactive';
    const transportRow = {
        dot: transport ? 'ok' : 'warn',
        label: 'Active transport',
        value: transportKind,
    };

    const r = lastReadiness || {};
    const gpu = r.gpu || {};
    const ram = r.ram || {};
    const cpu = r.cpu || {};

    const gpuValue = gpu.ok
        ? `${esc(gpu.vendor || 'WebGPU')} ${esc(gpu.architecture || '')}`.trim()
            + (gpu.maxStorageBufferBindingSize
                ? ` · SSBO ${Math.round(gpu.maxStorageBufferBindingSize / (1024 * 1024))} MB`
                : '')
        : ('no WebGPU' + (gpu.hint ? ` — ${esc(gpu.hint)}` : ''));
    const gpuRow = { dot: gpu.ok ? 'ok' : 'warn', label: 'Device · GPU', value: gpuValue };

    const ramRow = {
        dot: ram.known ? 'ok' : 'warn',
        label: 'Device · memory',
        value: ram.known ? `~${esc(ram.gb)} GB (total, hint)` : 'unknown (browser does not report)',
    };
    const cpuRow = { dot: 'ok', label: 'Device · CPU', value: `${esc(cpu.threads || '?')} threads` };

    // Model row. Cached state is only meaningful when configured; we report it
    // from lastReadiness-free transport status (the card computes cached via
    // hasModelInCache; here we keep it lightweight and avoid an async probe).
    const configured = isModelConfigured();
    const modelId = MODEL_CONFIG?.modelId || null;
    // Show the model for the ACTIVE path only: the in-browser model when it's live,
    // otherwise the name configured for the custom endpoint. (Two "model" rows —
    // browser + configured — was confusing; fold to the one that's actually in use.)
    // Prefer the model the endpoint actually SERVES (from the last /models probe) over the
    // configured name — "ChatML" is just a template default, whereas the served id carries the
    // real model + version (e.g. beholder-v7-q4). For a Marinara connection the model lives
    // server-side, so name the connection instead.
    const probedModel = lastProbe?.servedModel || null;
    const modelRow = browserActive
        ? { dot: configured ? 'ok' : 'warn', label: 'Model',
            value: configured ? `<code>${esc(modelId)}</code> · in-browser` : 'not downloaded yet' }
        : settings.meConnectionId
            ? { dot: 'ok', label: 'Model',
                value: `via Marinara connection <code>${esc(settings.meConnName || settings.meConnectionId)}</code>` }
            : probedModel
                ? { dot: 'ok', label: 'Model',
                    value: `<code>${esc(probedModel)}</code> · served${settings.model && settings.model !== probedModel ? ` · sent as <code>${esc(settings.model)}</code>` : ''}` }
                : { dot: settings.model ? 'ok' : 'warn', label: 'Model',
                    value: settings.model ? `<code>${esc(settings.model)}</code> · configured · run Test connection to read the served model` : 'set one in Settings' };

    // Endpoint — paste-safe: kind + port + reachability + latency. Never the raw URL/host
    // (the diagnostic report promises to strip it); port + localhost/LAN kind aren't sensitive.
    let endpointRow;
    if (settings.meConnectionId) {
        endpointRow = { dot: 'ok', label: 'Endpoint', value: 'Marinara connection · routed via Marinara proxy' };
    } else {
        const ep = (settings.endpoint || '').trim();
        if (!ep) {
            endpointRow = { dot: 'warn', label: 'Endpoint', value: 'not set — add a local endpoint or Marinara connection in Settings' };
        } else {
            let port = '';
            try { const u = new URL(ep); port = u.port ? ':' + u.port : ''; } catch { /* unparsed */ }
            const reach = endpointConn === 'ok' ? '✓ reachable' : endpointConn === 'down' ? '✗ not responding' : 'not probed yet';
            const lat = (endpointConn === 'ok' && lastProbe?.ms != null) ? ` · ${lastProbe.ms}ms` : '';
            endpointRow = { dot: endpointConn === 'down' ? 'warn' : 'ok', label: 'Endpoint',
                value: `<code>${esc(classifyEndpoint(ep) + port)}</code> · ${reach}${lat}` };
        }
    }

    // Performance row — median TTFT + tok/s over recent BROWSER-MODEL turns only.
    // For a custom endpoint or inactive state we show an honest 'n/a' rather than
    // a stale browser number.
    let perfValue;
    if (!browserActive) {
        perfValue = transport ? 'n/a (custom endpoint)' : 'n/a (no browser model active)';
    } else if (vitalsTurns.length === 0) {
        perfValue = 'no browser-model turns yet';
    } else {
        const ttfts = vitalsTurns.map(v => v.ttftMs).filter(x => x != null).sort((a, b) => a - b);
        const tpsArr = vitalsTurns.map(v => v.tokensPerSec).filter(x => x != null).sort((a, b) => a - b);
        const med = (arr) => arr.length ? arr[Math.floor((arr.length - 1) / 2)] : null;
        const ttftMed = med(ttfts);
        const tpsMed = med(tpsArr);
        perfValue = ttftMed != null
            ? `TTFT ${(ttftMed / 1000).toFixed(1)}s · ${tpsMed != null ? tpsMed.toFixed(1) + ' tok/s' : '—'} (median of last ${vitalsTurns.length})`
            : 'no browser-model turns yet';
    }
    const perfRow = { dot: browserActive ? 'ok' : 'warn', label: 'Performance', value: perfValue };

    // Vitals are USER-FACING (copied into bug reports) — show only what a user or
    // support can act on: what's running, where, versions, is it on. No internal
    // jargon (prompt-pass names, schema axes) and no free schematic detail.
    const customPrompt = !!(settings.systemPrompt && String(settings.systemPrompt).trim());
    // Device + performance rows only matter for the in-browser model; when a custom
    // endpoint does the extraction they're just noise, so hide them there.
    const usingEndpoint = transport && !browserActive;

    const rows = [
        transportRow,
        modelRow,
        endpointRow,
        settings.validator?.enabled !== false
            ? { dot: 'ok', label: 'Validator', value: 'Active' }
            : { dot: 'warn', label: 'Validator', value: 'Off' },
        // Name the actual prompt in use, not a vague "default": the 5-pass trained-model
        // prompts carry the lineage tag (xattr_v1); a mono prompt is either the bundled
        // general prompt (tagged by the shim) or a genuinely user-supplied one.
        (() => {
            const tag = customPrompt ? (settings.systemPromptTag || 'custom') : SHORT_PASS_TAG;
            const mode = customPrompt ? 'mono' : '5-pass';
            const isCustom = customPrompt && !settings.systemPromptTag;
            return { dot: isCustom ? 'warn' : 'ok', label: 'System prompt',
                value: `<code>${esc(tag)}</code> · ${mode}` };
        })(),
        { dot: 'ok', label: 'Extension', value: `<code>${esc(EXTENSION_VERSION)}</code>` },
        { dot: 'ok', label: 'Host', value: `<code>${esc(stVersion)}</code>` },
        { dot: 'ok', label: 'Browser / OS', value: `<code>${esc(ua)}</code> · ${esc(os)}` },
    ];
    if (!usingEndpoint) rows.push(perfRow, gpuRow, ramRow, cpuRow);
    return rows;
}

// ─── Main processing pipeline ──────────────────────────────────────────────

/**
 * Process one inbound RP message: normalize → extract → merge → inject.
 * Returns the new state (also persisted to chat_metadata).
 *
 * Routed through BeholderEngine against the selected transport. The per-message
 * ST side-effects (Inspector capture, stored delta, badges, panel render, prompt
 * injection, lock filtering) are preserved inside the host adapter's render /
 * onExtraction callbacks — net behavior is identical to the old inline path.
 * When no model is active (no endpoint + no enabled browser model), we leave the
 * state unchanged and surface the no-model banner instead of calling the engine.
 *
 * @param {string} rawMessage
 * @param {string|null} personaName
 * @param {*} [messageId]  chat-array index (or the synthetic seed key during backfill)
 * @param {AbortSignal} [signal]
 */
export async function processMessage(rawMessage, personaName, messageId, signal) {
    const settings = getSettings();
    if (!settings.enabled) return getChatState().state;

    const engine = getActiveEngine();
    if (!engine) {
        // §9.4 inactive: no transport selected. Leave state unchanged and ask the
        // UI to show the no-model banner (cause derived from current settings).
        refreshNoModelBanner();
        return getChatState().state;
    }
    return engine.processMessage(rawMessage, personaName, { signal, messageId });
}

// ─── Card seed ─────────────────────────────────────────────────────────────
// SillyTavern character cards and user persona cards carry baseline appearance
// (clothing, anatomy, species cues) that the in-chat messages assume but rarely
// re-state. Without seeding, Beholder only learns what message text directly
// describes, so "she glances up from her book" yields no clothing state even
// though the card says she's wearing a wool dress.
//
// The seed runs the extractor on a SNAPSHOT-mode narration built from
// character.description / .personality / .scenario plus the persona description.
// The resulting delta is stored under the synthetic key '__seed__' inside the
// per-message delta map, which means:
//   - it applies through the same applyDelta() machinery as message deltas
//   - it's idempotent (re-running buildHistory won't double-apply)
//   - rebuild clears it the same way it clears message deltas
//   - clearing JUST the seed (without touching messages) is one key delete

const SEED_KEY = '__seed__';

/**
 * Resolve the per-chat card-seed sources from the SillyTavern context.
 * Returns { ok: true, personaNarration, charNarration, personaName, charName }
 * with each narration possibly being '' if that side has nothing to extract.
 * Returns { ok: false, reason } when nothing seedable is available.
 *
 * Each narration is sent as a SEPARATE model call so the persona description
 * (short, clothing-rich) isn't drowned by a multi-thousand-character character
 * lore block. The first iteration bundled them into one call — works for
 * short cards, but a long Lola-style backstory card (11k chars) reliably
 * poisoned the persona signal and made the model emit noop for everything.
 */
// A weak extractor noops on a long lore-dense card (a 28k-char description with
// the clothes buried in it). Split the card text into APPEARANCE-relevant chunks
// so each extractor call sees a focused, clothing-rich passage instead of a wall
// of backstory. Paragraphs mentioning clothing/anatomy are kept; the rest is
// dropped. Falls back to the first chunk when nothing matches (best-effort).
const SEED_CHUNK_MAX = 2000;
const APPEARANCE_RE = /\b(wear|wears|wearing|worn|dress|dressed|clad|clothe|clothing|clothes|outfit|attire|garb|robe|robes|shirt|blouse|tunic|trouser|trousers|pants|jeans|leggings|skirt|gown|coat|cloak|jacket|blazer|vest|hoodie|sweater|boot|boots|shoe|shoes|sandal|heel|heels|sock|glove|gloves|gauntlet|belt|sash|holster|hat|cap|hood|helmet|scarf|tie|collar|sleeve|sleeves|armor|armour|corset|bra|underwear|lingerie|barefoot|shirtless|topless|naked|nude|eyepatch|patch|monocle|glasses|goggles|earring|necklace|scar|scars|missing|stump|amput|prosthetic|bare|species|humanoid|anthro|creature|monster|beast|demon|demonic|angel|angelic|vampire|werewolf|lycan|lamia|naga|mermaid|merfolk|siren|succubus|incubus|elf|elven|elvish|orc|orcish|goblin|dwarf|dwarven|fae|fairy|fairies|nymph|kitsune|neko|catgirl|catboy|kobold|dragon|dragonborn|draconic|drake|wyvern|gargoyle|golem|android|robot|cyborg|automaton|undead|zombie|skeleton|ghost|wraith|spirit|slime|tail|tails|horn|horns|wing|wings|fang|fangs|claw|claws|talon|talons|scale|scales|scaly|fur|furry|hoof|hooves|paw|paws|snout|muzzle|mane|feather|feathers|gill|gills|fin|fins|tentacle|tentacles|antenna|antennae|pointed ears|pointy ears)\b/i;

/** Split card text into <=maxChars appearance-relevant chunks. */
function appearanceChunks(text, maxChars = SEED_CHUNK_MAX) {
    const t = (text || '').trim();
    if (!t) return [];
    if (t.length <= maxChars) return [t];
    const paras = t.split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(Boolean);
    let relevant = paras.filter(p => APPEARANCE_RE.test(p));
    if (!relevant.length) relevant = [paras[0] || t.slice(0, maxChars)];   // best-effort fallback
    const chunks = [];
    let cur = '';
    for (const p of relevant) {
        if (p.length > maxChars) {                     // a single oversized paragraph → hard-split
            if (cur) { chunks.push(cur); cur = ''; }
            for (let i = 0; i < p.length; i += maxChars) chunks.push(p.slice(i, i + maxChars));
            continue;
        }
        if (cur && (cur.length + 2 + p.length) > maxChars) { chunks.push(cur); cur = p; }
        else cur = cur ? `${cur}\n\n${p}` : p;
    }
    if (cur) chunks.push(cur);
    return chunks;
}

function getCardSeedSource(ctx) {
    if (ctx.groupId) return { ok: false, reason: 'group_chat' };
    const charId = ctx.characterId;
    if (charId == null || !ctx.characters || !ctx.characters[charId]) {
        return { ok: false, reason: 'no_character' };
    }
    const ch = ctx.characters[charId];
    const personaName = ctx.name1 || null;

    // Persona description: ST surfaces the power-user settings on the CONTEXT as
    // `powerUserSettings` (per the extension docs — `ctx.power_user` does NOT
    // exist, which is why the persona never seeded). The active persona's text is
    // `persona_description`; older/per-avatar layouts keep a `persona_descriptions`
    // map. Probe all known spots and record which hit so a miss is diagnosable.
    const pu = ctx.powerUserSettings || ctx.power_user || {};
    const avatar = ctx.userAvatar || pu.default_persona || null;
    let personaDesc = '';
    let personaSrc = 'none';
    if (typeof pu.persona_description === 'string' && pu.persona_description.trim()) {
        personaDesc = pu.persona_description;
        personaSrc = 'powerUserSettings.persona_description';
    } else if (avatar && pu.persona_descriptions?.[avatar]?.description) {
        personaDesc = pu.persona_descriptions[avatar].description;
        personaSrc = 'powerUserSettings.persona_descriptions[avatar]';
    } else if (personaName && extension_settings?.persona_descriptions?.[personaName]?.description) {
        personaDesc = extension_settings.persona_descriptions[personaName].description;
        personaSrc = 'extension_settings(legacy)';
    }

    // Card fields: prefer the synced top-level, fall back to the V2 nested `data`.
    const desc = (ch.description || ch.data?.description || '').trim();
    const personality = (ch.personality || ch.data?.personality || '').trim();
    const scenario = (ch.scenario || ch.data?.scenario || '').trim();
    const personaDescTrim = (personaDesc || '').trim();
    const charName = ch.name || ctx.name2 || 'Character';
    const _debug = {
        personaName, charName, personaSrc,
        descLen: desc.length, personalityLen: personality.length,
        scenarioLen: scenario.length, personaDescLen: personaDescTrim.length,
        hasPowerUserSettings: !!ctx.powerUserSettings, hasPowerUser: !!ctx.power_user,
    };

    if (!desc && !personality && !scenario && !personaDescTrim) {
        return { ok: false, reason: 'no_content', _debug };
    }

    // Cards use {{user}} / {{char}} macros; substitute before the extractor
    // ever sees the text so it gets concrete names instead of literal braces.
    const sub = (s) => (s || '')
        .replace(/\{\{user\}\}/gi, personaName || 'the user')
        .replace(/\{\{char\}\}/gi, charName);

    const personaNarration = personaDescTrim
        ? `PERSONA DESCRIPTION (${personaName || 'the user'}):\n${sub(personaDescTrim)}`
        : '';
    const chParts = [desc, personality, scenario].map(sub).filter(Boolean);
    const charNarration = chParts.length
        ? `CHARACTER DESCRIPTION (${charName}):\n${chParts.join('\n\n')}`
        : '';

    return {
        ok: true,
        personaName,
        charName,
        personaNarration,
        charNarration,
        _debug,
    };
}

/**
 * Build the running state's "frame 0" from the character + persona card text.
 *
 *   - `force=false` (default): no-op if a seed has already been stored for
 *     this chat. Safe to call multiple times (e.g. from buildHistoryFromChat).
 *   - `force=true`: drops any existing seed delta first; the new seed is
 *     applied on top of the current cs.state (which may include message
 *     deltas — caller is expected to clear cs.state first when doing a
 *     full rebuild).
 *
 * @returns {Promise<{seeded: boolean, delta?: object, reason?: string}>}
 */
export async function seedFromCards({ force = false } = {}) {
    const settings = getSettings();
    if (!settings.enabled) return { seeded: false, reason: 'disabled' };

    const cs = getChatState();
    if (!force && cs.deltasByMsg && cs.deltasByMsg[SEED_KEY] != null) {
        return { seeded: false, reason: 'already_seeded' };
    }

    // The card seed is its own model call (no engine method covers it), so we
    // call extract() directly but MUST hand it the selected transport — never let
    // it fall through to the built-in fetch. No active transport ⇒ nothing to do;
    // surface the no-model banner instead of silently hitting localhost.
    const transport = getActiveTransport();
    if (!transport) {
        refreshNoModelBanner();
        return { seeded: false, reason: 'no_model_active' };
    }

    const ctx = getContext();
    const src = getCardSeedSource(ctx);
    // Always log the source resolution (even without verbose) — this is the exact
    // spot a seed silently produces nothing, and the _debug fields (field lengths,
    // which persona path hit, whether powerUserSettings exists) pinpoint why.
    console.log(LOG, 'seedFromCards source:', { ok: src.ok, reason: src.reason, ...(src._debug || {}) });
    if (!src.ok) return { seeded: false, reason: src.reason };

    // SNAPSHOT mode: prev = {} tells the extractor to emit the full state
    // with changed:true (per the extraction prompt's MODE rule).
    //
    // We make TWO separate calls — one per card description — instead of
    // bundling both into a single mega-narration. Persona cards are usually
    // short and clothing-rich (10-500 chars); character cards can be many
    // thousand chars of family lore + personality with no concrete clothing.
    // Bundled, the long character description reliably drowns the persona
    // signal and the model emits noop for everything. Split, each call gets
    // focused attention and any "nothing to extract" outcome stays contained.
    // Extract a card narration in APPEARANCE-relevant chunks (so a 28k-char card
    // doesn't drown the weak extractor), merge the per-chunk deltas, then fold the
    // result onto the described character. Folding is right for BOTH cards: the
    // persona bio is definitionally the persona's, and the character card is the
    // character's — the model routinely keys the clothes under a phantom name
    // ("Mara") or "self" from a 3rd-person description, which we redirect here.
    const callExtract = async (narration, label, foldTo, excludeFold) => {
        if (!narration) return { delta: {}, failed: false };
        const chunks = appearanceChunks(narration);
        let merged = {};
        let anyOk = false, anyFail = false;
        for (const chunk of chunks) {
            try {
                // Prefix each chunk with the subject's NAME. appearanceChunks keeps only the
                // clothing-relevant paragraphs of a long (>2k) card, which can strip the
                // name-bearing (non-clothing) paragraphs — leaving a nameless "her clothes"
                // chunk. The extractor then can't attribute it, keys the clothes under `self`,
                // and the char fold excludes `self` → the character's whole outfit silently
                // vanishes (charKeyed: []). Naming every chunk makes attribution robust no
                // matter how the card is structured (name + clothes in separate paragraphs).
                const named = foldTo ? `${foldTo}'s appearance and clothing:\n${chunk}` : chunk;
                const canonical = normalize(named, src.personaName);
                const result = await extract({
                    canonical, prevState: {}, personaName: src.personaName, cfg: settings, transport,
                });
                merged = applyDelta(merged, result.delta || {});
                anyOk = true;
            } catch (err) {
                anyFail = true;
                console.warn(LOG, `seedFromCards ${label}: extractor call failed:`, err.message);
            }
        }
        debugLog(`seedFromCards ${label}`, { chunks: chunks.length, chars: narration.length, merged });
        // failed = we HAD text to read but every call errored (endpoint busy/down after
        // retries) — as opposed to a card that legitimately has no extractable state.
        return { delta: foldTo ? foldDeltaToChar(merged, foldTo, excludeFold) : merged, failed: !anyOk && anyFail };
    };

    // Serialize the two card extractions (persona THEN char) instead of Promise.all:
    // each fans out into 5 concurrent lane calls, so running both at once floods a
    // single-slot local endpoint with ~10 requests and KoboldCpp returns 503 "server
    // busy", silently dropping one card (the bigger char card lost the race — Farah's
    // 6150-char description → merged:{}). One card at a time = 5 concurrent, same as a
    // normal message turn, and callChatCompletions now retries any transient 503 anyway.
    // The char card is extracted with personaName = the persona (src.personaName),
    // so any {{user}} reference in the char bio surfaces as `self` (the persona) or
    // the persona's name — exclude BOTH from the char fold so the persona's traits
    // don't land on the character. Symmetrically, keep the persona's own `self` but
    // drop the character's name from the persona fold.
    const personaRes = await callExtract(src.personaNarration, 'persona', src.personaName, [src.charName]);
    const charRes = await callExtract(src.charNarration, 'char', src.charName, [src.personaName, 'self']);
    const personaDelta = personaRes.delta, charDelta = charRes.delta;
    // If a card that HAD text failed to extract outright (endpoint busy/down), don't
    // lock the chat into this partial/empty baseline — leave it re-seedable.
    const seedFailed = personaRes.failed || charRes.failed;

    // Both deltas are already folded onto their own character; merge them.
    const delta = stripBareFromSeed({ ...personaDelta, ...charDelta });
    // Reconcile character keys the same way live deltas are (aliases collapse name
    // variants; hidden characters dropped) before the lock filter + merge.
    const mapped = mapCharacters(delta);
    // User-locked slots win, even on a card re-seed: the seed delta is produced
    // by the extractor (a model), so it must pass through the same lock filter
    // as message deltas before merge. Otherwise a Rebuild / forced re-seed could
    // clobber a hand-set, locked slot with the card's description. Store the
    // filtered delta so any later replay stays consistent.
    const safeDelta = filterLockedFromDelta(mapped, getLocks());
    // H1 — validate + strip the seed delta exactly as the engine validates a live
    // turn, so impossible placements (eyepatch-on-hand, concussion-on-back, boot-on-
    // eye) can't enter state via the card seed either. Prose-aware rules are skipped
    // (a card snapshot has no single narration); the deterministic cross-field + slot
    // rules run. Same on-by-default toggle as message turns. The VALIDATED delta is
    // what's applied AND persisted under SEED_KEY, so any later replay stays consistent.
    let seedDelta = safeDelta;
    if (settings.validator?.enabled !== false && Object.keys(safeDelta).length) {
        const { stripped } = applyValidator(
            { changed: true, delta: safeDelta },
            { persona: src.personaName, prevState: cs.state || {}, prose: null },
        );
        seedDelta = (stripped && stripped.changed && stripped.delta) ? stripped.delta : {};
    }
    const newState = applyDelta(cs.state || {}, seedDelta);
    setChatState(newState);
    // Only mark the chat seeded when the read actually COMPLETED. If a card extraction
    // failed outright (503/down after retries), leave SEED_KEY unset so the next
    // chat-load re-seeds instead of permanently locking in an empty/partial baseline.
    if (!seedFailed) {
        cs.deltasByMsg[SEED_KEY] = seedDelta;
    }
    saveMetadataDebounced();
    injectStateIntoPrompt(newState);
    renderPanel(newState);
    console.log(LOG, 'seedFromCards applied:', {
        chars: Object.keys(seedDelta),
        personaKeyed: Object.keys(personaDelta),
        charKeyed: Object.keys(charDelta),
        seedFailed,
    });
    return { seeded: true, delta: seedDelta, retryable: seedFailed };
}

// A card BIO establishes what a character WEARS / IS — never that a slot is uncovered.
// Fed descriptive bio prose, the extractor's flags lane routinely hallucinates
// `bare:true` on every unmentioned slot (a persona card → "naked everywhere"), which
// then poisons real message-derived clothing (a stale bare:true sitting under a shirt).
// Drop every `bare` flag from the SEED delta: a slot the card doesn't mention stays
// UNKNOWN, not bare. worn/wounds/holding/missing/species are kept — a card can
// legitimately state an outfit, a scar, a held item, a lost limb, a species.
function stripBareFromSeed(delta) {
    for (const char of Object.keys(delta || {})) {
        const body = delta[char] && delta[char].body;
        if (!body || typeof body !== 'object') continue;
        for (const slot of Object.keys(body)) {
            const sd = body[slot];
            if (!sd || typeof sd !== 'object') continue;
            delete sd.bare;
            if (Object.keys(sd).length === 0) delete body[slot];
        }
        if (Object.keys(body).length === 0) delete delta[char].body;
        if (delta[char] && Object.keys(delta[char]).length === 0) delete delta[char];
    }
    return delta;
}

// Fold EVERY top-level character key in a delta into one `name`, deep-merging via
// applyDelta. Used for the persona card seed: that narration is entirely about the
// persona, so whatever the (often-weak) model keys it under — `self`, the persona
// name, or a companion mentioned in the bio — all of it is the persona's state.
// ─── History backfill ──────────────────────────────────────────────────────
// Walks ctx.chat[] from the first un-processed AI message to the end, calling
// processMessage() sequentially so state accumulates the same way it would
// have if Beholder had been running from message zero. Critical for testers
// who install the extension into an existing chat, or who clear state and
// want to rebuild from history.

let backfillInProgress = false;
let suspendLiveProcessing = false;
let backfillAbort = null;

/**
 * Build the running state from chat history.
 * @param {(p: {done: number, total: number, current: number}) => void} [onProgress]
 *   Called after each message lands. `current` is the chat-array index just processed.
 * @param {AbortSignal} [signal]  Optional cancel signal.
 * @param {{rebuild?: boolean}} [opts]  When rebuild=true, cs.state and ALL
 *   message deltas (including the seed) are dropped before re-running; the
 *   seed is then re-extracted and applied before the message walk. Equivalent
 *   to "clear state, then build from scratch including the card."
 * @returns {Promise<{done: number, total: number, aborted: boolean}>}
 */
export async function buildHistoryFromChat(onProgress, signal, { rebuild = false } = {}) {
    if (backfillInProgress) {
        return { done: 0, total: 0, aborted: false };
    }
    backfillInProgress = true;
    suspendLiveProcessing = true;
    try {
        const cs = getChatState();
        if (rebuild) {
            cs.state = {};
            cs.deltasByMsg = {};
            cs.capture = [];
            saveMetadataDebounced();
            $('#chat .beholder-msg-badges').remove();
            injectStateIntoPrompt({});
            renderPanel({});
        }

        // Card seed (idempotent — no-op if cs.deltasByMsg[SEED_KEY] is set).
        // On rebuild we just cleared, so this always fires; on incremental
        // backfill it only fires the first time. Failures are non-fatal —
        // we keep walking the message history regardless.
        try {
            await seedFromCards({ force: false });
        } catch (err) {
            console.warn(LOG, 'seedFromCards failed during backfill (continuing):', err);
        }

        const ctx = getContext();
        const chat = ctx.chat || [];
        const personaName = ctx.name1 || null;

        // Collect message ids not yet processed (live or earlier backfill). BOTH
        // the user's turns and the AI's are walked — the persona's state is often
        // established only in the user's own messages.
        const targets = [];
        for (let i = 0; i < chat.length; i++) {
            const m = chat[i];
            if (!m) continue;
            if (cs.deltasByMsg && cs.deltasByMsg[i] != null) continue;
            targets.push(i);
        }
        const total = targets.length;
        let done = 0;
        let aborted = false;
        for (const i of targets) {
            if (signal?.aborted) { aborted = true; break; }
            // In-flight tick so the strip shows "extracting N…" while a (possibly
            // slow) extraction runs, instead of a counter frozen at the last done.
            try { onProgress?.({ done, total, current: i, inFlight: true }); } catch { /* ignore */ }
            // Yield a paint frame so the browser actually renders the "extracting N…" update
            // BEFORE the (often sub-100ms, local) extraction runs — otherwise the loop starves
            // the render step and the counter jumps 0→done instead of ticking per message.
            await new Promise((r) => requestAnimationFrame(() => r()));
            try {
                await processMessage(chat[i].mes || '', personaName, i);
            } catch (err) {
                console.warn(LOG, `backfill: processMessage failed at msg ${i}:`, err);
                // Continue with the rest — one bad message shouldn't kill the run.
            }
            done++;
            try { onProgress?.({ done, total, current: i }); } catch { /* ignore listener errors */ }
        }
        debugLog('backfill complete', { done, total, aborted });
        return { done, total, aborted };
    } finally {
        backfillInProgress = false;
        suspendLiveProcessing = false;
        backfillAbort = null;
    }
}

/**
 * Count messages in the current chat that don't yet have a delta recorded.
 * BOTH user turns and AI turns count — both are scanned by the extractor.
 */
function countUnprocessedMessages() {
    const ctx = getContext();
    const chat = ctx.chat || [];
    const cs = getChatState();
    let n = 0;
    for (let i = 0; i < chat.length; i++) {
        const m = chat[i];
        if (!m) continue;
        if (cs.deltasByMsg && cs.deltasByMsg[i] != null) continue;
        n++;
    }
    return n;
}

/**
 * Bridge to panel.js — invoked when the user picks a build mode from the
 * panel header's history-button menu, or accepts the detect-and-offer banner.
 *
 * @param {'build'|'seed'|'rebuild'} [mode]  default 'build'
 *   - 'build'   incremental: seed if missing, walk un-processed AI messages
 *   - 'seed'    re-extract the card seed only (force=true; leaves message
 *               deltas alone — use after editing the character/persona card)
 *   - 'rebuild' wipe everything, re-seed, walk all AI messages from zero
 */
async function runBackfillFromUi(mode = 'build') {
    if (mode === 'seed') {
        const result = await seedFromCards({ force: true });
        if (result.seeded) {
            toastr?.success?.('Beholder: re-seeded state from character + persona card');
        } else {
            const reasons = {
                already_seeded: 'card seed already exists (use Rebuild to redo from scratch)',
                no_content: 'character + persona cards have no description/personality/scenario text',
                no_character: 'no character selected for this chat',
                group_chat: 'group chats are not supported by the card seed yet',
                extractor_failed: 'extractor call failed (see console)',
                disabled: 'Beholder is disabled in settings',
                no_model_active: 'no model active — enable the browser model or set a custom endpoint',
            };
            toastr?.info?.(`Beholder: ${reasons[result.reason] || result.reason}`);
        }
        return;
    }

    const rebuild = (mode === 'rebuild');
    const ctx = getContext();
    const msgCount = (ctx.chat || []).filter(Boolean).length;
    const total = rebuild ? msgCount : countUnprocessedMessages();
    if (total === 0 && !rebuild) {
        toastr?.info?.('Beholder: no un-processed messages to backfill');
        return;
    }
    const controller = new AbortController();
    backfillAbort = controller;
    setPanelBackfillProgress({ done: 0, total, onCancel: () => controller.abort() });
    const result = await buildHistoryFromChat(
        ({ done, inFlight }) => setPanelBackfillProgress({ done, total, inFlight, onCancel: () => controller.abort() }),
        controller.signal,
        { rebuild },
    );
    clearPanelBackfillStatus();
    const verb = rebuild ? 'rebuild' : 'backfill';
    const past = rebuild ? 'rebuilt' : 'backfilled';
    if (result.aborted) {
        toastr?.warning?.(`Beholder: ${verb} cancelled at ${result.done}/${result.total}`);
    } else {
        toastr?.success?.(`Beholder: ${past} ${result.done} message${result.done === 1 ? '' : 's'}`);
    }
}

// ─── Note box: pre-turn user directive ──────────────────────────────────────
// A free-text box where the user states an intent for the state BEFORE the AI
// writes the next turn (e.g. "set my sword to broken", "I'm barefoot now").
// The directive is run through the extractor in SNAPSHOT mode (prev = {}) so it
// reads as a fresh statement of fact, and the resulting per-slot deltas are
// applied as USER edits — they win over the model and persist. Because the user
// asserted them, the touched slots are marked user-edited (the user can lock
// them from the editor if they want the model to keep hands off).

/**
 * Apply one free-text note-box directive as a user delta, before generation.
 * @param {string} text  the user's free-text intent
 * @returns {Promise<object>} the new running state
 */
async function applyNoteBoxDirective(text) {
    const settings = getSettings();
    if (!settings.enabled) return getChatState().state;
    const trimmed = (text || '').trim();
    if (!trimmed) return getChatState().state;

    const engine = getActiveEngine();
    if (!engine) {
        // No active transport: can't run the directive's model call. Surface the
        // banner and leave state unchanged (consistent with the message path).
        refreshNoModelBanner();
        return getChatState().state;
    }

    const ctx = getContext();
    const personaName = ctx.name1 || null;

    // engine.applyDirective runs the same snapshot-extract → per-slot user-edit
    // path the inline version did (markUserEdited via host.markUserEdited,
    // saveState/injectState/render via the host adapter), so the touched slots
    // still win over the model and persist. Behavior-identical.
    const newState = await engine.applyDirective(trimmed, personaName);
    debugLog('note-box directive applied');
    return newState;
}

// ─── Browser-model lifecycle (Local-model card) ─────────────────────────────
// The Local-model card (views.js) is a pure consumer: it renders whatever
// getBrowserModelState() returns and calls the on* handlers below. All transport
// /engine state lives here; the UI never touches the transport directly. The
// WebLLM module is imported LAZILY (only when the user acts) so users who never
// enable the browser model incur zero network/CDN hit.

// Cache of the last hasModelInCache() result so getBrowserModelState() (called
// frequently by re-renders) is synchronous. Refreshed by refreshModelCache().
let modelCachedFlag = false;

// Lazily build the WebLLM transport singleton. onProgress forwards WebLLM's
// InitProgressReport into the card's progress bar. Created once; reused for
// enable/disable/unload.
// The current download's progress callback. Updated on EVERY ensureWebllmTransport
// call so the latest initiator (banner OR card) drives the bar — the transport's
// onProgress is bound once at creation, so without this a second download could
// never update the UI (the "stuck at 0%" bug).
let webllmProgressSink = null;
function ensureWebllmTransport(onProgress) {
    webllmProgressSink = typeof onProgress === 'function' ? onProgress : null;
    if (!webllmTransport) {
        webllmTransport = new WebLLMTransport({
            modelConfig: MODEL_CONFIG,
            onProgress: (report) => {
                try {
                    webllmProgressSink?.({
                        pct: Math.round((report?.progress ?? 0) * 100),
                        text: report?.text || '',
                    });
                } catch { /* ignore card listener errors */ }
            },
        });
    }
    return webllmTransport;
}

/**
 * Check the browser Cache API for the configured model id (shard-granularity
 * download resume means a cached model = instant re-enable). Best-effort + lazy:
 * dynamically imports WebLLM's hasModelInCache only when configured. Stores the
 * result in modelCachedFlag and returns it.
 */
async function refreshModelCache() {
    modelCachedFlag = false;
    if (!isModelConfigured()) return false;
    try {
        const webllm = await import('https://esm.run/@mlc-ai/web-llm@0.2.84');
        const appConfig = { model_list: [toModelRecordSafe()].filter(Boolean) };
        if (typeof webllm.hasModelInCache === 'function' && MODEL_CONFIG.modelId) {
            modelCachedFlag = await webllm.hasModelInCache(MODEL_CONFIG.modelId, appConfig);
        }
    } catch (err) {
        debugLog('refreshModelCache failed (treating as not cached):', err?.message);
        modelCachedFlag = false;
    }
    return modelCachedFlag;
}

// toModelRecord() throws when unconfigured; wrap it so the cache probe's
// appConfig assembly never throws on an unconfigured install.
function toModelRecordSafe() {
    try {
        // Imported from the barrel; only valid when configured.
        return toModelRecord();
    } catch {
        return null;
    }
}

/**
 * Single lifecycle state for the Local-model card. Synchronous (uses cached
 * readiness + cached cache-flag) so the card can re-render cheaply.
 * One of: unconfigured | unsupported | not-downloaded | downloading |
 *         ready-disabled | ready-enabled | error.
 */
function getBrowserModelState() {
    if (!isModelConfigured()) return 'unconfigured';
    // detectWebGpu is async; we use the cached readiness probe's gpu result. If
    // we haven't probed yet, fall back to a quick navigator.gpu presence check so
    // we don't wrongly show 'unsupported' before the first probe resolves.
    const gpuOk = lastReadiness?.gpu
        ? lastReadiness.gpu.ok
        : (typeof navigator !== 'undefined' && !!navigator.gpu);
    if (!gpuOk) return 'unsupported';

    const status = webllmTransport?.status?.();
    const state = status?.state;
    if (state === 'error') return 'error';
    if (state === 'loading') return 'downloading';

    const settings = getSettings();
    const enabled = !!settings.browserModel?.enabled;
    const cached = modelCachedFlag || state === 'ready';

    if (state === 'ready') {
        // Engine is loaded in VRAM right now.
        return enabled ? 'ready-enabled' : 'ready-disabled';
    }
    if (cached) {
        // Weights are on disk (Cache API) but the engine isn't loaded into VRAM
        // (fresh page load, or after Disable). Either way the next step is the
        // "Enable" button, which loads on demand — so it's ready-disabled.
        return 'ready-disabled';
    }
    return 'not-downloaded';
}

/** Cached readiness for the card's 3 rows (GPU/Disk/RAM) + Doctor. */
function getReadiness() {
    return lastReadiness || { gpu: {}, disk: {}, ram: {}, cpu: {} };
}

/** Model labels for the card (modelId / version / approx download size). */
function getModelInfo() {
    return {
        modelId: MODEL_CONFIG?.modelId || null,
        version: MODEL_CONFIG?.modelVersion || null,
        approxDownloadMB: MODEL_CONFIG?.approxDownloadMB || null,
    };
}

/** Run the four readiness probes once and cache them; refresh the card after. */
async function runReadinessProbe() {
    try {
        const needBytes = MODEL_CONFIG?.approxDownloadMB
            ? MODEL_CONFIG.approxDownloadMB * 1024 * 1024
            : undefined;
        lastReadiness = await probeReadiness(needBytes != null ? { needBytes } : {});
    } catch (err) {
        debugLog('probeReadiness failed:', err?.message);
        lastReadiness = { gpu: { ok: false, reason: err?.message }, disk: {}, ram: { known: false }, cpu: {} };
    }
    refreshBrowserCard();
    refreshNoModelBanner();
    return lastReadiness;
}

/**
 * Download (load) the browser model. Creates the transport if needed, loads the
 * weights (streams shards into the Cache API), then flips browserModel.enabled
 * on. Progress is forwarded to the card via onProgress({pct, text}).
 */
async function onDownloadModel(onProgress) {
    const transport = ensureWebllmTransport(onProgress);
    try {
        const loading = transport.load();   // state → 'loading' synchronously
        refreshBrowserCard();
        refreshNoModelBanner();             // flip the panel banner to "loading" now
        await loading;
        await refreshModelCache();
        getSettings().browserModel.enabled = true;
        saveSettingsDebounced();
    } catch (err) {
        console.warn(LOG, 'browser model download failed:', err?.message);
        refreshBrowserCard();
        refreshNoModelBanner();
        throw err;
    }
    refreshBrowserCard();
    refreshNoModelBanner();
}

/**
 * Enable the browser model: load if cached-but-unloaded (ready() loads on
 * demand), flip the flag on. Used when the model is already downloaded.
 */
async function onEnableBrowserModel() {
    const transport = ensureWebllmTransport();
    try {
        const loading = transport.ready();  // loads if needed; state → 'loading'
        refreshBrowserCard();
        refreshNoModelBanner();
        await loading;
        getSettings().browserModel.enabled = true;
        saveSettingsDebounced();
    } catch (err) {
        console.warn(LOG, 'browser model enable failed:', err?.message);
        refreshBrowserCard();
        refreshNoModelBanner();
        throw err;
    }
    refreshBrowserCard();
    refreshNoModelBanner();
}

/**
 * Disable the browser model: unload the engine (frees VRAM; weights stay cached
 * on disk for instant re-enable) and flip the flag off. The 'disabled' banner
 * variant is the calmer note, since this is a deliberate user choice.
 */
async function onDisableBrowserModel() {
    try {
        await webllmTransport?.unload?.();
    } catch (err) {
        debugLog('browser model unload error (continuing):', err?.message);
    }
    getSettings().browserModel.enabled = false;
    saveSettingsDebounced();
    refreshBrowserCard();
    refreshNoModelBanner();
}

/**
 * Wipe the WebLLM model cache (weights + GPU library + config) from the browser so
 * the NEXT enable is a true COLD download. Two uses: testing the clean first-load a
 * brand-new user actually gets (a warm dev cache hides cold-compile failures), and
 * recovering from a corrupt or stale cache after a model update. Unloads the engine
 * first so nothing holds the artifacts mid-delete, then re-probes so the card/banner
 * fall back to 'not-downloaded'. Returns true if something was actually cached+cleared.
 */
async function onWipeModelCache() {
    try { await onDisableBrowserModel(); } catch (err) { debugLog('wipe: unload failed (continuing):', err?.message); }
    let cleared = false;
    try {
        const webllm = await import('https://esm.run/@mlc-ai/web-llm@0.2.84');
        const appConfig = { model_list: [toModelRecordSafe()].filter(Boolean) };
        if (MODEL_CONFIG.modelId && typeof webllm.deleteModelAllInfoInCache === 'function') {
            await webllm.deleteModelAllInfoInCache(MODEL_CONFIG.modelId, appConfig);
            cleared = true;
        } else {
            debugLog('wipe: deleteModelAllInfoInCache unavailable, or no modelId configured');
        }
    } catch (err) {
        console.warn(LOG, 'wipe model cache failed:', err?.message);
        throw err;
    }
    try { await refreshModelCache(); } catch (err) { debugLog('wipe: cache re-probe failed:', err?.message); }
    refreshBrowserCard();
    refreshNoModelBanner();
    return cleared;
}

// ─── Model auto-update (version.json polling) ───────────────────────────────
// versioned model_id + a published version.json = one-click update without an
// extension release. modelId IS WebLLM's cache key, so a new id ⇒ clean download.
const GGUF_REPO_URL = 'https://huggingface.co/GetBeholder/Beholder-GGUF';
let updateAvailable = null;  // the newer published record when one exists

// Apply a previously-adopted update onto the live MODEL_CONFIG so the whole host
// (transport, cache key, card) uses the version the user updated to — not just the
// shipped default. Runs once at boot before anything reads model identity.
function applyAdoptedModel() {
    const a = getSettings()?.browserModel?.adopted;
    if (a && a.modelId && a.modelLib) {
        Object.assign(MODEL_CONFIG, {
            modelVersion: a.modelVersion ?? MODEL_CONFIG.modelVersion,
            modelId: a.modelId,
            modelUrl: a.modelUrl ?? MODEL_CONFIG.modelUrl,
            modelLib: a.modelLib,
            vramRequiredMB: a.vramRequiredMB ?? MODEL_CONFIG.vramRequiredMB,
            approxDownloadMB: a.approxDownloadMB ?? MODEL_CONFIG.approxDownloadMB,
        });
        debugLog('applied adopted model', a.modelVersion, a.modelId);
    }
}

// Poll the published version.json; if it advertises a DIFFERENT version (newer)
// with a usable record, stash it + fire the "new model available" dialog.
// Best-effort — never throws, never blocks the hot path.
async function checkForUpdate() {
    updateAvailable = null;
    const url = MODEL_CONFIG?.versionUrl;
    if (!url || !isModelConfigured()) return null;
    try {
        const resp = await fetch(url, { cache: 'no-store' });
        if (!resp.ok) return null;
        const v = await resp.json();
        if (v?.version && v?.modelId && v?.modelLib && v.version !== MODEL_CONFIG.modelVersion) {
            updateAvailable = v;
            showUpdateDialogFn({
                from: MODEL_CONFIG.modelVersion || null,
                to: v.version,
                ggufUrl: v.ggufUrl || GGUF_REPO_URL,
                notes: v.notes || '',
            });
        }
    } catch (err) {
        debugLog('checkForUpdate failed:', err?.message);
    }
    refreshBrowserCard();
    return updateAvailable;
}

// Adopt the available update: persist the new identity, mutate MODEL_CONFIG, drop
// the old transport, and re-download under the new modelId. Persisted, so it
// sticks across reloads.
async function applyUpdate(onProgress) {
    const v = updateAvailable;
    if (!v) return;
    const adopted = {
        modelVersion: v.version,
        modelId: v.modelId,
        modelUrl: v.modelUrl ?? MODEL_CONFIG.modelUrl,
        modelLib: v.modelLib,
        vramRequiredMB: v.vramRequiredMB ?? null,
        approxDownloadMB: v.approxDownloadMB ?? null,
    };
    const s = getSettings();
    s.browserModel = s.browserModel || {};
    s.browserModel.adopted = adopted;
    saveSettingsDebounced();
    Object.assign(MODEL_CONFIG, adopted);
    try { await webllmTransport?.unload?.(); } catch { /* ignore */ }
    webllmTransport = null;
    updateAvailable = null;
    await onDownloadModel(onProgress);  // downloads the new id + enables
}

// Snapshot for the card's persistent "update available" indicator (after the
// dialog is dismissed, the card still shows it + an Update button).
function getUpdateInfo() {
    return updateAvailable
        ? { available: true, from: MODEL_CONFIG?.modelVersion || null,
            to: updateAvailable.version, ggufUrl: updateAvailable.ggufUrl || GGUF_REPO_URL }
        : { available: false };
}

/**
 * Boot-time lazy re-load of the browser model for a RETURNING user.
 *
 * `browserModel.enabled` persists across reloads, but `webllmTransport` is a
 * runtime singleton rebuilt only on an explicit Download/Enable click — so after
 * any page reload it's null, getActiveTransport() resolves to nothing, and
 * extraction silently stops (no-model banner) until the user clicks Enable again.
 * This restores the "instant re-enable on reload" the transport promises: when the
 * model is configured + enabled, no custom endpoint overrides it, WebGPU is fine,
 * and the weights are already cached, kick a guarded fire-and-forget ready() so
 * the cached model streams back into VRAM and getActiveTransport() resolves to it.
 *
 * Fire-and-forget by design: if the GPU/cache load fails, the normal banner path
 * still surfaces it; we never block boot on it.
 */
function maybeAutoLoadBrowserModel() {
    try {
        const settings = getSettings();
        if (!isModelConfigured()) return;
        if (!settings.browserModel?.enabled) return;
        // A custom endpoint always wins (§9.4) — don't spin up VRAM for a model the
        // active transport wouldn't even use.
        if ((settings.endpoint || '').trim() !== '') return;
        // Only auto-load weights we already have on disk; a fresh multi-hundred-MB
        // download must stay an explicit user choice, never a silent boot fetch.
        if (!modelCachedFlag) return;
        // WebGPU must look available; load() hard-gates on it anyway, but skip the
        // import entirely when we already know it can't run here.
        const gpuOk = lastReadiness?.gpu
            ? lastReadiness.gpu.ok
            : (typeof navigator !== 'undefined' && !!navigator.gpu);
        if (!gpuOk) return;
        // Don't disturb an already-loading/ready transport.
        const st = webllmTransport?.status?.().state;
        if (st === 'ready' || st === 'loading') return;

        const transport = ensureWebllmTransport();
        const loading = transport.ready();   // state → 'loading' synchronously
        refreshBrowserCard();
        refreshNoModelBanner();              // show "loading" on boot auto-load
        Promise.resolve(loading)
            .then(() => { refreshBrowserCard(); refreshNoModelBanner(); })
            .catch(err => debugLog('boot browser-model auto-load skipped:', err?.message));
    } catch (err) {
        debugLog('maybeAutoLoadBrowserModel guard error (ignored):', err?.message);
    }
}

// ─── No-model banner driver ─────────────────────────────────────────────────
// When getActiveTransport() resolves to null, the UI shows a persistent banner.
// [host] decides the cause + copy + actions; [ui] renders it. Re-evaluated after
// every CHAT_CHANGED, settings change, and enable/disable.

let setNoModelBannerFn = () => {};
let refreshBrowserCardFn = () => {};
let showUpdateDialogFn = () => {};

// Custom-endpoint connectivity for the no-model banner. 'unknown' = optimistic
// (no banner — the hot path stays probe-free); 'down' = a probe (or a re-probe
// after a failed extraction) proved it unreachable → show the endpoint-unreachable
// banner instead of treating a merely-FILLED endpoint as "active".
let endpointConn = 'unknown';
function setEndpointConn(next) {
    if (endpointConn === next) return;
    endpointConn = next;
    refreshNoModelBanner();
}
// Keep that flag honest from real usage WITHOUT false positives: only act when the
// custom endpoint is the active transport. A success proves it's up; a failure may
// be a non-network error, so re-probe for a definitive verdict rather than blindly
// marking it down.
function noteEndpointExtraction(ok) {
    const t = getActiveTransport();
    if (!t || t === webllmTransport) return;
    if (ok) setEndpointConn('ok');
    else probeEndpoint().catch(() => {});
}
// A USABLE extractor exists when the browser model is the active transport, or a
// custom endpoint is active and not proven-down. Drives the no-model banner: with
// no usable extractor, tracking can't run, so the banner surfaces that state.
function hasUsableExtractor() {
    const t = getActiveTransport();
    if (!t) return false;
    if (t !== webllmTransport && endpointConn === 'down') return false;
    return true;
}

/** Re-render the Local-model card (UI hook bound at mount). */
function refreshBrowserCard() {
    try { refreshBrowserCardFn(); } catch { /* UI may not be mounted yet */ }
}

/**
 * Compute the banner state from the current settings + readiness and push it to
 * the UI. null hides it. Causes:
 *   never-setup          — no endpoint AND the browser model isn't usable yet
 *   endpoint-unreachable — (reserved) an override is set but failed a probe
 *   disabled             — the user deliberately turned the browser model off
 */
function refreshNoModelBanner() {
    // A usable extractor — a reachable endpoint, OR a loaded browser model (INCLUDING
    // as the fallback when a configured endpoint is proven down) — means tracking
    // works, so no banner. Use hasUsableExtractor, NOT getActiveTransport: a
    // set-but-dead endpoint hands back a transport that isn't actually usable.
    if (hasUsableExtractor()) { setNoModelBannerFn(null); return; }

    const settings = getSettings();
    const ep = (settings.endpoint || '').trim();
    // Endpoint set but nothing usable: it's proven down AND there's no browser model
    // to fall back to (else hasUsableExtractor above would have returned). The hot
    // path stays probe-free; endpointConn is set by explicit probes only.
    if (ep !== '') {
        setNoModelBannerFn(endpointConn === 'down' ? { cause: 'endpoint-unreachable' } : null);
        return;
    }

    // Browser-model path (no endpoint set, nothing usable yet).
    const enabledFlag = !!settings.browserModel?.enabled;
    const bmState = getBrowserModelState();

    // Downloading / loading into VRAM → it's BECOMING active. Say "loading", not
    // "no extractor — set an endpoint".
    if (bmState === 'downloading') {
        setNoModelBannerFn({ cause: 'loading' });
        return;
    }

    // The in-browser model is permanently shelved in the Marinara build, so the only
    // extractors are an endpoint (a local server) or a Marinara connection — keep the
    // banner focused on that instead of nudging toward a browser model that can't run.
    const cause = 'never-setup';
    const copy = "No extractor configured — Beholder isn't tracking. Point it at a local endpoint (recommended) or a Marinara connection in Settings.";
    const actions = [{ id: 'endpoint', label: 'Open Settings' }];

    setNoModelBannerFn({ cause, copy, actions });
}

/**
 * Route a banner action button to the right handler. 'enable' downloads or
 * enables the browser model by current state; 'endpoint' opens Settings on the
 * Advanced custom-endpoint section.
 */
function onBannerAction(id) {
    // Both actions route through the Settings view (deep-linked) so the user LANDS
    // on the thing they need — the Local-model card (download is VISIBLE there,
    // with progress) or the Advanced endpoint field (unfolded + focused). No more
    // silent background downloads.
    const opts = id === 'enable'
        ? { focus: 'model', startDownload: getBrowserModelState() === 'not-downloaded' }
        : { focus: 'endpoint' };
    try {
        if (typeof openSettingsView === 'function' && openSettingsView !== NOOP) {
            openSettingsView(opts);
        } else {
            // Fallback: open Settings via the header button (no deep-link focus).
            const $btn = $('#beholder_panel .beholder-tool-btn[data-view="settings"]');
            if ($btn.length) $btn.trigger('click');
        }
    } catch (err) {
        debugLog('banner action (open settings) failed:', err?.message);
    }
}

const NOOP = () => {};
// Bound at mount from the panel API so onBannerAction can open Settings. Stays
// the NOOP sentinel when the UI doesn't expose an openSettings hook, in which
// case onBannerAction falls back to clicking the Settings header button.
let openSettingsView = NOOP;

// Forward declarations bound by mountPanel options below.
let setPanelBackfillProgress = () => {};
let clearPanelBackfillStatus = () => {};

// ─── Inline per-message delta badges ───────────────────────────────────────
// Annotates each AI message with chips showing what the extractor saw
// change in that turn. Critical for testers: it's the "wow it's actually
// working" moment, and a debugging surface for the model itself.

function summarizeDelta(delta) {
    const items = [];
    if (!delta || typeof delta !== 'object') return items;

    const fmtWorn = (w) => {
        if (!w || typeof w !== 'object') return String(w ?? '?');
        const bits = [w.item || '?'];
        if (w.color) bits.push(w.color);
        if (w.damage) bits.push(w.damage);
        return bits.join(' · ');
    };
    const fmtHolding = (h) => {
        if (typeof h === 'string') return h;
        if (!h || typeof h !== 'object') return '?';
        const bits = [h.item || '?'];
        if (h.color) bits.push(h.color);
        if (h.damage) bits.push(h.damage);
        return bits.join(' · ');
    };
    const fmtWound = (w) => {
        if (typeof w === 'string') return w;          // legacy v0.2 string wound
        if (!w || typeof w !== 'object') return '?';
        const sev = w.severity ? `[${w.severity}]` : '';
        const bleed = w.bleeding ? ' ✚' : '';
        return `${w.text || '?'}${sev ? ' ' + sev : ''}${bleed}`;
    };
    const isHoldingClear = (h) => h === '' || h === null
        || (h && typeof h === 'object' && !Array.isArray(h) && Object.keys(h).length === 0);

    for (const [char, cd] of Object.entries(delta)) {
        if (!cd || typeof cd !== 'object') continue;
        const body = cd.body || {};
        for (const [slot, sd] of Object.entries(body)) {
            if (!sd) continue;
            if (Array.isArray(sd.worn)) {
                if (sd.worn.length === 0) {
                    items.push({ char, kind: 'clear', text: `cleared worn (${slot})` });
                } else {
                    for (const w of sd.worn) {
                        items.push({ char, kind: 'add', text: `+ ${fmtWorn(w)} (${slot})` });
                    }
                }
            }
            if ('holding' in sd) {
                if (isHoldingClear(sd.holding)) {
                    items.push({ char, kind: 'clear', text: `dropped (${slot})` });
                } else {
                    items.push({ char, kind: 'hold', text: `✦ ${fmtHolding(sd.holding)} (${slot})` });
                }
            }
            if (Array.isArray(sd.wounds)) {
                if (sd.wounds.length === 0) {
                    items.push({ char, kind: 'heal', text: `healed (${slot})` });
                } else {
                    for (const w of sd.wounds) {
                        items.push({ char, kind: 'wound', text: `wound: ${fmtWound(w)} (${slot})` });
                    }
                }
            }
            if ('bare' in sd) {
                items.push({
                    char,
                    kind: sd.bare ? 'mod' : 'clear',
                    text: sd.bare ? `bare (${slot})` : `covered (${slot})`,
                });
            }
            if ('missing' in sd) {
                items.push({
                    char,
                    kind: sd.missing ? 'mod' : 'clear',
                    text: sd.missing ? `missing (${slot})` : `restored (${slot})`,
                });
            }
        }
        if ('species' in cd) items.push({ char, kind: 'mod', text: `species: ${cd.species}` });
    }
    return items;
}

function escapeBadge(s) {
    return String(s).replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function renderBadgesForMessage(messageId, delta) {
    const $msg = $(`#chat .mes[mesid="${messageId}"]`);
    if (!$msg.length) return;
    $msg.find('.beholder-msg-badges').remove();
    const items = summarizeDelta(delta);
    if (!items.length) {
        // Emit a tiny "no change" hint so testers can see the extractor DID
        // run on this turn — silence would look like a missed extraction.
        const $empty = $('<div class="beholder-msg-badges beholder-msg-noop">no state change</div>');
        $msg.find('.mes_text').first().after($empty);
        return;
    }
    const $badges = $('<div class="beholder-msg-badges"></div>');
    // Group by char
    const byChar = {};
    for (const it of items) (byChar[it.char] = byChar[it.char] || []).push(it);
    for (const [char, list] of Object.entries(byChar)) {
        const charLabel = `<span class="bh-msg-char">${escapeBadge(char)}</span>`;
        for (const it of list) {
            $badges.append(`<span class="bh-msg-badge bh-msg-${it.kind}">${charLabel}<span class="bh-msg-text">${escapeBadge(it.text)}</span></span>`);
        }
    }
    $msg.find('.mes_text').first().after($badges);
}

function renderBadgesForAllMessages() {
    const cs = getChatState();
    if (!cs.deltasByMsg) return;
    for (const [msgId, delta] of Object.entries(cs.deltasByMsg)) {
        renderBadgesForMessage(msgId, delta);
    }
}

// ─── Lifecycle ─────────────────────────────────────────────────────────────

function onMessageReceived(messageId) {
    if (suspendLiveProcessing) {
        // Backfill is walking the chat; live MESSAGE_RECEIVED would race the
        // sequential walker and break ordering. The backfill loop covers
        // everything up to ctx.chat.length at the moment it ran, including
        // this new message (which will be in chat[] by the time we get here).
        return;
    }
    const ctx = getContext();
    const chat = ctx.chat;
    if (!chat || messageId == null || messageId >= chat.length) return;
    const message = chat[messageId];
    // Only process AI messages — Beholder is tracking what the AI says about state.
    if (!message || message.is_user) return;
    const personaName = ctx.name1 || null; // SillyTavern stores user persona in name1
    processMessage(message.mes || '', personaName, messageId).then(
        () => noteEndpointExtraction(true),
        (err) => { console.warn(LOG, 'processMessage error:', err); noteEndpointExtraction(false); },
    );
}

function onMessageSent(messageId) {
    // The user's OWN turn. Beholder must scan these too: the {{user}} persona's
    // physical state ("I pull on my coat") is frequently established here and never
    // restated by the AI. The extractor maps first-person "I" → the persona when
    // it's told `Persona: <name>` (verified), so passing personaName is all it takes
    // — the engine renames the resulting `self` delta to the persona.
    if (suspendLiveProcessing) return;
    const ctx = getContext();
    const chat = ctx.chat;
    if (!chat) return;
    // MESSAGE_SENT hands us the new message's chat index; fall back to the last
    // entry if the arg is ever missing so a user turn is never silently skipped.
    let idx = messageId;
    if (idx == null || idx >= chat.length) idx = chat.length - 1;
    const message = chat[idx];
    if (!message || !message.is_user) return;   // user turns only; AI is MESSAGE_RECEIVED
    const personaName = ctx.name1 || null;
    processMessage(message.mes || '', personaName, idx).then(
        () => noteEndpointExtraction(true),
        (err) => { console.warn(LOG, 'processMessage (user) error:', err); noteEndpointExtraction(false); },
    );
}

function onChatChanged() {
    // New chat loaded; re-emit the injected state so the new generation sees it.
    const state = getChatState().state;
    injectStateIntoPrompt(state);
    renderPanel(state);
    // Re-attach badges to any messages we've already processed in this chat.
    // SillyTavern re-renders chat DOM on chat change; our badges live in chat
    // metadata and get re-applied here.
    setTimeout(renderBadgesForAllMessages, 100);
    // Re-evaluate the no-model banner for the new chat context.
    refreshNoModelBanner();
    // Seed the running state from the character + persona cards — once per chat.
    // Establishes baseline appearance (MacLaren's eyepatch, coat, boots, …) from
    // the cards BEFORE live messages start updating it, so extraction isn't built
    // from message prose alone. Idempotent (guards on SEED_KEY) and self-applies +
    // re-renders; no-ops when disabled / no model / already seeded / no card text.
    // Deferred so the new chat's character context is fully loaded before it reads.
    setTimeout(() => {
        seedFromCards({ force: false })
            .then((r) => { if (r?.seeded) debugLog('auto-seeded state from cards on chat load', r.delta); })
            .catch((err) => console.warn(LOG, 'auto-seed on chat load failed (non-fatal):', err?.message));
    }, 400);
    debugLog('chat changed, re-injected state + badges');
}

// Reconstruct the running state AS IT WAS BEFORE `messageId`, by replaying the seed +
// every EARLIER message delta from empty (pure applyDelta — no model calls, ms even on
// a long chat). The merge is destructive so a single delta can't be subtracted; this
// is how a swipe un-applies the generation it swiped away.
function recomputeStateBefore(messageId) {
    const cs = getChatState();
    const dbm = cs.deltasByMsg || {};
    const mid = Number(messageId);
    let state = {};
    if (dbm[SEED_KEY] != null) state = applyDelta(state, dbm[SEED_KEY]);
    const priorIds = Object.keys(dbm)
        .filter((k) => k !== SEED_KEY)
        .map(Number)
        .filter((n) => Number.isInteger(n) && n < mid)
        .sort((a, b) => a - b);
    for (const id of priorIds) state = applyDelta(state, dbm[id]);
    return state;
}

// graftUserEdits (carry manual edits across a replay, incl. emptied-slot
// tombstones) is a pure helper in state.js — imported above.

function onMessageSwiped(messageId) {
    // A swipe picks a DIFFERENT generation for this message. Its old delta was merged
    // destructively into the running state, so deleting the delta record alone leaves
    // the swiped-away generation's clothing/wounds behind as phantoms. Instead: drop
    // the record, REPLAY the pre-message base (preserving manual edits), and re-extract
    // the new text against that clean base.
    const cs = getChatState();
    if (cs.deltasByMsg) delete cs.deltasByMsg[messageId];
    $(`#chat .mes[mesid="${messageId}"] .beholder-msg-badges`).remove();
    // Re-process if it's an AI message
    const ctx = getContext();
    const chat = ctx.chat;
    if (!chat || messageId == null || messageId >= chat.length) return;
    const message = chat[messageId];
    if (!message || message.is_user) return;
    const personaName = ctx.name1 || null;
    // Roll the state back to just before this message (un-applies the old generation),
    // keeping the user's hand-edits, then let processMessage extract the new text
    // against it. The engine reads prevState from host.loadState() = this state.
    const base = graftUserEdits(recomputeStateBefore(messageId), cs.state, getUserEdited());
    setChatState(base);
    injectStateIntoPrompt(base);
    renderPanel(base);
    processMessage(message.mes || '', personaName, messageId).then(
        () => noteEndpointExtraction(true),
        (err) => { console.warn(LOG, 'processMessage (swipe) error:', err); noteEndpointExtraction(false); },
    );
}

function onMessageDeleted(newChatLength) {
    // ST emits MESSAGE_DELETED with the NEW chat.length (verified in script.js: ALL four
    // delete paths pass chat.length, NOT the deleted index). The common deletions are
    // SUFFIX truncations — delete-last, delete-from-here (bulk), and generation cleanup —
    // so every surviving message keeps its index and only the tail is gone. Resync:
    //   1. drop delta keys at/after the new length (the removed tail), then
    //   2. REPLAY the survivors — deleting a delta key never un-merges its effect, so
    //      without this the deleted message's clothing/wounds linger as phantoms.
    // (A single MID-chat deleteMessage(id) also only emits chat.length, so its exact
    //  index is unrecoverable from the event; that rarer case may leave the map off by
    //  one until a Rebuild — the suffix cases, which dominate, are exact.)
    const cs = getChatState();
    const len = Number(newChatLength);
    if (!cs.deltasByMsg || !Number.isInteger(len)) return;
    for (const k of Object.keys(cs.deltasByMsg)) {
        if (k === SEED_KEY) continue;
        const n = Number(k);
        if (Number.isInteger(n) && n >= len) delete cs.deltasByMsg[k];
    }
    // Recompute the running state from the seed + surviving deltas (pure applyDelta, no
    // model calls), preserving manual editor edits — same machinery as the swipe path.
    const state = graftUserEdits(recomputeStateBefore(Infinity), cs.state, getUserEdited());
    setChatState(state);
    saveMetadataDebounced();
    injectStateIntoPrompt(state);
    renderPanel(state);
    setTimeout(renderBadgesForAllMessages, 50);
}

async function onMessageEdited(messageId) {
    // A text edit changes a message's content but NOT its index (verified in ST's
    // script.js: MESSAGE_EDITED/MESSAGE_UPDATED both pass the message index, after
    // chat[id].mes is updated). The old delta was extracted from the OLD text and is
    // stale. Re-derive it: roll back to the pre-message base (replay seed + earlier
    // deltas, keep manual edits), re-extract the NEW text against it, then re-apply any
    // LATER messages' deltas unchanged so a MID-chat edit doesn't drop everything after
    // it. (Later deltas are replayed as-is — the same approximation as a mid-chat delete;
    // a Rebuild re-extracts them exactly if a later delta truly depended on the old text.)
    const cs = getChatState();
    const ctx = getContext();
    const chat = ctx.chat;
    const mid = Number(messageId);
    if (!chat || !Number.isInteger(mid) || mid < 0 || mid >= chat.length) return;
    const message = chat[mid];
    if (!message) return;
    if (cs.deltasByMsg) delete cs.deltasByMsg[mid];
    $(`#chat .mes[mesid="${mid}"] .beholder-msg-badges`).remove();
    const personaName = ctx.name1 || null;
    // Roll back to before the edited message, then let processMessage extract the new
    // text against it (engine reads prevState from host.loadState() = this state).
    const base = graftUserEdits(recomputeStateBefore(mid), cs.state, getUserEdited());
    setChatState(base);
    try {
        await processMessage(message.mes || '', personaName, mid);
        noteEndpointExtraction(true);
    } catch (err) {
        console.warn(LOG, 'processMessage (edit) error:', err);
        noteEndpointExtraction(false);
    }
    // Re-apply the (unchanged) deltas for messages AFTER the edited one, on top.
    const dbm = getChatState().deltasByMsg || {};
    const laterIds = Object.keys(dbm)
        .filter((k) => k !== SEED_KEY)
        .map(Number)
        .filter((n) => Number.isInteger(n) && n > mid)
        .sort((a, b) => a - b);
    if (laterIds.length) {
        let state = getChatState().state;
        for (const id of laterIds) state = applyDelta(state, dbm[id]);
        setChatState(state);
    }
    const finalState = getChatState().state;
    injectStateIntoPrompt(finalState);
    renderPanel(finalState);
    setTimeout(renderBadgesForAllMessages, 50);
}

function onGenerationStarted() {
    // Defensive: re-inject right before generation in case another extension cleared it.
    injectStateIntoPrompt(getChatState().state);
}

// ─── Settings UI ───────────────────────────────────────────────────────────

async function loadSettingsHtml() {
    const moduleDir = new URL(import.meta.url).pathname;
    const settingsPath = moduleDir.substring(0, moduleDir.lastIndexOf('/')) + '/settings.html';
    try {
        const response = await $.get(settingsPath);
        $('#extensions_settings2').append(response);
    } catch (err) {
        console.warn(LOG, 'failed to load settings.html', err);
    }
}

function bindSettingsUi() {
    const s = getSettings();

    // The drawer is intentionally minimal: just Enabled + Show-panel. Every other
    // setting (connection, display, extraction, privacy/debug, clear/log state)
    // lives in the floating panel's ⚙ Settings view (views.js buildSettingsView).
    $('#beholder_enabled').prop('checked', !!s.enabled);
    $('#beholder_enabled').on('input change', function () {
        getSettings().enabled = this.checked;
        saveSettingsDebounced();
    });

    // Show-panel checkbox: updates panel.visible + toggles visibility, so a closed
    // panel can be reopened from the drawer.
    $('#beholder_show_panel').prop('checked', s.panel?.visible !== false);
    $('#beholder_show_panel').on('change', function () {
        const v = this.checked;
        const cfg = getSettings();
        cfg.panel = cfg.panel || {};
        cfg.panel.visible = v;
        saveSettingsDebounced();
        setPanelVisible(v);
    });
}

// ─── Note box mount (best-effort, runtime-only DOM) ─────────────────────────
// Builds a small free-text directive bar and hands its input + button to
// views.js wireNoteBox(), whose onDirective routes to applyNoteBoxDirective().
// The bar is placed just above SillyTavern's send form when that anchor is
// present. UNTESTED against a live SillyTavern — the chat-input DOM is
// runtime-only and version-dependent; if the anchor is missing this no-ops.
function mountNoteBox() {
    if (document.querySelector('.beholder-notebox')) return; // already mounted
    // Candidate anchors for the ST chat input, newest layout first. If none
    // resolve we bail (the directive logic stays callable for future wiring).
    const anchor = document.querySelector('#send_form')
        || document.querySelector('#nonQRFormItems')
        || document.querySelector('#form_sheld')
        || document.querySelector('.mari-roleplay-input-column')
        || document.querySelector('.mari-chat-input');
    if (!anchor) {
        debugLog('note box: no chat-input anchor found — skipping mount (untested path)');
        return;
    }
    const wrap = document.createElement('div');
    wrap.className = 'beholder-notebox';
    wrap.innerHTML = `
        <input type="text" class="beholder-notebox-input text_pole"
               placeholder='Beholder: set state now — e.g. "set my sword to broken"' />
        <button type="button" class="beholder-notebox-btn menu_button" title="Apply now">
            <i class="fa-solid fa-paper-plane"></i>
        </button>`;
    anchor.parentNode.insertBefore(wrap, anchor);

    const input = wrap.querySelector('.beholder-notebox-input');
    const button = wrap.querySelector('.beholder-notebox-btn');
    wireNoteBox({
        input,
        button,
        onDirective: (text) => {
            applyNoteBoxDirective(text).catch(err => {
                console.warn(LOG, 'note-box directive failed:', err?.message);
            });
        },
    });
    debugLog('note box mounted above chat input (untested against live ST)');
}
// Marinara port: expose the mounter so the shim can (re)mount it above ME's composer
// when the roleplay view renders (React can wipe it; re-mount is idempotent).
if (typeof window !== 'undefined') window.__beholderMountNoteBox = mountNoteBox;

// ─── Boot ──────────────────────────────────────────────────────────────────

jQuery(async () => {
    getSettings();
    // Apply the persisted extraction-concurrency cap to the extractor's semaphore
    // (default 1 — single-slot local endpoints; raised only for vLLM/multi-slot).
    setExtractConcurrency(getSettings().concurrency);
    // ST settings-drawer boot removed for Marinara — the panel's own Settings view
    // is the UI, and #beholder_settings (ST's extension drawer) doesn't exist here.
    // Mount the floating panel — settings are mutated in-place, persisted via
    // saveSettingsDebounced. Closing the panel from its X also unchecks the
    // drawer's "Show floating panel" box.
    const panelApi = mountPanel({
        settings: getSettings(),
        save: () => saveSettingsDebounced(),
        onClose: () => $('#beholder_show_panel').prop('checked', false),
        onBackfillRun: (mode) => runBackfillFromUi(mode),
        // ── Panel-view bindings (Settings / Doctor / Inspector / editor) ──
        // panel.js forwards these into views.js installViews() so the views
        // read real settings, the real capture buffer, and probe the real
        // endpoint instead of placeholder data.
        getState: () => getChatState().state,
        // The exact block injected into the RP model each turn (what the model actually sees),
        // so the Inspector can show it. Same serializer injectStateIntoPrompt uses.
        getInjectedText: () => serializeStateForPrompt(getChatState().state),
        getCapture,
        getSettings,
        saveSettings: (patch) => {
            Object.assign(getSettings(), patch || {});
            saveSettingsDebounced();
            // A settings change (most importantly the Advanced custom-endpoint
            // field) can flip the active transport, so re-evaluate the banner +
            // card. Cheap + idempotent.
            setExtractConcurrency(getSettings().concurrency);
            refreshNoModelBanner();
            refreshBrowserCard();
        },
        probeEndpoint,
        getDoctorVitals,
        clearChatState: () => {
            setChatState({});
            clearAllMessageDeltas();
            getChatState().capture = [];
            injectStateIntoPrompt({});
            renderPanel({});
            $('#chat .beholder-msg-badges').remove();
        },
        // H2 — one-shot sweep: run the validator over the ALREADY-PERSISTED state and
        // strip impossible phantoms (eyepatch-on-hand, concussion-on-back, "pureblood"
        // species) minted before the seed/live validator shipped. Never touches a
        // user-locked slot. Returns { changed, removed, findings } for the Doctor to show.
        sweepChatState: () => {
            const cs = getChatState();
            const locks = getLocks();
            const { cleaned, findings, removed, changed } = sweepState(cs.state || {}, {
                persona: getContext()?.name1 || null,
                isSlotLocked: (char, slot) => isSlotLocked(locks, char, slot),
            });
            if (changed) {
                setChatState(cleaned);
                saveMetadataDebounced();
                injectStateIntoPrompt(cleaned);
                renderPanel(cleaned);
            }
            console.log(LOG, 'sweepChatState:', { changed, removed: removed.length, findings: findings.length });
            return { changed, removed: removed.length, findings };
        },
        // ── Lock + user-edit persistence (canonical store lives here) ──
        getLocks,
        setLock,
        getUserEdited,
        markUserEdited,
        applyUserEdit: applyUserSlotEdit,
        // ── Character manager (aliases / hide / reorder) ──
        getCharacters: getCharacterManagerData,
        addAlias,
        removeAlias,
        setCharHidden,
        setCharOrder,
        // ── Browser-model (Local-model card) callbacks ──
        // [host] owns all transport/engine state; the card is a pure consumer
        // that renders getBrowserModelState() and calls these handlers. The
        // transport is NEVER touched directly by the UI.
        getBrowserModelState,
        getReadiness,
        isModelConfigured,
        getModelInfo,
        onDownloadModel,
        onEnableBrowserModel,
        onDisableBrowserModel,
        onWipeModelCache,
        refreshBrowserCard: () => refreshBrowserCard(),
        // Model auto-update: the card + dialog read getUpdateInfo() / call these.
        getUpdateInfo,
        onCheckUpdate: () => checkForUpdate(),
        onUpdateModel: (onProgress) => applyUpdate(onProgress),
        // No-model banner: the UI renders it, [host] drives cause/copy/actions.
        onBannerAction,
    });
    // Bind the forward-declared bridges to the panel's UI helpers.
    setPanelBackfillProgress = panelApi?.setBackfillProgress || (() => {});
    clearPanelBackfillStatus = panelApi?.clearBackfillStatus || (() => {});
    // Banner + card-refresh hooks (UI side). The panel API exposes these so
    // [host] can push banner state + re-render the card after async events.
    setNoModelBannerFn = panelApi?.setNoModelBanner || (() => {});
    refreshBrowserCardFn = panelApi?.refreshBrowserCard || (() => {});
    showUpdateDialogFn = panelApi?.showUpdateDialog || (() => {});
    // Sentinel NOOP (not a fresh closure) so onBannerAction can detect "no UI
    // openSettings hook" and fall back to clicking the Settings header button.
    openSettingsView = panelApi?.openSettings || NOOP;
    // Apply any previously-adopted auto-update onto MODEL_CONFIG before anything
    // reads model identity (cache check + auto-load below).
    applyAdoptedModel();
    renderPanel(getChatState().state);
    // Probe device readiness once at boot (GPU/disk/RAM/CPU) so the Local-model
    // card + Doctor vitals have real data, and evaluate the no-model banner.
    runReadinessProbe().catch(err => debugLog('boot readiness probe failed:', err?.message));
    refreshModelCache().then(() => {
        refreshBrowserCard();
        refreshNoModelBanner();
        // Returning user with the browser model enabled + already cached: lazily
        // re-load it into VRAM so extraction works on reload without a manual
        // Enable click. Guarded + fire-and-forget (see maybeAutoLoadBrowserModel).
        maybeAutoLoadBrowserModel();
        // Poll version.json; fires the "new model available" dialog if one's up.
        checkForUpdate().catch(() => {});
    }).catch(err => debugLog('boot model-cache probe failed:', err?.message));
    refreshNoModelBanner();
    // If a custom endpoint was configured in a PRIOR session, probe it once at boot
    // so a now-dead endpoint surfaces the unreachable banner instead of looking
    // active just because the field is filled. probeEndpoint() sets endpointConn.
    if ((getSettings().endpoint || '').trim() !== '') {
        probeEndpoint().catch(err => debugLog('boot endpoint probe failed:', err?.message));
    }
    // Best-effort note box: a free-text pre-turn directive bar. We try to mount
    // it adjacent to SillyTavern's chat input so the user can state an intent
    // ("set my sword to broken") right where they type. The exact ST chat-input
    // DOM is runtime-only and varies across ST versions, so this hook is
    // UNTESTED against a live ST — if the anchor isn't found it no-ops silently
    // and the directive logic (applyNoteBoxDirective) is still reachable for any
    // future caller. If the anchor IS found, the directive runs through the
    // extractor and applies as a user delta before the next generation.
    try {
        mountNoteBox();
    } catch (err) {
        debugLog('note box mount skipped:', err?.message);
    }
    eventSource.on(event_types.MESSAGE_RECEIVED, onMessageReceived);
    // The user's own turns matter as much as the AI's — the persona's state is
    // often set only there. Guarded in case an older ST build lacks the event.
    if (event_types.MESSAGE_SENT) eventSource.on(event_types.MESSAGE_SENT, onMessageSent);
    eventSource.on(event_types.CHAT_CHANGED, onChatChanged);
    eventSource.on(event_types.GENERATION_STARTED, onGenerationStarted);
    // Optional events — SillyTavern emits these; if unavailable in older ST
    // versions they just no-op silently.
    if (event_types.MESSAGE_SWIPED) eventSource.on(event_types.MESSAGE_SWIPED, onMessageSwiped);
    if (event_types.MESSAGE_DELETED) eventSource.on(event_types.MESSAGE_DELETED, onMessageDeleted);
    // MESSAGE_UPDATED fires (with the message index) after a text edit is saved — it
    // covers both edit paths and fires once each; re-extract the edited message.
    if (event_types.MESSAGE_UPDATED) eventSource.on(event_types.MESSAGE_UPDATED, onMessageEdited);
    // Re-attach badges on first load (in case messages were already in the DOM)
    setTimeout(renderBadgesForAllMessages, 500);
    console.log(LOG, 'loaded (normalizer + extractor + state-merge + injection + UI + panel + msg badges wired).');
});

// Exposed for unit tests / reuse.
export { normalize, applyDelta, renameChar };
// `seedFromCards` is also exported at its declaration for direct import.
