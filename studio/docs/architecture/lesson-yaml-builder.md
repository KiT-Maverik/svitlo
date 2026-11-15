# Deterministic Lesson YAML → TypeScript draft scaffolder

**Current input:** one `config.yaml` per Lesson UUID directory, with
`{ config, production? }` at every nested entity node. See the
[unified YAML authoring handoff](./yaml-config-scaffolding.md) and
[actual Lesson Builder README](../../../shared/engine/scripts/lessonBuilder/README.md).

## Role and input

The Engine-owned `shared/engine/scripts/lessonBuilder/lessonBuilder.mjs`
selects `define*` factories through
`shared/engine/configurators/yaml/yamlFactoryByType.ts`, unwraps only
`config`, and mechanically emits an `index.ts` Lesson draft, a typed
`constants.ts` language tuple, and recursively nested `sections/`,
`flashcards/`, and `questions/` module trees. Source-relative content is
organized by slug; role-specific subfolders are retained where distinct
Quest/Question/Flashcard roles would otherwise collide. See the
[Stage 1 layout contract](./lesson-generated-source-layout.md).

`production` is a **separate typed authoring concern inside the same YAML
file**. Its source language and production specifications may create
UUID-addressed `specification.md` files for Scenes/media, plus a
`methodology.md` handoff when explicitly supplied. The Scene itself,
image/audio/video files, and translations are **not generated**.
One identity comes from each node's `config.id`; no `sceneSpecKey`.

The technical `config.yaml` is created from independently reviewed
Methodologist/Screenwriter/Assessment/Flashcard sources when applicable.
Migrating legacy `content.md` and `methodologist-brief.md` is explicitly
authorized editorial work, never an automatic side effect of this builder.
For new authoring, methodology text can live once in the YAML production
section and be materialized as read-only derived Markdown.

## Two schema responsibilities

- Existing `shared/engine/yaml-schemas/lesson.schema.json`: automatically
  generated **Engine Config-only** guide from Zod, with typed child objects.
- `shared/engine/yaml-schemas/production.schema.json`: manually maintained
  production requirements by type.
- `shared/engine/yaml-schemas/lesson.scaffold.schema.json`: automatically
  composed editor schema for the single file's paired nodes.

None of these is executed by the draft scaffolder as validation.
`production.documentLanguage` selects source text, while
`config.params.languages` retains the intended publication locales.
Other language values are not fabricated.

## Stage 2 source-module behavior

Generated TypeScript uses valid unquoted object keys, shorthand collection
properties, factory-specific generic arguments, and types derived from the
Lesson's immutable YAML language tuple. Skill UUIDs are resolved to actual
textbook Skill imports, never replaced with invented symbols. Unresolved or
duplicate Skill references are reported rather than silently serialized as
authoritative source references.

The Props publisher supports the root `index.ts` entrypoint, and the
textbook build must recognize that entrypoint independently of the existing
`*.data.ts` convention. Do not mix both entrypoint styles inside one
UUID directory. This stage does **not** change the still-UUID-addressed
Scene/media production handoffs or create real assets.

## TypeScript failure is intentional

If a Lesson contains explicit pending media `null` values, untranslated
locales, an unfinished Scene implementation or unresolved Question references,
the scaffolded TypeScript **is expected to fail typechecking by design**.
Required YAML Config fields must not be omitted. The next coding/media agent
owns those errors and follows the recorded specifications. The scaffolder
must not inject placeholders or suppress types to make CI green.

The scaffolder must not run Zod/AJV, TS checks, editorial approvals,
`build.props()`, Props generation or publication. It is a code-shaping
convenience, **not an acceptance or completion gate**.

## Creation-only write policy

`generate` skips the Lesson before parsing YAML when its destination UUID
directory contains any `*.data.ts` or a root `index.ts`. New drafts and requested handoff Markdown
are created without overwriting unrelated or edited files; `check` is
read-only and strict. Unsafe symlink paths remain rejected.

Use the current README and test file for invocation flags. Do not trust
historical Creator API names or draft generator examples instead of
the actual script.
