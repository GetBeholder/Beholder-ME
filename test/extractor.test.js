// Round-trip tests for extractor client helpers (no network calls).
//   node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildUserMessage, extractJson, extract } from '../extractor.js';

// parseFailed: a non-empty raw that can't be parsed/repaired flags loudly; a valid
// output (including changed:false) and an empty raw do NOT flag.
const mockTransport = (raw) => ({ chatCompletion: async () => raw });

test('extract: unparseable non-empty output sets parseFailed + empty delta', async () => {
    // A truncated object the repair can't salvage into anything balanced.
    const r = await extract({ canonical: 'x', prevState: {}, personaName: 'Tim', cfg: {}, transport: mockTransport('{"changed": true, "delta": {"Eva": {"body": {"chest": {"worn": [{"item":') });
    assert.equal(r.parseFailed, true);
    assert.deepEqual(r.delta, {});
});

test('extract: valid delta does not set parseFailed', async () => {
    const r = await extract({ canonical: 'x', prevState: {}, personaName: 'Tim', cfg: {}, transport: mockTransport('{"changed": true, "delta": {"Tim": {"stamina": "tired"}}}') });
    assert.equal(r.parseFailed, false);
    assert.deepEqual(r.delta, { Tim: { stamina: 'tired' } });
});

test('extract: changed:false is a clean no-op, not a parse failure', async () => {
    const r = await extract({ canonical: 'x', prevState: {}, personaName: 'Tim', cfg: {}, transport: mockTransport('{"changed": false}') });
    assert.equal(r.parseFailed, false);
    assert.deepEqual(r.delta, {});
});

test('extract: empty/whitespace output is a transport hiccup, not a parse failure', async () => {
    const r = await extract({ canonical: 'x', prevState: {}, personaName: 'Tim', cfg: {}, transport: mockTransport('   ') });
    assert.equal(r.parseFailed, false);
});

test('buildUserMessage: no persona, no prev', () => {
    const out = buildUserMessage('Tim shifts on the bench.');
    assert.equal(out, 'Narration:\nTim shifts on the bench.');
});

test('buildUserMessage: persona + empty prev', () => {
    const out = buildUserMessage('Tim shifts.', {}, 'Tim');
    assert.equal(out, 'Persona: Tim\nNarration:\nTim shifts.');
});

test('buildUserMessage: persona + prev', () => {
    const out = buildUserMessage('Tim removes his cloak.', { self: { stamina: 'normal' } }, 'Tim');
    const expected = 'Persona: Tim\n' +
        'Current state:\n{"self":{"stamina":"normal"}}\n\n' +
        'Narration:\nTim removes his cloak.';
    assert.equal(out, expected);
});

test('extractJson: plain JSON object', () => {
    const text = '{"changed": true, "delta": {"Tim": {"stamina": "tired"}}}';
    assert.deepEqual(extractJson(text),
        { changed: true, delta: { Tim: { stamina: 'tired' } } });
});

test('extractJson: JSON inside ```json fence', () => {
    const text = '```json\n{"changed": false}\n```';
    assert.deepEqual(extractJson(text), { changed: false });
});

test('extractJson: JSON with prose before it', () => {
    const text = 'Here is the answer:\n{"changed": false}';
    assert.deepEqual(extractJson(text), { changed: false });
});

test('extractJson: nested braces handled correctly', () => {
    const text = '{"a": {"b": {"c": 1}}, "d": 2}';
    assert.deepEqual(extractJson(text), { a: { b: { c: 1 } }, d: 2 });
});

test('extractJson: returns null on bad JSON', () => {
    assert.equal(extractJson('not json'), null);
    assert.equal(extractJson('{bad'), null);
    assert.equal(extractJson(''), null);
});

test('extractJson: repairs a truncated object missing its final brace', () => {
    // The real failure mode: the local extractor model (Beholder-Q8_0) drops the
    // closing "}", which used to make the WHOLE delta parse as null → {}.
    const truncated = '{"changed":true,"delta":{"Tim":{"body":{"chest":{"worn":[{"item":"coat"}]}}}}';
    assert.deepEqual(extractJson(truncated),
        { changed: true, delta: { Tim: { body: { chest: { worn: [{ item: 'coat' }] } } } } });
});

test('extractJson: repairs truncation missing a trailing bracket AND braces', () => {
    const truncated = '{"changed":true,"delta":{"a":{"worn":[{"item":"hat"}';
    assert.deepEqual(extractJson(truncated),
        { changed: true, delta: { a: { worn: [{ item: 'hat' }] } } });
});

test('extractJson: drops a dangling comma before repairing', () => {
    assert.deepEqual(extractJson('{"changed":true,"delta":{"a":1,'),
        { changed: true, delta: { a: 1 } });
});

test('extractJson: braces inside a string value are not miscounted', () => {
    assert.deepEqual(extractJson('{"item":"a {weird} }} value"}'),
        { item: 'a {weird} }} value' });
});
