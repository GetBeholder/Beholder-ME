// Beholder extractor client — calls the local state-extractor model
// (vLLM / llama.cpp / any OpenAI-compatible chat endpoint) and parses
// its response into a state delta.
//
// The model is trained on the v2 contract: `{"changed": bool, "delta": <obj>}`.
// We auto-detect v1 (raw `{}` / `{<state>}`) and v2 (wrapped) outputs for
// forward/backward compatibility — see state.js unwrapV2().

import { unwrapV2 } from './state.js';
import { SHORT_PASS_PROMPTS, LANE_ORDER } from './short_pass_prompts.js';

/**
 * The SHORT v2 system prompt — body + schema only, without the longer
 * inference-discipline / rubric block. This is the prompt the Beholder extractor
 * model was trained and evaluated on, so it MUST be the prompt sent to that model
 * (the training and inference prompts have to match). Keep this string in sync
 * with the trained model's prompt; do not hand-edit it piecemeal.
 */
// 2026-06-23: now the ~427-tok MIN prompt (the v5 'MIN' model trained on it). ~4x less to
// re-prefill in WebLLM than the old ~1800-tok build, and matches the deployed weights.
export const EXTRACTION_SYSTEM_V2_SHORT = `You track character physical state in roleplay. Given the prior state (if any) and the new message, output
ONLY a JSON delta of what CHANGED — clothing put on / removed / damaged, new wounds, items held, limbs lost.
Emit nothing for unchanged state. No change -> {"changed": false}.

Shape (emit only the fields the prose shows):
{"changed": true, "delta": {"<Name>": {"body": {"<slot>": {
  "worn":   [{"item": "...", "color": "...", "material": "...", "damage": "pristine|damaged|broken"}],
  "wounds": [{"text": "...", "severity": "minor|serious|critical", "bleeding": true|false}],
  "holding":{"item": "..."},
  "missing": true, "bare": true }}}}}

slots: head face neck chest back waist {left,right}_{shoulder,arm,hand,leg,foot,eye,ear} mouth tail
       hind_{left,right}_{leg,foot}
A garment goes on EVERY slot it physically covers (a coat -> chest, back, both shoulders, both arms).

Example -- message: "She tugs her grey wool coat tighter and grips the lantern."
{"changed": true, "delta": {"Mara": {"body": {
  "chest":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "back":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "left_shoulder":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "right_shoulder":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "left_arm":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "right_arm":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "right_hand":{"holding":{"item":"lantern"}}}}}}

Example -- message: "He just nods, saying nothing."
{"changed": false}`;

/**
 * Build the user message for the extractor.
 *
 * Format mirrors the server-side extractor's training/eval input layout:
 *   [Persona: <name>\n]
 *   [Current state:\n<json>\n\n]
 *   Narration:\n<canonical text>
 *
 * @param {string} canonical - the narration AFTER passing through normalize()
 * @param {object} prevState - per-character state-before, e.g. {"self": {...}}
 * @param {string|null} personaName - the persona display name (or null for first-person)
 * @returns {string} user message
 */
export function buildUserMessage(canonical, prevState, personaName = null) {
    const parts = [];
    if (personaName) parts.push(`Persona: ${personaName}`);
    if (prevState && Object.keys(prevState).length > 0) {
        parts.push(`Current state:\n${JSON.stringify(prevState)}\n`);
    }
    parts.push(`Narration:\n${canonical}`);
    return parts.join('\n');
}

/**
 * Find the first balanced JSON object in `text` and return its parsed value.
 * Strips markdown code fences (```json ... ```) before parsing. Returns `null`
 * if no valid JSON object is found. Mirrors the server-side JSON extraction.
 */
export function extractJson(text) {
    let s = (text || '').trim();
    if (s.startsWith('```')) {
        s = s.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '').trim();
    }
    const start = s.indexOf('{');
    if (start < 0) return null;

    // Scan for the first balanced object, tracking a bracket stack and skipping
    // string contents (so a `{` or `}` inside a value never miscounts).
    const stack = [];
    let inStr = false, esc = false;
    for (let i = start; i < s.length; i++) {
        const c = s[i];
        if (inStr) {
            if (esc) esc = false;
            else if (c === '\\') esc = true;
            else if (c === '"') inStr = false;
            continue;
        }
        if (c === '"') { inStr = true; continue; }
        if (c === '{' || c === '[') stack.push(c);
        else if (c === '}' || c === ']') {
            stack.pop();
            if (stack.length === 0) {
                try { return JSON.parse(s.slice(start, i + 1)); }
                catch { return null; }
            }
        }
    }

    // End-of-input with brackets still open: a TRUNCATED object. Local extractor
    // models (e.g. Beholder-Q8_0) routinely drop the final `}`/`]`, which would
    // otherwise silently discard a perfectly good delta. Repair by closing the
    // open brackets in reverse order (and dropping any dangling comma) and parse.
    if (stack.length > 0) {
        let repaired = s.slice(start).replace(/,\s*$/, '');
        for (let j = stack.length - 1; j >= 0; j--) {
            repaired += stack[j] === '{' ? '}' : ']';
        }
        try { return JSON.parse(repaired); }
        catch { return null; }
    }
    return null;
}

/**
 * POST to an OpenAI-compatible /chat/completions endpoint. Returns the
 * assistant's content string (or throws on network/HTTP error).
 *
 * Defaults are tuned for state extraction: temperature 0 (deterministic),
 * max_tokens 512 (enough for a full state JSON).
 *
 * @param {object} cfg
 * @param {string} cfg.endpoint - base URL ending in /v1
 * @param {string} cfg.model
 * @param {string} cfg.system
 * @param {string} cfg.user
 * @param {string} [cfg.apiKey]
 * @param {number} [cfg.temperature=0]
 * @param {number} [cfg.maxTokens=512]
 * @param {AbortSignal} [cfg.signal]
 * @param {number} [cfg.maxRetries=4] transient-busy retries (503/429/502/504 + network)
 */
// Abort-aware backoff: 300ms, 600ms, 1.2s, 2s (capped) + jitter, so a burst of
// concurrent extraction calls that a single-slot local server (KoboldCpp/llama.cpp)
// rejects with "server busy" don't all retry in lockstep.
function _sleepBackoff(attempt, signal) {
    const base = Math.min(300 * (2 ** attempt), 2000);
    const delay = base + Math.random() * 200;
    return new Promise((resolve, reject) => {
        const t = setTimeout(resolve, delay);
        if (signal) {
            if (signal.aborted) { clearTimeout(t); reject(new DOMException('Aborted', 'AbortError')); return; }
            signal.addEventListener('abort', () => {
                clearTimeout(t);
                reject(new DOMException('Aborted', 'AbortError'));
            }, { once: true });
        }
    });
}

// Statuses a single-slot local server returns when it's momentarily overloaded (the
// 5 lanes + a concurrent card seed all arrive at once). These are RETRYABLE — the
// request is fine, the server is just busy. A 4xx other than 429 is a real error.
const _TRANSIENT_STATUS = new Set([429, 502, 503, 504]);

// Global concurrency cap on extraction requests. DEFAULT 1 — a local endpoint
// (KoboldCpp/llama.cpp) processes one request at a time, so client-side parallelism
// buys NOTHING there (the server serialises anyway) and only risks a 503 when its
// queue overflows (a card seed = 2 cards × 5 lanes, or a seed colliding with a message).
// Requests past the cap queue CLIENT-side and run as slots free. Raise it via
// setExtractConcurrency() ONLY for endpoints that truly parallelise (vLLM, multi-slot).
let _maxConcurrency = 1;
let _inflight = 0;
const _pending = [];
/** Set the max in-flight extraction requests (1 = fully serial; raise for vLLM/multi-slot). */
export function setExtractConcurrency(n) {
    _maxConcurrency = Math.max(1, Math.min(64, Math.floor(Number(n)) || 1));
}
function _acquireSlot() {
    return new Promise((resolve) => {
        if (_inflight < _maxConcurrency) { _inflight++; resolve(); }
        else _pending.push(resolve);
    });
}
function _releaseSlot() {
    _inflight--;
    // Admit the next waiter only if we're under the (possibly just-lowered) cap.
    if (_pending.length > 0 && _inflight < _maxConcurrency) {
        _inflight++;
        _pending.shift()();
    }
}

export async function callChatCompletions({
    endpoint, model, system, user,
    apiKey = '', temperature = 0, maxTokens = 512, signal, maxRetries = 4,
}) {
    const url = endpoint.replace(/\/+$/, '') + '/chat/completions';
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = 'Bearer ' + apiKey;
    const payload = {
        model,
        temperature,
        max_tokens: maxTokens,
        messages: [
            { role: 'system', content: system },
            { role: 'user',   content: user   },
        ],
    };
    await _acquireSlot();
    try {
        for (let attempt = 0; ; attempt++) {
            let resp;
            try {
                resp = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload), signal });
            } catch (err) {
                // A user-initiated abort is final; a transient network blip is retryable.
                if (err?.name === 'AbortError' || attempt >= maxRetries) throw err;
                await _sleepBackoff(attempt, signal);
                continue;
            }
            if (resp.ok) {
                const data = await resp.json();
                return data?.choices?.[0]?.message?.content ?? '';
            }
            const body = await resp.text().catch(() => '');
            if (_TRANSIENT_STATUS.has(resp.status) && attempt < maxRetries) {
                await _sleepBackoff(attempt, signal);   // server busy — back off and retry
                continue;
            }
            throw new Error(`extractor endpoint ${resp.status}: ${body.slice(0, 200)}`);
        }
    } finally {
        _releaseSlot();
    }
}

/**
 * High-level: given a canonical-form narration and the running state, ask the
 * extractor what changed and return the (raw, parsed-v2-or-v1) delta.
 *
 * @returns {Promise<{raw: string, parsed: object|null, delta: object}>}
 *   - raw:    the model's response text
 *   - parsed: extractJson(raw) — may include v2 wrapper
 *   - delta:  unwrapped delta ready to feed applyDelta (always an object;
 *             `{}` if changed=false or parse failed)
 */
// temperature is NOT user-tunable on purpose: temperature 0 = greedy decoding,
// matching eval; any non-zero value breaks the exact-match guarantee.
//
// max_tokens is NOT a decode setting — greedy (temp 0) makes the model emit its
// JSON then a stop token on its own, terminating well below any cap for every
// well-formed output. So the cap NEVER helps a normal turn; its ONLY job is a
// runaway backstop — a degenerate generation (repetition loop, no stop token)
// that would otherwise run until it fills the whole context window. It must
// therefore sit WELL ABOVE any legitimate output, so that hitting it means the
// generation broke, not that a large-but-valid emission got clipped. The old 512
// clipped real emissions (a first message / full redress / rich seed) mid-JSON →
// extractJson null → the whole turn lost, silently. 4096 is ~3x the largest
// realistic full-state emission — a pure backstop, not a working limit.
const EXTRACT_TEMPERATURE = 0;
const EXTRACT_MAX_TOKENS = 4096;

// Deep-merge lane deltas into one bare delta. The 5 lanes are DISJOINT (worn -> worn/worn_remove,
// wounds -> wounds, holding -> holding, flags -> bare/missing, species -> species), so a recursive
// merge simply unions them at the slot level. Mirrors merge_passes() in the pipeline.
function deepMergeDelta(dst, src) {
    for (const [k, v] of Object.entries(src || {})) {
        if (v && typeof v === 'object' && !Array.isArray(v)
            && dst[k] && typeof dst[k] === 'object' && !Array.isArray(dst[k])) {
            deepMergeDelta(dst[k], v);
        } else {
            dst[k] = v;
        }
    }
    return dst;
}

export async function extract({ canonical, prevState, personaName, cfg, signal, transport, maxTokens = EXTRACT_MAX_TOKENS }) {
    const user = buildUserMessage(canonical, prevState, personaName);
    // One model call with a given system prompt -> { raw, parsed, delta, parseFailed }.
    // temperature/max_tokens stay locked here (train/eval parity), never exposed. An injected `transport`
    // (WebLLMTransport, RemoteOpenAITransport, …) makes the call host-agnostic; with none, fall back to
    // the built-in OpenAI-compatible fetch so existing direct callers are unaffected.
    const callOne = async (system) => {
        const raw = transport
            ? await transport.chatCompletion({ system, user, temperature: EXTRACT_TEMPERATURE, maxTokens, signal })
            : await callChatCompletions({
                endpoint: cfg.endpoint, model: cfg.model, apiKey: cfg.apiKey,
                system, user, temperature: EXTRACT_TEMPERATURE, maxTokens, signal,
            });
        const parsed = extractJson(raw);
        // parseFailed: model produced output that couldn't be parsed/repaired (truncated/runaway) — a LOUD
        // signal, not a silent empty delta. Empty/whitespace raw is a transport hiccup, not a parse failure.
        return {
            raw, parsed, delta: unwrapV2(parsed) || {},
            parseFailed: parsed == null && typeof raw === 'string' && raw.trim() !== '',
        };
    };
    // A custom system prompt (a non-Beholder OpenAI-compatible model) keeps the single monolithic call.
    if (cfg.systemPrompt) {
        const mono = await callOne(cfg.systemPrompt);
        // systemUsed = the prompt that ACTUALLY ran, so the Doctor reproducer is truthful
        // instead of always logging a mono MIN prompt. See FIX_CONNECTOR_MODEL_BLIND §3b.
        return { ...mono, systemUsed: cfg.systemPrompt };
    }
    // Beholder: the trained model is PER-LANE — run the 5 short passes (train==inference parity) and
    // deep-merge. The worn pass carries the worn_remove takeoff clause, so removals fire. Passes are
    // independent, so Promise.all lets a remote endpoint run them concurrently (WebLLM serialises on its
    // single model instance, so there it's effectively sequential).
    const results = await Promise.all(LANE_ORDER.map((lane) => callOne(SHORT_PASS_PROMPTS[lane])));
    let delta = {};
    for (const r of results) delta = deepMergeDelta(delta, r.delta);
    const parseFailed = results.some((r) => r.parseFailed);
    const raw = LANE_ORDER.map((lane, i) => `[${lane}] ${results[i].raw ?? ''}`).join('\n');
    const parsed = Object.fromEntries(LANE_ORDER.map((lane, i) => [lane, results[i].parsed]));
    // systemUsed = the five short prompts that ACTUALLY ran (labeled per lane), so the
    // Doctor reproducer shows the real 5-pass prompts, not a phantom mono prompt. §3b.
    return { raw, parsed, delta, parseFailed,
        systemUsed: LANE_ORDER.map((lane) => `[${lane}]\n${SHORT_PASS_PROMPTS[lane]}`).join('\n\n') };
}
