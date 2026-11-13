# Section

A Section is a navigable learning unit. Regular Sections hold ordered ContentBlocks; a Quiz is **a Section, not a ContentBlock**.

## Contract

See current [Engine Section Config schemas](../../../shared/engine/configurators/sections/) and specifically [Quiz Section](../../../shared/engine/configurators/sections/defineQuizSection/defineQuizSection.schemas.ts), not the retired `@svitlo/contracts` shapes.

- Every Section Config has stable UUID/camelCase slug, explicit `type`, `params`, localized `locale` and a **named ordered** `content: { items, order }` of ContentBlock configurators. The published Props shape may use resolved arrays; do not author Props arrays into Config YAML.
- A Quiz Section has `type: quiz` and **also requires** `content: { items, order }` (possibly empty). Unlike historical schemas, current Quiz Config does **not** omit the content collection.
- Quiz `params` include required `selection`, `layout`, `feedbackMode`, `interaction` and `results`, with optional `questionOptions`, `grading`, `screen`, `timeLimitSeconds` and `isBlocker`. Do not invent these fields on behalf of the Methodologist or Assessment Architect.
- The Lesson retains the full authored Question catalog under typed `questions.<type>.<slug>` groups. Approved Quiz assignments are deliberately projected to the relevant Section's `params.selection`, not inferred by the YAML draft scaffolder.
- Multiple Quiz Sections are supported. `isBlocker` and assessment thresholds are runtime controls whose actual behavior must be verified in the controller, not inferred solely from the Config schema.
- Omitted `timeLimitSeconds` indicates no configured time limit. `layout.mode` accepts `stack` and `stepper`; runtime UI implementation remains separately verified.

The same prepared Question responses and Quiz parameters can power standalone practice.

## Layout and knowledge checkpoints

General Section ContentBlocks render in one vertical column. A Scene can have its own internal layout. A Knowledge Checkpoint is a reflective prompt, not a scored Quiz.

Related: [Lesson](./lesson.md), [Lesson Content](./lesson-content.md).

## Current Engine build-time Config API

Authored Sections use `defineContentSection`, `defineQuizSection` and other typed `define*` Section factories from `@svitlo/engine/build`. Each nested ContentBlock is its own typed Configurator, with explicit `type` and `{items,order}` collections wherever applicable. The Engine [composed YAML schemas](../../../shared/engine/configurators/yaml/) project these configurator boundaries to editor-readable Config-shaped YAML. The [draft scaffolder](../architecture/lesson-yaml-builder.md) only emits TypeScript source; it neither validates the editorial `content.yaml` plan nor generates complete Props or publishes resources. These are separate implementation and editorial stages.

## Methodologist assessment requirements

The Lesson's approved `methodology.md` YAML frontmatter declares `assessmentPlan.quizRequired` and `quizzes[]`, including required `AssessmentMethodKey` values per Quiz. Engine Quiz Section `params` configures runtime behavior, but does **not** decide why a Quiz is educationally required. The Screenwriter's `content.yaml` binds each required Quiz to its approved `assessmentPlanKey`; the Assessment Architect validates the actual Questions and scoring. No fixed one-Quiz-per-Lesson rule.
