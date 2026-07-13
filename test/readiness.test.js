// webGpuHint() — per-cause WebGPU-enable guidance surfaced on the Local-model
// card + Doctor when WebGPU is unavailable. Pure UA + secure-context reads, so we
// stub the two browser globals and assert the right instruction per browser/cause.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { webGpuHint } from '../engine/readiness.js';

// Save/restore via defineProperty — Node's global `navigator` is a configurable
// ACCESSOR (not a plain writable prop), so a bare assignment can't stub it.
function withEnv({ ua, secure = true }, fn) {
    const savedNav = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
    const savedWin = Object.getOwnPropertyDescriptor(globalThis, 'window');
    Object.defineProperty(globalThis, 'navigator', { value: { userAgent: ua }, configurable: true, writable: true });
    Object.defineProperty(globalThis, 'window', { value: { isSecureContext: secure }, configurable: true, writable: true });
    try { return fn(); }
    finally {
        if (savedNav) Object.defineProperty(globalThis, 'navigator', savedNav); else delete globalThis.navigator;
        if (savedWin) Object.defineProperty(globalThis, 'window', savedWin); else delete globalThis.window;
    }
}

const UA = {
    firefox: 'Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0',
    chrome:  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    edge:    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0',
    safari:  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
    unknown: 'SomeCrawler/1.0',
};

test('insecure context wins over any browser', () => {
    withEnv({ ua: UA.firefox, secure: false }, () =>
        assert.match(webGpuHint(), /insecure|https:\/\/|localhost/));
});

test('Firefox → about:config dom.webgpu.enabled', () => {
    withEnv({ ua: UA.firefox }, () => assert.match(webGpuHint(), /dom\.webgpu\.enabled/));
});

test('Chrome → enable-unsafe-webgpu flag', () => {
    withEnv({ ua: UA.chrome }, () => assert.match(webGpuHint(), /enable-unsafe-webgpu/));
});

test('Edge (Chromium) → Chrome/Edge guidance', () => {
    withEnv({ ua: UA.edge }, () => assert.match(webGpuHint(), /chrome:\/\//));
});

test('Safari → Feature Flags, not the Chrome branch', () => {
    withEnv({ ua: UA.safari }, () => {
        const h = webGpuHint();
        assert.match(h, /Feature Flags|Safari 17/);
        assert.doesNotMatch(h, /chrome:\/\//);
    });
});

test('unknown browser → generic guidance', () => {
    withEnv({ ua: UA.unknown }, () => assert.match(webGpuHint(), /recent Chrome/));
});
