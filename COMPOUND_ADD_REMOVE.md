# TODO — compound add+remove clauses lose the removal

**Status:** open. Reproduced against the trained extractor (Beholder-Q8_0), 2026-08-22.

## The failure

When one sentence both takes a garment off and puts another on, the extractor
emits one half and drops the other. It is not a removal capability problem —
removal alone is reliable.

Measured on a 15-case probe (8 compound, 3 removal-only, 4 addition-only), the
worn lane, temperature 0, with prior state present:

| prose | removal emitted |
|---|---|
| removal only ("hangs the cloak on a hook") | **3/3** |
| addition only ("pulls on black boots") | n/a, additions **4/4** |
| compound ("hangs the cloak on a hook **and** pulls on black boots") | **2/8** |

In the compound cases where the removal *did* fire, the addition was dropped
instead — the model produces one kind of change per sentence, never both.

There is a second half to it: the added garment sometimes lands on the slots
being removed from. `"hangs the cloak … and pulls on black boots"` put `boot`
on `chest` and `back`.

Consequence: a garment that never comes off stays in state and is fed back into
the next prompt, so a single miss compounds for the rest of the scene.

## What does not fix it

Five prompt variants appended to or reordered within the worn lane, all scored
on the same probe. Every one left compound removal at **2/8**:

| variant | compound removal | right-slots |
|---|---|---|
| shipped prompt (baseline) | 2/8 | 4/8 |
| explicit "one sentence can do BOTH" rule | 2/8 | 3/8 |
| worked swap example with expected JSON | 2/8 | 4/8 |
| "read each clause separately" | 2/8 | 3/8 |
| terse "worn_remove MUST appear" | 2/8 | 3/8 |
| existing removal bullet moved last (no new words) | 2/8 | 4/8 |

Controls never moved (removal-only 3/3, addition-only 4/4), so the variants were
not trading one behaviour for another — they simply had no effect. A 0.8B follows
what it was trained on; instructions it never saw in training do not take.

**Do not spend more time on prompt wording.** The probe lives in the DataGen repo
if it needs re-running.

## The actual fix

Training data. Compound add+remove clauses look under-represented in the corpus,
and the model has learned that a sentence yields one kind of change. This wants a
labelled round of single-clause swaps ("peels off X and ties on Y") and a retrain.

## Interim options

The extension owns both its extraction and its merge (`state.js`), so unlike the
Marinara package it *can* carry a deterministic repair:

1. **Re-ask on a removal cue.** When the prose matches a takeoff pattern
   (`takes off`, `peels off`, `kicks off`, `unbuckles`, `hangs … on`, `strips out
   of`, `shrugs off`) and the reply carried no `worn_remove`, run the worn lane a
   second time with removal-only framing and merge the two replies. Costs one
   extra call on the sentences that need it. Removal-only prose scores 3/3, so
   the second pass is asking the model something it is good at.
2. **Slot-plausibility guard on the addition.** A garment→slot map (boots →
   feet, gloves → hands) rejects the `boot on chest` half. This is the cheaper
   half and fixes a visible symptom, not the loss.

Both are workarounds. Neither removes the need for the data round.
