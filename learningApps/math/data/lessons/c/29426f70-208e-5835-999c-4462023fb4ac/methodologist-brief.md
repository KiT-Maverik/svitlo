# Regrouping Ones and Tens Into Hundreds — Methodologist Brief

Date: 2026-10-31
Lesson slug: additionRegroupingAcrossPlaces
Methodologist status: Draft
Primary audience: **Grade 3** within grades 1–3
Code: Not implemented
Program dependence: None

## Educational purpose

Develop place-value addition with multiple successive exchanges by grouping ten ones into a ten and ten tens into a hundred. Children control the physical and symbolic steps for 178+265 and verify the conserved sum 443. This Lesson extends the earlier two-digit column method; it does not redefine the canonical Skill's much broader numerical scope.

## Target audience

Grade 3 as a lesson-specific pedagogical decision. The source Skill remains independent of grade and retains its entire mathematical scope.

## Prerequisites

- Know base-ten numbers to at least 999: 1H=10T, 1T=10O, and each column has a specific value.
- Understand the two-digit written column method and one carried ten.
- Add ones and tens with totals above ten; track a carry once, and distinguish exchanging representation from changing quantity.

## Target Skills

- [regrouping.data.ts](../../../../data/skills/arithmetic/addition/skills/regrouping.data.ts)

## Expected learning outcomes

- Represent 178 and 265 as hundreds, tens and ones without misplacing a digit.
- Combine 8+5=13 ones into 1 ten and 3 ones, correctly recording where the ten goes.
- Combine 7+6+1=14 tens into 1 hundred and 4 tens and obtain 178+265=443.
- Solve a second example 268+157=425 with consecutive carries and verify both examples through decomposition.

## Essential subject matter

178 = 1H7T8O; 265=2H6T5O. Sum in unexchanged units = 3H13T13O = 300+130+13=443. Exchange 13 ones →1T3O, so 3H14T3O; exchange 14 tens →1H4T, obtaining 4H4T3O =443. Column order: ones 8+5=13, carry one ten; tens 7+6+1=14, carry one hundred; hundreds 1+2+1=4. Transfer: 268+157: 8+7=15 ones →5O +1T; 6+5+1=12 tens →2T +1H; 2+1+1=4 hundreds, result 425. These are **two linked carrying steps**; no arbitrary larger values, decimals, negative numbers or full general proof required. Sum remains below 1000.

## Conceptual progression and dependencies

1. **Read Three Places:** Display a 3-column H/T/O board plus two labeled collections 1H7T8O and 2H6T5O. Learner inspects each place and combines the contributions into raw 3H13T13O without yet calling it the final numeral.
2. **Thirteen Ones Become a Ten:** Learner combines unique 8O and 5O, exchanges ten for a ten-bundle, places 3 ones in result and a carried ten above tens, updating the total ledger to 3H14T3O.
3. **Fourteen Tens Become a Hundred:** Show 7T+6T+1T=14T, with one ten-bundle from the previous exchange. Learner exchanges ten of fourteen T into 1H, leaving four tens and final total 4H4T3O.
4. **Two New Carries:** Fresh H/T/O board. Learner works ones 8+7=15 → carry1T/remain5O; tens 6+5+1=12 → carry1H/remain2T; hundreds 2+1+1=4; check 425 against originals.

## Misconceptions, examples and boundaries

A child can count the carried ten twice, leave the same ten among remaining singles, forget the extra ten in the tens step, or add a hundred without removing ten tens. The initial hundred count is not four until the tens exchange is complete. Do not present raw three hundreds, thirteen tens and thirteen ones as four hundred forty-three without showing how place-value units reconcile. The earlier additionInColumns example contains one exchange; here both levels exchange sequentially.

## Localization, accessibility and offline intent

All learner-facing strings/controls and count/value explanations must be genuinely translated across every supported locale with no English fallback. Provide H/T/O state ledger with native keyboard/switch/touch operations, nonvisual before/after and clear provenance for each carry, semantic RTL column labels, large focusable targets, 200% zoom/mobile, reduced-motion and full local offline operation after selected-locale download. No forced dragging, sound, speech recognition or timed response.

## Sources and factual verification

- [Canonical Skill Code](../../../../data/skills/arithmetic/addition/skills/regrouping.data.ts), copied byte-for-byte from Mathematics.
- [English Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md), generated and coordinator-owned; must be regenerated after integration.
- [Common Core mathematics standards](https://corestandards.org/mathematics-standards/) comparative reference only, not nationally approved Curriculum alignment.

## Curriculum / Program compatibility

Not specified. Grade 3 is the selected primary audience, not a grade limit on the Skill.

## Open editorial decisions

- Grade 3 only for learners with reliable three-digit place value and one-carry written addition. The Skill remains unbounded by grade, and these examples do not exhaust its broad definition.
- Confirm numeric examples, aligned place-value meaning and equivalent nonvisual/counter operations before production.

## Methodologist handoff

**Draft, not approved.** The adjoining Screenwriter Content is _provisional_, not an official Methodologist sign-off. No React Scene, Question, Quiz, Score or production wiring is authorized by this Draft.
