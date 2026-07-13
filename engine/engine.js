// Beholder engine — the host-free extraction orchestrator.
//
// HOST-AGNOSTIC: imports only the pure core (normalizer / extractor / state).
// It is handed an `InferenceTransport` (how to call the model) and a
// `HostAdapter` (how to read/persist/inject/render for a specific frontend), and
// runs the same loop for SillyTavern, MarinaraEngine, or anything else.
import { normalize } from '../normalizer.js';
import { extract, buildUserMessage, EXTRACTION_SYSTEM_V2_SHORT } from '../extractor.js';
import { applyDelta, filterLockedFromDelta, renameChar } from '../state.js';
import { applyValidator } from '../validator.js';

/** True if `name` occurs as a whole word in `text` (case-insensitive). */
export function characterNamedIn(text, name) {
    const esc = String(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try { return new RegExp(`\\b${esc}\\b`, 'i').test(text || ''); }
    catch { return true; }   // on a bad regex, never drop — fail open
}

/**
 * Split a delta's character keys into the ones to keep and the hallucinated ones
 * to drop. Keep a key if it is `self`, the persona, a name written in the
 * narration, OR a character already in the running state (`knownNames`) — the
 * last covers a pronoun-only sentence ("she unbuttons her coat") and a note-box
 * directive ("the blazer is damaged") where the model attributes by state
 * context, not by a name in the text. Drop the rest (an invented name like
 * "Mara" that appears nowhere in the prose and isn't a tracked character).
 *
 * @returns {{ delta: object, dropped: string[] }}
 */
export function dropHallucinatedCharacters(delta, canonical, personaName, knownNames = []) {
    if (!delta || typeof delta !== 'object') return { delta: {}, dropped: [] };
    const known = new Set(knownNames);
    const kept = {};
    const dropped = [];
    for (const name of Object.keys(delta)) {
        if (name === 'self'
            || (personaName && name === personaName)
            || known.has(name)
            || characterNamedIn(canonical, name)) {
            kept[name] = delta[name];
        } else {
            dropped.push(name);
        }
    }
    return { delta: kept, dropped };
}

export class BeholderEngine {
    /**
     * @param {{ transport: import('./transport.js').InferenceTransport,
     *           host: import('./host.js').HostAdapter }} deps
     */
    constructor({ transport, host }) {
        if (!transport) throw new Error('BeholderEngine: a transport is required');
        if (!host) throw new Error('BeholderEngine: a host adapter is required');
        this.transport = transport;
        this.host = host;
    }

    /**
     * Process one inbound message: normalize → extract → merge → inject → render.
     * Returns the new running state (or the unchanged state if disabled / failed).
     * Frontend-specific side effects (capture buffer, per-message deltas, badges)
     * are delegated to the host via `onExtraction` / `render`.
     *
     * @param {string} rawMessage
     * @param {string|null} personaName  the user's persona (mapped to `self`)
     * @param {{ signal?: AbortSignal, messageId?: any }} [opts]
     */
    async processMessage(rawMessage, personaName, { signal, messageId } = {}) {
        const host = this.host;
        const cfg = host.getSettings();
        if (!cfg.enabled) return host.loadState();

        const canonical = normalize(rawMessage, personaName);
        const prevState = host.loadState() || {};
        // The extractor speaks in `self`; map the persona → self for the prompt.
        const prevForExtractor = renameChar(prevState, personaName, 'self');

        const t0 = Date.now();
        let result;
        try {
            result = await extract({
                canonical,
                prevState: prevForExtractor,
                personaName,
                cfg,
                signal,
                transport: this.transport,
            });
        } catch (err) {
            host.onError?.(err);
            return prevState;            // leave state unchanged on failure
        }
        const latencyMs = Date.now() - t0;

        // The model answered but its output didn't parse (truncated / runaway):
        // the delta is empty and the turn changes nothing. Make it LOUD instead
        // of a silent no-op that looks clean.
        if (result.parseFailed) {
            host.onWarn?.(`extraction output did not parse — likely truncated or a runaway generation (${(result.raw || '').length} chars); turn left unchanged`,
                { messageId, parseFailed: true });
        }

        // Failsafe: drop hallucinated character keys. On a cold-start first-person
        // turn the extractor can invent a name from its training examples (e.g.
        // "Mara") where the persona's own state should have gone to `self`. A REAL
        // character — `self`, the persona, or any named NPC — is always written in
        // the prose; a hallucinated one is not. Drop keys not named in the message
        // (never `self`/persona) and note it; the state self-corrects next turn.
        const { delta: cleanDelta, dropped } = dropHallucinatedCharacters(result.delta, canonical, personaName, Object.keys(prevState));
        if (dropped.length) {
            host.onWarn?.(`ignored character(s) not named in the message (likely hallucinated): ${dropped.join(', ')}`,
                { messageId, dropped });
        }
        // Map `self` → persona in the delta so the running state is keyed by the
        // real character names, then strip user-locked slots from the MODEL delta.
        const named = personaName ? renameChar(cleanDelta, 'self', personaName) : cleanDelta;
        // Host character reconciliation (aliases collapse name variants; hidden chars
        // dropped) — optional hook, identity when the host doesn't provide it.
        const mapped = host.mapCharacters ? host.mapCharacters(named) : named;
        const safeDelta = filterLockedFromDelta(mapped, host.getLocks?.() || []);

        // Client-side validator (parity with datagen phase_e_validators): snapshot
        // the RAW delta ("validators OFF"), then detect + strip ("validators ON").
        // On by default; runs on the pre-merge delta (raw item strings, like the
        // datagen labeler) with the running state + prose as context. A no-op turn
        // (empty delta) is skipped — nothing to validate.
        const rawDelta = safeDelta;
        const validatorOn = cfg.validator?.enabled !== false;
        let appliedDelta = safeDelta;
        let validatorLog = [];
        if (validatorOn && safeDelta && Object.keys(safeDelta).length) {
            const { findings, stripped } = applyValidator(
                { changed: true, delta: safeDelta },
                { persona: personaName, prevState, prose: canonical },
            );
            validatorLog = findings;
            appliedDelta = (stripped && stripped.changed && stripped.delta) ? stripped.delta : {};
        }

        const newState = applyDelta(prevState, appliedDelta);
        host.saveState(newState);

        const turn = {
            messageId,
            canonical,
            system: cfg.systemPrompt || EXTRACTION_SYSTEM_V2_SHORT,
            user: buildUserMessage(canonical, prevForExtractor, personaName),
            raw: result.raw,
            parsed: result.parsed,
            delta: appliedDelta,       // the delta actually applied (post-validator)
            rawDelta,                  // snapshot: pre-validator delta (validators OFF)
            validatorLog,              // parity-shape findings {rule_id, path, severity}
            validatorActive: validatorOn,
            parseFailed: result.parseFailed === true,
            latencyMs,
        };
        host.onExtraction?.(turn);
        host.injectState(newState);
        host.render(newState, appliedDelta, turn);
        return newState;
    }

    /**
     * Apply a free-text user directive immediately (the note / intent bar).
     * Snapshot extraction (prev = {}); each touched slot is written via the
     * user-edit path so it wins over the model and persists. Host-agnostic.
     *
     * @param {string} text
     * @param {string|null} personaName
     * @param {{ signal?: AbortSignal }} [opts]
     */
    async applyDirective(text, personaName, { signal } = {}) {
        const host = this.host;
        const cfg = host.getSettings();
        const trimmed = (text || '').trim();
        if (!cfg.enabled || !trimmed) return host.loadState();

        const canonical = normalize(trimmed, personaName);
        const current = host.loadState() || {};
        // Give the extractor the CURRENT state (persona → self) as context so it can
        // attribute an UNNAMED directive ("the blazer is damaged") to whoever is
        // actually wearing it, instead of inventing a name. Still a statement of
        // fact: the result is applied per-slot as a user edit below.
        const prevForExtractor = renameChar(current, personaName, 'self');
        const t0 = Date.now();
        let result;
        try {
            result = await extract({
                canonical,
                prevState: prevForExtractor,
                personaName,
                cfg,
                signal,
                transport: this.transport,
            });
        } catch (err) {
            host.onError?.(err);
            return host.loadState();
        }
        if (result.parseFailed) {
            host.onWarn?.(`directive output did not parse — likely truncated or a runaway generation (${(result.raw || '').length} chars); nothing applied`,
                { parseFailed: true });
        }
        const delta = result.delta || {};
        // Same failsafe as processMessage: drop an invented name (e.g. "Mara") that is
        // neither self/persona, in the directive text, nor an already-tracked character.
        const { delta: cleanDelta, dropped } =
            dropHallucinatedCharacters(delta, canonical, personaName, Object.keys(current));
        if (dropped.length) {
            host.onWarn?.(`directive: ignored character(s) not in state or the text: ${dropped.join(', ')}`, { dropped });
        }
        const named = personaName ? renameChar(cleanDelta, 'self', personaName) : cleanDelta;

        // Apply the directive through the SAME merge machinery as a model delta so
        // "she wears a bra" ADDS to the slot (identity merge) instead of replacing
        // it, and worn_remove / holding / wounds / scalars all behave identically.
        // Then mark each touched body slot user-edited so the model can't clobber
        // it (the directive is authoritative; the lock is what makes it "win").
        const next = applyDelta(current, named);
        for (const [char, cd] of Object.entries(named)) {
            if (!cd || typeof cd !== 'object') continue;
            const body = cd.body;
            if (body && typeof body === 'object' && !Array.isArray(body)) {
                for (const slot of Object.keys(body)) host.markUserEdited?.(char, slot);
            }
        }
        // Capture the directive as an extraction turn so it appears in the Doctor /
        // diagnostic report like a message turn (msgId "note" marks its origin).
        host.onExtraction?.({
            messageId: 'note',
            canonical,
            system: cfg.systemPrompt || EXTRACTION_SYSTEM_V2_SHORT,
            user: buildUserMessage(canonical, prevForExtractor, personaName),
            raw: result.raw,
            parsed: result.parsed,
            delta: named,
            latencyMs: Date.now() - t0,
            kind: 'directive',
            parseFailed: result.parseFailed === true,
        });
        host.saveState(next);
        host.injectState(next);
        host.render(next, named, { directive: trimmed });
        return next;
    }
}
