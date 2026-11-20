# Section

A Section is a navigable learning unit. Regular Sections hold ordered ContentBlocks; a Quiz is **a Section, not a ContentBlock**.

## Engine contracts

See [Content Section schemas](../../../shared/engine/configurators/sections/defineContentSection/defineContentSection.schemas.ts) and [Quiz Section schemas](../../../shared/engine/configurators/sections/defineQuizSection/defineQuizSection.schemas.ts). Both define Config and Props, Section `params`, localized `title`/`navigationLabel`, and ordered ContentBlocks.

- Content Section: `type: 'content'`, with authored `content: { items, order }` published as an ordered array.
- Quiz Section: `type: 'quiz'`; `params` include `selection`, `questionOptions`, `layout`, `interaction`, `feedbackMode`, `grading`, `results`, `screen`, `timeLimitSeconds` and `isBlocker`. Quiz `content` holds Section-owned screen ContentBlocks; Questions are addressed by explicit stable `params.selection.questionIds` UUIDs against independently published, globally UUID-addressed Question resources. A Quiz may select a deliberate set from **several preceding Lessons' banks**, not just its own Lesson's bank; ownership and available locales are validated at publication/loading. Neither Lesson nor Section embeds Questions or complete banks; Quiz ContentBlocks are exclusively Section-owned screens. Authored Quizzes should import the chosen typed Question Configurators and use `questionIds: [firstQuestion.id, secondQuestion.id]`. The built Props still serialize only stable UUID strings, and strict textbook publication validates the selected IDs and required locales.
- Flashcards Section: `type: 'flashcards'`; `params.selection.flashcardIds` contains unique ordered Flashcard UUIDs from globally UUID-addressed Flashcard resources whose authored sources remain Lesson-owned, while ordinary Section-owned ContentBlocks remain in `content`.
- Multiple Quizzes are allowed. A blocking Quiz can prevent forward navigation; meeting a grading threshold is a separate assessment result.
- `layout.mode` supports `stack` and `stepper`. Without `timeLimitSeconds`, the Quiz is untimed.

## Layout and knowledge checkpoints

General Section ContentBlocks render in one vertical column. A Scene can have its own internal layout. A Knowledge Checkpoint is a reflective prompt, not a scored Quiz.

Related: [Lesson](./lesson.md), [Lesson Content](./lesson-content.md).

## Build-time configurator API

Use the appropriate Engine `define*Section` configurator from `@svitlo/engine/build`. `build.props({ languages })` returns invariant and locale-specific Props fragments; `build.overrides(patch, { languages })` returns scoped sparse patches. Section configurators do not write files, build Course TOCs, or own the Lesson's Question Bank.

## Assessment Section decisions and source handoff

The Methodologist decides whether the Lesson eventually requires Quiz and/or Flashcards Sections using root `production.quizRequired` and `production.flashcardsRequired` (optional booleans). There is no mandatory YAML-fenced inventory, Section status marker, or fake bank selection.

Stage 2 preserves each planned assessment Section as a normal `config.section.items/<slug>` node and its `order` entry, including stable UUID, title, navigation, nested ContentBlocks and authoring-only production notes. A Section whose independent bank selection or required Config params are incomplete must not be emitted as invalid `defineQuizSection` or `defineFlashcardsSection` TypeScript. The Lesson Builder defers it into the separate bank YAML `sectionDrafts` handoff and emits a real root `TODO (BLOCKER)` until integration. Complete Sections remain normally ordered.

This handoff is Stage 6.1 of the ten-stage Lesson Flow; Stage 6.2–6.4 cover accessibility, offline and source validation, while parent Stages 7–8 own independent Question/Flashcard Banks. The bank/Section specialist later integrates actual verified resource references and mandatory Config params. Full validation and publication continue to enforce strict Engine Section schemas and independently reviewed bank ownership, locale availability and selected UUIDs. `config.params.quizRequiredForCompletion` is the distinct Lesson-completion requirement, not a bank-creation flag.

## YAML Config draft authoring

The **current** Lesson draft source is `lesson.yaml`, with nested `config` and optional authoring-only `production` on each Section and ContentBlock. Immutable identities and typed parameters live in `config`; slug-keyed `{ items, order }` collections preserve order. Engine's [composed editor schema](../../../shared/engine/yaml-schemas/lesson.scaffold.schema.json) derives technical Config from Zod and composes production metadata. Stage 1–5 drafts may be incomplete; at Stage 6 the separate [Lesson finalizer](../../../shared/engine/scripts/finalizeLesson/README.md) validates the full source and ensures safe handoff, while the create-only [Lesson Builder](../../../shared/engine/scripts/lessonBuilder/README.md) emits incomplete TypeScript as needed. Neither generator supplies editorial approval, invented assets/translations or publishable Props. See [Unified YAML handoff](../architecture/yaml-config-scaffolding.md).

## Quest — contract-only autonomous Section

[Quest](./quest.md) defines a new `type: 'quest'` **Build-only** configurator: an isolated interactive workspace with mandatory `stages.start` and `tasks.start` slug maps (no `order`). Stages provide mandatory silent medium/small video, separated audio tracks, an image and localized subtitles. Tasks contain exactly one Scene and future imperative branch decisions through Quest Actions. This is not a Quiz/Question Bank, nor a normal vertical ContentBlock stack. **The YAML editor schema and both Lesson/Course TypeScript draft scaffolders recognize Quest**, including nested Stages, Tasks, media and Scenes. The Section runtime union and UI renderers have **not** been wired to Quest, so it is not yet a publishable/playable Lesson or Episode Section.
