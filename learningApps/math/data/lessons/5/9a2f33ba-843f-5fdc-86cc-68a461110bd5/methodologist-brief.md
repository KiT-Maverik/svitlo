# Check an Answer by Working Backward — Methodologist Brief

Date: 2026-10-31
Lesson slug: verifyWithInverseOperation
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Teach an independently structured verification method, rather than repeating the same arithmetic or merely judging whether a numerical result looks approximately reasonable.

## Target audience

**Primary audience: Grade 3.** Intended for children with variable reading fluency and prior mathematical experience. The selected classroom depth is a Lesson decision, **not** an age/grade restriction on any Skill. Provide plain-language, optional read-aloud, text alternatives and multiple ways to respond without relying on motor precision or speech.

## Prerequisites

- Understand addition/subtraction as related operations; add/subtract within 100 with regrouping; interpret a completed arithmetic statement; understand that an estimate only checks plausibility. An optional multiplication/division example requires prior facts and exact sharing.

## Target Skills

- [verifyWithSecondMethod.data.ts](../../../../data/skills/reasoning/verification/skills/verifyWithSecondMethod.data.ts)

## Expected learning outcomes

- Verify an addition result by subtracting one addend from the proposed sum.
- Verify a subtraction result by adding the subtrahend to the proposed difference.
- Use a failed inverse check to locate an inconsistent proposed answer and explain how to correct it.
- Distinguish an inverse calculation check from redoing the original operation or merely checking approximate size.

## Essential subject matter

Inverse operations can check numerical relationships: 46 + 27 = 73, and 73 − 27 = 46, so the sum is consistent. If a learner proposes 63, then 63 − 27 = 36 ≠ 46, revealing a mismatch. For 84 − 29 = 55, add the proposed result to the removed amount: 55 + 29 = 84; a proposed 54 would produce 83, not 84. An inverse check tests arithmetic consistency of the recorded numbers; it does not independently establish that the original story was modeled with the correct operation. Checking a multiplication by exact division is an optional extension when division prerequisites hold.

## Conceptual progression and dependencies

Begin with forward movement and reversing it using counters/number line, then formalize inverse checking on an exact example. Deliberately test a wrong result that is nevertheless near the right size. Transfer to a new subtraction with no provided checking equation, requiring the learner to construct the reverse check.

## Misconceptions, examples and boundaries

Simply calculate the original sum twice with the same method; confuse subtraction directions; trust a close estimate as confirmation; check addition by adding again; believe a successful numerical inverse validates the original story model. Keep exact nonnegative arithmetic within 100; avoid fractions, residual division, proof of model validity and mastery inference.

## Localization, accessibility and offline intent

The English examples are **canonical editorial source text**, not completed learner-facing translations. Translate all prompts, labels, units, feedback, accessible names and diagram annotations for each supported locale, without invented translations or English fallbacks. Preserve mathematical operation order and causal relationships in RTL, with semantic rather than automatic mirroring. Provide equally informative visible and nonvisual representations, keyboard/switch and touch alternatives, high contrast with no color-only answers, reduced-motion behavior, zoom/reflow and no timed-only tasks. The full experience and instructional feedback must be downloadable for offline learning as an implementation goal; no claim is made that Playground currently implements the required PWA caching or Note persistence.

## Sources and factual verification

- [verifyWithSecondMethod.data.ts](../../../../data/skills/reasoning/verification/skills/verifyWithSecondMethod.data.ts) — canonical Mathematics Skill object transferred from `main`; UUID and methodological definition must not be altered.
- [Svitlo Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — separation of Brief, Content and Scene ownership.
- [Common Core State Standards for Mathematics](https://corestandards.org/mathematics-standards/) — supplementary progression reference; **not** evidence of a named Curriculum's alignment or a substitute for editorial approval.

## Curriculum / Program compatibility

Not specified. This Lesson is independent of any Program or Curriculum.

## Open editorial decisions

- Editor to decide whether the optional exact multiplication/division verification should be deferred entirely or offered only behind a prerequisite check; required outcome covers addition/subtraction.
- Screenwriter material is authorized as **provisional Draft only**; Methodologist approval has not occurred. Further implementation requires distinct architectural, localization and accessibility review.

## Methodologist handoff

**Draft pending explicit Methodologist/editor approval.** Proposed [Content](./content.md) and [Scene specification](./scenes/reverseOperationChecker.scene-spec.md) are parallel review artifacts, not approved implementation instructions. Do not infer mastery, introduce new Skills, or add Questions, Quizzes, scoring, persistence or runtime data from this Brief.
