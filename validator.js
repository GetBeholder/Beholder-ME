// Beholder client-side validator — a faithful JS port of the datagen
// `scripts/phase_e_validators.validate_merged_delta` + `strip_invalid_fields`.
//
// PARITY CONTRACT: datagen is the SOURCE (phase_e_validators.py), this is the
// MIRROR. Both are gated on the shared fixture tests/parity/validator_cases.json
// (generated FROM the Python validator). The constant tables live in the
// AUTO-GENERATED validator_data.js (dumped from the Python source — never edit by
// hand). Only the LOGIC is hand-ported here, and it is verified case-for-case
// against the oracle. See datagen docs/reference/SCHEMA.md + phase_e_validators.py.
//
// SCOPE (current increment): the full cross-field rule set of validate_merged_delta
// + the prose-aware COLOR-IN-ITEM rule. The remaining prose-aware rules
// (SEVERITY-INFLATION, X3-armor-form, X6-seam, missing/bare under-emission cues)
// are the next increment — the fixture grows to gate each as it lands, so parity
// holds on every case the fixture covers. `PORTED_RULES` records what's live.
import {
    PROXIMAL_OF, PASS_BY_BODY_FIELD, SPECIES_NO_LEGS, STANDARD_LEG_SLOTS,
    SPECIES_QUADRUPED, HIND_LEG_SLOTS, HIND_TO_REGULAR, MULTI_SLOT_TABLE,
    COLOR_WORDS_FOR_ITEM_CHECK, ITEM_CATEGORIES, VALID_SLOTS,
    MINOR_DEFAULT_INJURY_NOUNS, SEVERITY_ESCALATORS_PROSE, STRUCTURAL_DAMAGE_CUES,
    SOILING_ONLY_CUES, ARMOR_FORM_PROSE_QUALIFIERS, CRITICAL_ESCALATORS,
    SLOT_CATEGORY_STRIP, WOUND_SLOT_ANATOMY, SPECIES_REJECT_DESCRIPTORS,
    HOLDING_ADD_CUES, WORN_DON_CUES, HAND_WORN_STAPLES, INTERACTION_CUE_PHRASES,
    MUTEX_GARMENT_CLASSES,
} from './validator_data.js';
import { GARMENT_CANON } from './garment_data.js';

export const PORTED_RULES = new Set([
    'WRAPPER-NOT-OBJECT', 'CHANGED-NOT-BOOL', 'FALSE-HAS-DELTA', 'TRUE-MISSING-DELTA',
    'STAMINA-DROPPED', 'HOLDING-CLEAR-LEGACY-SENTINEL', 'SPECIES-LEG-OMISSION',
    'HIND-ON-NON-QUADRUPED', 'MISSING-DOMINANCE', 'MISSING-CASCADE', 'BARE-WORN-MUTEX',
    'ITEM-WRONG-SLOT', 'MULTI-SLOT-INCOMPLETE', 'ORPHAN-TAIL', 'COLOR-IN-ITEM',
    'SLOT-NOT-IN-SCHEMA', 'WOUND-WRONG-SLOT', 'SPECIES-IS-SOCIAL-DESCRIPTOR', 'CONFLICTING-WORN',
    // single-site per-slot prose rules
    'SEVERITY-INFLATION', 'X3-GENERIC-ARMOR-PROSE-HAS-FORM', 'X5-DAMAGE-NO-STRUCTURAL-CUE',
    'SOILING-WITH-DAMAGE-CHECK', 'SEVERITY-DEFLATION-SUSPECTED', 'WORN-ON-HAND-INTERACTION',
    // NOTE deferred (char-agnostic / dual-site scans, all detect-only): EXPLICIT-BARE-CUE-MISSED,
    // EXPLICIT-MISSING-CUE-MISSED, HOLDING-CLEAR-CUE-MISSED, HOLDING-ADD-CUE-MISSED,
    // X6-SEAM-CUE-PROSE, WORN-NOOP-OVEREMIT — next increment (grow the fixture with them).
]);

const escapeRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Mirror of _prose_has_phrase: multi-word/hyphen cues match as substring; single words as \b...\b. */
function proseHasPhrase(proseLower, cue) {
    if (cue.includes(' ') || cue.includes('-')) return proseLower.includes(cue);
    return new RegExp(`\\b${escapeRe(cue)}\\b`).test(proseLower);
}
/** Mirror of _armor_form_for_item: a phrase-local armor qualifier missing from a generic item='armor'. */
function armorFormForItem(proseLower, item) {
    const itemName = String(item.item || '').toLowerCase().trim();
    if (itemName !== 'armor') return null;
    const material = String(item.material || '').toLowerCase().trim();
    const haystack = [itemName, material].filter(Boolean).join(' ');
    for (const q of [...ARMOR_FORM_PROSE_QUALIFIERS].sort((a, b) => b.length - a.length)) {
        const qe = escapeRe(q);
        const re = new RegExp(`\\b${qe}\\b(?:\\W+\\w+){0,2}\\W+armor\\b|\\barmor\\W+(?:\\w+\\W+){0,2}${qe}\\b`);
        if (re.test(proseLower) && !haystack.includes(q)) return q;
    }
    return null;
}

// ── Sets + derived lookups (mirror the Python module-load derivations) ──
const S_NO_LEGS = new Set(SPECIES_NO_LEGS);
const S_STD_LEG = new Set(STANDARD_LEG_SLOTS);
const S_QUAD = new Set(SPECIES_QUADRUPED);
const S_HIND = new Set(HIND_LEG_SLOTS);
const S_VALID_SLOTS = new Set(VALID_SLOTS);
// Coverable-loss slots: a worn cover sits OVER the loss (eyepatch/ear-cover/gag),
// so `missing` does NOT strip a worn item here — unlike a limb.
const COVERABLE_MISSING_SLOTS = new Set(['left_eye', 'right_eye', 'left_ear', 'right_ear', 'mouth']);
const MULTI_SLOT = Object.fromEntries(Object.entries(MULTI_SLOT_TABLE).map(([k, v]) => [k, new Set(v)]));
// Canonical garment identity (plural→singular) so "boot"/"boots" are one identity.
const canonGarment = (s) => { const n = String(s ?? '').trim().toLowerCase(); return GARMENT_CANON[n] ?? n; };
// MULTI_SLOT_TABLE re-keyed into canonical space (mirror of Python MULTI_SLOT_CANON) so
// MULTI-SLOT-INCOMPLETE fires whether the surface is singular or plural.
const MULTI_SLOT_CANON = Object.fromEntries(
    Object.entries(MULTI_SLOT).map(([k, v]) => [canonGarment(k), v]));

const ITEM_TO_CATEGORY = new Map();
for (const [catName, cat] of Object.entries(ITEM_CATEGORIES)) {
    for (const it of cat.items) ITEM_TO_CATEGORY.set(it.toLowerCase(), catName);
}
const ITEM_KEYS_SORTED = [...ITEM_TO_CATEGORY.keys()].sort((a, b) => b.length - a.length);

// WS-REGION-STRIP: per-slot impossible-category strip-set (Set for O(1) lookup).
const SLOT_CAT_STRIP = Object.fromEntries(
    Object.entries(SLOT_CATEGORY_STRIP).map(([slot, cats]) => [slot, new Set(cats)]));
// WOUND-WRONG-SLOT: ordered [woundKey, okSlotSet] pairs (insertion order kept, as Python).
const WOUND_SLOT_ENTRIES = Object.entries(WOUND_SLOT_ANATOMY).map(([k, v]) => [k, new Set(v)]);
// V2 SPECIES-IS-SOCIAL-DESCRIPTOR: exact-match reject set (Set for O(1) lookup).
const SPECIES_REJECT = new Set(SPECIES_REJECT_DESCRIPTORS);
const S_HIND_SET = new Set(HIND_LEG_SLOTS);

// CONFLICTING-WORN: mutual-exclusion classes, each a Set of member tokens/phrases.
const MUTEX_CLASSES = Object.entries(MUTEX_GARMENT_CLASSES).map(([cls, members]) => [cls, new Set(members)]);
/** Mirror of phase_e_validators.mutex_garment_class — exact / multi-word substring / token. */
function mutexGarmentClass(itemName) {
    if (typeof itemName !== 'string') return null;
    const n = itemName.toLowerCase().trim();
    if (!n) return null;
    for (const [cls, members] of MUTEX_CLASSES) {
        if (members.has(n)) return cls;
        for (const m of members) { if (m.includes(' ') && n.includes(m)) return cls; }
        for (const tok of n.split(/[\s-]+/)) { if (members.has(tok)) return cls; }
    }
    return null;
}

/** Mirror of phase_e_validators.classify_item. */
export function classifyItem(itemName) {
    if (typeof itemName !== 'string') return null;
    const norm = itemName.toLowerCase().trim();
    if (!norm) return null;
    if (ITEM_TO_CATEGORY.has(norm)) return ITEM_TO_CATEGORY.get(norm);
    for (const key of ITEM_KEYS_SORTED) {
        if (key.includes(' ') && norm.includes(key)) return ITEM_TO_CATEGORY.get(key);
    }
    for (const tok of norm.split(/[\s-]+/)) {
        if (ITEM_TO_CATEGORY.has(tok)) return ITEM_TO_CATEGORY.get(tok);
    }
    return null;
}

const err = (rule_id, path, severity = 'error', pass_name = null) => ({ rule_id, path, severity, pass_name });

// ── Python-truthiness helpers (JS [] and {} are truthy; Python's are not) ──
const pyTruthy = (v) => {
    if (v === null || v === undefined || v === false || v === '' || v === 0) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object') return Object.keys(v).length > 0;
    return true;
};
// True unless the value is one of Python's "cleared" sentinels: None/[]/{}/False.
const isPresentField = (v) => {
    if (v === null || v === undefined || v === false) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (v && typeof v === 'object') return Object.keys(v).length > 0;
    return true;
};
const holdingPresent = (h) => !(h === null || h === undefined || h === ''
    || (typeof h === 'object' && !Array.isArray(h) && Object.keys(h).length === 0));

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/** Mirror of validate_wrapper_shape. */
export function validateWrapperShape(parsed) {
    if (parsed === null || parsed === undefined) return [];
    if (!isObj(parsed)) return [err('WRAPPER-NOT-OBJECT', 'root')];
    const out = [];
    const changed = parsed.changed;
    if (typeof changed !== 'boolean') {
        out.push(err('CHANGED-NOT-BOOL', 'changed'));
        return out;
    }
    const hasDelta = 'delta' in parsed;
    const delta = parsed.delta;
    if (changed === false && hasDelta && pyTruthy(delta)) {
        out.push(err('FALSE-HAS-DELTA', 'delta'));
    } else if (changed === true) {
        if (!isObj(delta) || Object.keys(delta).length === 0) {
            out.push(err('TRUE-MISSING-DELTA', 'delta'));
        }
    }
    return out;
}

/** Mirror of validate_merged_delta (cross-field rules + prose COLOR-IN-ITEM). */
export function validateMergedDelta(merged, { persona = null, prevState = {}, prose = null } = {}) {
    let errors = validateWrapperShape(merged);
    if (errors.some((e) => e.severity === 'error')) return errors;
    if (!isObj(merged)) return errors;

    if (!merged.changed) {
        if (typeof prose === 'string' && prose.trim()) {
            errors = errors.concat(proseAwareChecks(merged, prose, prevState || {}));
        }
        return errors;
    }
    const delta = merged.delta;
    if (!isObj(delta)) return errors;
    prevState = prevState || {};

    for (const [char, charData] of Object.entries(delta)) {
        if (!isObj(charData)) continue;
        if ('stamina' in charData) {
            errors.push(err('STAMINA-DROPPED', `delta.${char}.stamina`));
        }
        const prevChar = (isObj(prevState[char]) ? prevState[char] : null) || {};
        const speciesRaw = charData.species || prevChar.species;
        const speciesNorm = typeof speciesRaw === 'string' ? speciesRaw.toLowerCase().trim() : null;

        // Mirror Python `body = char_data.get("body") or {}`: a species-only char
        // (no body) still runs the per-char rules below (V2, orphan-tail). A truthy
        // non-object body (string/array) is skipped, as Python's isinstance guard does.
        const body = charData.body || {};
        if (!isObj(body)) continue;

        // Rule V2: SPECIES-IS-SOCIAL-DESCRIPTOR — a NEWLY-emitted species whose
        // normalized value EXACTLY equals a social/rank/blood-status descriptor is a
        // labeler/model confusion; strip it (absence defaults to human). Escape hatch:
        // keep it if the SAME delta co-emits species-conditional anatomy (tail / hind_*).
        if (typeof charData.species === 'string') {
            const nsNorm = charData.species.trim().toLowerCase().replace(/\s+/g, ' ');
            if (SPECIES_REJECT.has(nsNorm)) {
                const tail = body.tail;
                const hasAnatomySignal = (isObj(tail) && Object.keys(tail).length > 0)
                    || Object.keys(body).some((s) => S_HIND_SET.has(s));
                if (!hasAnatomySignal) {
                    errors.push(err('SPECIES-IS-SOCIAL-DESCRIPTOR', `delta.${char}.species`, 'error', 'species'));
                }
            }
        }

        const itemsBySlot = new Map();   // item_norm -> [slots]

        for (const [slot, slotData] of Object.entries(body)) {
            if (!isObj(slotData)) continue;

            // SLOT-NOT-IN-SCHEMA — an invented slot ("right_eyebrow") is garbage; strip it.
            if (!S_VALID_SLOTS.has(slot)) {
                errors.push(err('SLOT-NOT-IN-SCHEMA', `delta.${char}.body.${slot}`, 'error', null));
                continue;
            }

            if (slotData.holding === '') {
                errors.push(err('HOLDING-CLEAR-LEGACY-SENTINEL', `delta.${char}.body.${slot}.holding`, 'error', 'holding'));
            }

            if (speciesNorm && S_NO_LEGS.has(speciesNorm) && S_STD_LEG.has(slot)) {
                let ownerPass = 'species';
                for (const f of Object.keys(slotData)) {
                    ownerPass = PASS_BY_BODY_FIELD[f] || ownerPass;
                    if (ownerPass !== 'species') break;
                }
                errors.push(err('SPECIES-LEG-OMISSION', `delta.${char}.body.${slot}`, 'error', ownerPass));
            }

            if (S_HIND.has(slot) && !S_QUAD.has(speciesNorm || 'human')) {
                errors.push(err('HIND-ON-NON-QUADRUPED', `delta.${char}.body.${slot}`, 'suggestion', 'species'));
            }

            if (slotData.missing === true) {
                for (const conflict of ['worn', 'wounds', 'holding', 'bare']) {
                    // Coverable slots (eyes/ears/mouth) keep a worn COVER over the loss.
                    if (conflict === 'worn' && COVERABLE_MISSING_SLOTS.has(slot)) continue;
                    if (isPresentField(slotData[conflict])) {
                        errors.push(err('MISSING-DOMINANCE', `delta.${char}.body.${slot}.${conflict}`, 'error', PASS_BY_BODY_FIELD[conflict] || null));
                    }
                }
            }

            if (slotData.missing !== true) {
                const hasState = pyTruthy(slotData.worn) || pyTruthy(slotData.wounds)
                    || holdingPresent(slotData.holding) || slotData.bare === true;
                if (hasState) {
                    const prevBody = (isObj(prevChar.body) ? prevChar.body : null) || {};
                    for (const anc of (PROXIMAL_OF[slot] || [])) {
                        const inDelta = isObj(body[anc]) && body[anc].missing === true;
                        const inPrev = isObj(prevBody[anc]) && prevBody[anc].missing === true;
                        if (inDelta || inPrev) {
                            errors.push(err('MISSING-CASCADE', `delta.${char}.body.${slot}`, 'error', null));
                            break;
                        }
                    }
                }
            }

            if (slotData.bare === true && Array.isArray(slotData.worn) && slotData.worn.length > 0) {
                errors.push(err('BARE-WORN-MUTEX', `delta.${char}.body.${slot}.bare`, 'error', 'flags'));
            }

            if (Array.isArray(slotData.worn)) {
                slotData.worn.forEach((w, i) => {
                    if (!isObj(w)) return;
                    const itemName = w.item;
                    if (typeof itemName !== 'string') return;
                    const norm = canonGarment(itemName);   // canonical: "boot"+"boots" group
                    if (!itemsBySlot.has(norm)) itemsBySlot.set(norm, []);
                    itemsBySlot.get(norm).push(slot);
                    const category = classifyItem(itemName);
                    if (category) {
                        const catRules = ITEM_CATEGORIES[category];
                        if (!catRules.allowed_slots.includes(slot)) {
                            // WS-REGION-STRIP: escalate to error (auto-strip) when this
                            // category is anatomically impossible on this slot; else keep
                            // the category's own severity (warning, or error for armor).
                            const severity = (SLOT_CAT_STRIP[slot] && SLOT_CAT_STRIP[slot].has(category))
                                ? 'error' : (catRules.severity || 'warning');
                            errors.push(err(`ITEM-WRONG-SLOT-${category.toUpperCase()}`,
                                `delta.${char}.body.${slot}.worn[${i}]`, severity, 'worn'));
                        }
                    }
                });
            }

            // CONFLICTING-WORN — 2+ mutually-exclusive garments on ONE slot (chainmail +
            // plate armor + leather armor on chest). Keep the FIRST of each mutex class,
            // strip the rest (error). Descending-index strip handled by stripInvalidFields.
            if (Array.isArray(slotData.worn)) {
                const seenMutex = new Map();
                slotData.worn.forEach((w, i) => {
                    if (!isObj(w)) return;
                    const cls = mutexGarmentClass(w.item);
                    if (cls === null) return;
                    if (seenMutex.has(cls)) {
                        errors.push(err('CONFLICTING-WORN', `delta.${char}.body.${slot}.worn[${i}]`, 'error', 'worn'));
                    } else {
                        seenMutex.set(cls, i);
                    }
                });
            }

            // WOUND-WRONG-SLOT — a wound whose text names an unambiguous, cross-genre
            // anatomy on a slot that anatomy cannot occupy (concussion on 'back').
            // Substring match; if slot ∉ mapped family → error/strip wounds[i]. Guard:
            // a legless species has no foot/leg slot, so a foot-bound wound stays put.
            if (Array.isArray(slotData.wounds)) {
                slotData.wounds.forEach((wnd, i) => {
                    if (!isObj(wnd)) return;
                    const wtext = wnd.text;
                    if (typeof wtext !== 'string') return;
                    const wtextNorm = wtext.toLowerCase();
                    for (const [woundKey, okSlots] of WOUND_SLOT_ENTRIES) {
                        if (wtextNorm.includes(woundKey) && !okSlots.has(slot)) {
                            if (S_NO_LEGS.has(speciesNorm) && [...okSlots].every((s) => S_STD_LEG.has(s))) break;
                            errors.push(err('WOUND-WRONG-SLOT', `delta.${char}.body.${slot}.wounds[${i}]`, 'error', 'wounds'));
                            break;
                        }
                    }
                });
            }
        }

        // MULTI-SLOT-INCOMPLETE (per char, after all slots)
        for (const [itemNorm, slotsSeen] of itemsBySlot) {
            const required = MULTI_SLOT_CANON[itemNorm];   // itemNorm is canonical
            if (!required) continue;
            const seen = new Set(slotsSeen);
            const missing = [...required].filter((s) => !seen.has(s));
            if (!missing.length) continue;
            const prevBody = (isObj(prevChar.body) ? prevChar.body : null) || {};
            const stillMissing = [];
            for (const mSlot of missing) {
                const prevWorn = (isObj(prevBody[mSlot]) && Array.isArray(prevBody[mSlot].worn)) ? prevBody[mSlot].worn : [];
                const foundInPrev = prevWorn.some((p) => isObj(p) && canonGarment(p.item) === itemNorm);
                if (!foundInPrev) stillMissing.push(mSlot);
            }
            if (stillMissing.length) {
                const seenPath = [...slotsSeen].sort().join('/');
                errors.push(err('MULTI-SLOT-INCOMPLETE', `delta.${char}.body.${seenPath}.worn[item=${itemNorm}]`, 'warning', 'worn'));
            }
        }

        // ORPHAN-TAIL
        if ('tail' in body && speciesNorm === null) {
            const tailData = isObj(body.tail) ? body.tail : {};
            const meaningful = ['worn', 'wounds', 'holding', 'bare', 'missing'].some((k) => pyTruthy(tailData[k]));
            if (meaningful) errors.push(err('ORPHAN-TAIL', `delta.${char}.body.tail`, 'warning', 'species'));
        }
    }

    if (typeof prose === 'string' && prose.trim()) {
        errors = errors.concat(proseAwareChecks(merged, prose, prevState));
    }
    return errors;
}

// ── Prose-aware checks (single-site per-slot rules; char-agnostic scans deferred) ──
function proseAwareChecks(merged, prose, prevState) {
    const out = [];
    const delta = (merged && merged.delta) || {};
    if (!isObj(delta)) return out;
    const proseLower = prose.toLowerCase();
    const hasEscalator = SEVERITY_ESCALATORS_PROSE.some((esc) => proseLower.includes(esc));
    const hasStructuralDamageCue = STRUCTURAL_DAMAGE_CUES.some((cue) => proseHasPhrase(proseLower, cue));
    const hasSoilingOnlyCue = SOILING_ONLY_CUES.some((cue) => proseHasPhrase(proseLower, cue));
    // WORN-ON-HAND-INTERACTION (Rule 2): a grip/grab cue (holding) OR a specific touch/
    // reach idiom (interaction), with no don cue.
    const hasHoldingAddCue = HOLDING_ADD_CUES.some((c) => proseHasPhrase(proseLower, c));
    const hasInteractionCue = INTERACTION_CUE_PHRASES.some((c) => proseHasPhrase(proseLower, c));
    const hasHandInteraction = hasHoldingAddCue || hasInteractionCue;
    const hasDonCue = WORN_DON_CUES.some((c) => proseHasPhrase(proseLower, c));

    for (const [char, charData] of Object.entries(delta)) {
        if (!isObj(charData)) continue;
        const body = charData.body;
        if (!isObj(body)) continue;
        const prevCharBody = ((isObj(prevState[char]) ? prevState[char] : {}).body) || {};
        for (const [slot, slotData] of Object.entries(body)) {
            if (!isObj(slotData)) continue;
            const worn = Array.isArray(slotData.worn) ? slotData.worn : [];

            // WORN-ON-HAND-INTERACTION (Rule 2): an UNCLASSIFIED item newly worn on a hand,
            // gripped/grabbed OR touched/reached-for in prose with no don cue, is a held/
            // touched object mis-filed as worn. WARNING only. Classified non-native items →
            // ITEM-WRONG-SLOT; legit hand-wear (bandage/wrap/brace/cast) is suppressed via
            // HAND_WORN_STAPLES.
            if ((slot === 'left_hand' || slot === 'right_hand') && hasHandInteraction && !hasDonCue) {
                const prevWorn = (isObj(prevCharBody[slot]) && Array.isArray(prevCharBody[slot].worn))
                    ? prevCharBody[slot].worn : [];
                const prevItems = new Set(prevWorn.filter(isObj).map((w) => canonGarment(w.item)));
                worn.forEach((w, i) => {
                    if (!isObj(w) || typeof w.item !== 'string') return;
                    if (prevItems.has(canonGarment(w.item))) return;   // not new on this hand
                    if (classifyItem(w.item) !== null) return;         // classified → ITEM-WRONG-SLOT
                    const il = w.item.trim().toLowerCase();
                    if (!il || !proseLower.includes(il)) return;       // gripped object must be THIS item
                    if (HAND_WORN_STAPLES.some((staple) => il.includes(staple))) return; // legit hand-wear
                    out.push(err('WORN-ON-HAND-INTERACTION', `delta.${char}.body.${slot}.worn[${i}]`, 'warning', 'worn'));
                });
            }

            // #1 SEVERITY-INFLATION — a minor-default injury noun labelled serious/critical
            // with no prose escalator.
            (Array.isArray(slotData.wounds) ? slotData.wounds : []).forEach((wound, i) => {
                if (!isObj(wound)) return;
                const text = String(wound.text || '').toLowerCase().trim();
                const severity = String(wound.severity || '').toLowerCase().trim();
                if (severity !== 'serious' && severity !== 'critical') return;
                if (MINOR_DEFAULT_INJURY_NOUNS.some((n) => text.includes(n)) && !hasEscalator) {
                    out.push(err('SEVERITY-INFLATION', `delta.${char}.body.${slot}.wounds[${i}].severity`, 'warning', 'wounds'));
                }
            });

            // #2 COLOR-IN-ITEM — a color word inside the item name (the only error prose rule).
            worn.forEach((w, i) => {
                if (!isObj(w) || typeof w.item !== 'string') return;
                const itemLower = w.item.toLowerCase().trim();
                let colorFound = null;
                for (const color of COLOR_WORDS_FOR_ITEM_CHECK) {
                    if (color.includes(' ') || color.includes('-')) {
                        if (itemLower.includes(color)) { colorFound = color; break; }
                    } else if (new RegExp(`\\b${escapeRe(color)}\\b`).test(itemLower)) { colorFound = color; break; }
                }
                if (colorFound) out.push(err('COLOR-IN-ITEM', `delta.${char}.body.${slot}.worn[${i}].item`, 'error', 'worn'));
            });

            // #4 X3-GENERIC-ARMOR-PROSE-HAS-FORM — generic item='armor' when prose names a form.
            worn.forEach((w, i) => {
                if (isObj(w) && armorFormForItem(proseLower, w)) {
                    out.push(err('X3-GENERIC-ARMOR-PROSE-HAS-FORM', `delta.${char}.body.${slot}.worn[${i}].item`, 'warning', 'worn'));
                }
            });

            // #5 X5-DAMAGE-NO-STRUCTURAL-CUE / SOILING-WITH-DAMAGE-CHECK — worn/held damage
            // upgraded with no structural cue in prose (or only a soiling cue).
            const damageEntries = [
                ['worn', worn],
                ['holding', isObj(slotData.holding) ? [slotData.holding] : []],
            ];
            for (const [fieldName, entries] of damageEntries) {
                entries.forEach((item, i) => {
                    if (!isObj(item)) return;
                    const damage = String(item.damage || '').toLowerCase().trim();
                    if (damage !== 'damaged' && damage !== 'broken') return;
                    const owner = fieldName === 'holding' ? 'holding' : 'worn';
                    const idx = fieldName === 'holding' ? '' : `[${i}]`;
                    const path = `delta.${char}.body.${slot}.${fieldName}${idx}.damage`;
                    if (!hasStructuralDamageCue) {
                        out.push(err('X5-DAMAGE-NO-STRUCTURAL-CUE', path, 'warning', owner));
                    } else if (hasSoilingOnlyCue) {
                        out.push(err('SOILING-WITH-DAMAGE-CHECK', path, 'suggestion', owner));
                    }
                });
            }

            // SEVERITY-DEFLATION-SUSPECTED — a critical escalator near the slot but no critical wound.
            const wnds = (Array.isArray(slotData.wounds) ? slotData.wounds : []).filter(isObj);
            if (wnds.length && wnds.every((w) => String(w.severity || '') !== 'critical')) {
                const phrase = slot.replace(/_/g, ' ');
                const at = proseLower.indexOf(phrase);
                if (at >= 0) {
                    const win = proseLower.slice(Math.max(0, at - 50), at + phrase.length + 50);
                    if (CRITICAL_ESCALATORS.some((esc) => win.includes(esc))) {
                        out.push(err('SEVERITY-DEFLATION-SUSPECTED', `delta.${char}.body.${slot}.wounds`, 'suggestion', 'wounds'));
                    }
                }
            }
        }
    }
    return out;
}

// ── strip_invalid_fields + _remove_path + _prune_empties ──

function removePath(obj, path) {
    if (!path.startsWith('delta')) return;
    let rest = path.slice('delta'.length);
    if (rest.startsWith('.')) rest = rest.slice(1);
    const tokens = [];   // ['key', v] | ['idx', v]
    let i = 0, cur = '';
    while (i < rest.length) {
        const c = rest[i];
        if (c === '.') {
            if (cur) { tokens.push(['key', cur]); cur = ''; }
            i += 1;
        } else if (c === '[') {
            if (cur) { tokens.push(['key', cur]); cur = ''; }
            const j = rest.indexOf(']', i);
            tokens.push(['idx', rest.slice(i + 1, j)]);
            i = j + 1;
        } else { cur += c; i += 1; }
    }
    if (cur) tokens.push(['key', cur]);
    if (!tokens.length) return;

    const delta = obj.delta;
    if (!isObj(delta)) return;
    let parent = delta;
    for (const [kind, val] of tokens.slice(0, -1)) {
        if (kind === 'key') {
            if (!isObj(parent) || !(val in parent)) return;
            parent = parent[val];
        } else {
            const idx = parseInt(val, 10);
            if (!Array.isArray(parent) || Number.isNaN(idx) || idx >= parent.length) return;
            parent = parent[idx];
        }
    }
    const [lastKind, lastVal] = tokens[tokens.length - 1];
    if (lastKind === 'key') {
        if (isObj(parent) && lastVal in parent) delete parent[lastVal];
    } else {
        const idx = parseInt(lastVal, 10);
        if (Array.isArray(parent) && idx >= 0 && idx < parent.length) parent.splice(idx, 1);
    }
}

// Paths (`char.slot.field`) where the MODEL emitted an already-empty worn/wounds list. That
// empty list is an explicit CLEAR sentinel ("took it all off") the state layer honours — so it
// must survive pruneEmpties, unlike a list that only became empty after an invalid item was
// stripped (which should collapse to a no-op so it can't wrongly wipe the existing stack).
function keepOriginallyEmpty(parsed) {
    const keep = new Set();
    const delta = parsed && parsed.delta;
    if (!isObj(delta)) return keep;
    for (const char of Object.keys(delta)) {
        const body = isObj(delta[char]) ? delta[char].body : null;
        if (!isObj(body)) continue;
        for (const slot of Object.keys(body)) {
            const sd = body[slot];
            if (!isObj(sd)) continue;
            for (const lf of ['worn', 'wounds']) {
                if (Array.isArray(sd[lf]) && sd[lf].length === 0) keep.add(`${char}.${slot}.${lf}`);
            }
        }
    }
    return keep;
}
function pruneEmpties(parsed, keep) {
    const delta = parsed.delta;
    if (!isObj(delta)) return;
    for (const char of Object.keys(delta)) {
        const cd = delta[char];
        if (!isObj(cd)) continue;
        const body = cd.body;
        if (isObj(body)) {
            for (const slot of Object.keys(body)) {
                const sd = body[slot];
                if (isObj(sd)) {
                    for (const lf of ['worn', 'wounds']) {
                        if (lf in sd && Array.isArray(sd[lf]) && sd[lf].length === 0) {
                            if (keep && keep.has(`${char}.${slot}.${lf}`)) continue; // model's explicit clear — keep it
                            delete sd[lf];
                        }
                    }
                    if (Object.keys(sd).length === 0) delete body[slot];
                } else if (sd === null || sd === undefined || sd === '' ||
                           (Array.isArray(sd) && sd.length === 0) ||
                           (isObj(sd) && Object.keys(sd).length === 0)) {
                    delete body[slot];
                }
            }
            if (Object.keys(body).length === 0) delete cd.body;
        }
        if (Object.keys(cd).length === 0) delete delta[char];
    }
    if (Object.keys(delta).length === 0) {
        parsed.changed = false;
        delete parsed.delta;
    }
}

/** The trailing [N] list index in a path, or -1 if none (see stripInvalidFields). */
function lastListIndex(path) {
    const m = path.match(/\[(\d+)\]/g);
    return m ? parseInt(m[m.length - 1].slice(1, -1), 10) : -1;
}

/** Mirror of strip_invalid_fields — removes error-severity paths (deepest first,
 *  then DESCENDING list index so same-list strips don't shift each other's index). */
export function stripInvalidFields(parsed, errors) {
    if (!parsed) return parsed;
    const result = JSON.parse(JSON.stringify(parsed));
    const fatal = errors.filter((e) => e.severity === 'error');
    const depth = (p) => p.split('.').length - 1;
    fatal.sort((a, b) => (depth(b.path) - depth(a.path)) || (lastListIndex(b.path) - lastListIndex(a.path)));
    // Snapshot the model's explicit clears (already-empty worn/wounds) BEFORE stripping, then
    // preserve exactly those through pruneEmpties so a "took it all off" clear reaches the state.
    const keep = keepOriginallyEmpty(parsed);
    for (const e of fatal) removePath(result, e.path);
    pruneEmpties(result, keep);
    return result;
}

/** Convenience: the eval's "validators ON" transform. Returns findings + stripped. */
export function applyValidator(merged, opts = {}) {
    const findings = validateMergedDelta(merged, opts);
    const stripped = stripInvalidFields(merged, findings);
    return { findings, stripped };
}

/**
 * H2 — one-shot sweep over ALREADY-PERSISTED per-character state (not a delta). Runs the
 * same validator the live path runs, but over the full stored state, so impossible
 * phantoms minted before the seed/live validator shipped (an eyepatch-on-hand, a
 * concussion-on-back, a "pureblood" species) are cleaned retroactively.
 *
 * NEVER strips a user-locked slot (pass `isSlotLocked(char, slot)`), and only
 * error-severity findings strip — warnings/suggestions are reported for triage but
 * left in place. Prose-aware rules are skipped (there is no single narration for a
 * snapshot). Returns { cleaned, findings, removed, changed }.
 *
 * @param {object} state  the full persisted state (char -> {body, species, ...})
 * @param {{persona?: string|null, isSlotLocked?: (char:string, slot:string)=>boolean}} [opts]
 */
export function sweepState(state, { persona = null, isSlotLocked = () => false } = {}) {
    if (!isObj(state) || Object.keys(state).length === 0) {
        return { cleaned: state, findings: [], removed: [], changed: false };
    }
    const wrapped = { changed: true, delta: state };
    const findings = validateMergedDelta(wrapped, { persona, prevState: {}, prose: null });
    // Only error-severity strips; a locked slot is sacred (the user set it deliberately).
    const removed = findings.filter((f) => {
        if (f.severity !== 'error') return false;
        const m = /^delta\.(.+?)\.body\.([^.[]+)/.exec(f.path);
        if (m && isSlotLocked(m[1], m[2])) return false;
        return true;
    });
    const out = stripInvalidFields(wrapped, removed);
    const cleaned = (out && out.changed && isObj(out.delta)) ? out.delta : {};
    const changed = JSON.stringify(cleaned) !== JSON.stringify(state);
    return { cleaned, findings, removed, changed };
}
