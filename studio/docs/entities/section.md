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

The technical `lesson.config.yaml` uses explicit `type` for each Section and its ContentBlocks, with slug-keyed `content: { items, order }` collections. Its editor schema is generated from Engine Config schemas; the TypeScript draft scaffolder emits nested `define*Section` and `define*` calls but does not verify editorial approval or publish Props. See [Config-shaped YAML handoff](../architecture/yaml-config-scaffolding.md).
