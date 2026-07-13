// Beholder engine — the operator-supplied browser model configuration.
//
// HOST-AGNOSTIC: pure data + pure functions. No frontend, no DOM, no browser
// platform calls. This is the single source for "which finetuned quant does the
// in-browser WebLLM transport load?" The transport reads it; the host reads it
// to drive the Local-model card; nothing else owns model identity.
//
// THE MODEL IS NOT PUBLISHED YET. Every field is `null` on purpose so the build
// runs unconfigured: `isModelConfigured()` is false, the card shows a
// "not published yet" state, and the custom-endpoint path keeps working. When the
// q4f16 artifact + compiled .wasm + version.json are published, the operator
// fills the URLs below — see the TODO(operator) block.

/**
 * The operator-supplied WebLLM model record source.
 *
 * Filling this in is the ONLY change needed to switch the extension from
 * "custom endpoint only" to "ships a browser model out of the box".
 *
 * @typedef {object} BeholderModelConfig
 * @property {string|null} modelVersion   Human version tag, e.g. 'v45'.
 * @property {string|null} modelId        Versioned WebLLM id + cache key, e.g.
 *   'Beholder-v45-q4f16'. A NEW id forces a clean re-download (lockstep update).
 * @property {string|null} modelUrl       HF repo URL of the MLC q4f16 weights.
 * @property {string|null} modelLib       Absolute URL of the compiled WebGPU .wasm.
 * @property {string|null} versionUrl     HF version.json URL (used by the deferred
 *   auto-update flow; stored now so the shape is stable).
 * @property {number|null} vramRequiredMB Optional VRAM hint for the card copy.
 * @property {number|null} approxDownloadMB Optional download-size label hint.
 */

/** @type {BeholderModelConfig} */
export const MODEL_CONFIG = {
    // Production wiring for the published Beholder-q4f16 model (v5). The extension loads this
    // model and polls versionUrl for one-click auto-updates. (Completed the "fill when published" TODO.)
    modelVersion: 'v5',
    modelId: 'Beholder-v5-q4f16',
    modelUrl: 'https://huggingface.co/GetBeholder/Beholder-q4f16',
    modelLib: 'https://huggingface.co/GetBeholder/Beholder-q4f16/resolve/main/Beholder-q4f16-webgpu.wasm',
    versionUrl: 'https://huggingface.co/GetBeholder/Beholder-q4f16/resolve/main/version.json',
    vramRequiredMB: 2700,
    approxDownloadMB: 430,
};

/**
 * True only when the three load-critical fields are present. Until then the host
 * shows the "not published" card state and never offers a download.
 *
 * @returns {boolean}
 */
export function isModelConfigured() {
    return !!(MODEL_CONFIG.modelId && MODEL_CONFIG.modelUrl && MODEL_CONFIG.modelLib);
}

/**
 * Build the WebLLM `ModelRecord` for `appConfig.model_list`. The transport passes
 * the returned object straight into WebLLM. Throws when unconfigured so the host
 * never reaches WebLLM with a half-filled record.
 *
 * @returns {{ model: string, model_id: string, model_lib: string,
 *   vram_required_MB?: number }}
 */
export function toModelRecord() {
    if (!isModelConfigured()) {
        throw new Error('Beholder model not configured yet');
    }
    return {
        model: MODEL_CONFIG.modelUrl,
        model_id: MODEL_CONFIG.modelId,
        model_lib: MODEL_CONFIG.modelLib,
        ...(MODEL_CONFIG.vramRequiredMB ? { vram_required_MB: MODEL_CONFIG.vramRequiredMB } : {}),
    };
}
