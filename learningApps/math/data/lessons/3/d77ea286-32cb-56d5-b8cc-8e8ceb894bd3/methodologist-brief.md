# Make Both Sides Equal — Methodologist Brief

Date: 2026-10-31
Lesson slug: completeMissingEquality
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Move beyond finding one familiar unknown addend to completing equalities in which either side may contain an expression. The learner constructs a value that preserves an equality, not merely a number that feels plausible.

## Target audience

**Primary audience: Grade 2.** Intended for children with variable reading fluency and prior mathematical experience. The selected classroom depth is a Lesson decision, **not** an age/grade restriction on any Skill. Provide plain-language, optional read-aloud, text alternatives and multiple ways to respond without relying on motor precision or speech.

## Prerequisites

- Understand '=' as sameness of value; add and subtract within 20; recognize a part-whole relationship and a missing-value box. Learners who do not yet understand '=' need a concrete equal-collections refresher.

## Target Skills

- [completeEquality.data.ts](../../../../data/skills/algebra/equalities/skills/completeEquality.data.ts)

## Expected learning outcomes

- Determine the value of a fully known expression before filling a missing position on either side of an equality.
- Select a missing whole-number value for an expression such as 6 + □ = 4 + 5 or 7 + 2 = □ − 1 while preserving equality.
- Check the candidate by evaluating both complete sides and explain why an alternative fails.

## Essential subject matter

An equality is true if its left and right expressions evaluate to the same number. In 6 + □ = 4 + 5, the known right side is 9; therefore □ must be 3 because 6 + 3 = 9. In 7 + 2 = □ − 1, the known left side is 9; □ = 10, since 10 − 1 = 9. A missing entry in an expression is not always the total, and the position of the equals sign does not determine where a result is written. Model with equal-unit counters or a matched-value table; changing a numeral changes the expression and must be followed by rechecking both sides.

## Conceptual progression and dependencies

Begin with relational equality already familiar from collections, then compare two equivalent expressions, then conceal a component on one side and derive it from the known value of the opposite side. Contrast a box in an addition with a box in a subtraction, with independent replacement-and-check at the end.

## Misconceptions, examples and boundaries

Treat '=' as a right-facing answer arrow; copy the value from the opposite side into the box even when the box is only one term; guess from a memorized fact without checking; interpret 7 + 2 = □ − 1 as □ = 9 (which gives 8, not 9). Stay within nonnegative integers and operations that yield 0–20. No variable notation, negative solutions, symbolic rearrangement, multi-step equation solving or formal algebraic proof.

## Localization, accessibility and offline intent

The English examples are **canonical editorial source text**, not completed learner-facing translations. Translate all prompts, labels, units, feedback, accessible names and diagram annotations for each supported locale, without invented translations or English fallbacks. Preserve mathematical operation order and causal relationships in RTL, with semantic rather than automatic mirroring. Provide equally informative visible and nonvisual representations, keyboard/switch and touch alternatives, high contrast with no color-only answers, reduced-motion behavior, zoom/reflow and no timed-only tasks. The full experience and instructional feedback must be downloadable for offline learning as an implementation goal; no claim is made that Playground currently implements the required PWA caching or Note persistence.

## Sources and factual verification

- [completeEquality.data.ts](../../../../data/skills/algebra/equalities/skills/completeEquality.data.ts) — canonical Mathematics Skill object transferred from `main`; UUID and methodological definition must not be altered.
- [Svitlo Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — separation of Brief, Content and Scene ownership.
- [Common Core State Standards for Mathematics](https://corestandards.org/mathematics-standards/) — supplementary progression reference; **not** evidence of a named Curriculum's alignment or a substitute for editorial approval.

## Curriculum / Program compatibility

Not specified. This Lesson is independent of any Program or Curriculum.

## Open editorial decisions

- Editor to confirm that mixed-expression equalities (not isolated unknown-addend drills) appropriately differentiate this Lesson from the existing findingUnknownAddend Lesson.
- Screenwriter material is authorized as **provisional Draft only**; Methodologist approval has not occurred. Further implementation requires distinct architectural, localization and accessibility review.

## Methodologist handoff

**Draft pending explicit Methodologist/editor approval.** Proposed [Content](./content.md) and [Scene specification](./scenes/expressionMatchLab.scene-spec.md) are parallel review artifacts, not approved implementation instructions. Do not infer mastery, introduce new Skills, or add Questions, Quizzes, scoring, persistence or runtime data from this Brief.
