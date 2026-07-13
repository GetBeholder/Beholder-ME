// WebLLMTransport smoke tests — guard the host↔transport wiring that the
// all-null MODEL_CONFIG would otherwise hide until the model is published.
//
// The regression these lock down: the transport once called
// `this.modelConfig.toModelRecord()` as a METHOD, but the host injects the plain
// `MODEL_CONFIG` data object (which has NO such method — `toModelRecord` is a
// module-level free function). With the model unconfigured the buttons that reach
// load() are never rendered, so the TypeError only surfaced the instant an
// operator filled in model-config.js. These tests configure a stub so the wiring
// is exercised under node, with no WebGPU/Worker/CDN needed.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    WebLLMTransport,
    MODEL_CONFIG,
    isModelConfigured,
    toModelRecord,
} from '../engine/index.js';

// Fill the live MODEL_CONFIG object (mutating its props, not the binding) so
// isModelConfigured()/toModelRecord() report "configured", then restore.
function withConfiguredModel(fn) {
    const saved = { ...MODEL_CONFIG };
    Object.assign(MODEL_CONFIG, {
        modelVersion: 'vTEST',
        modelId: 'Beholder-test-q4f16',
        modelUrl: 'https://example.invalid/repo',
        modelLib: 'https://example.invalid/repo/model.wasm',
        versionUrl: 'https://example.invalid/repo/version.json',
        vramRequiredMB: 2048,
        approxDownloadMB: 1300,
    });
    try {
        return fn();
    } finally {
        Object.assign(MODEL_CONFIG, saved);
    }
}

// Inverse of withConfiguredModel: blank every field so isModelConfigured()/
// toModelRecord() report "unconfigured", then restore. Needed now that the shipped
// MODEL_CONFIG is wired to a published model — the all-null state is no longer the
// default, so the "throws while unconfigured" guard must set it up explicitly.
function withUnconfiguredModel(fn) {
    const saved = { ...MODEL_CONFIG };
    Object.assign(MODEL_CONFIG, {
        modelVersion: null, modelId: null, modelUrl: null, modelLib: null,
        versionUrl: null, vramRequiredMB: null, approxDownloadMB: null,
    });
    try {
        return fn();
    } finally {
        Object.assign(MODEL_CONFIG, saved);
    }
}

test('toModelRecord is a free function (not a method on the injected config)', () => {
    // The host injects MODEL_CONFIG, a plain data object. The transport must NOT
    // assume a toModelRecord method lives on it — building the record goes through
    // the module-level import. This asserts the shape the transport now relies on.
    assert.equal(typeof MODEL_CONFIG.toModelRecord, 'undefined',
        'MODEL_CONFIG must stay a plain data object (no toModelRecord method)');
    assert.equal(typeof toModelRecord, 'function',
        'toModelRecord must be importable as a free function');
});

test('toModelRecord throws while unconfigured, builds the WebLLM record once configured', () => {
    // The shipped MODEL_CONFIG is now wired to a published model (no longer all-null).
    assert.equal(isModelConfigured(), true, 'shipped config is wired to a published model');
    // An explicitly-blanked config must still report unconfigured and make toModelRecord throw.
    withUnconfiguredModel(() => {
        assert.equal(isModelConfigured(), false, 'all-null config reports unconfigured');
        assert.throws(() => toModelRecord(), /not configured/);
    });
    // And a configured one builds the WebLLM record.
    withConfiguredModel(() => {
        assert.equal(isModelConfigured(), true);
        const rec = toModelRecord();
        assert.equal(rec.model, 'https://example.invalid/repo');
        assert.equal(rec.model_id, 'Beholder-test-q4f16');
        assert.equal(rec.model_lib, 'https://example.invalid/repo/model.wasm');
        assert.equal(rec.vram_required_MB, 2048);
    });
});

test('WebLLMTransport constructs with the plain MODEL_CONFIG and reports status', () => {
    withConfiguredModel(() => {
        const transport = new WebLLMTransport({ modelConfig: MODEL_CONFIG });
        const s = transport.status();
        assert.equal(s.backend, 'webllm');
        assert.equal(s.state, 'idle');
        // status() reads modelId straight off the injected data object.
        assert.equal(s.modelId, 'Beholder-test-q4f16');
    });
});

test('WebLLMTransport requires modelConfig', () => {
    assert.throws(() => new WebLLMTransport({}), /modelConfig is required/);
});

test('load() reaches the record-build path without a method-on-config TypeError', async () => {
    // Under node there is no WebGPU/Worker, so load() rejects at the hard gate
    // BEFORE the WebLLM import — that is the expected, honest failure. The point
    // of this assertion is the NEGATIVE: it must NOT reject with the old
    // "this.modelConfig.toModelRecord is not a function" TypeError. A configured
    // stub ensures we'd get past the gate to the record build if the gate weren't
    // there, so any record-shape regression would surface here as the model is
    // published.
    await withConfiguredModel(async () => {
        const transport = new WebLLMTransport({ modelConfig: MODEL_CONFIG });
        await assert.rejects(
            () => transport.load(),
            (err) => {
                assert.doesNotMatch(
                    String(err?.message || err),
                    /toModelRecord is not a function/,
                    'transport must not call toModelRecord as a method on the config',
                );
                return true;
            },
        );
        assert.equal(transport.status().state, 'error');
    });
});
