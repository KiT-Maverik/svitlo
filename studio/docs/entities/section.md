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

## Assessment Section decisions and typed authoring handoff

At Stage 1 the Methodologist explicitly records **all four** independent `production.assessment` booleans: Question Bank required, Flashcard Bank required, Quiz Section required, and Flashcards Section required. The absence of a Quiz Section does not imply that an independently authored Question Bank is unnecessary; a Quiz may use verified Questions from another Lesson. `config.params.quizRequiredForCompletion` is a distinct runtime completion setting; when true, the final built Lesson requires an **enabled** Quiz Section, not a disabled placeholder.

At editorial Stage 2 the same Lesson `index.ts satisfies LessonWorkflowStage2` contains each Section as a **plain typed** `{config, production?}` node in `config.section.items/order`, not a `define*Section` Configurator. Source-language titles, navigational labels, Section ContentBlocks and UUIDs are approved in their intended position. Quiz/Flashcards Section `params` may remain partial until reviewed Question/Flashcard banks exist; no fabricated UUIDs, scoring, default choices or translated strings are permitted. The original source and production specifications are preserved through Stages 3–5 independent review and final `LessonWorkflowMaterializerInput` handoff.

Stage 6.1's **integrated typed Lesson/Section materializers** produce real modular `define*Section` source and preserve valid approved Section metadata, child order and identities. A missing or disabled required Quiz/Flashcards Section is a **pre-emission failure** in #777's Lesson renderer, not something the materializer automatically inserts. A pre-authored enabled Quiz/Flashcards Section with incomplete bank parameters may still yield diagnostic/TODO-bearing, **nonpublishable** typed draft code. An enabled Quiz required for Lesson completion cannot be replaced by a disabled stub; the owning Lesson Stage 2/5 source must contain its reviewed Section identity and order before Stage 6. Stages 7–8 independently author/review bank members and integrate verified selections before publishing. Stage 6.2/6.3 and production validation enforce actual strict Engine Config/Props, languages and resources. The [typed production architecture](../architecture/typed-production-materialization.md) and [trusted Lesson materialization runbook](../../../scripts/ci/lessonMaterialization/README.md) govern the authorized source transition. Only `/lesson materialize typed` is supported after default-branch rollout; the retired YAML commands are not fallbacks. No second editable `lesson.yaml`, `sectionDrafts` YAML or stage status fields are allowed.

For a newly authorized typed Questions workflow, the own bank starts as a **bank-owned Stage 1 `questions/index.ts`** with the verified Lesson UUID, and progresses to full typed Questions/Quiz _design_ before materialization. The bank does not store a second selected Question UUID list. Only the actual Section owner later imports approved materialized Question Configurators and writes `questionIds: [firstQuestion.id, secondQuestion.id]`; the staged bank index is not a publishable Question index. Historical YAML Section handoff is provenance only, not a supported producer or a fallback. The typed Bank Stage 5 bridge is integrated in #775 and requires independently reviewed SHA-pinned source and deployment.

## Quest — contract-only autonomous Section

[Quest](./quest.md) defines a new `type: 'quest'` **Build-only** configurator: an isolated interactive workspace with mandatory `stages.start` and `tasks.start` slug maps (no `order`). Stages provide mandatory silent medium/small video, separated audio tracks, an image and localized subtitles. Tasks contain exactly one Scene and future imperative branch decisions through Quest Actions. This is not a Quiz/Question Bank, nor a normal vertical ContentBlock stack. **Typed Lesson Stage 2 editorial planning can describe Quest**, including nested Stages, Tasks, media and Scenes; no YAML schema or old draft scaffolder remains supported. The Section runtime union and UI renderers have **not** been wired to Quest, so it is not yet a publishable/playable Lesson or Episode Section.
