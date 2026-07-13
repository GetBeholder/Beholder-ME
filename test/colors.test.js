// normalizeColor tests.
//   node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeColor } from '../colors.js';

test('normalizeColor: palette synonyms fold to canonical', () => {
    assert.equal(normalizeColor('Crimson'), 'red');
    assert.equal(normalizeColor('scarlet'), 'red');
    assert.equal(normalizeColor('cobalt'), 'blue');
    assert.equal(normalizeColor('grey'), 'gray');
    assert.equal(normalizeColor('Golden'), 'gold');
});

test('normalizeColor: distinct shades pass through verbatim (folded)', () => {
    assert.equal(normalizeColor('cream'), 'cream');
    assert.equal(normalizeColor('gunmetal'), 'gunmetal');
    assert.equal(normalizeColor('midnight-blue'), 'midnight blue');
    assert.equal(normalizeColor('  Forest_Green '), 'forest green');
});

test('normalizeColor: palette words are stable', () => {
    assert.equal(normalizeColor('red'), 'red');
    assert.equal(normalizeColor('GRAY'), 'gray');
    assert.equal(normalizeColor('navy'), 'navy');
});

test('normalizeColor: non-strings and empties → ""', () => {
    assert.equal(normalizeColor(null), '');
    assert.equal(normalizeColor(undefined), '');
    assert.equal(normalizeColor(''), '');
    assert.equal(normalizeColor('   '), '');
    assert.equal(normalizeColor(42), '');
});
