# One Part Has a Name — Methodologist Brief

Date: 2026-10-31
Lesson slug: modelAndReadUnitFractions
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Connect the mathematical idea of one of n equal parts to its spoken and written unit-fraction name, across an area, a length and a discrete set, without treating every single object as a fractional part. Grade 3 is appropriate because the learner must coordinate notation, the reference whole and equal grouping in three models. The Grade 2 equal-parts concept is the direct prerequisite; there is no requirement to perform fraction arithmetic.

This Lesson intentionally joins 2 independently assessable Skills because a meaningful learning sequence must first build and then communicate the representation; it does not merge Skill identities or claim a new integrative Skill.

## Target audience

**Primary: Grade 3**, approximately ages 8–9. Grade 3 is appropriate because the learner must coordinate notation, the reference whole and equal grouping in three models. The Grade 2 equal-parts concept is the direct prerequisite; there is no requirement to perform fraction arithmetic. Mixed reading fluency and language proficiency are expected: use short text, meaningful optional narration, explicit number/category labels, and full keyboard/touch and nonvisual alternatives. The Grade is a teaching-depth decision, not part of the Skill definition.

## Prerequisites

- Identify a chosen whole and check whether a partition has equal parts (existing Skill `wholeAndEqualParts`).
- Count up to twelve objects, make equal groups and recognize digits 1–4.
- Distinguish a piece of a picture from a part of a collection without assuming both contain one object.

Relevant previously transferred Playground Skill: `wholeAndEqualParts`. The Lesson is standalone: a learner does not need to complete any named Program or another specific Lesson if equivalent prerequisite knowledge is present.

## Target Skills

- [unitFractionModel.data.ts](../../../../data/skills/fractions/representation/skills/unitFractionModel.data.ts)
- [unitFractionRead.data.ts](../../../../data/skills/fractions/representation/skills/unitFractionRead.data.ts)

## Expected learning outcomes

- In a fixed whole divided into two, three or four equal parts, identify and model exactly one part.
- Read and write `1/2`, `1/3` and `1/4` as one half, one third and one quarter of a specified whole.
- Explain that the bottom number states how many equal parts compose the whole, while the top `1` names one selected part; no general numerator lesson is claimed.
- Represent `1/4` of a twelve-counter collection as one of four equal groups of three, rather than one isolated counter.
- Reject a `1/3` label when the proposed three parts have unequal amounts.

An instructional interaction shows what was taught or practiced, not validated mastery of every linked Skill.

## Essential subject matter

- A unit fraction `1/n` means one of `n` equal-magnitude parts of a specified whole. The `n` is a positive integer, and all `n` parts together form exactly that whole.
- The symbols are read one half `1/2`, one third `1/3`, one quarter `1/4`. The slash/fraction bar separates a count of selected parts from a count of equal whole-parts.
- A 12-square strip split into three four-square strips yields `1/3` per strip. Split into four three-square strips yields `1/4` per strip.
- The same language applies to discrete sets, provided the _set_ is the whole and the members are partitioned into equal groups. One of four equal groups of a 12-counter set contains three counters.
- Equal division is an essential condition: a strip with lengths 2, 3 and 7 cannot call any of those pieces `1/3` of the strip.

**Instructional depth and hard scope:** Positive integer partition counts 2, 3 and 4 only. Unit fractions with exactly one selected equal part; area/length strip models and one discrete-set model with 12 counters. The chosen whole must be shown and held constant for comparisons. Do not introduce non-unit fractions, general numerator mastery, equivalence proofs, operations, number-line arithmetic or fractions beyond one.

## Conceptual progression and dependencies

Begin with the learner's prerequisite mental model, introduce one controlling representation or condition, then have the learner explain both a confirming example and a tempting non-example. Later reduce hints so they apply the concept to a new setup. Grade 3 is appropriate because the learner must coordinate notation, the reference whole and equal grouping in three models. The Grade 2 equal-parts concept is the direct prerequisite; there is no requirement to perform fraction arithmetic. Do not infer that presentation, a correct guess or a revealed explanation certifies independent competence.

## Misconceptions, examples and boundaries

- Calling any of three arbitrary unequal pieces one third.
- Reading `1/4` as four selected pieces rather than one of four equal pieces.
- Assuming a unit fraction of a twelve-object set must contain one object.
- Comparing the size of a `1/2` piece and `1/2` of a different whole without identifying both wholes.

**Exclusions:** The lesson uses the denominator only as part of reading a unit fraction; a full independent denominator-definition Skill is intentionally reserved for later coverage. The discrete-set example uses groups of identical counters and no claim about their physical area.

## Localization, accessibility and offline intent

Learner-facing text, mathematical language, captions, accessible labels and Scene feedback must ultimately have **genuine translations for every supported locale**; no missing keys, English placeholder translations or silent fallback are approved. Use semantically appropriate LTR/RTL layouts; do not mirror mathematics, clock meanings, figures or numeric symbols by default. Design equivalently meaningful touch, keyboard, screen-reader and low-vision paths, reduced-motion static representations, visible focus, adequate target sizes and WCAG 2.2 AA compliance. Preserve full learning functionality in low-resource and offline use once the platform supports packaged Lesson downloads. These are intended acceptance criteria, **not claims of current implementation**.

## Sources and factual verification

- [unitFractionModel.data.ts](../../../../data/skills/fractions/representation/skills/unitFractionModel.data.ts) — Mathematics canonical Skill definition/description; transferred to Playground without modification.
- [unitFractionRead.data.ts](../../../../data/skills/fractions/representation/skills/unitFractionRead.data.ts) — Mathematics canonical Skill definition/description; transferred to Playground without modification.
- [Lesson](../../../../../../studio/docs/entities/lesson.md), [Lesson Content](../../../../../../studio/docs/entities/lesson-content.md), [Section](../../../../../../studio/docs/entities/section.md) and [Program](../../../../../../studio/docs/entities/program.md) entity contracts in Studio.
- Checked model cases and expected results are enumerated independently in the associated provisional Scene spec; verify them again at implementation.

## Curriculum / Program compatibility

Unspecified. Standalone learning objective only, with no external quest, reward or Program narrative. Grade is determined pedagogically and does not cap the taxonomy Skill.

## Open editorial decisions

- **Editor:** approve this Grade 3 audience, depth, boundary and joint-Skill pedagogical grouping; a Draft Brief does not authorize a later Approved state.
- **Methodologist/editor:** confirm any cross-representation scope before development; no Skill taxonomy edits are requested.
- **Screenwriter:** the authorized draft Content and Scene spec are **provisional pending this Methodologist decision** and require their own subsequent reviews.

## Methodologist handoff

Ready for editorial review only. The companion `content.md` and Scene specification have been drafted provisionally by explicit batch instruction; **formal Methodologist approval gate has not passed**. No React Scene, runtime Lesson, Question, Quiz or scoring has been authorized or implemented.
