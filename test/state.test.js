// Round-trip tests for the state-merge logic (applyDelta).
//   node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyDelta, applyUserEdit, renameChar, unwrapV2, isDefaultHuman, shouldStripHumanSpecies, withDependentMissing, foldDeltaToChar, graftUserEdits } from '../state.js';

test('unwrapV2: passes through non-wrapper objects', () => {
    assert.deepEqual(unwrapV2({ Tim: { stamina: 'tired' } }),
        { Tim: { stamina: 'tired' } });
});

test('unwrapV2: changed=false → empty delta', () => {
    assert.deepEqual(unwrapV2({ changed: false }), {});
    assert.deepEqual(unwrapV2({ changed: false, delta: { Tim: {} } }), {});
});

test('unwrapV2: changed=true → inner delta', () => {
    const wrapped = { changed: true, delta: { Tim: { stamina: 'tired' } } };
    assert.deepEqual(unwrapV2(wrapped), { Tim: { stamina: 'tired' } });
});

test('unwrapV2: changed=true with missing/bad delta → empty', () => {
    assert.deepEqual(unwrapV2({ changed: true }), {});
    assert.deepEqual(unwrapV2({ changed: true, delta: 'oops' }), {});
});

test('applyDelta: empty delta is no-op', () => {
    const prev = { Tim: { body: { chest: { worn: [{ item: 'tunic', damage: 'pristine' }] } } } };
    assert.deepEqual(applyDelta(prev, {}), prev);
    assert.deepEqual(applyDelta(prev, { changed: false }), prev);
});

test('applyDelta: scalar stamina change preserves other top-level fields', () => {
    const prev = { Tim: { stamina: 'normal', species: 'human' } };
    const delta = { Tim: { stamina: 'tired' } };
    assert.deepEqual(applyDelta(prev, delta),
        { Tim: { stamina: 'tired', species: 'human' } });
});

test('applyDelta: adds worn item to empty slot', () => {
    const prev = { Tim: { body: {} } };
    const delta = { Tim: { body: { chest: { worn: [{ item: 'tunic', damage: 'pristine' }] } } } };
    assert.deepEqual(applyDelta(prev, delta),
        { Tim: { body: { chest: { worn: [{ item: 'tunic', damage: 'pristine' }] } } } });
});

test('applyDelta: clears worn slot with [] (full cascade)', () => {
    const prev = { Tim: { body: { chest: { worn: [{ item: 'tunic', damage: 'pristine' }] } } } };
    const delta = { Tim: { body: { chest: { worn: [] } } } };
    // Cascade: slot empty → drop slot → body empty → drop body → Tim empty → drop Tim
    assert.deepEqual(applyDelta(prev, delta), {});
});

test('applyDelta: partial clear leaves other fields intact', () => {
    const prev = { Tim: { body: { chest: { worn: [{ item: 'tunic', damage: 'pristine' }] } }, stamina: 'normal' } };
    const delta = { Tim: { body: { chest: { worn: [] } } } };
    // chest slot drops, body drops, but stamina survives → Tim survives
    assert.deepEqual(applyDelta(prev, delta), { Tim: { stamina: 'normal' } });
});

test('applyDelta: bandage applied on top of wound (key path-3 case, v0.4 wound shape)', () => {
    const prev = {
        Tim: { body: { back: { wounds: [{ text: 'stab wound', severity: 'serious', bleeding: true }] } } }
    };
    const delta = {
        Tim: { body: { back: { worn: [{ item: 'bandage', damage: 'pristine', color: 'white' }] } } }
    };
    assert.deepEqual(applyDelta(prev, delta), {
        Tim: { body: { back: {
            wounds: [{ text: 'stab wound', severity: 'serious', bleeding: true }],
            worn: [{ item: 'bandage', damage: 'pristine', color: 'white' }],
        } } }
    });
});

test('applyDelta: clears holding with empty string (legacy v0.2 sentinel)', () => {
    const prev = { Tim: { body: { right_hand: { holding: 'sword' } } } };
    const delta = { Tim: { body: { right_hand: { holding: '' } } } };
    assert.deepEqual(applyDelta(prev, delta), {});
});

test('applyDelta: clears holding with empty object (v0.3+ sentinel)', () => {
    const prev = { Tim: { body: { right_hand: { holding: { item: 'sword', damage: 'pristine' } } } } };
    const delta = { Tim: { body: { right_hand: { holding: {} } } } };
    assert.deepEqual(applyDelta(prev, delta), {});
});

test('applyDelta: replaces holding object with new holding object', () => {
    const prev = { Tim: { body: { right_hand: { holding: { item: 'sword', damage: 'pristine' } } } } };
    const delta = { Tim: { body: { right_hand: { holding: { item: 'shield', damage: 'cracked', color: 'brown' } } } } };
    assert.deepEqual(applyDelta(prev, delta), {
        Tim: { body: { right_hand: { holding: { item: 'shield', damage: 'cracked', color: 'brown' } } } }
    });
});

test('applyDelta: bare:true flag added to slot', () => {
    const prev = { Tim: { body: {} } };
    const delta = { Tim: { body: { chest: { bare: true } } } };
    assert.deepEqual(applyDelta(prev, delta),
        { Tim: { body: { chest: { bare: true } } } });
});

test('applyDelta: missing:true flag added to slot', () => {
    const prev = { Tim: { body: {} } };
    const delta = { Tim: { body: { left_hand: { missing: true } } } };
    assert.deepEqual(applyDelta(prev, delta),
        { Tim: { body: { left_hand: { missing: true } } } });
});

test('applyDelta: v2-wrapper input', () => {
    const prev = { Tim: { stamina: 'normal' } };
    const delta = { changed: true, delta: { Tim: { stamina: 'tired' } } };
    assert.deepEqual(applyDelta(prev, delta), { Tim: { stamina: 'tired' } });
});

test('applyDelta: multi-character delta', () => {
    const prev = {
        Tim: { stamina: 'normal' },
        Mara: { stamina: 'normal' },
    };
    const delta = {
        Tim: { stamina: 'tired' },
        Mara: { body: { right_hand: { holding: 'lantern' } } },
    };
    assert.deepEqual(applyDelta(prev, delta), {
        Tim: { stamina: 'tired' },
        Mara: { stamina: 'normal', body: { right_hand: { holding: 'lantern' } } },
    });
});

test('applyDelta: does not mutate prev', () => {
    const prev = { Tim: { stamina: 'normal' } };
    const snapshot = JSON.parse(JSON.stringify(prev));
    applyDelta(prev, { Tim: { stamina: 'tired' } });
    assert.deepEqual(prev, snapshot, 'prev must not be mutated');
});

test('renameChar: maps persona to self at API boundary', () => {
    const state = { Tim: { stamina: 'tired' }, Mara: { stamina: 'normal' } };
    assert.deepEqual(renameChar(state, 'Tim', 'self'),
        { self: { stamina: 'tired' }, Mara: { stamina: 'normal' } });
});

test('renameChar: noop if from not present', () => {
    const state = { Mara: { stamina: 'normal' } };
    assert.deepEqual(renameChar(state, 'Tim', 'self'), state);
});

// ── Default-human species carve-out ──

test('isDefaultHuman: human/man/woman/empty/absent are default; non-human is not', () => {
    for (const s of ['human', 'Human', 'man', 'woman', 'people', '', null, undefined]) {
        assert.equal(isDefaultHuman(s), true, `${s} should be default-human`);
    }
    for (const s of ['lamia', 'centaur', 'divine being']) {
        assert.equal(isDefaultHuman(s), false, `${s} should NOT be default-human`);
    }
});

test('shouldStripHumanSpecies: strip redundant default-human, keep non-human→human reveal', () => {
    assert.equal(shouldStripHumanSpecies('human', null), true);      // prev absent
    assert.equal(shouldStripHumanSpecies('human', 'human'), true);   // prev already human
    assert.equal(shouldStripHumanSpecies('man', 'human'), true);     // man == human default
    assert.equal(shouldStripHumanSpecies('human', 'lamia'), false);  // REVEAL — keep
    assert.equal(shouldStripHumanSpecies('lamia', null), false);     // real non-human — keep
});

test('shouldStripHumanSpecies (G1): bare gender/age nouns are ALWAYS redundant, never a reveal', () => {
    // The whole point of G1: a bare gender/age noun must NOT clobber a real non-human prev.
    assert.equal(shouldStripHumanSpecies('woman', 'kitsune'), true);   // strip → keep kitsune
    assert.equal(shouldStripHumanSpecies('man', 'kitsune'), true);     // moved out of the reveal set
    assert.equal(shouldStripHumanSpecies('lady', 'kitsune'), true);    // was mis-treated as non-human before
    assert.equal(shouldStripHumanSpecies('boy', null), true);          // prev absent → strip to human
    // Only the explicit humanity assertions may reveal over a non-human prev.
    assert.equal(shouldStripHumanSpecies('person', 'lamia'), false);   // REVEAL — keep
    assert.equal(shouldStripHumanSpecies('people', 'lamia'), false);   // REVEAL — keep
    // A real non-human is still never stripped.
    assert.equal(shouldStripHumanSpecies('kitsune', 'human'), false);
});

test('applyDelta: strips a redundant default-human species emission (prev absent)', () => {
    const prev = { self: { body: { chest: { worn: [{ item: 'shirt', damage: 'pristine' }] } } } };
    const delta = { self: { species: 'human' } };
    assert.deepEqual(applyDelta(prev, delta), prev); // species:human is the default → not written
});

test('applyDelta: keeps a non-human → human reveal', () => {
    const prev = { Tim: { species: 'anomaly' } };
    const delta = { Tim: { species: 'human' } };
    assert.deepEqual(applyDelta(prev, delta), { Tim: { species: 'human' } });
});

test('applyDelta: keeps a real non-human species emission', () => {
    const prev = {};
    const delta = { Mara: { species: 'lamia' } };
    assert.deepEqual(applyDelta(prev, delta), { Mara: { species: 'lamia' } });
});

test('applyDelta: strips species:"man" when prev is already human (state unchanged)', () => {
    const prev = { Tim: { species: 'human', stamina: 'normal' } };
    const delta = { Tim: { species: 'man' } };
    assert.deepEqual(applyDelta(prev, delta), { Tim: { species: 'human', stamina: 'normal' } });
});

// ── Character override layer: aliases / hidden / order ───────────────────────
import { buildAliasLookup, resolveAliases, dropHidden, orderChars } from "../state.js";

test("buildAliasLookup: grouped books -> flat lowercased lookup, per-chat wins", () => {
    const lk = buildAliasLookup(
        { Yekaterina: ["Katya", "Yekaterina Sokolova"] },   // global
        { Yekaterina: ["Yeka"], Bob: ["Robert"] },          // per-chat (adds Yeka, Robert)
    );
    assert.equal(lk["katya"], "Yekaterina");
    assert.equal(lk["yekaterina sokolova"], "Yekaterina");
    assert.equal(lk["yeka"], "Yekaterina");
    assert.equal(lk["robert"], "Bob");
    assert.equal(lk["yekaterina"], "Yekaterina");           // canonical maps to itself
});

test("resolveAliases: collapses variants into one canonical, deep-merging states", () => {
    const lk = buildAliasLookup({ Yekaterina: ["Katya", "Yekaterina Sokolova"] });
    const state = {
        Katya: { body: { chest: { worn: [{ item: "coat", damage: "pristine" }] } } },
        "Yekaterina Sokolova": { body: { head: { worn: [{ item: "ushanka", damage: "pristine" }] } } },
        Mara: { body: { waist: { worn: [{ item: "belt", damage: "pristine" }] } } },
    };
    const out = resolveAliases(state, lk);
    assert.deepEqual(Object.keys(out).sort(), ["Mara", "Yekaterina"]);
    // both fragments merged onto the canonical
    assert.ok(out.Yekaterina.body.chest && out.Yekaterina.body.head);
    assert.deepEqual(out.Mara, state.Mara);
});

test("resolveAliases: no matching variants -> SAME reference (cheap no-op)", () => {
    const lk = buildAliasLookup({ Yekaterina: ["Katya"] });
    const state = { Mara: { body: {} }, Bob: { body: {} } };
    assert.equal(resolveAliases(state, lk), state);
});

test("resolveAliases: case-insensitive + trims", () => {
    const lk = buildAliasLookup({ Yekaterina: ["Katya"] });
    const out = resolveAliases({ "  katya ": { x: 1 } }, lk);
    assert.deepEqual(out, { Yekaterina: { x: 1 } });
});

test("dropHidden: removes hidden keys; same ref when nothing hidden", () => {
    const s = { Tim: { a: 1 }, Guard: { b: 2 } };
    assert.deepEqual(dropHidden(s, ["Guard"]), { Tim: { a: 1 } });
    assert.equal(dropHidden(s, []), s);
    assert.equal(dropHidden(s, ["Nobody"]), s);
});

test("orderChars: persona pinned first by default (no saved order)", () => {
    assert.deepEqual(orderChars(["Mara", "Tim", "Guard"], [], "Tim"),
        ["Tim", "Mara", "Guard"]);
    // self treated as persona
    assert.deepEqual(orderChars(["Mara", "self"], null, "Tim"), ["self", "Mara"]);
});

test("orderChars: saved order honored exactly (incl. persona not-first), newcomers appended", () => {
    assert.deepEqual(orderChars(["Tim", "Mara", "Guard"], ["Mara", "Tim"], "Tim"),
        ["Mara", "Tim", "Guard"]);          // Guard is new -> appended after saved order
    assert.deepEqual(orderChars(["Tim", "Mara"], ["Ghost", "Mara"], "Tim"),
        ["Mara", "Tim"]);                   // Ghost not present -> skipped; Tim (persona) leads rest
});

// ── material → color fold (Beholder is color-only in the UI) ──

test("applyDelta: worn material with no color becomes the color", () => {
    const delta = { Eva: { body: { neck: { worn: [{ item: "necklace", material: "silver" }] } } } };
    assert.deepEqual(applyDelta({}, delta),
        { Eva: { body: { neck: { worn: [{ item: "necklace", color: "silver" }] } } } });
});

test("applyDelta: a stated color wins over material; material is dropped", () => {
    const delta = { Eva: { body: { chest: { worn: [{ item: "coat", color: "grey", material: "wool" }] } } } };
    assert.deepEqual(applyDelta({}, delta),
        { Eva: { body: { chest: { worn: [{ item: "coat", color: "grey" }] } } } });
});

test("applyDelta: holding material folds into color too", () => {
    const delta = { Tim: { body: { right_hand: { holding: { item: "ring", material: "gold" } } } } };
    assert.deepEqual(applyDelta({}, delta),
        { Tim: { body: { right_hand: { holding: { item: "ring", color: "gold" } } } } });
});

test("applyUserEdit: directive/editor material folds into color", () => {
    // "the necklace is silver" → model emits material:silver → user-edit path.
    const out = applyUserEdit({}, "Eva", "neck", { worn: [{ item: "necklace", material: "silver" }] });
    assert.deepEqual(out, { Eva: { body: { neck: { worn: [{ item: "necklace", color: "silver" }] } } } });
});

// ── worn merge-by-identity + worn_remove (schema v0.5 contract) ──

test("applyDelta: worn merge ADDS a garment, keeping the co-located ones (the bra/blouse/blazer bug)", () => {
    const prev = { Eva: { body: { chest: { worn: [
        { item: "blouse", damage: "pristine", color: "white" },
        { item: "blazer", damage: "pristine", color: "navy" },
    ] } } } };
    const delta = { Eva: { body: { chest: { worn: [{ item: "bra", damage: "pristine" }] } } } };
    assert.deepEqual(applyDelta(prev, delta), { Eva: { body: { chest: { worn: [
        { item: "blouse", damage: "pristine", color: "white" },
        { item: "blazer", damage: "pristine", color: "navy" },
        { item: "bra", damage: "pristine" },
    ] } } } });
});

test("applyDelta: worn merge UPDATES a garment in place, keeping unre-emitted fields (blazer damaged keeps navy)", () => {
    // The Eva desync: a delta emits only the changed garment with only the changed
    // field. Merge updates damage in place and keeps the previously-revealed navy.
    const prev = { Eva: { body: { back: { worn: [
        { item: "blouse", damage: "pristine", color: "white" },
        { item: "blazer", damage: "pristine", color: "navy" },
    ] } } } };
    const delta = { Eva: { body: { back: { worn: [{ item: "blazer", damage: "damaged" }] } } } };
    assert.deepEqual(applyDelta(prev, delta), { Eva: { body: { back: { worn: [
        { item: "blouse", damage: "pristine", color: "white" },
        { item: "blazer", damage: "damaged", color: "navy" },
    ] } } } });
});

test("applyDelta: worn merge never duplicates by identity (case-insensitive item match)", () => {
    const prev = { Eva: { body: { chest: { worn: [{ item: "Coat", damage: "pristine", color: "grey" }] } } } };
    const delta = { Eva: { body: { chest: { worn: [{ item: "coat", damage: "torn" }] } } } };
    const out = applyDelta(prev, delta);
    assert.equal(out.Eva.body.chest.worn.length, 1);   // matched by identity → no duplicate
    // Incoming emission wins on re-emitted fields (damage); the previously-revealed
    // colour survives; MERGE-PRESERVE-SURFACE keeps the FIRST-SEEN surface ("Coat"),
    // so the doll label stays stable instead of flickering with each re-emission.
    assert.deepEqual(out.Eva.body.chest.worn[0], { item: "Coat", damage: "torn", color: "grey" });
});

test("applyDelta: worn:[] still clears the WHOLE stack (full strip)", () => {
    const prev = { Eva: { body: { chest: { worn: [
        { item: "blouse", damage: "pristine" }, { item: "blazer", damage: "pristine" },
    ] } } } };
    const delta = { Eva: { body: { chest: { worn: [] } } } };
    assert.deepEqual(applyDelta(prev, delta), {});
});

test("applyDelta: worn_remove subtracts the named garment, keeping the others", () => {
    const prev = { Eva: { body: { chest: { worn: [
        { item: "blouse", damage: "pristine", color: "white" },
        { item: "blazer", damage: "pristine", color: "navy" },
    ] } } } };
    const delta = { Eva: { body: { chest: { worn_remove: ["blazer"] } } } };
    assert.deepEqual(applyDelta(prev, delta), { Eva: { body: { chest: { worn: [
        { item: "blouse", damage: "pristine", color: "white" },
    ] } } } });
});

test("applyDelta: worn_remove of the last garment clears the slot (cascade)", () => {
    const prev = { Eva: { body: { chest: { worn: [{ item: "blazer", damage: "pristine" }] } } } };
    const delta = { Eva: { body: { chest: { worn_remove: ["Blazer"] } } } };  // case-insensitive
    assert.deepEqual(applyDelta(prev, delta), {});
});

test("applyDelta: worn + worn_remove in one delta — remove wins for the same name, adds still apply", () => {
    const prev = { Eva: { body: { chest: { worn: [{ item: "blazer", damage: "pristine", color: "navy" }] } } } };
    const delta = { Eva: { body: { chest: {
        worn: [{ item: "bra", damage: "pristine" }],
        worn_remove: ["blazer"],
    } } } };
    assert.deepEqual(applyDelta(prev, delta), { Eva: { body: { chest: { worn: [
        { item: "bra", damage: "pristine" },
    ] } } } });
});

test("applyDelta: worn_remove of an absent garment is a no-op (does not create the slot)", () => {
    const prev = { Eva: { body: { chest: { worn: [{ item: "shirt", damage: "pristine" }] } } } };
    const delta = { Eva: { body: { waist: { worn_remove: ["belt"] } } } };
    assert.deepEqual(applyDelta(prev, delta), prev);
});

test("applyDelta: worn merge does not mutate prev", () => {
    const prev = { Eva: { body: { chest: { worn: [{ item: "blouse", damage: "pristine" }] } } } };
    const snapshot = JSON.parse(JSON.stringify(prev));
    applyDelta(prev, { Eva: { body: { chest: { worn: [{ item: "bra", damage: "pristine" }] } } } });
    assert.deepEqual(prev, snapshot, "prev must not be mutated by a worn merge");
});

// ── D30 anatomical dependency cascade (missing parent → missing child) ──

test("withDependentMissing: a missing arm implies a missing hand (input not mutated)", () => {
    const body = { left_arm: { missing: true }, chest: { worn: [{ item: "shirt" }] } };
    const out = withDependentMissing(body);
    assert.equal(out.left_hand.missing, true);
    assert.equal(out.right_hand, undefined);                 // other side untouched
    assert.deepEqual(out.chest, { worn: [{ item: "shirt" }] });
    assert.equal(body.left_hand, undefined);                 // pure — no mutation
});

test("withDependentMissing: shoulder cascades transitively to arm AND hand", () => {
    const out = withDependentMissing({ right_shoulder: { missing: true } });
    assert.equal(out.right_arm.missing, true);
    assert.equal(out.right_hand.missing, true);
});

test("withDependentMissing: leg → foot; head/face does NOT cascade (limbs only)", () => {
    const out = withDependentMissing({ left_leg: { missing: true }, head: { missing: true } });
    assert.equal(out.left_foot.missing, true);
    assert.equal(out.left_eye, undefined);                   // faces excluded by D30
});

// ── foldDeltaToChar: card-seed fold + cross-attribution guard ────────────────
// A character card that also describes {{user}} ("{{user}}. An ancient djinn.")
// makes the extractor key that trait under `self`/the persona; folding it onto
// the described character plants the persona's species on the wrong doll.
test('foldDeltaToChar: folds self + phantom names onto the target', () => {
    const out = foldDeltaToChar({ self: { body: { chest: { worn: [{ item: 'tunic' }] } } },
                                  Mara: { body: { waist: { worn: [{ item: 'sash' }] } } } }, 'Farah');
    assert.deepEqual(Object.keys(out), ['Farah']);
    assert.equal(out.Farah.body.chest.worn[0].item, 'tunic');
    assert.equal(out.Farah.body.waist.worn[0].item, 'sash');
});

test('foldDeltaToChar: exclude drops the persona-keyed species (djinn stays off the char)', () => {
    // char card extracted with personaName=Tim -> {{user}}'s djinn surfaces as `self`
    const out = foldDeltaToChar({ self: { species: 'djinn' } }, 'Farah', ['Tim', 'self']);
    assert.deepEqual(out, {}, 'Farah must NOT inherit the persona djinn');
});

test('foldDeltaToChar: exclude also matches the persona by NAME, case-insensitively', () => {
    const out = foldDeltaToChar({ tim: { species: 'djinn' },
                                  Farah: { body: { head: { worn: [{ item: 'headscarf' }] } } } }, 'Farah', ['Tim', 'self']);
    assert.equal(out.Farah?.species, undefined, 'persona djinn (keyed by name) is dropped');
    assert.equal(out.Farah.body.head.worn[0].item, 'headscarf', "char's own clothes are kept");
});

test('foldDeltaToChar: no exclude reproduces the OLD (buggy) fold — regression anchor', () => {
    const out = foldDeltaToChar({ self: { species: 'djinn' } }, 'Farah');
    assert.equal(out.Farah.species, 'djinn');
});

// ─── wounds merge-by-identity (parity with worn) ────────────────────────────

test('wounds: two distinct wounds on the SAME slot coexist (skull + nose)', () => {
    let st = applyDelta({}, { self: { body: { head: { wounds: [{ text: 'fractured skull', severity: 'critical', bleeding: false }] } } } });
    st = applyDelta(st, { self: { body: { head: { wounds: [{ text: 'broken nose', severity: 'serious', bleeding: true }] } } } });
    const w = st.self.body.head.wounds;
    assert.equal(w.length, 2, 'both wounds are kept — the second no longer wipes the first');
    assert.deepEqual(w.map(x => x.text).sort(), ['broken nose', 'fractured skull']);
});

test('wounds: a re-emitted wound updates IN PLACE (worsens), not duplicated', () => {
    let st = applyDelta({}, { self: { body: { left_arm: { wounds: [{ text: 'gash', severity: 'minor', bleeding: false }] } } } });
    st = applyDelta(st, { self: { body: { left_arm: { wounds: [{ text: 'Gash', severity: 'serious', bleeding: true }] } } } });
    const w = st.self.body.left_arm.wounds;
    assert.equal(w.length, 1, 'same injury text (case-insensitive) merges');
    assert.equal(w[0].severity, 'serious', 'incoming severity wins');
    assert.equal(w[0].bleeding, true, 'incoming bleeding wins');
    assert.equal(w[0].text, 'gash', 'first-seen text surface is kept (no flicker)');
});

test('wounds: [] still clears the whole slot', () => {
    let st = applyDelta({}, { self: { body: { head: { wounds: [{ text: 'cut', severity: 'minor', bleeding: false }] } } } });
    st = applyDelta(st, { self: { body: { head: { wounds: [] } } } });
    assert.equal(st.self, undefined, 'emptied wounds → emptied slot → emptied body → char dropped');
});

test('wounds: co-located worn + wounds on a slot both survive a wounds delta', () => {
    let st = applyDelta({}, { self: { body: { chest: { worn: [{ item: 'shirt' }], wounds: [{ text: 'burn', severity: 'minor', bleeding: false }] } } } });
    st = applyDelta(st, { self: { body: { chest: { wounds: [{ text: 'stab', severity: 'critical', bleeding: true }] } } } });
    assert.equal(st.self.body.chest.worn[0].item, 'shirt', 'worn untouched by a wounds delta');
    assert.equal(st.self.body.chest.wounds.length, 2, 'both wounds present');
});

// ─── graftUserEdits: carry manual edits (incl. emptied-slot tombstones) ─────

const K = (char, slot) => JSON.stringify([char, slot]);

test('graftUserEdits: a non-empty user edit overlays the replayed base', () => {
    const base = { self: { body: { chest: { worn: [{ item: 'robe' }] } } } };
    const current = { self: { body: { chest: { worn: [{ item: 'jacket' }] } } } };
    const out = graftUserEdits(base, current, [K('self', 'chest')]);
    assert.equal(out.self.body.chest.worn[0].item, 'jacket', 'user value wins over the replay');
    assert.notEqual(out, base, 'base is not mutated');
});

test('graftUserEdits: an EMPTIED slot is tombstoned — replay cannot resurrect it', () => {
    // The bug: base replays a stored "scimitar picked up" delta; the user removed it
    // (so it is absent from current). The old code skipped it → scimitar came back.
    const base = { self: { body: { right_hand: { holding: { item: 'scimitar' } } } } };
    const current = {}; // user emptied the hand → slot gone from live state
    const out = graftUserEdits(base, current, [K('self', 'right_hand')]);
    assert.equal(out.self, undefined, 'the removed scimitar stays gone across the replay');
});

test('graftUserEdits: tombstone only drops the edited slot, leaves co-located slots', () => {
    const base = { self: { body: { right_hand: { holding: { item: 'scimitar' } }, chest: { worn: [{ item: 'robe' }] } } } };
    const current = { self: { body: { chest: { worn: [{ item: 'robe' }] } } } }; // hand emptied, chest kept
    const out = graftUserEdits(base, current, [K('self', 'right_hand')]);
    assert.equal(out.self.body.right_hand, undefined, 'emptied hand dropped');
    assert.equal(out.self.body.chest.worn[0].item, 'robe', 'co-located chest survives');
});

test('graftUserEdits: no edited keys → base returned unchanged', () => {
    const base = { self: { body: { chest: { worn: [{ item: 'robe' }] } } } };
    assert.equal(graftUserEdits(base, {}, []), base);
});
