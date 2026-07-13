// Beholder engine — the in-browser WebLLM transport.
//
// HOST-AGNOSTIC: this transport implements the same `InferenceTransport` contract
// as RemoteOpenAITransport (engine/transport.js), so the engine and `extract()`
// treat the two interchangeably behind a single seam. It touches only browser
// platform APIs (WebGPU via readiness.js, a module Worker, the dynamically
// imported WebLLM ESM). No SillyTavern / Marinara / jQuery / DOM.
//
// LAZY-LOAD INVARIANT: `@mlc-ai/web-llm` is imported with a DYNAMIC `import()`
// INSIDE `load()` only — never at module top level. Re-exporting this class from
// the engine barrel must not pull WebLLM (or hit the CDN) for a user who never
// enables the browser model. Keep every WebLLM reference inside an instance
// method.
//
// PARITY INVARIANT: `chatCompletion` forwards the `temperature` / `maxTokens` it
// receives from `extract()` (the locked 0 / 512) UNCHANGED. It must never
// substitute its own decoding params or train/eval parity breaks.

import { detectWebGpu } from './readiness.js';
import { toModelRecord } from './model-config.js';

// The single WebLLM ESM source. The worker file imports from the SAME URL so the
// main thread and worker share one module instance / version. Pinning a CDN URL
// (vs a bare specifier) is what lets the worker resolve the import under a host
// that ships the extension as a plain ESM with no bundler/import-map.
const WEBLLM_ESM_URL = 'https://esm.run/@mlc-ai/web-llm@0.2.84';

/**
 * WebLLMTransport — runs the finetuned quant entirely in the user's browser on
 * WebGPU, off the main thread in a module Worker. Weights stream into the Cache
 * API once (shard-granularity resume on reload) and re-enabling is instant.
 *
 * @implements {import('./transport.js').InferenceTransport}
 */
export class WebLLMTransport {
    /**
     * @param {{ modelConfig: { modelId: string|null },
     *           onProgress?: (report: { progress: number, text: string,
     *             timeElapsed: number }) => void }} deps
     *   `modelConfig` is the `MODEL_CONFIG` data object from engine/model-config.js
     *   — a plain record whose `modelId` is the WebLLM id / cache key. The WebLLM
     *   `ModelRecord` is built via the module-level `toModelRecord()` (imported
     *   above), NOT a method on the injected object, so the transport and the host
     *   share one source of truth for the record shape. `onProgress` forwards
     *   WebLLM's InitProgressReport during weight streaming + kernel compile.
     */
    constructor({ modelConfig, onProgress } = {}) {
        if (!modelConfig) throw new Error('WebLLMTransport: modelConfig is required');
        this.modelConfig = modelConfig;
        this.onProgress = typeof onProgress === 'function' ? onProgress : () => {};

        /** @type {object|null} the WebLLM worker engine client */
        this.engine = null;
        /** @type {object|null} the WebLLM module namespace (lazily imported) */
        this._webllm = null;
        /** @type {object|null} the appConfig used for cache utilities */
        this._appConfig = null;
        /** @type {Promise<void>|null} in-flight load (dedupes concurrent ready()) */
        this._loadPromise = null;

        this.state = 'idle';          // idle | loading | ready | unloaded | error
        this.progress = 0;            // 0..1, last InitProgressReport.progress
        this.lastError = null;

        this._lastTtftMs = null;      // ms to first token of the last completion
        this._lastUsage = null;       // last completion usage (tok/s lives here)
    }

    /**
     * Lazily import WebLLM, gate on WebGPU, register the operator model via a
     * custom `appConfig.model_list`, and create the worker engine. Downloads +
     * compiles on first call (drives `onProgress`); subsequent loads reuse the
     * Cache API shards. Throws (does NOT silently fall back to the main thread)
     * when WebGPU or the Worker is unavailable, so the host surfaces it honestly.
     *
     * @returns {Promise<void>}
     */
    async load() {
        if (this.state === 'ready' && this.engine) return;
        if (this._loadPromise) return this._loadPromise;

        this._loadPromise = (async () => {
            this.state = 'loading';
            this.progress = 0;
            this.lastError = null;
            try {
                // HARD GATE: no point importing ~MBs of WebLLM if WebGPU is absent.
                const gpu = await detectWebGpu();
                if (!gpu.ok) {
                    throw new Error(`WebGPU unavailable: ${gpu.reason || 'unsupported'}`);
                }
                if (typeof Worker === 'undefined') {
                    throw new Error('Web Workers unavailable in this environment');
                }

                // LAZY dynamic import — the ONLY place WebLLM is pulled.
                const webllm = this._webllm || await import(/* @vite-ignore */ WEBLLM_ESM_URL);
                this._webllm = webllm;

                const appConfig = { model_list: [toModelRecord()] };
                this._appConfig = appConfig;

                const worker = new Worker(
                    new URL('./webllm-worker.js', import.meta.url),
                    { type: 'module' },
                );

                this.engine = await webllm.CreateWebWorkerMLCEngine(
                    worker,
                    this.modelConfig.modelId,
                    {
                        appConfig,
                        initProgressCallback: (report) => {
                            if (report && typeof report.progress === 'number') {
                                this.progress = report.progress;
                            }
                            try { this.onProgress(report); } catch { /* host callback guard */ }
                        },
                        logLevel: 'WARN',
                    },
                );
                this.state = 'ready';
                this.progress = 1;
            } catch (err) {
                this.state = 'error';
                this.lastError = err;
                this.engine = null;
                throw err;
            } finally {
                this._loadPromise = null;
            }
        })();

        return this._loadPromise;
    }

    /**
     * Convenience used by the host's Enable handler. No-op when already ready;
     * loads when idle/unloaded; awaits the in-flight load when loading. Mirrors
     * RemoteOpenAITransport.ready() (a no-op there) — `extract()` does NOT call
     * `ready()`; the host ensures readiness before enabling.
     *
     * @returns {Promise<void>}
     */
    async ready() {
        if (this.state === 'ready' && this.engine) return;
        if (this._loadPromise) return this._loadPromise;
        return this.load();
    }

    /**
     * One stateless [system, user] extraction turn. STREAMS so we can record
     * time-to-first-token (TTFT) + tok/s for the Doctor without changing the
     * stateless contract — the extractor always sends a fresh 2-message array, so
     * there is no KV reuse to preserve. Returns the raw assistant text.
     *
     * PARITY: `temperature` / `maxTokens` are forwarded UNCHANGED.
     *
     * @param {{ system: string, user: string, temperature?: number,
     *   maxTokens?: number, signal?: AbortSignal }} args
     * @returns {Promise<string>}
     */
    async chatCompletion({ system, user, temperature = 0, maxTokens = 512, signal } = {}) {
        if (this.state !== 'ready' || !this.engine) {
            throw new Error('WebLLMTransport: engine not ready (call ready()/load() first)');
        }
        if (signal?.aborted) {
            throw makeAbortError();
        }

        let onAbort = null;
        if (signal) {
            onAbort = () => { try { this.engine?.interruptGenerate(); } catch { /* ignore */ } };
            signal.addEventListener('abort', onAbort, { once: true });
        }

        const t0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
        let ttft = null;
        let text = '';
        try {
            const chunks = await this.engine.chat.completions.create({
                messages: [
                    { role: 'system', content: system },
                    { role: 'user', content: user },
                ],
                temperature,
                max_tokens: maxTokens,
                stream: true,
                stream_options: { include_usage: true },
            });
            for await (const ch of chunks) {
                if (signal?.aborted) throw makeAbortError();
                const delta = ch?.choices?.[0]?.delta?.content || '';
                if (delta && ttft == null) {
                    ttft = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0;
                }
                text += delta;
                if (ch?.usage) this._lastUsage = ch.usage;
            }
            this._lastTtftMs = ttft;
            return text;
        } finally {
            if (signal && onAbort) signal.removeEventListener('abort', onAbort);
        }
    }

    /**
     * Lightweight status for the Doctor view / Local-model card.
     *
     * @returns {{ state: string, progress: number, modelId: string|undefined,
     *   backend: string, ttftMs: number|null, tokensPerSec: number|null }}
     */
    status() {
        return {
            state: this.state,
            progress: this.progress,
            modelId: this.modelConfig?.modelId || undefined,
            backend: 'webllm',
            ttftMs: this._lastTtftMs ?? null,
            tokensPerSec: this._lastUsage?.extra?.decode_tokens_per_s ?? null,
        };
    }

    /**
     * Free all GPU resources (VRAM) — the Disable action. Weights REMAIN in the
     * Cache API on disk, so a later Enable re-loads instantly.
     *
     * @returns {Promise<void>}
     */
    async unload() {
        try {
            await this.engine?.unload();
        } finally {
            this.engine = null;
            this.state = 'unloaded';
            this.progress = 0;
        }
    }

    /**
     * Whether this model's weights are already in the browser cache — lets the
     * host distinguish "not-downloaded" from "ready-disabled" WITHOUT importing
     * WebLLM itself. Lazily imports WebLLM (cheap if already loaded) and builds
     * the appConfig from the model record. Returns false on any error / when
     * unconfigured so the host falls back to "offer download".
     *
     * @returns {Promise<boolean>}
     */
    async hasInCache() {
        try {
            const webllm = this._webllm || await import(/* @vite-ignore */ WEBLLM_ESM_URL);
            this._webllm = webllm;
            if (typeof webllm.hasModelInCache !== 'function') return false;
            const appConfig = this._appConfig || { model_list: [toModelRecord()] };
            this._appConfig = appConfig;
            return await webllm.hasModelInCache(this.modelConfig.modelId, appConfig);
        } catch {
            return false;
        }
    }
}

/** Build a DOMException-shaped AbortError (parity with fetch's abort rejection). */
function makeAbortError() {
    if (typeof DOMException !== 'undefined') {
        return new DOMException('The operation was aborted.', 'AbortError');
    }
    const err = new Error('The operation was aborted.');
    err.name = 'AbortError';
    return err;
}
