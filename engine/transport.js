// Beholder engine — inference transport contract + the remote (BYO-endpoint) impl.
//
// HOST-AGNOSTIC: this file imports only the pure extractor core (plain fetch),
// never SillyTavern / MarinaraEngine / DOM. A transport is the single pluggable
// "how do we call the model" seam, so the same engine runs against a remote
// OpenAI-compatible server today and an in-browser WebLLM engine later.
import { callChatCompletions } from '../extractor.js';

/**
 * The model-call contract every transport implements.
 *
 * @typedef {object} InferenceTransport
 * @property {() => Promise<void>} ready
 *   Resolves when the model is loaded and warm (no-op for a remote endpoint).
 * @property {(args: { system: string, user: string, temperature?: number,
 *   maxTokens?: number, signal?: AbortSignal }) => Promise<string>} chatCompletion
 *   Returns the model's raw assistant text for a single [system, user] turn.
 * @property {() => { state: string, progress?: number, modelId?: string,
 *   backend: string }} status
 *   Lightweight status for the Doctor view.
 */

/**
 * RemoteOpenAITransport — the "advanced / bring-your-own-endpoint" transport.
 * Talks to any OpenAI-compatible `/v1` server (llama.cpp, vLLM, KoboldCpp,
 * LM Studio, cloud). A user's own CPU *or* GPU server is reached through here.
 *
 * @implements {InferenceTransport}
 */
export class RemoteOpenAITransport {
    constructor({ endpoint, model, apiKey } = {}) {
        this.endpoint = endpoint;
        this.model = model;
        this.apiKey = apiKey || '';
    }

    // A remote endpoint is assumed reachable on demand; an explicit reachability
    // probe lives in the Doctor view, not on the hot path.
    async ready() { /* no-op */ }

    async chatCompletion({ system, user, temperature = 0, maxTokens = 512, signal }) {
        return callChatCompletions({
            endpoint: this.endpoint,
            model: this.model,
            apiKey: this.apiKey,
            system,
            user,
            temperature,
            maxTokens,
            signal,
        });
    }

    status() {
        return {
            state: this.endpoint ? 'ready' : 'unconfigured',
            modelId: this.model,
            backend: 'remote-openai',
        };
    }
}
