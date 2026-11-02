# Do We Have Enough Information? — Methodologist Brief

Date: 2026-10-31
Lesson slug: tooMuchOrTooLittleInformation
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Develop an explicit contrast between an irrelevant stated quantity and a missing indispensable quantity. Both Skills support critical reading of word problems; teaching them together lets a learner distinguish excess evidence from insufficient evidence.

## Target audience

**Primary audience: Grade 3.** Intended for children with variable reading fluency and prior mathematical experience. The selected classroom depth is a Lesson decision, **not** an age/grade restriction on any Skill. Provide plain-language, optional read-aloud, text alternatives and multiple ways to respond without relying on motor precision or speech.

## Prerequisites

- Read short quantitative stories, identify givens and a target question, understand addition as combining counts, and provide a simple reason why a fact does or does not affect an answer.

## Target Skills

- [findExtraneousData.data.ts](../../../../data/skills/problemSolving/conditions/skills/findExtraneousData.data.ts)
- [findMissingData.data.ts](../../../../data/skills/problemSolving/conditions/skills/findMissingData.data.ts)

## Expected learning outcomes

- Distinguish a relevant number from a stated but irrelevant number relative to the _current_ question.
- Identify a quantity or relationship missing when the stated conditions allow more than one answer.
- Show that a missing-data problem has at least two compatible answers, and describe the additional information required to determine one answer.
- Explain how changing the question can turn an originally irrelevant fact into a relevant one.

## Essential subject matter

Relevant information is relative to a specific question, not an intrinsic property of a numeral. Seven stars, four circles and three triangles give 11 stars-and-circles; three triangles are extraneous for that question, but essential for the total number of shapes, 14. In 'Seven bicycles and some scooters are parked here; how many vehicles?', the number of scooters is absent. Two scooters give 9 vehicles, while five give 12; both satisfy the stated conditions, so no single numeric answer follows. Supplying three scooters is a _hypothetical new fact_ that would yield 10, not an answer inferred from the original problem.

## Conceptual progression and dependencies

First solve a fully specified story with a genuinely irrelevant numerical detail. Change its question so the detail becomes necessary. Then contrast a story where a quantity is not given, demonstrate two valid completions, and ask the child to formulate the missing piece of information, not guess it.

## Misconceptions, examples and boundaries

Every number in the text must be used; extra means 'unimportant in any possible question'; a plausible assumption is an unstated fact; 'some' implies a particular number; insufficient information means the problem is unsolvable even after a fact is provided. Avoid ambiguous categories ('all vehicles' must include exactly specified types), implicit constraints and formal proof beyond exhibiting two valid possibilities. Whole counts 0–20.

## Localization, accessibility and offline intent

The English examples are **canonical editorial source text**, not completed learner-facing translations. Translate all prompts, labels, units, feedback, accessible names and diagram annotations for each supported locale, without invented translations or English fallbacks. Preserve mathematical operation order and causal relationships in RTL, with semantic rather than automatic mirroring. Provide equally informative visible and nonvisual representations, keyboard/switch and touch alternatives, high contrast with no color-only answers, reduced-motion behavior, zoom/reflow and no timed-only tasks. The full experience and instructional feedback must be downloadable for offline learning as an implementation goal; no claim is made that Playground currently implements the required PWA caching or Note persistence.

## Sources and factual verification

- [findExtraneousData.data.ts](../../../../data/skills/problemSolving/conditions/skills/findExtraneousData.data.ts) — canonical Mathematics Skill object transferred from `main`; UUID and methodological definition must not be altered.
- [findMissingData.data.ts](../../../../data/skills/problemSolving/conditions/skills/findMissingData.data.ts) — canonical Mathematics Skill object transferred from `main`; UUID and methodological definition must not be altered.
- [Svitlo Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — separation of Brief, Content and Scene ownership.
- [Common Core State Standards for Mathematics](https://corestandards.org/mathematics-standards/) — supplementary progression reference; **not** evidence of a named Curriculum's alignment or a substitute for editorial approval.

## Curriculum / Program compatibility

Not specified. This Lesson is independent of any Program or Curriculum.

## Open editorial decisions

- Methodologist/editor to confirm combining these two distinct Skills into a contrastive Lesson and explicitly preserve separate recognition outcomes for later assessment.
- Screenwriter material is authorized as **provisional Draft only**; Methodologist approval has not occurred. Further implementation requires distinct architectural, localization and accessibility review.

## Methodologist handoff

**Draft pending explicit Methodologist/editor approval.** Proposed [Content](./content.md) and [Scene specification](./scenes/questionEvidenceDesk.scene-spec.md) are parallel review artifacts, not approved implementation instructions. Do not infer mastery, introduce new Skills, or add Questions, Quizzes, scoring, persistence or runtime data from this Brief.
