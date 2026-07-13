// Parity test (JS side): the extension's validator.js against the SHARED fixture
// validator_cases.json, which is GENERATED FROM the datagen validator
// (phase_e_validators.validate_merged_delta + strip_invalid_fields). Datagen is
// the source of truth; this asserts the JS mirror reproduces the same findings
// (rule_id/path/severity) and the same stripped delta on every case.
//
// Fixture vendored from datagen/tests/parity/validator_cases.json — regenerate
// there (python tests/parity/gen_validator_cases.py) and re-copy on any change.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateMergedDelta, stripInvalidFields, PORTED_RULES } from '../validator.js';

const { cases } = JSON.parse(
    readFileSync(new URL('./validator_cases.json', import.meta.url), 'utf8'),
);

// A finding's rule family (ITEM-WRONG-SLOT-BAG -> ITEM-WRONG-SLOT).
const family = (rid) => (rid.startsWith('ITEM-WRONG-SLOT-') ? 'ITEM-WRONG-SLOT' : rid);
const sig = (fs) => fs.map((f) => [f.rule_id, f.path, f.severity])
    .sort((a, b) => (a.join('|') < b.join('|') ? -1 : 1));
// The JS validator implements exactly PORTED_RULES; the Python oracle may also carry
// deferred rules the JS doesn't (e.g. HOLDING-ADD-CUE-MISSED). Parity is asserted on
// the PORTED SCOPE: JS findings must equal the oracle's ported-family findings. The
// `stripped` delta is compared IN FULL, so any unported ERROR-severity rule that strips
// in Python but not JS still fails the test (correctly forcing that rule to be ported).
const ported = (fs) => fs.filter((f) => PORTED_RULES.has(family(f.rule_id)));

for (const c of cases) {
    test(`validator parity: ${c.name}`, () => {
        const { merged, prev, persona, prose } = c.input;
        const findings = validateMergedDelta(merged, { persona, prevState: prev, prose });
        assert.deepEqual(sig(findings), sig(ported(c.findings)),
            'ported-scope findings (rule_id/path/severity) must match the Python oracle');
        const stripped = stripInvalidFields(merged, findings);
        assert.deepEqual(stripped, c.stripped, 'stripped delta must match the Python oracle');
    });
}
