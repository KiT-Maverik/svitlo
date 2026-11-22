# Deterministic Lesson YAML → TypeScript draft scaffolder

> **Typed-production migration (parent #775; Lesson #782, Questions #783, Flashcards #784 remain separate Drafts):** New editorial work progresses through one TypeScript source per entity. Existing YAML builders and trusted PR commands remain operational **legacy paths** until an integrated, source-SHA-pinned typed replacement is tested. Stage type declarations are not proof that the corresponding materializer or CI handoff is deployed. Never replace a source converter with a Props publisher.

**Scope:** this is the **existing** `shared/engine/scripts/lessonBuilder/` YAML-to-TS draft converter and historical layout, not new Lesson authoring. #782 proposes one progressively typed `LessonWorkflowStage1/2` source, reviewed at Stages 3–5; only a later authorized Stage 6 orchestrator may materialize full Lesson/Section/Block source. Course Stage 5 creates **only** a typed Lesson Stage 1 handoff. The concrete Lesson, Section, ContentBlock and assessment source renderers from merged #777–#780 now exist in `shared/engine/generators/materializers/` and are registered in the Engine test runner, but they do **not** yet form the reviewed Stage 6 orchestrator/writer. No legacy conversion or pure source rendering implies approval, Scene integration or published Props.

> **Stage 6 boundary:** [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md) invokes separate [full preflight/finalization](../../../shared/engine/scripts/finalizeLesson/README.md) **outside** the create-only Lesson Builder. The Builder remains a draft-only emitter; no full Zod validation or YAML deletion is added to it.

**Current input:** one `lesson.yaml` per Lesson UUID directory, with
`{ config, production? }` at every nested entity node. See the
[unified YAML authoring handoff](./yaml-config-scaffolding.md) and
[actual Lesson Builder README](../../../shared/engine/scripts/lessonBuilder/README.md).

## Role and input

The Engine-owned `shared/engine/scripts/lessonBuilder/lessonBuilder.mjs`
selects `define*` factories through
`shared/engine/configurators/yaml/yamlFactoryByType.ts`, unwraps only
`config`, and mechanically emits an `index.ts` Lesson draft, a typed
`constants.ts` language tuple, and recursively nested `sections/` module trees. Question and Flashcard resources belong to independent authoring/build stages. Source-relative content is
organized by slug; role-specific subfolders are retained where distinct
Quest/Checkpoint roles would otherwise collide. See the
[Stage 1 layout contract](./lesson-generated-source-layout.md).

`production` is a **separate typed authoring concern inside the same YAML
file**. Lesson Scene/media production specifications create colocated
`specification.md` files beside their module `index.ts` and may create a
Lesson-level `methodology.md` when supplied. The Scene implementation,
image/audio/video binaries and translations are **not generated**. Course
scaffolding retains UUID-addressed specification handoffs. The separate registered Scene
implementation remains UUID-addressed under the textbook's `scenes/`.
One identity comes from each node's `config.id`; no `sceneSpecKey`.

The technical `lesson.yaml` is created from independently reviewed
Methodologist/Screenwriter sources when applicable.
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
provisional active `languages` tuple in `constants.ts` (initially the source
document language). The complete planned YAML language tuple stays untouched. Skill UUIDs are resolved to actual
textbook Skill imports, never replaced with invented symbols. Unresolved or
duplicate Skill references are reported rather than silently serialized as
authoritative source references.

The Props publisher supports the root `index.ts` entrypoint, and the
textbook build must recognize that entrypoint independently of the existing
`*.data.ts` convention. Do not mix both entrypoint styles inside one
UUID directory. Stage 4 changes Lesson Scene/media specification handoffs to the colocated
slug modules. It does **not** change Scene implementation IDs or create
real binary assets.

## Provisional source-language authoring scope (implemented)

The Lesson YAML `config.params.languages` remains the **complete planned**
language set, with its original values and order. During initial scaffolding,
`renderLessonModules` creates one active `constants.ts` export using a
new one-element tuple from `production.documentLanguage` **directly**, not
by truncating, slicing or filtering the YAML tuple. The complete YAML tuple
is emitted separately as a **commented-out declaration of the same name** for
manual activation after translations are ready.

For example, `production.documentLanguage: en` and
`config.params.languages: [en, uk, pl, qm]` produce:

```ts
import type { LanguageCode } from '@svitlo/engine/build';

// Restore the complete language set when translations are ready:
// export const languages = ["en","uk","pl","qm"] as const satisfies readonly [LanguageCode, ...LanguageCode[]];

export const languages = ['en'] as const satisfies readonly [LanguageCode, ...LanguageCode[]];
export type LessonLanguages = typeof languages;
```

The root `defineLesson` uses the active `languages` value; nested
Configurators use its derived `LessonLanguages` type. This enables an
initial source-language-only Lesson draft without inventing translations or
loosening `RequireLanguages` / `ChildrenSupporting`. Only the active source
language can be previewed/published until translations are truly present.
After completing the translations, the author can manually activate the
commented full declaration and deactivate the provisional one; the existing
TypeScript constraints enforce expanded coverage.

The builder never modifies the YAML or overwrites existing authored
`constants.ts` (or other Lesson source) files. `generate` retains its
creation-only `SKIP` protection, and `check` remains strictly read-only.
The scaffolder is still draft-only; pending media, Scene, Review and other
dependencies may prevent TypeScript compilation. This does not introduce
a new Props API, language override, or publication mode.

## Stage 3 file-backed Markdown/Code

The draft builder now extracts _authored source content_ from Markdown `locale.value` into `text.md` (invariant scalar) or `locale/<documentLanguage>.md` (localized map). Code `params.codeAsText` is written exactly to `code.<extension>` using a known language-to-extension mapping. It emits pathless build-time reading bindings in the corresponding `defineMarkdown` or `defineCode` module and never embeds finished copy as a second literal.

The builder **does not transform a `production.specification` description into learner-facing Markdown or Code**, and does not create such specifications for ordinary Text, Markdown or Code. An editor/Screenwriter must provide real source-language learning text in the technical YAML before scaffolding; draft-only absent content is left incomplete. Exact source bytes are checked read-only and never overwritten during generation. File paths do not enter runtime JSON.

## TypeScript failure is intentional

Technical `lesson.yaml` **omits** `fileName` and `posterFileName` entirely
for Image, Audio, Video, Subtitles and their nested Carousel/Quest variants;
neither `null` nor a speculative UUID filename belongs in YAML. The
Lesson Builder deliberately inserts a reserved Nil UUID with the required
media extension and an adjacent `TODO(asset)` in generated TypeScript.
Each unresolved media Configurator also receives one real `TODO (BLOCKER):`
source comment above its generated export, including nested Question media
through the shared renderer. Existing CI enforces the comment on eligible
non-Draft PRs; strict production asset validation remains independent.
This is an unresolved dependency, not a real resource identity. A later
media specialist replaces these placeholders with validated physical
`UUID.extension` asset names.

Untranslated locales, incomplete Scenes, Review evidence and unresolved
Question references may still prevent TypeScript compilation by design.
**Non-media** YAML Config fields remain required. The scaffolder must not
invent educational content, translations or real assets, and must not
suppress TypeScript diagnostics to make CI green.

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
independently reads the same technical `lesson.yaml` production specifications
and creates an **executable React draft** under the textbook's UUID-addressed
`scenes/<bucket>/<scene-uuid>/`, only in already Scene-capable packages.
Generation is creation-only and never registers unfinished components.
The separate Lesson Builder emission agent is responsible for aligning
PascalCase Scene slug acceptance and `SceneNameConfig` symbols with
executable `SceneName` components. Legacy lowerCamelCase authored slugs
remain valid source identities; they map to PascalCase component filenames.
