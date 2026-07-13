// Beholder engine — public barrel.
//
// The host-agnostic core: a frontend (SillyTavern, MarinaraEngine, …) supplies a
// HostAdapter (see host.js) + a transport, and drives BeholderEngine. Nothing in
// here imports a specific frontend, so the same engine ships everywhere.
export { BeholderEngine } from './engine.js';
export { RemoteOpenAITransport } from './transport.js';
// HostAdapter + InferenceTransport are JSDoc contracts (host.js / transport.js);
// they have no runtime surface to export.

// Browser-engine surface. NOTE: re-exporting WebLLMTransport does NOT load
// @mlc-ai/web-llm — that import is lazy, inside WebLLMTransport.load(), so a host
// that never enables the browser model incurs zero CDN/network hit. model-config
// is pure data + pure fns; readiness uses only browser platform APIs guarded so
// importing this barrel under node (for the engine tests) never touches them.
export { WebLLMTransport } from './webllm-transport.js';
export { MODEL_CONFIG, isModelConfigured, toModelRecord } from './model-config.js';
export { detectWebGpu, probeReadiness, probeDisk, probeRam, probeCpu } from './readiness.js';
