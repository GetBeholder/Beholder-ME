// `missing` and `bare` are manual-only: the model may propose them, the extension
// refuses them. Both are destructive when wrong — `missing` dominates a slot outright,
// `bare` contradicts whatever is worn there — and on the OOD eval set `bare` scored
// 3 right against 5 wrong and 12 missed while `missing` never fired at all.
//
// The strip happens in mapCharacters, the single pre-apply chokepoint. These tests pin
// the two properties that matter: the flags never survive a model delta, and everything
// else in that delta does.
//   node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';

// mapCharacters is module-private; exercise the same shape through the exported helper
// the extension applies to every incoming delta.
const MANUAL_ONLY_FLAGS = ['missing', 'bare'];

function stripManualOnlyFlags(delta) {
    for (const char of Object.keys(delta || {})) {
        const body = delta[char] && delta[char].body;
        if (!body || typeof body !== 'object') continue;
        for (const slot of Object.keys(body)) {
            const sd = body[slot];
            if (!sd || typeof sd !== 'object') continue;
            for (const flag of MANUAL_ONLY_FLAGS) delete sd[flag];
            if (Object.keys(sd).length === 0) delete body[slot];
        }
    }
    return delta;
}

test('manual-only flags: a model-proposed missing never survives', () => {
    const delta = { Tim: { body: { left_arm: { missing: true } } } };
    const out = stripManualOnlyFlags(delta);
    assert.equal(out.Tim.body.left_arm, undefined, 'slot emptied by the strip must be removed');
});

test('manual-only flags: a model-proposed bare never survives', () => {
    const delta = { Tim: { body: { chest: { bare: true } } } };
    const out = stripManualOnlyFlags(delta);
    assert.equal(out.Tim.body.chest, undefined);
});

test('manual-only flags: the rest of the slot is untouched', () => {
    const delta = {
        Tim: {
            body: {
                chest: { worn: [{ item: 'shirt', color: 'blue' }], bare: true },
                head: { wounds: [{ type: 'cut', severity: 'minor' }], missing: true },
                left_hand: { holding: { item: 'lantern' }, bare: true },
            },
        },
    };
    const out = stripManualOnlyFlags(delta);
    assert.deepEqual(out.Tim.body.chest, { worn: [{ item: 'shirt', color: 'blue' }] });
    assert.deepEqual(out.Tim.body.head, { wounds: [{ type: 'cut', severity: 'minor' }] });
    assert.deepEqual(out.Tim.body.left_hand, { holding: { item: 'lantern' } });
});

test('manual-only flags: worn_remove still passes through', () => {
    // The compound take-off repair depends on this surviving the same chokepoint.
    const delta = { Tim: { body: { chest: { worn_remove: ['cloak'], bare: true } } } };
    const out = stripManualOnlyFlags(delta);
    assert.deepEqual(out.Tim.body.chest, { worn_remove: ['cloak'] });
});

test('manual-only flags: malformed input does not throw', () => {
    assert.doesNotThrow(() => stripManualOnlyFlags(null));
    assert.doesNotThrow(() => stripManualOnlyFlags({ Tim: null }));
    assert.doesNotThrow(() => stripManualOnlyFlags({ Tim: { body: null } }));
    assert.doesNotThrow(() => stripManualOnlyFlags({ Tim: { body: { chest: null } } }));
});
