# Lesson YAML → TypeScript draft scaffolder

This Engine-owned build-time utility generates repetitive `define*` TypeScript
authoring code from **technical Config-shaped YAML**. It is a convenience
scaffolder, not a methodology/approval validator, localization tool, TypeScript
checker or Props publisher. Incomplete TypeScript is the expected handoff to
an AI author.

## Inputs: keep editorial and technical files separate

The fixed Lesson UUID directory contains independently owned documents:

- `content.yaml` — **Screenwriter's editorial plan** (`kind: lesson-content-plan`);
  this script **never reads or changes it**.
- `questions/questions.yaml` — **Assessment Architect's editorial plan**;
  this script **never reads or changes it**.
- `flashcards/flashcards.yaml` — **Flashcards editorial plan**;
  this script **never reads or changes it**.
- **`lesson.config.yaml`** — the separate, technically projected
  Config-shaped YAML draft that **this script reads**.

The technical projection is made by an authorized author/editor from reviewed
editorial sources, with stable IDs, current `*_Config_Schema` field shapes,
`{ items, order }` collections and a mandatory `type` at every polymorphic
node. Questions and Flashcards, when authored, are nested in this **same**
technical `lesson.config.yaml` as `questions` and `flashcards` fields.
No unapproved mapping from editorial key/section arrays is inferred here.

The technical file includes one extra **scaffolder provenance field**
`documentLanguage` at the root. It is **removed** before emitting
`defineLesson({...})`: it is not part of the Engine Lesson Config, but it
**is** described in the generated YAML draft editor Schema. The builder uses it only to select authored
locale dictionaries and localized Flashcard flag values.

Example incomplete `lesson.config.yaml`:

```yaml
documentLanguage: uk # scaffolder provenance, not defineLesson Config
id: 00000000-0000-4000-8000-00000000000c
slug: lightLesson
type: lesson
params:
  languages: [uk, en] # en translation is intentionally missing
locale:
  title:
    uk: Світло
section:
  items:
    intro:
      id: 00000000-0000-4000-8000-000000000001
      slug: intro
      type: content
      content:
        items:
          firstText:
            id: 00000000-0000-4000-8000-000000000002
            slug: firstText
            type: text
            locale:
              value:
                uk: Привіт
        order: [firstText]
  order: [intro]
```

The script writes `lightLesson.data.ts` beside the YAML, with a named
`lightLesson_Lesson = defineLesson(...)` export and the required nested
`define*` calls imported from `@svitlo/engine/build`. The factory registry
comes from `shared/engine/configurators/yaml/yamlFactoryByType.ts`.

No missing IDs, fields, content, translations or approved Lesson assets are
invented. All supplied non-localized values (including `params.languages`) are
preserved. Missing/unknown `type` produces a focused dispatch diagnostic.
Any remaining TypeScript errors in the generated draft must be addressed by
the subsequent author — never suppressed by the scaffolder.

## Usage

From the repository root:

```sh
npm run content:generate:lessons
npm run content:check:lessons
npm run test:unit:lesson-builder
npm run content:check:yaml-schemas --workspace @svitlo/engine

node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs generate --source content/<book>/data/lessons/<bucket>/<uuid>
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs check --source content/<book>/data/lessons/<bucket>/<uuid>
```

Without `--source`, the script discovers directories with
`lesson.config.yaml` (not Screenwriter editorial YAML).
The `check` command is read-only and continues to report missing or stale
YAML-generated drafts. **`generate` is creation-only**: if the Lesson UUID
directory already contains **any `*.data.ts`**, the Lesson is skipped with a
`SKIP Lesson <uuid>: existing <file>; no files modified` message, even if the
YAML has changed or the existing file is identical. A missing target file is
created with exclusive (`wx`) semantics. To regenerate intentionally, an
editor must first review and manually remove/move the existing file.
Editorial YAML, methodology and other non-`*.data.ts` files do not trigger
the skip. Symlink traversal is refused.

## Boundaries

The separate `scripts/generateLessonProps/` publisher and runtime Engine
remain unchanged. Studio editorial approval stays in Studio. The eight derived editor JSON Schemas describe Engine-derived authoring shapes
and explicit draft-only envelope fields (including `documentLanguage`); no
Zod/AJV validation runs inside this builder. See
`studio/docs/architecture/yaml-config-scaffolding.md`.
