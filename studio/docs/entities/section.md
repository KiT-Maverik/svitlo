# Section

A Section is a navigable learning unit. Regular Sections hold ordered ContentBlocks; a Quiz is **a Section, not a ContentBlock**.

## Engine contracts

See [Content Section schemas](../../../shared/engine/configurators/sections/defineContentSection/defineContentSection.schemas.ts) and [Quiz Section schemas](../../../shared/engine/configurators/sections/defineQuizSection/defineQuizSection.schemas.ts). Both define Config and Props, Section `params`, localized `title`/`navigationLabel`, and ordered ContentBlocks.

- Content Section: `type: 'content'`, with authored `content: { items, order }` published as an ordered array.
- Quiz Section: `type: 'quiz'`; `params` include `selection`, `questionOptions`, `layout`, `interaction`, `feedbackMode`, `grading`, `results`, `screen`, `timeLimitSeconds` and `isBlocker`. Quiz `content` holds Section-owned screen ContentBlocks; Questions are addressed by explicit stable `params.selection.questionIds` UUIDs against independently published, globally UUID-addressed Question resources. A Quiz may select a deliberate set from **several preceding Lessons' banks**, not just its own Lesson's bank; ownership and available locales are validated at publication/loading. Neither Lesson nor Section embeds Questions or complete banks; Quiz ContentBlocks are exclusively Section-owned screens.
- Flashcards Section: `type: 'flashcards'`; `params.selection.flashcardIds` contains unique ordered Flashcard UUIDs from globally UUID-addressed Flashcard resources whose authored sources remain Lesson-owned, while ordinary Section-owned ContentBlocks remain in `content`.
- Multiple Quizzes are allowed. A blocking Quiz can prevent forward navigation; meeting a grading threshold is a separate assessment result.
- `layout.mode` supports `stack` and `stepper`. Without `timeLimitSeconds`, the Quiz is untimed.

## Layout and knowledge checkpoints

General Section ContentBlocks render in one vertical column. A Scene can have its own internal layout. A Knowledge Checkpoint is a reflective prompt, not a scored Quiz.

Related: [Lesson](./lesson.md), [Lesson Content](./lesson-content.md).

## Build-time configurator API

Use the appropriate Engine `define*Section` configurator from `@svitlo/engine/build`. `build.props({ languages })` returns invariant and locale-specific Props fragments; `build.overrides(patch, { languages })` returns scoped sparse patches. Section configurators do not write files, build Course TOCs, or own the Lesson's Question Bank.

## Required assessment Section scaffolding

The Methodologist decides separately whether each Lesson needs zero, one or multiple Quiz Sections and Flashcards Sections. Record positive intentions with stable keys, purpose, placement, required Skills/evidence and bank prerequisites, and negative decisions with rationale, all in authoring-only production.methodology. This is distinct from requiring a separate Question or Flashcard Bank.

For each required intent the Screenwriter writes a normal config.section.items.<slug> of type quiz or flashcards, with permanent Section UUID/slug, source-language title/navigationLabel and Section-owned content.items/order, and inserts that slug into config.section.order at its approved position. Its production.productionNotes contains lines "Assessment intent: <key>" and "Bank integration: pending" until review-backed completion. The original Lesson Builder uses the same recursive factory/import/generic pipeline as Content Sections and places one real "// TODO (BLOCKER):" directly above each assessment export. No unapproved Section/bank IDs or Quiz grading defaults are created. Bank specialists remove blockers only after independently verified selection, fully authored Quiz fields and actual resource/locale/ownership checks; the strict Engine Config schema is unchanged.

At Stage 6, "preflight-draft" / "handoff" may scaffold the source while retaining lesson.yaml for **later Stages 7/8**. Normal "preflight" / "finalize" require complete assessment params; pending bank integration does not block Stage 6 source-preparation completion but blocks final publication. See [Required Lesson Assessment Section Scaffolding](../architecture/lesson-required-assessment-section-scaffolding.md) and [Lesson finalizer](../../../shared/engine/scripts/finalizeLesson/README.md).

## Methodologist assessment requirements

For **new** Lessons, Stage 1 Methodologist intent lives in the single `lesson.yaml` `production.methodology`, including justified `assessmentPlan.quizRequired` and distinct required Quiz intentions with target Skills and canonical cognitive `AssessmentMethodKey` values. `defineQuizSection` configures runtime behavior; it does **not** decide educational necessity. Stage 2 Screenwriter places the intended Quiz Section(s) in the same `lesson.yaml` `config`/`production` source, and the Assessment Architect later owns bank validity, explicit UUID selections and scoring. Historical `methodology.md` frontmatter and `content.yaml` are migration inputs, not new-work prerequisites. No fixed one-Quiz-per-Lesson rule. A substantive teaching Lesson can have a full independent bank and **zero Quiz Sections**; an assessment-only Lesson at a Chapter/Module/Course boundary can have a Quiz and **zero own Question Bank**. Keep upstream slot/PR dependencies in Course methodology and Lesson PRs, not in new Config/Props properties. Actual cross-Lesson Quiz publication is gated on PR #668's integrated global UUID/locale resolver and verified resources.

## YAML Config draft authoring

The **current** Lesson draft source is `lesson.yaml`, with nested `config` and optional authoring-only `production` on each Section and ContentBlock. Immutable identities and typed parameters live in `config`; slug-keyed `{ items, order }` collections preserve order. Engine's [composed editor schema](../../../shared/engine/yaml-schemas/lesson.scaffold.schema.json) derives technical Config from Zod and composes production metadata. Stage 1–5 drafts may be incomplete; at Stage 6 the separate [Lesson finalizer](../../../shared/engine/scripts/finalizeLesson/README.md) validates the full source and ensures safe handoff, while the create-only [Lesson Builder](../../../shared/engine/scripts/lessonBuilder/README.md) emits incomplete TypeScript as needed. Neither generator supplies editorial approval, invented assets/translations or publishable Props. See [Unified YAML handoff](../architecture/yaml-config-scaffolding.md).

## Quest — contract-only autonomous Section

[Quest](./quest.md) defines a new `type: 'quest'` **Build-only** configurator: an isolated interactive workspace with mandatory `stages.start` and `tasks.start` slug maps (no `order`). Stages provide mandatory silent medium/small video, separated audio tracks, an image and localized subtitles. Tasks contain exactly one Scene and future imperative branch decisions through Quest Actions. This is not a Quiz/Question Bank, nor a normal vertical ContentBlock stack. **The YAML editor schema and both Lesson/Course TypeScript draft scaffolders recognize Quest**, including nested Stages, Tasks, media and Scenes. The Section runtime union and UI renderers have **not** been wired to Quest, so it is not yet a publishable/playable Lesson or Episode Section.
