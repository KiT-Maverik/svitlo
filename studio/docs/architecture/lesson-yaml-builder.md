# Deterministic Lesson YAML → TypeScript draft scaffolder

**Purpose:** Reduce repetitive authoring of `define*` TypeScript Config trees. This is build-time code scaffolding, **not** a Studio approval Skill, a completed Lesson generator, a YAML validator or a publisher.

The canonical authored YAML structure is defined by Engine's [composed Zod schemas](../../../shared/engine/configurators/yaml/) and the [generated editor JSON Schemas](../../../shared/engine/scripts/generateYamlSchemas/README.md). See the [Studio editorial-to-Config handoff](./yaml-config-scaffolding.md) for a concrete, nested Lesson sample and the source-language-only rule. Engine `yamlFactoryByType` resolves each explicit node `type` to its `define*` factory; **no** type can be inferred from an editorial plan's array position or block `key`.

## Inputs and distinct ownership

Specialists own separate, independently reviewed editorial sources beneath the immutable Lesson UUID directory:

- `methodology.md` (or existing legacy `methodologist-brief.md`): Methodologist scope, Skill links, audience, language plan and `assessmentPlan`.
- `content.yaml`: Screenwriter's ordered learner experience and optional `scenes/*.scene-spec.md`.
- `questions/questions.yaml`: Assessment Architect's complete Question bank and curated Quiz selections.
- `flashcards/flashcards.yaml`: optional, separately approved recall bank, downstream of the approved Questions.

These files have their **own editorial schemas** and are **not** direct `defineLesson` Config YAML. An authorized technical handoff projects their relevant, independently reviewed data into **Config-shaped YAML** with permanent IDs, camelCase slugs, `type` at each polymorphic level, nested `{items,order}` collections, type-specific Question content, and explicitly resolved Question references. In particular, approved Quiz selections must be deliberately transferred into their Quiz Section `params.selection`; the scaffolder does not discover or approve that selection. Unresolved authoring and identity decisions remain explicit handoff blockers.

The generated JSON Schemas are derived from **current Engine** Zod Config compositions; they must not be independently recreated in Studio or invoked as runtime validation by the scaffolder.

## Output and non-goals

The Lesson scaffolder's output is **draft TypeScript source** calling the current build-time `defineLesson`, `define*` Section/ContentBlock/Question/Flashcard factories, where the Config-shaped input supports them. It may contain deliberately incomplete fields or only the editorial source locale; later Coding Agent completion remains necessary. Generated TS is **not promised to typecheck**, nor does it attest that a Lesson is pedagogically correct, reviewed, complete, localized or publishable. Actual supported CLI flags, input paths and output file naming must be read from the **current `shared/engine/scripts/lessonBuilder/` implementation and tests**, not inferred from the historical generator commands formerly listed in this document.

The draft scaffolder must **not**:

- Check YAML with AJV or Zod, run whole-repository TypeScript validation, enforce editorial approvals, inspect Issue/PR sign-offs, or manufacture missing material.
- Convert `content.yaml`, `questions/questions.yaml` or `flashcards/flashcards.yaml` directly as if the editorial schemas were Config schemas without the explicit handoff.
- Fill missing languages, fake accessibility/media resources, silently invent Quiz parameters or change stable Lesson identity.
- Generate publishable Props, invoke `generateLessonProps`, write localized published JSON, or run the Course Props pipeline. These are separate Engine tools and later stages.

**Current Lesson CLI reads `lesson.config.yaml`**, a technical projection in the same UUID directory containing a top-level `documentLanguage` provenance marker alongside the Config-shaped fields. It does **not** read the Screenwriter's separate editorial `content.yaml` or raw specialist Question/Flashcard plans; their review and explicit projection happen upstream. The provenance marker is removed before emitting `defineLesson` and is not part of the Engine Config JSON Schema.

**Editor schema generation is a different command** (run against a built Engine workspace):

```sh
npm run package:build --workspace @svitlo/engine
npm run content:generate:yaml-schemas --workspace @svitlo/engine
npm run content:check:yaml-schemas --workspace @svitlo/engine
node --test shared/engine/scripts/generateYamlSchemas/generateYamlSchemas.spec.mjs
```

The checked-in `shared/engine/yaml-schemas/` files are editor references. The write command must be run whenever the underlying Engine Config schemas change; the check command detects stale outputs.

## Locales and later completion

`documentLanguage` is an editorial provenance field and may be `uk`, `en`, or another approved source language. It is **not** an extra field inside the Engine Lesson Config; the projection places learner text in e.g. `locale.title.uk`, `locale.value.uk` and retains the intended `params.languages` (which may contain more locales). Other locales remain absent until actual translations exist. A genuinely invariant string is different from a missing translation.

**Editorial review/approval stays with Studio** and must be source-revision-specific; a valid-looking draft or successful scaffolder command never closes any review gate. After the scaffolder, a Coding Agent resolves missing Config inputs, tests, Scenes, accessibility, assets and typed references. Translation, ordinary package typechecking, real `generateLessonProps` generation and publication are subsequent, separately verified tasks. No stage automatically approves or publishes a Lesson.

The legacy Builder design described YAML approval checks, automatic Question-bank assembly, complete generated outputs and manifest publication as if those features were guaranteed. They are **not** the contract for the new Issue #507 draft-scaffolding path. Any such behavior in existing legacy scripts must be established from their actual current implementation and is outside this scaffolder's acceptance criteria.
