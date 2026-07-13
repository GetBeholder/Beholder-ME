// DATA parity: the extension's vendored GARMENT_CANON (garment_data.js, dumped from
// datagen) must deep-equal the shared source table (test/garment_canon.json, a copy of
// datagen shared/garment_canon.json). If they drift, the JS boot/boots dedup no longer
// matches the Python apply_state/validator — regenerate garment_data.js from datagen.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { GARMENT_CANON } from '../garment_data.js';

const source = JSON.parse(
    readFileSync(new URL('./garment_canon.json', import.meta.url), 'utf8'),
).GARMENT_CANON;

test('GARMENT_CANON (JS) deep-equals the datagen-generated source table', () => {
    assert.deepEqual(GARMENT_CANON, source);
});

test('GARMENT_CANON folds are all plural→singular (surface+"s" → surface)', () => {
    for (const [plural, singular] of Object.entries(GARMENT_CANON)) {
        assert.equal(plural, `${singular}s`, `${plural} should be ${singular}+s`);
    }
});

test('GARMENT_CANON excludes the self-layering STOP lexemes (sock, glove)', () => {
    for (const stop of ['socks', 'gloves', 'braces', 'cuffs']) {
        assert.equal(stop in GARMENT_CANON, false, `${stop} must NOT be folded`);
    }
});
