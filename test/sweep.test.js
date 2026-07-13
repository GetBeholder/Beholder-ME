// Unit test for the H2 sweep (validator.sweepState): retroactively clean impossible
// phantoms from already-persisted state, respecting user locks. Pure logic — no ST.
import test from 'node:test';
import assert from 'node:assert/strict';
import { sweepState } from '../validator.js';

test('sweepState: clean state is untouched', () => {
    const state = { Tim: { body: { chest: { worn: [{ item: 'coat', color: 'red' }] } } } };
    const { cleaned, changed, removed } = sweepState(state);
    assert.equal(changed, false);
    assert.equal(removed.length, 0);
    assert.deepEqual(cleaned, state);
});

test('sweepState: strips an eyepatch mis-worn on a hand (WS-REGION-STRIP)', () => {
    const state = { Shenna: { body: { right_hand: { worn: [{ item: 'eyepatch' }] } } } };
    const { cleaned, changed, removed } = sweepState(state);
    assert.equal(changed, true);
    assert.ok(removed.some((f) => f.rule_id.startsWith('ITEM-WRONG-SLOT')));
    assert.deepEqual(cleaned, {});   // whole empty char pruned
});

test('sweepState: strips a concussion on the back (WOUND-WRONG-SLOT)', () => {
    const state = { Tim: { body: {
        back: { wounds: [{ text: 'a concussion', severity: 'serious' }] },
        head: { wounds: [{ text: 'gash', severity: 'minor' }] },
    } } };
    const { cleaned, removed } = sweepState(state);
    assert.ok(removed.some((f) => f.rule_id === 'WOUND-WRONG-SLOT'));
    assert.equal(cleaned.Tim.body.back, undefined);       // concussion slot cleared
    assert.ok(cleaned.Tim.body.head);                     // legit head wound kept
});

test('sweepState: strips a social-descriptor species (V2)', () => {
    const state = { Yaxley: { species: 'pureblood', body: { chest: { worn: [{ item: 'shirt' }] } } } };
    const { cleaned, removed } = sweepState(state);
    assert.ok(removed.some((f) => f.rule_id === 'SPECIES-IS-SOCIAL-DESCRIPTOR'));
    assert.equal(cleaned.Yaxley.species, undefined);      // species dropped
    assert.ok(cleaned.Yaxley.body.chest);                 // worn kept
});

test('sweepState: NEVER strips a user-locked slot', () => {
    const state = { Shenna: { body: { right_hand: { worn: [{ item: 'eyepatch' }] } } } };
    const isSlotLocked = (char, slot) => char === 'Shenna' && slot === 'right_hand';
    const { cleaned, changed } = sweepState(state, { isSlotLocked });
    assert.equal(changed, false);
    assert.deepEqual(cleaned, state);                     // locked slot survives
});

test('sweepState: empty state is a no-op', () => {
    const { cleaned, changed } = sweepState({});
    assert.equal(changed, false);
    assert.deepEqual(cleaned, {});
});
