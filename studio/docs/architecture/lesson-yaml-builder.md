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
file**. Lesson Scene/media production specifications create colocated
`specification.md` files beside their module `index.ts` and may create a
Lesson-level `methodology.md` when supplied. The Scene implementation,
image/audio/video binaries and translations are **not generated**. Course
scaffolding retains UUID-addressed specification handoffs. The separate registered Scene
implementation remains UUID-addressed under the textbook's `scenes/`.
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
UUID directory. Stage 4 changes Lesson Scene/media specification handoffs to the colocated
slug modules. It does **not** change Scene implementation IDs or create
real binary assets.

## Stage 3 file-backed Markdown/Code

The draft builder now extracts _authored source content_ from Markdown `locale.value` into `text.md` (invariant scalar) or `locale/<documentLanguage>.md` (localized map). Code `params.codeAsText` is written exactly to `code.<extension>` using a known language-to-extension mapping. It emits pathless build-time reading bindings in the corresponding `defineMarkdown` or `defineCode` module and never embeds finished copy as a second literal.

The builder **does not transform a `production.specification` description into learner-facing Markdown or Code**, and does not create such specifications for ordinary Text, Markdown or Code. An editor/Screenwriter must provide real source-language learning text in the technical YAML before scaffolding; draft-only absent content is left incomplete. Exact source bytes are checked read-only and never overwritten during generation. File paths do not enter runtime JSON.

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

## Separate React Scene scaffold

The Lesson Builder owns only the nested `defineScene` source module and its
colocated `specification.md`. The opted-in
[Scene Scaffolding workflow](../../../shared/engine/scripts/sceneScaffolding/README.md)
independently reads the same technical `config.yaml` production specifications
and creates an **executable React draft** under the textbook's UUID-addressed
`scenes/<bucket>/<scene-uuid>/`, only in already Scene-capable packages.
Generation is creation-only and never registers unfinished components.
The separate Lesson Builder emission agent is responsible for aligning
PascalCase Scene slug acceptance and `SceneNameConfig` symbols with
executable `SceneName` components. Legacy lowerCamelCase authored slugs
remain valid source identities; they map to PascalCase component filenames.
