# Section

A Section is a navigable learning unit. Regular Sections hold ordered ContentBlocks; a Quiz is **a Section, not a ContentBlock**.

## Engine contracts

See [Content Section schemas](../../../shared/engine/configurators/sections/defineContentSection/defineContentSection.schemas.ts) and [Quiz Section schemas](../../../shared/engine/configurators/sections/defineQuizSection/defineQuizSection.schemas.ts). Both define Config and Props, Section `params`, localized `title`/`navigationLabel`, and ordered ContentBlocks.

- Content Section: `type: 'content'`, with authored `content: { items, order }` published as an ordered array.
- Quiz Section: `type: 'quiz'`; `params` include `selection`, `questionOptions`, `layout`, `interaction`, `feedbackMode`, `grading`, `results`, `screen`, `timeLimitSeconds` and `isBlocker`. Quiz `content` holds Section-owned screen ContentBlocks; Questions are selected from the separate Lesson Question Bank.
- Multiple Quizzes are allowed. A blocking Quiz can prevent forward navigation; meeting a grading threshold is a separate assessment result.
- `layout.mode` supports `stack` and `stepper`. Without `timeLimitSeconds`, the Quiz is untimed.

## Layout and knowledge checkpoints

General Section ContentBlocks render in one vertical column. A Scene can have its own internal layout. A Knowledge Checkpoint is a reflective prompt, not a scored Quiz.

Related: [Lesson](./lesson.md), [Lesson Content](./lesson-content.md).

## Build-time configurator API

Use the appropriate Engine `define*Section` configurator from `@svitlo/engine/build`. `build.props({ languages })` returns invariant and locale-specific Props fragments; `build.overrides(patch, { languages })` returns scoped sparse patches. Section configurators do not write files, build Course TOCs, or own the Lesson's Question Bank.

## Methodologist assessment requirements

The Lesson's approved `methodology.md` YAML frontmatter declares `assessmentPlan.quizRequired` and `quizzes[]`, including required `AssessmentMethodKey` values per Quiz. `defineQuizSection` configures runtime behavior, but it does **not** decide why a Quiz is educationally required. The Screenwriter's `content.yaml` binds each required Quiz to its approved `assessmentPlanKey`; the Assessment Architect validates the actual Questions and scoring. No fixed one-Quiz-per-Lesson rule.

## YAML Config draft authoring

The technical Lesson `config.yaml` embeds a `config` object and optional `production` instructions at **each Section and nested ContentBlock**. Stable IDs and typed `params` live only in `config`; slug-keyed `content: { items, order }` preserves order without positional authoring arrays. The [composed editor schema](../../../shared/engine/yaml-schemas/lesson.scaffold.schema.json) derives `config` from Engine Zod and embeds manually maintained production requirements. The TypeScript scaffolder emits deliberately incomplete `define*Section` and `define*` drafts and UUID-addressed production specifications, but neither checks editorial approval nor publishes Props. See [Unified YAML handoff](../architecture/yaml-config-scaffolding.md).
