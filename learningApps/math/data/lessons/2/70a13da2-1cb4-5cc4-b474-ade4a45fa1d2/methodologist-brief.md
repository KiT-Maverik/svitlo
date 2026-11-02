# Regrouping Through a Zero Place — Methodologist Brief

Date: 2026-10-31
Lesson slug: regroupingAcrossZero
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Extend place-value subtraction to cases where an intermediate place contains zero, requiring two linked exchanges (hundreds → tens → ones). Emphasize invariant total value and accurate bookkeeping across adjacent places. This samples one advanced case of the broader canonical **Subtraction with regrouping** Skill, not a redefinition of that Skill.

## Target audience

**Readiness-gated enrichment** for numerically advanced children aged 6–8, grades 1–2, **only if** they already understand three-digit place values, ten-to-one and hundred-to-ten equivalences, two-digit column subtraction with one exchange, and the subtraction/inverse-addition relationship. This content is not presented as universally grade-appropriate; many learners would benefit from deferring it.

## Prerequisites

- Represent numbers up to 999 as hundreds, tens and ones; explain 1 hundred = 10 tens and 1 ten = 10 ones.
- Understand that an exchange changes place-value representation without changing the total.
- Subtract corresponding digits in correctly aligned place-value columns and check by addition.
- Explain why exchanging from a zero tens column first requires obtaining tens from a higher place. If these are absent, return to more basic Lessons rather than using this as a first introduction.

## Target Skills

- [regrouping.data.ts](../../../../data/skills/arithmetic/subtraction/skills/regrouping.data.ts)

## Expected learning outcomes

- Demonstrate that 302 = 3 hundreds + 0 tens + 2 ones can become 2 hundreds + 10 tens + 2 ones, then 2 hundreds + 9 tens + 12 ones, while remaining exactly 302.
- Explain why one cannot exchange a ten from an empty tens place without first exchanging one hundred for ten tens.
- Solve the age-gated worked case 302 − 175 = 127 by taking 5 ones from 12, 7 tens from 9 and 1 hundred from 2.
- Verify the answer by inverse addition 127 + 175 = 302 and transfer carefully to another bounded case with a zero tens place.

## Essential subject matter

For base ten, exchanging one higher-place unit for ten adjacent lower-place units preserves value. The chain for 302 is **3H 0T 2O → 2H 10T 2O → 2H 9T 12O**, in each case worth 302. For 302 − 175, subtract 5O,7T,1H from the final representation to get 1H2T7O=127. Another example 403 − 186 = 217 follows **4H0T3O → 3H10T3O → 3H9T13O**, then subtract 1H8T6O. Verification 217+186=403. Different operand placement or extending the written method to more digits depends on the same invariant but lies outside this lesson’s numerical depth.

## Conceptual progression and dependencies

Begin with reversible hundreds-to-tens exchange without subtraction; then change one ten into ten ones and compare value. Introduce subtraction only after the learner can describe both exchanges. Link a column depiction to the objects and a screen-reader-friendly state ledger, complete the subtraction, then transfer. Explicitly distinguish from the already drafted crossing-ten/column Lesson, which uses a single tens-to-ones exchange.

## Misconceptions, examples and boundaries

Common errors: trying to borrow from zero tens without adjusting hundreds, treating zero as a barrier, accidentally increasing the total to 402/312, keeping ten tens after exchanging one of them, writing twelve ones while retaining the ten that produced them, aligning digits by position rather than place value, and treating 302−175 as 175−302. Exclude multi-zero chains such as 1002−… in this lesson; broad Skill scope is preserved as age-neutral taxonomy, not fully taught here.

## Localization, accessibility and offline intent

Localize “hundreds/tens/ones”, “exchange”, zero place and current totals precisely. Use semantically labeled columns under LTR/RTL, screen-reader-ready exchange steps and keyboard equivalents of moving bundles. All state/counts are accessible without color/drag/speech, available offline, and usable on weak devices. Do not force below-prerequisite students into advanced content.

## Sources and factual verification

- [Generated Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md), canonical regrouping Skill and broader methodological boundaries.
- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/), Grade 2 place value and Grade 3 arithmetic as comparison references; no assertion that this particular lesson is mandatory for grade 1–2.
- [IES/WWC Elementary Mathematics Intervention](https://ies.ed.gov/ncee/wwc/PracticeGuide/26), concrete-to-symbolic place-value guidance.

## Curriculum / Program compatibility

Not specified. **Optional/readiness-gated enrichment** only. Do not certify this as core grade 1–2 content.

## Open editorial decisions

- Confirm advanced audience gate or defer this Lesson to a later grade. The editor must verify the child’s place-value readiness before production.
- Confirm numerical boundaries (three-digit, one zero in tens place, two linked exchanges), and that they are Lesson-depth constraints, not changes to the broader Skill.
- Avoid duplicate teaching with existing subtractionAcrossTenAndColumns: this Lesson specifically teaches exchanging THROUGH an empty tens place.

## Methodologist handoff

Draft requiring editor approval before this provisional Screenwriter content is promoted. Learners without all prerequisites should use foundational place-value Lessons. Any scored assessment of the age-neutral regrouping Skill must not infer full coverage from one three-digit special case.
