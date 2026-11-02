# Parts Make a Whole — Methodologist Brief

Date: 2026-10-31
Lesson slug: partsMakeAWhole
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Extend familiar add-to and take-from models into a reusable part–whole relationship. Learners decide whether the whole or one part is unknown, rather than choosing an operation from a word such as 'altogether' in isolation. This focuses on unknown quantity roles across multiple short contexts; it does not repeat the basic one-step modeling lesson.

## Target audience

Children in **Grades 1–2** with variable literacy, numeric fluency and communication needs. Grade selection determines the proposed Lesson depth, not a ceiling on the canonical Skill's scope. Use concise language, concrete representations before symbolic abstraction when helpful, learner-controlled pacing, alternative response modes and relevant prerequisite refreshers.

## Prerequisites

- Count and compare concrete collections within 20, including zero.
- Use addition to combine disjoint counted groups and subtraction to determine a remaining subset.
- Identify given quantities and the one quantity asked for; know that a part does not exceed a nonnegative whole.

## Target Skills

- [partWholeAddsub.data.ts](../../../../data/skills/problemSolving/parts/skills/partWholeAddsub.data.ts)

## Expected learning outcomes

- Given two disjoint parts, reconstruct the whole and name its unit: 6 + 4 = 10 buttons.
- Given the whole and one part, recover the other part with subtraction: 10 − 6 = 4 buttons.
- Translate the same part–whole relationship into two distinct problem questions (unknown whole versus unknown part) without changing the total or counted objects.
- Explain why adding the known whole to a known part double-counts objects, and check a missing part by recombining parts.

## Essential subject matter

A finite whole partitioned into two disjoint parts has total W = A + B. If A and B are known, W follows by addition. If W and A are known with 0 ≤ A ≤ W, then B = W − A; recombining A + B must reproduce W. Example: 6 red buttons and 4 blue buttons are 10 buttons. If there are 10 buttons total and 6 are red, 4 must be blue, provided red and blue form a complete two-part partition. The colors are identifiers of the two nonoverlapping groups, not mathematical operations. If extra colors could be present, the 'rest are blue' premise must be explicit. The fact 6 + 4 = 10 supports both contexts but the unknown role differs.

## Conceptual progression and dependencies

Start by composing known parts physically. Preserve the same ten counters while the question changes from 'How many altogether?' to 'How many are blue?' Then interpret a labeled part–whole bar with the whole visibly named. Finally solve an unfamiliar two-part partition and check by recombining, without a supplied operation clue.

## Misconceptions, examples and boundaries

Avoid treating every mentioned number as a part to add, claiming that a known whole can be added to one of its included parts, forgetting that parts must be disjoint, and assuming 10 − 6 = 4 means 'six were physically removed'. Work in nonnegative integer counts within 20, including a zero part; do not cover fractions, overlapping Venn sets, ratios, more than two unknown components or general set algebra.

## Localization, accessibility and offline intent

The English copy is **editorial source text**, not ready multilingual Lesson content. Before implementation, translate every learner-visible explanation, prompt, accessible description, symbol reading and feedback accurately into all supported locales; no English placeholders, invented translation or silent fallback. RTL adaptations preserve numeric operand order, mathematical relations and temporal dependencies rather than indiscriminate mirroring. All diagram/picture meanings must exist in readable, screen-reader-accessible text. Provide keyboard, switch and touch alternatives to any manipulation; use distinct labels beyond colors, visible focus, zoom/reflow, reduced motion and no timed-only requirements. Offline completeness requires all selected locale strings, resources and interactive feedback after download; this is an implementation target, not a statement about currently working PWA support.

## Sources and factual verification

- [partWholeAddsub.data.ts](../../../../data/skills/problemSolving/parts/skills/partWholeAddsub.data.ts) — canonical Mathematics Skill Code and methodological scope, copied without changing UUIDs or localization.
- [Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — separate Brief/Content/Scene ownership and explicit approval policy.
- [Internationalization and Accessibility](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) — locale and inclusive design requirements.
- [Common Core State Standards for Mathematics](https://corestandards.org/mathematics-standards/) — optional age-sequence reference, not an assertion of Curriculum alignment.

## Curriculum / Program compatibility

Not specified. This standalone Lesson is Program-neutral and does not presume compatibility with an unreviewed Curriculum.

## Open editorial decisions

- The distinction from buildOneStepProblemModel is a stable two-part partition and the reversal of which part/whole is missing, not simply an additional animated equation.
- Formal Methodologist/editor approval and required localized content remain outstanding; the [Content](./content.md) and [Scene specification](./scenes/partWholePartitionLab.scene-spec.md) are **provisional Draft** parallel review artifacts, not approved Screenwriter deliverables.
- The coordinator owns the shared Playground skills index and generated taxonomy. Domain-local copied Code does not itself prove that the generated taxonomy or all external editorial gates have been refreshed.

## Methodologist handoff

**Draft pending explicit approval.** Following review, the Screenwriter may revise the independently authored Content and Scene specs. Do not infer mastery from a prediction, an on-screen interaction, a completed calculation or a voluntary explanation. No runtime Lesson, Question, Quiz, scoring, progress or Note API is created.
