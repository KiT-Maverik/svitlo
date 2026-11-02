# Finding an Unknown Divisor — Methodologist Brief

Date: 2026-10-31
Lesson slug: unknownDivisor
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Teach how to recover an unknown **divisor** in an exact division when both the dividend and a **nonzero quotient** are supplied, by dividing the dividend by the quotient. Emphasize that the divisor is the number _after_ the division symbol in the original equality and is never zero; verify by substituting the candidate into the **original division**. In 12 ÷ □ = 4, the missing divisor is 3, not the known quotient 4.

## Target audience

**Readiness-gated enrichment**, ages roughly 6–8 only for learners who already understand equal sharing and exact division, know multiplication facts for small groups, and can distinguish divisor, dividend and quotient in a concrete example. This is not an assumed grade 1–2 core outcome. Readable short prompts, concrete/text equivalent models and no obligatory speech input.

## Prerequisites

- Understand 12 ÷ 3 = 4 as sharing 12 equally among 3 groups, giving 4 to each; recognize that the divisor names group count in **that selected story**.
- Recognize the alternative grouping interpretation 12 objects into groups of size 3 makes 4 groups, with each role named.
- Multiply small nonzero integers and divide remainder-free nonnegative amounts.
- Understand □ as one unknown, zero divisors forbidden, equality as a claim to check.

## Target Skills

- [unknownDivisor.data.ts](../../../../data/skills/algebra/unknowns/skills/unknownDivisor.data.ts)

## Expected learning outcomes

- Identify the unknown divisor in 12 ÷ □ = 4 and distinguish its role from dividend 12 and quotient 4.
- Reconstruct the divisor as 12 ÷ 4 = 3 when dividend and nonzero quotient are known, within exact whole-number cases.
- Use a model to explain that twelve counters can be shared into three groups of four (or grouped into four sets of three with a specifically stated different interpretation).
- Check the **original division equality** 12 ÷ 3 = 4, rejecting incorrect and zero divisors.
- Apply to 20 ÷ □ = 5 with missing divisor 4 and check 20 ÷ 4 = 5.

## Essential subject matter

For exact whole-number division A ÷ d = q with A and q **nonzero** here, a missing divisor satisfies d = A ÷ q, provided d is a positive integer and the original division is exact. **d = 0 is not permitted**, even when the other values are zero. The quotient is _not_ the missing divisor: in 12 ÷ □ = 4, q=4 and d=3. In an equal-sharing story, the total twelve is shared into an unknown number of groups with four in each; grouping four counters repeatedly produces **three** groups. In an equal-group-size story, the same 12 ÷ 3 = 4 instead means four groups of size three. Both interpretations are valid but their quantity labels must not be swapped mid-explanation. Reconstruct d via 12 ÷ 4 = 3 and validate by 12 ÷ 3 = 4. This contrasts with finding unknown dividend, □ ÷ 3 = 4, which needs multiplication 3 × 4 = 12.

## Conceptual progression and dependencies

First inspect a complete, accurately labeled known division and matching groups. Then hide only the divisor/group count in one chosen sharing interpretation. Recover it by counting how many groups of quotient-size can be made from the dividend, connect to exact inverse division A÷q, substitute and check. A brief wrong guess clarifies the divisor/quotient distinction; only then transfer to another numerical case.

## Misconceptions, examples and boundaries

Common errors: copy the quotient 4 into the box giving 12 ÷ 4 = 3 (not 4); add 12+4 or multiply them; use q÷A; reverse the group-size and group-count meanings without a story label; use 0 as divisor or accept non-integer/remainder results as exact. Correct: 12÷□=4 →3, and 20÷□=5 →4. Counterexamples: candidate 2 gives 12÷2=6; candidate 4 gives 12÷4=3; 12÷0 undefined. Small whole-number products/dividends ≤25, factors 1–5, nonzero dividend and quotient, exact division only. No fractions, negative numbers, general zero-quotient division or long division.

## Localization, accessibility and offline intent

Translate “total/dividend”, “divisor”, “quotient”, “number of groups”, “objects in each” precisely, disambiguating two division stories. RTL preserves division operands and □ position. All grouping and counting steps have keyboard/screen-reader/text representations, large controls and local deterministic calculations after download. No required audio/video, dragging or online evaluator.

## Sources and factual verification

- [Generated Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md), the canonical unknownDivisor method and nonzero conditions.
- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/), Grade 3 multiplication/division relationships as **comparative** developmental source, not a universal age certification.
- [IES/WWC Elementary Mathematics Intervention](https://ies.ed.gov/ncee/wwc/PracticeGuide/26), explicit representations and careful mathematical language.

## Curriculum / Program compatibility

Not specified. **Optional advanced Lesson only** after prerequisites; no asserted grade 1–2 curriculum requirement.

## Open editorial decisions

- Editor: confirm readiness gate and decide whether to move this advanced Lesson to a later audience.
- Approve which division model is primary and ensure “three groups of four” does not silently change to “four groups of three”.
- Confirm excluding zero quotient/dividend is a Lesson-depth choice, not a new global prohibition or Skill change.

## Methodologist handoff

Draft awaiting explicit editor approval. Screenwriter should offer equal-group reconstruction, a justified inverse calculation and original-equality verification; do not invent assessment scores, runtime code or universally age-appropriate placement.
