// Every value on a slot originates in prose, so by the time it reaches markup it is
// attacker-influenced. Two of them used to reach a title="…" attribute unescaped —
// the colour word, and the damage word whenever damageMeta echoed an unrecognised
// prose word back as its own label — which let a crafted value close the attribute
// and add one of its own.
//   node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderDollPanel, setDollLayout } from '../paperdoll.js';

const BREAKOUT = 'white" onmouseover="alert(1)" data-x="';

const cases = {
    color: { body: { chest: { worn: [{ item: 'blouse', color: BREAKOUT }] } } },
    item: { body: { chest: { worn: [{ item: BREAKOUT }] } } },
    damage: { body: { chest: { worn: [{ item: 'blouse', damage: BREAKOUT }] } } },
    material: { body: { chest: { worn: [{ item: 'blouse', material: BREAKOUT }] } } },
    woundType: { body: { head: { wounds: [{ type: BREAKOUT, severity: 'minor' }] } } },
    woundSeverity: { body: { head: { wounds: [{ type: 'cut', severity: BREAKOUT }] } } },
    holding: { body: { left_hand: { holding: { item: BREAKOUT } } } },
    species: { species: BREAKOUT, body: { chest: { worn: [{ item: 'blouse' }] } } },
};

test('paperdoll: prose-derived values cannot break out of an attribute', () => {
    setDollLayout('paired');
    for (const [field, charState] of Object.entries(cases)) {
        for (const view of ['front', 'back']) {
            const { html } = renderDollPanel({ Maggie: charState }, 'Maggie', new Set(), view);
            assert.ok(
                !html.includes(BREAKOUT),
                `${field} (${view} view) reaches the markup unescaped — a crafted value can close the attribute it lands in`,
            );
        }
    }
});

test('paperdoll: a character name cannot break out of an attribute', () => {
    setDollLayout('paired');
    const state = { [BREAKOUT]: { body: { chest: { worn: [{ item: 'blouse' }] } } } };
    const { html } = renderDollPanel(state, BREAKOUT, new Set(), 'front');
    assert.ok(!html.includes(BREAKOUT), 'character name reaches the markup unescaped');
});
