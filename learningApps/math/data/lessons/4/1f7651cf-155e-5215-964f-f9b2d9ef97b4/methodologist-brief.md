# Which Operation Fits the Story? — Methodologist Brief

Date: 2026-10-31
Lesson slug: chooseAdditionOrSubtraction
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Teach meaningful operation selection from known/unknown roles and quantitative relationships rather than searching for trigger words. This extends a one-step model into a reasoned choice of addition or subtraction.

## Target audience

**Primary audience: Grade 2.** Intended for children with variable reading fluency and prior mathematical experience. The selected classroom depth is a Lesson decision, **not** an age/grade restriction on any Skill. Provide plain-language, optional read-aloud, text alternatives and multiple ways to respond without relying on motor precision or speech.

## Prerequisites

- Distinguish known and unknown quantities; represent an add-to or take-from story with a one-step model; calculate sums and differences within 20; understand that comparison statements distinguish a larger and a smaller quantity.

## Target Skills

- [chooseOperationAddSub.data.ts](../../../../data/skills/problemSolving/models/skills/chooseOperationAddSub.data.ts)

## Expected learning outcomes

- Identify whether a situation is about combining known parts, removing a part, or comparing two quantities.
- Match a one-step story and diagram to addition or subtraction and justify the operation using the unknown's role.
- Explain why the same word 'more' can correspond to either addition or subtraction depending on which quantity is unknown.

## Essential subject matter

Choice of operation depends on the structural relationship. If 9 beads belong to Ava and Sam has 4 more than Ava, Sam has 9 + 4 = 13. If Ava has 9 beads and 4 more than Sam, Sam has 9 − 4 = 5. The word 'more' appears in both; the reference quantity and sought quantity differ. A take-away context ('12 cards, 5 given away') needs 12 − 5 = 7; a combine context ('7 shells plus 5 shells') needs 7 + 5 = 12. A picture or bar model labels which count is known, which is missing and how they relate.

## Conceptual progression and dependencies

Begin with transparent add-to and take-from changes, connect each to a model, then vary the location of the unknown in an additive comparison while keeping the word 'more' constant. Finally have learners justify a choice before any calculation and check it against the story.

## Misconceptions, examples and boundaries

Automatic 'more' → add or 'left' → subtract; confusing which character has the greater quantity; treating the difference as the total; selecting an operation by numerals alone. Use nonnegative whole numbers and one-step stories within 20; exclude multiplication, division, two-step comparisons, hidden unit conversions and equations requiring unlearned inverse operations.

## Localization, accessibility and offline intent

The English examples are **canonical editorial source text**, not completed learner-facing translations. Translate all prompts, labels, units, feedback, accessible names and diagram annotations for each supported locale, without invented translations or English fallbacks. Preserve mathematical operation order and causal relationships in RTL, with semantic rather than automatic mirroring. Provide equally informative visible and nonvisual representations, keyboard/switch and touch alternatives, high contrast with no color-only answers, reduced-motion behavior, zoom/reflow and no timed-only tasks. The full experience and instructional feedback must be downloadable for offline learning as an implementation goal; no claim is made that Playground currently implements the required PWA caching or Note persistence.

## Sources and factual verification

- [chooseOperationAddSub.data.ts](../../../../data/skills/problemSolving/models/skills/chooseOperationAddSub.data.ts) — canonical Mathematics Skill object transferred from `main`; UUID and methodological definition must not be altered.
- [Svitlo Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — separation of Brief, Content and Scene ownership.
- [Common Core State Standards for Mathematics](https://corestandards.org/mathematics-standards/) — supplementary progression reference; **not** evidence of a named Curriculum's alignment or a substitute for editorial approval.

## Curriculum / Program compatibility

Not specified. This Lesson is independent of any Program or Curriculum.

## Open editorial decisions

- Editor to confirm learner readiness for comparison wording at Grade 2 and that no out-of-domain comparison Skill is silently added as a target; comparison is the instructional example, while operation choice is the assessed domain goal.
- Screenwriter material is authorized as **provisional Draft only**; Methodologist approval has not occurred. Further implementation requires distinct architectural, localization and accessibility review.

## Methodologist handoff

**Draft pending explicit Methodologist/editor approval.** Proposed [Content](./content.md) and [Scene specification](./scenes/storyRelationshipSwitch.scene-spec.md) are parallel review artifacts, not approved implementation instructions. Do not infer mastery, introduce new Skills, or add Questions, Quizzes, scoring, persistence or runtime data from this Brief.
