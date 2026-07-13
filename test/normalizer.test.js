// Round-trip tests for the normalizer.
//   node --test        (or: node test/normalizer.test.js)
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalize } from "../normalizer.js";

const CANON = 'Tim shifts on the bench. The pauldron buckle gives with a sharp click. ' +
    '"Better," Tim said quietly. Mara turns the iron ring on her finger. ' +
    '"If you say so," Mara said drily.';

test("1 - strict format (asterisk actions + labeled dialogue)", () => {
    const input = `*Tim shifts on the bench. The pauldron buckle gives with a sharp click.*

Tim (Quiet): "Better."

*Mara turns the iron ring on her finger.*

Mara (Dry): "If you say so."`;
    assert.equal(normalize(input), CANON);
});

test("2 - asterisk + plain inline dialogue", () => {
    const input = `*Tim shifts on the bench and works the buckle loose.*

"Better."

*Mara doesn't look up.*`;
    assert.equal(normalize(input),
        `Tim shifts on the bench and works the buckle loose. "Better." Mara doesn't look up.`);
});

test("3 - script / bracket style", () => {
    const input = `[Tim sits heavily on the bench.]
[He pries the pauldron buckle loose; the plate falls to the boards.]
TIM (Quiet): Better.
[Mara watches without expression.]
MARA (Dry): If you say so.`;
    assert.equal(normalize(input),
        'Tim sits heavily on the bench. He pries the pauldron buckle loose; the plate falls to the boards. ' +
        '"Better," Tim said quietly. Mara watches without expression. "If you say so," Mara said drily.');
});

test("4 - already canonical (no-op)", () => {
    const input = `Tim shifted on the bench and worked the buckle loose. "Better," he said. Mara didn't look up.`;
    assert.equal(normalize(input), input);
});

test("5 - first-person (pass through)", () => {
    const input = `I shift on the bench and work the buckle loose. "Better," I say. Mara doesn't look up.`;
    assert.equal(normalize(input), input);
});

test("6 - BBCode + HTML noise", () => {
    const input = `[b]Tim[/b] shifts on the bench. <i>The buckle gives.</i> &quot;Better,&quot; he says.`;
    assert.equal(normalize(input), `Tim shifts on the bench. The buckle gives. "Better," he says.`);
});

test("7 - OOC stripped", () => {
    const input = `*Tim drops the pauldron.* (OOC: should I keep going with this scene?)`;
    assert.equal(normalize(input), `Tim drops the pauldron.`);
});
