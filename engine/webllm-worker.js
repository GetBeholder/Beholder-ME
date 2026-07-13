// Beholder engine — the WebLLM Web Worker module.
//
// This file runs in a dedicated module Worker (created by WebLLMTransport.load via
// `new Worker(new URL('./webllm-worker.js', import.meta.url), { type: 'module' })`).
// Running WebLLM here keeps weight streaming, WebGPU kernel compile, prefill, and
// decode OFF the main thread so the host UI never janks during extraction.
//
// HOST-AGNOSTIC: a worker has no DOM and no frontend — only the WebLLM handler.
//
// IMPORT NOTE: we import from the same absolute esm.run URL the transport uses,
// NOT a bare `@mlc-ai/web-llm` specifier. A bare specifier would not resolve in
// the worker scope under a host (e.g. SillyTavern) that loads the extension as a
// plain ESM with no bundler/import-map. The absolute CDN URL always resolves.
import { WebWorkerMLCEngineHandler } from 'https://esm.run/@mlc-ai/web-llm@0.2.84';

const handler = new WebWorkerMLCEngineHandler();
self.onmessage = (msg) => handler.onmessage(msg);
