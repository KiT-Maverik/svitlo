# Add Tens and Ones in Columns — Methodologist Brief

Date: 2026-10-31
Lesson slug: additionInColumns
Methodologist status: Draft
Primary audience: **Grade 2** within grades 1–3
Code: Not implemented
Program dependence: None

## Educational purpose

Explain how written column addition aligns equal place values and uses a carry mark to record a real exchange of ten ones for one ten. Start by reading two-digit place values correctly, then add 27+35=62 with an exact physical model. This lesson focuses on column notation and single ones-to-tens carry, distinct from the age-neutral broader Skill 'Addition with regrouping'.

## Target audience

Grade 2 as a lesson-specific pedagogical decision. The source Skill remains independent of grade and retains its entire mathematical scope.

## Prerequisites

- Know two-digit numeration: a tens digit names tens and a ones digit names single units.
- Add one-digit quantities through fourteen, and exchange ten ones for one ten without changing amount.
- Read addition equality, align numerals by place value rather than by appearance; `additionCrossingTen` offers the relevant concept.

## Target Skills

- [columnAddition.data.ts](../../../../data/skills/arithmetic/addition/skills/columnAddition.data.ts)

## Expected learning outcomes

- Place 27 and 35 on a labeled Tens/Ones board with each digit correctly valued.
- Explain why 7 ones + 5 ones = 12 ones requires recording 2 ones and carrying 1 ten.
- Compute 27+35=62 in columns and reconcile it with two independent counter totals.
- Use an aligned two-digit column to calculate 46+28=74 and verify the result with place-value decomposition.

## Essential subject matter

27 = 2 tens+7 ones, 35=3 tens+5 ones. Add ones: 7+5=12=1 ten+2 ones, record 2 ones and a carried ten. Tens: 2+3+1=6 tens, sum 62. Unregrouped example 23+14=37 demonstrates aligning tens with tens, ones with ones. Transfer 46+28: 6+8=14 → 4 ones+1 ten; 4+2+1=7 tens →74. Use only nonnegative two-digit operands and sum under 100, one carry at most, no stacked three-digit or multiple-carry work in this Lesson.

## Conceptual progression and dependencies

1. **Put Every Digit in Its Place:** A labeled 'Tens | Ones' board and exact ledger place 27 as 2T7O and 35 as 3T5O. Child selects cells with accessible buttons, checks each named place, and can inspect 23+14=37 without carry as a contrast.
2. **Twelve Ones Need an Exchange:** The child combines 7 and 5 uniquely identified singles, then exchanges exactly ten for a bundle of ten. Column ones outcome becomes digit 2, a clearly labeled 'carry 1 ten' marker appears above tens.
3. **Complete Twenty-Seven Plus Thirty-Five:** Add tens on the board: 2+3+1=6 tens; append 2 ones. Show the original 27+35 above a resulting 62 and a full invariant 20+7+30+5=62.
4. **Try a New Column:** Fresh empty Tens/Ones board with operands 46 and 28 correctly aligned. Learner can place carry, record 6+8=14 as 1T4O, and compute 4+2+1=7 tens. Optional reveal always available.

## Misconceptions, examples and boundaries

Writing 27 and 35 without aligning tens and ones can lead to adding mismatched place values. A child may write 7+5=12 as the entire ones digit '12' and then append tens; may record carry 1 but leave 12 ones as well, making 72; may add tens 2+3=5 and forget the carry, making 52. A carry is a named ten, not an arbitrary extra one. No column procedure should be shown before the physical exchange is understood.

## Localization, accessibility and offline intent

All learner-facing strings/controls and count/value explanations must be genuinely translated across every supported locale with no English fallback. Provide H/T/O state ledger with native keyboard/switch/touch operations, nonvisual before/after and clear provenance for each carry, semantic RTL column labels, large focusable targets, 200% zoom/mobile, reduced-motion and full local offline operation after selected-locale download. No forced dragging, sound, speech recognition or timed response.

## Sources and factual verification

- [Canonical Skill Code](../../../../data/skills/arithmetic/addition/skills/columnAddition.data.ts), copied byte-for-byte from Mathematics.
- [English Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md), generated and coordinator-owned; must be regenerated after integration.
- [Common Core mathematics standards](https://corestandards.org/mathematics-standards/) comparative reference only, not nationally approved Curriculum alignment.

## Curriculum / Program compatibility

Not specified. Grade 2 is the selected primary audience, not a grade limit on the Skill.

## Open editorial decisions

- Confirm this Lesson's single-carry Grade 2 depth and separation from `additionRegroupingAcrossPlaces`, which extends the _value-preserving exchange_ across tens and hundreds.
- Confirm numeric examples, aligned place-value meaning and equivalent nonvisual/counter operations before production.

## Methodologist handoff

**Draft, not approved.** The adjoining Screenwriter Content is _provisional_, not an official Methodologist sign-off. No React Scene, Question, Quiz, Score or production wiring is authorized by this Draft.
