# Engine YAML authoring schema generation

This is **build-time editor guidance**, not Lesson/Course YAML draft
validation. It composes the current Engine `*_Config_Schema` definitions
across the otherwise opaque `z.custom<Configurator>()` child boundaries.

The source files live in `configurators/yaml/`. Each polymorphic nested
node retains its required `type` literal, and the build-time factory name
registry `yamlFactoryByType` provides explicit `type -> define*` dispatch.

## Generate

From the monorepo root:

```sh
npm run package:build --workspace @svitlo/engine
npm run content:generate:yaml-schemas --workspace @svitlo/engine
npm run content:check:yaml-schemas --workspace @svitlo/engine
node --test shared/engine/scripts/generateYamlSchemas/generateYamlSchemas.spec.mjs
```

Generated, reviewable JSON Schemas are written to
`shared/engine/yaml-schemas/{contentBlock,section,question,flashcard,lesson,episode,course,courseOverrides}.schema.json`.
The `--check` command is read-only and detects stale/absent files.

These schemas describe _authored Config structure_, not published Props and
not the role-specific editorial plans in `studio/skills/`. The Studio agents
can consume them as machine-readable guides for YAML authoring; they do not
supersede methodology, assessment, screenwriting or review documents.

## Separate responsibilities and YAML envelopes

- **Schema generator:** derives editor-facing JSON Schema from current Engine Zod Config
  compositions. Lesson/Course editor schemas include a small **draft YAML
  envelope**: `documentLanguage` (required for Lesson, optional for Course),
  intentionally incomplete authored fields, and optional Course Lesson
  `source` import coordinates. These are **not** additions to Engine Config.
- **`courseOverrides.schema.json`:** guides the sole supported Course-owned
  overrides document: the direct `course.build.overrides(patch, { languages })`
  patch. Legacy `operations` lists and `createLessonOverrides` are unsupported.
  Nested patches are guidance; their semantic validity depends on the actual
  referenced Lesson/child configurators.
- **Lesson/Course TypeScript scaffolders:** mechanically read source-language YAML
  and emit named `define*` TypeScript drafts. They **must not call this schema
  generator or validate YAML with Zod/AJV**. Incomplete translations, missing
  fields and TypeScript diagnostics are deliberately left to finishing agents.
- **Props publishers:** separate from both draft scaffolding and editor schemas.

`documentLanguage` filters authored localized fields without inventing
translations. `params.languages` preserves the intended supported languages.
A Course `type: lesson` node always references an independent Lesson by
`lessonId`. `source` is optional import metadata, not an existence flag or a
request to generate Lesson files. Neither Course scaffolding nor overrides
may write into standalone Lesson directories.

The checked-in schemas are editor guidance, not proof that a draft can already
pass runtime/configurator validation or publication. Regenerate them after
changes to the Engine source contracts or to the explicit draft projection.
