// Beholder engine — the HostAdapter contract (documentation only).
//
// This is the per-frontend boundary. SillyTavern, MarinaraEngine, or any future
// host implements this shape; BeholderEngine talks ONLY to this interface and
// never to a specific frontend. Keeping every frontend-specific concern
// (event wiring, persistence location, prompt injection, DOM rendering, the
// Inspector capture buffer, message badges) behind this contract is what makes
// the engine reusable across hosts.
//
// There is no runtime export — the contract is enforced by usage + JSDoc.

/**
 * @typedef {object} HostAdapter
 *
 * @property {() => object} getSettings
 *   Live config: `{ enabled, endpoint, model, apiKey, systemPrompt? }`.
 *   The engine reads `enabled` to gate, and passes the rest to its transport.
 *
 * @property {() => object} loadState
 *   The running per-character state object (`{ <char>: { body: {...}, ... } }`).
 *
 * @property {(state: object) => void} saveState
 *   Persist the merged state (ST: chat_metadata; Marinara: its game-state store).
 *
 * @property {() => Array<string>} [getLocks]
 *   Lock keys (`lockKey(char, slot)`). Model deltas are filtered against these so
 *   a user-locked slot is never overwritten by the model. Optional → no locks.
 *
 * @property {(delta: object) => object} [mapCharacters]
 *   Reconcile a delta's top-level character keys before merge — collapse user
 *   alias variants onto a canonical name and drop hidden characters. Applied after
 *   the self→persona rename, before the lock filter. Optional → identity.
 *
 * @property {(state: object) => void} injectState
 *   Push the state into the host's outgoing prompt
 *   (ST: `setExtensionPrompt`; Marinara: its prompt assembly).
 *
 * @property {(state: object, delta: object, turn: object) => void} render
 *   Update the host's UI (the paper-doll panel, a Marinara widget, …).
 *
 * @property {(turn: object) => void} [onExtraction]
 *   Per-turn hook with `{ messageId, canonical, system, user, raw, parsed,
 *   delta, latencyMs }` for host-specific bookkeeping — the Inspector capture
 *   buffer, per-message deltas, message badges. Optional.
 *
 * @property {(char: string, slot: string) => void} [markUserEdited]
 *   Mark a slot as user-edited (used by `applyDirective`). Optional.
 *
 * @property {(err: Error) => void} [onError]
 *   Surface a transport/extraction failure (the engine leaves state unchanged).
 */

export {};
