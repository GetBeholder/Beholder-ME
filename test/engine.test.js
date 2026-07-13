// Engine orchestration tests — prove BeholderEngine wires the pure core correctly
// with NO model and NO frontend (fake transport + fake host). This is the
// host-agnostic contract that lets one engine serve SillyTavern AND Marinara.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BeholderEngine, RemoteOpenAITransport } from '../engine/index.js';
import { dropHallucinatedCharacters, characterNamedIn } from '../engine/engine.js';
import { applyDelta, unwrapV2, renameChar, lockKey } from '../state.js';

// Canned model output (a v2 wrapper) — returned regardless of input.
const CANNED = JSON.stringify({
    changed: true,
    delta: { self: { body: { chest: { worn: [{ item: 'shirt', damage: 'pristine' }] } } } },
});

function fakeTransport(responseText) {
    return {
        async ready() {},
        async chatCompletion() { return responseText; },
        status() { return { state: 'ready', backend: 'fake' }; },
    };
}

function fakeHost(initial = {}) {
    const calls = { inject: 0, render: 0, extraction: 0, edited: [], errors: [] };
    let state = initial;
    let locks = [];
    return {
        _calls: calls,
        setLocks(l) { locks = l; },
        getSettings() { return { enabled: true, endpoint: 'http://x/v1', model: 'm' }; },
        loadState() { return state; },
        saveState(s) { state = s; },
        getLocks() { return locks; },
        injectState() { calls.inject++; },
        render() { calls.render++; },
        onExtraction() { calls.extraction++; },
        markUserEdited(c, s) { calls.edited.push(lockKey(c, s)); },
        onError(e) { calls.errors.push(e); },
    };
}

test('processMessage: extract → rename self→persona → merge → persist/inject/render', async () => {
    const host = fakeHost({});
    const engine = new BeholderEngine({ transport: fakeTransport(CANNED), host });
    const out = await engine.processMessage('Tim pulls on a shirt.', 'Tim');

    assert.ok(out.Tim, 'state is keyed by the persona name, not "self"');
    assert.equal(out.Tim.body.chest.worn[0].item, 'shirt');
    assert.equal(host._calls.inject, 1);
    assert.equal(host._calls.render, 1);
    assert.equal(host._calls.extraction, 1);

    // Identical to a direct extract+apply through the pure core.
    const expected = applyDelta({}, renameChar(unwrapV2(JSON.parse(CANNED)), 'self', 'Tim'));
    assert.deepEqual(out, expected);
});

test('processMessage: a user-locked slot is stripped from the model delta', async () => {
    const host = fakeHost({});
    host.setLocks([lockKey('Tim', 'chest')]);
    const engine = new BeholderEngine({ transport: fakeTransport(CANNED), host });
    const out = await engine.processMessage('Tim pulls on a shirt.', 'Tim');
    assert.deepEqual(out, {}, 'locked chest filtered → no state change');
});

test('processMessage: disabled host short-circuits without side effects', async () => {
    const host = fakeHost({ Tim: { body: {} } });
    host.getSettings = () => ({ enabled: false });
    const engine = new BeholderEngine({ transport: fakeTransport(CANNED), host });
    const out = await engine.processMessage('x', 'Tim');
    assert.deepEqual(out, { Tim: { body: {} } });
    assert.equal(host._calls.inject, 0);
    assert.equal(host._calls.render, 0);
});

test('processMessage: transport failure leaves state unchanged + reports onError', async () => {
    const host = fakeHost({ Tim: { body: {} } });
    const boom = { async ready() {}, async chatCompletion() { throw new Error('down'); }, status() { return {}; } };
    const engine = new BeholderEngine({ transport: boom, host });
    const out = await engine.processMessage('x', 'Tim');
    assert.deepEqual(out, { Tim: { body: {} } });
    assert.equal(host._calls.errors.length, 1);
});

test('applyDirective: free-text intent applies immediately as a user edit', async () => {
    const host = fakeHost({});
    const engine = new BeholderEngine({ transport: fakeTransport(CANNED), host });
    const out = await engine.applyDirective('Tim is wearing a shirt', 'Tim');
    assert.equal(out.Tim.body.chest.worn[0].item, 'shirt');
    assert.ok(host._calls.edited.includes(lockKey('Tim', 'chest')), 'slot marked user-edited');
});

test('constructor requires a transport and a host', () => {
    assert.throws(() => new BeholderEngine({ host: fakeHost() }), /transport is required/);
    assert.throws(() => new BeholderEngine({ transport: fakeTransport(CANNED) }), /host adapter is required/);
});

test('RemoteOpenAITransport.status reflects its config', () => {
    const t = new RemoteOpenAITransport({ endpoint: 'http://x/v1', model: 'm' });
    assert.equal(t.status().backend, 'remote-openai');
    assert.equal(t.status().state, 'ready');
    assert.equal(new RemoteOpenAITransport({}).status().state, 'unconfigured');
});

test('characterNamedIn: whole-word, case-insensitive presence', () => {
    assert.equal(characterNamedIn('Eva ties her boots', 'Eva'), true);
    assert.equal(characterNamedIn('eva ties her boots', 'Eva'), true);
    assert.equal(characterNamedIn('I pull on a coat while Eva watches', 'Mara'), false);
    assert.equal(characterNamedIn('Evaluate the plan', 'Eva'), false); // whole word only
});

test('dropHallucinatedCharacters: keeps self/persona/named, drops invented names', () => {
    const delta = {
        self: { body: { chest: {} } },
        Eva: { body: { neck: {} } },
        Mara: { body: { chest: {} } }, // not in prose → hallucinated
    };
    const { delta: kept, dropped } =
        dropHallucinatedCharacters(delta, 'Tim pulls on a coat while Eva ties her boots.', 'Tim');
    assert.deepEqual(Object.keys(kept).sort(), ['Eva', 'self']);
    assert.deepEqual(dropped, ['Mara']);
});

test('dropHallucinatedCharacters: a brand-new NPC named in the prose is kept', () => {
    const { delta: kept, dropped } =
        dropHallucinatedCharacters({ Olga: { body: {} } }, 'Olga strides in wearing a fur coat.', 'Tim');
    assert.deepEqual(Object.keys(kept), ['Olga']);
    assert.deepEqual(dropped, []);
});

test('dropHallucinatedCharacters: a tracked character (in state, not in the text) is kept', () => {
    // Note-box directive "the blazer is damaged" → model attributes to Eva from
    // state context; Eva isn't in the directive text but is a known character.
    const { delta: kept, dropped } =
        dropHallucinatedCharacters({ Eva: { body: {} } }, 'the blazer is damaged', 'Tim', ['Tim', 'Eva']);
    assert.deepEqual(Object.keys(kept), ['Eva']);
    assert.deepEqual(dropped, []);
});

test('dropHallucinatedCharacters: an invented name in neither text nor state is dropped', () => {
    const { delta: kept, dropped } =
        dropHallucinatedCharacters({ Mara: { body: {} } }, 'the blazer is damaged', 'Tim', ['Tim', 'Eva']);
    assert.deepEqual(Object.keys(kept), []);
    assert.deepEqual(dropped, ['Mara']);
});

test('processMessage: drops a hallucinated character not named in the prose (cold-start failsafe)', async () => {
    const canned = JSON.stringify({ changed: true, delta: {
        Eva: { body: { left_foot: { worn: [{ item: 'boots' }] } } },
        Mara: { body: { chest: { worn: [{ item: 'coat' }] } } }, // phantom — not in prose
    } });
    const host = fakeHost({});
    const warns = [];
    host.onWarn = (msg, meta) => warns.push(meta);
    const engine = new BeholderEngine({ transport: fakeTransport(canned), host });
    const out = await engine.processMessage('I pull on a coat while Eva ties her boots.', 'Tim');
    assert.ok(out.Eva, 'the character named in the prose is kept');
    assert.ok(!out.Mara, 'the hallucinated character is dropped');
    assert.deepEqual(warns[0]?.dropped, ['Mara']);
});
