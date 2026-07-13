// Parity test (JS side): the extension's state.js applyDelta against the SHARED
// fixture apply_delta_cases.json. DataGen's shared/apply_state.apply_delta is
// tested against the SAME fixture (datagen tests/parity/test_apply_delta.py) — so
// the two implementations of the canonical state-apply semantics (including v0.5
// worn merge-by-identity + worn_remove) cannot silently drift.
//
// The fixture is vendored from datagen/tests/parity/apply_delta_cases.json. If you
// change apply semantics in EITHER repo, update the fixture and BOTH tests.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyDelta } from '../state.js';

const { cases } = JSON.parse(
    readFileSync(new URL('./apply_delta_cases.json', import.meta.url), 'utf8'),
);

for (const c of cases) {
    test(`apply_delta parity: ${c.name}`, () => {
        assert.deepEqual(applyDelta(c.prev, c.delta), c.expected);
    });
}
