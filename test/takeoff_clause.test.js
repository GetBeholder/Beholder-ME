// takeoffClause drives the compound take-off repair: it decides both WHEN the extra
// worn-lane call happens and WHAT prose that call sees. Firing too eagerly costs a
// call on every turn; not firing loses the removal. See COMPOUND_ADD_REMOVE.md.
//   node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { takeoffClause } from '../extractor.js';

test('takeoffClause: splits a compound take-off down to the take-off half', () => {
    assert.equal(
        takeoffClause('Maggie hangs the green cloak on a hook by the door and pulls on a pair of black boots.'),
        'Maggie hangs the green cloak on a hook by the door.',
    );
    assert.equal(
        takeoffClause('She peels off her muddy gloves and ties a wool scarf around her neck.'),
        'She peels off her muddy gloves.',
    );
    assert.equal(takeoffClause('Tim kicks off his boots and slips into a pair of sandals.'), 'Tim kicks off his boots.');
    assert.equal(
        takeoffClause('He unbuckles the leather belt and shrugs a heavy coat over his shoulders.'),
        'He unbuckles the leather belt.',
    );
});

test('takeoffClause: carries the subject when the take-off is the trailing clause', () => {
    // "and takes off her boots" on its own would not tell the lane who is acting.
    const clause = takeoffClause('Maggie ties a scarf around her neck and takes off her boots.');
    assert.ok(clause.startsWith('Maggie'), `expected the subject to be carried, got ${clause}`);
    assert.ok(clause.includes('takes off'), clause);
});

test('takeoffClause: stays out of the way when there is nothing to repair', () => {
    // No take-off at all — an addition or a description costs no extra call.
    assert.equal(takeoffClause('Maggie pulls on a pair of black boots.'), null);
    assert.equal(takeoffClause('She wears a long red dress.'), null);
    // A take-off that already stands alone is handled correctly by the lane itself.
    assert.equal(takeoffClause('Tim kicks off his boots.'), null);
    assert.equal(takeoffClause('She takes off her gloves.'), null);
    // Empty / nonsense input must not throw.
    assert.equal(takeoffClause(''), null);
    assert.equal(takeoffClause(null), null);
    assert.equal(takeoffClause(undefined), null);
});

test('takeoffClause: always returns a terminated sentence', () => {
    const clause = takeoffClause('Maggie hangs the cloak on a hook and pulls on boots');
    assert.ok(/[.!?]$/.test(clause), `expected terminating punctuation, got ${clause}`);
});
