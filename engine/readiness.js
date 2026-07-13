// Beholder engine — cheap, non-throwing browser readiness probes.
//
// HOST-AGNOSTIC: uses only browser platform APIs (navigator.gpu, navigator.storage,
// navigator.deviceMemory, navigator.hardwareConcurrency). These are host-neutral —
// every browser frontend exposes the same globals — so they are allowed in engine/.
// No SillyTavern / Marinara / jQuery / DOM.
//
// Every probe is a PURE-ish async/sync function that returns a structured result
// and NEVER throws or rejects: a missing API resolves to an honest "unknown"
// rather than an exception. That lets the host call them blindly at boot and the
// Doctor render them without guards. All browser-API access lives INSIDE the
// functions (never at module top level) so importing this module under node for
// the engine barrel does not touch a browser global.

import { MODEL_CONFIG } from './model-config.js';

// Fallback download estimate when the model is unconfigured (so the disk probe
// still has a sane `needBytes`). ~1.3 GB is a typical q4f16 ~2B footprint.
const DEFAULT_NEED_BYTES = 1.3e9;

/**
 * Detect WebGPU — the HARD GATE for the in-browser model. If this returns
 * `ok:false`, the model cannot run locally and the host routes the user to a
 * custom endpoint instead.
 *
 * Reads `adapter.info` (vendor/architecture are OFTEN MASKED by the browser —
 * we report whatever is given and never classify GPU strength from it) and
 * `adapter.limits` (a 2 GB `maxStorageBufferBindingSize` is a common WebGPU
 * DEFAULT, not a weakness — surfaced as info only).
 *
 * @returns {Promise<{ ok: boolean, reason?: string, hint?: string, vendor?: string,
 *   architecture?: string, maxBufferSize?: number,
 *   maxStorageBufferBindingSize?: number }>}
 */
export async function detectWebGpu() {
    try {
        if (typeof navigator === 'undefined' || !navigator.gpu) {
            return { ok: false, reason: 'WebGPU unavailable (no navigator.gpu)', hint: webGpuHint() };
        }
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            return { ok: false, reason: 'No WebGPU adapter (blocklisted or unavailable)', hint: webGpuHint() };
        }
        // The q4f16 model REQUIRES the WebGPU 'shader-f16' feature. Many adapters expose
        // WebGPU but NOT fp16 (much of Android, older Intel/Linux Chrome, Firefox's nascent
        // impl). Without this gate they pass as "GPU ok", trigger the ~430 MB download, then
        // fail deep in worker kernel-compile — after the user committed to the download. Fail
        // fast with an honest reason so the unsupported path (→ endpoint) fires up front.
        if (!adapter.features || !adapter.features.has('shader-f16')) {
            return {
                ok: false,
                reason: 'Your GPU lacks fp16 (WebGPU shader-f16) — required to run this model in-browser',
                hint: 'This device can still track via a custom endpoint — set one up below.',
            };
        }
        const info = (adapter.info && typeof adapter.info === 'object') ? adapter.info : {};
        const limits = adapter.limits || {};
        return {
            ok: true,
            vendor: info.vendor || undefined,
            architecture: info.architecture || undefined,
            maxBufferSize: typeof limits.maxBufferSize === 'number' ? limits.maxBufferSize : undefined,
            maxStorageBufferBindingSize: typeof limits.maxStorageBufferBindingSize === 'number'
                ? limits.maxStorageBufferBindingSize : undefined,
        };
    } catch (err) {
        return { ok: false, reason: `WebGPU probe failed: ${err?.message || err}`, hint: webGpuHint() };
    }
}

/**
 * Best-effort, per-cause guidance for enabling WebGPU when {@link detectWebGpu}
 * reports it unavailable. Pure browser-API reads (window.isSecureContext +
 * navigator.userAgent) — host-agnostic, never throws. Returns one actionable
 * sentence; the Local-model card + Doctor render it verbatim.
 *
 * @returns {string}
 */
export function webGpuHint() {
    try {
        // Insecure origin is the #1 false-negative: WebGPU is disabled on
        // non-secure pages even when the GPU + browser fully support it.
        if (typeof window !== 'undefined' && window.isSecureContext === false) {
            return 'WebGPU is off on insecure pages — open Beholder over https:// or '
                + 'http://localhost (not a LAN IP), then reload.';
        }
        const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
        // Order matters: Edge/Brave UAs also contain "Chrome"; Safari's UA has
        // "Safari" but neither "Chrome" nor "Chromium".
        if (/Firefox\//.test(ua)) {
            return 'Firefox: open about:config, set dom.webgpu.enabled = true, then reload.';
        }
        if (/Edg\/|Chrome\/|Chromium\/|Brave\//.test(ua)) {
            return "Chrome/Edge: visit chrome://gpu (WebGPU should read 'Hardware accelerated'); "
                + 'if not, enable chrome://flags/#enable-unsafe-webgpu and restart.';
        }
        if (/Safari\//.test(ua) && !/Chrome|Chromium/.test(ua)) {
            return "Safari 17+: Settings → Advanced → 'Show features for web developers', "
                + 'then Develop → Feature Flags → WebGPU.';
        }
        return 'WebGPU needs a recent Chrome, Edge, Firefox (about:config → dom.webgpu.enabled), '
            + 'or Safari 17+.';
    } catch {
        return 'WebGPU needs a recent Chrome, Edge, Firefox, or Safari 17+ over https/localhost.';
    }
}

/**
 * Estimate free on-disk storage for the model cache via the Storage API. The
 * Storage API quota is conservative; `freeBytes = quota - usage`. `persisted`
 * reports whether the origin's storage is protected from eviction.
 *
 * @param {number} [needBytes] bytes the download needs (for the `ok` verdict)
 * @returns {Promise<{ ok: boolean, quota: number, usage: number,
 *   freeBytes: number, persisted: boolean, error?: string }>}
 */
export async function probeDisk(needBytes = DEFAULT_NEED_BYTES) {
    const base = { ok: false, quota: 0, usage: 0, freeBytes: 0, persisted: false };
    try {
        if (typeof navigator === 'undefined' || !navigator.storage || !navigator.storage.estimate) {
            return { ...base, error: 'Storage API unavailable' };
        }
        const est = await navigator.storage.estimate();
        const quota = typeof est.quota === 'number' ? est.quota : 0;
        const usage = typeof est.usage === 'number' ? est.usage : 0;
        const freeBytes = Math.max(0, quota - usage);
        let persisted = false;
        try {
            persisted = navigator.storage.persisted ? await navigator.storage.persisted() : false;
        } catch { /* persisted() unsupported — leave false */ }
        return { ok: freeBytes >= needBytes, quota, usage, freeBytes, persisted };
    } catch (err) {
        return { ...base, error: err?.message || String(err) };
    }
}

/**
 * Coarse total-RAM hint via `navigator.deviceMemory` — Chromium-only, reports
 * TOTAL (not free) RAM rounded to a power of two and capped at 8 GB. A HINT, never
 * a gate. On Firefox/Safari the API is absent → `{ gb: null, known: false }`.
 *
 * @returns {{ gb: number|null, known: boolean }}
 */
export function probeRam() {
    try {
        if (typeof navigator === 'undefined' || typeof navigator.deviceMemory !== 'number') {
            return { gb: null, known: false };
        }
        return { gb: navigator.deviceMemory, known: true };
    } catch {
        return { gb: null, known: false };
    }
}

/**
 * Logical CPU thread count via `navigator.hardwareConcurrency` (informational).
 *
 * @returns {{ threads: number|null }}
 */
export function probeCpu() {
    try {
        if (typeof navigator === 'undefined' || typeof navigator.hardwareConcurrency !== 'number') {
            return { threads: null };
        }
        return { threads: navigator.hardwareConcurrency };
    } catch {
        return { threads: null };
    }
}

/**
 * Run all four probes. The host calls this once at boot and on settings-open,
 * then hands the cached result to the UI for the readiness rows.
 *
 * @param {{ needBytes?: number }} [opts] bytes the download needs; defaults from
 *   `MODEL_CONFIG.approxDownloadMB` (or the ~1.3 GB fallback).
 * @returns {Promise<{ gpu: object, disk: object, ram: object, cpu: object }>}
 */
export async function probeReadiness({ needBytes } = {}) {
    const need = typeof needBytes === 'number'
        ? needBytes
        : (MODEL_CONFIG.approxDownloadMB ? MODEL_CONFIG.approxDownloadMB * 1e6 : DEFAULT_NEED_BYTES);
    const [gpu, disk] = await Promise.all([detectWebGpu(), probeDisk(need)]);
    return { gpu, disk, ram: probeRam(), cpu: probeCpu() };
}
