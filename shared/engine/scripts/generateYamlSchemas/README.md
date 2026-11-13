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
`shared/engine/yaml-schemas/{contentBlock,section,question,flashcard,lesson,episode,course}.schema.json`.
The `--check` command is read-only and detects stale/absent files.

JSON Schema serialization uses Zod's `reused: 'ref'` option so repeated
nested Config schemas are referenced through JSON Schema `$defs/$ref`
rather than inlined at every nesting position. This keeps the machine-readable
authoring guidance compact without dropping any required `type` discriminators
or replacing nested schemas with permissive placeholders.

These schemas describe *authored Config structure*, not published Props and
not the role-specific editorial plans in `studio/skills/`. The Studio agents
can consume them as machine-readable guides for YAML authoring; they do not
supersede methodology, assessment, screenwriting or review documents.

## Two deliberately different responsibilities

- **This generator:** composes Zod schemas and emits JSON Schema for editing.
  Unrepresentable nested Configurator schemas fail schema emission instead
  of silently turning into permissive `{}` definitions.
- **Lesson/Course TypeScript scaffolders:** mechanically read incomplete,
  source-language YAML and emit named `define*` TypeScript draft exports.
  They **must not call this generator or parse their YAML against these
  schemas**. Incomplete translations, fields and TypeScript diagnostics are
  intentionally left for the finishing AI agent.

Only ordinary `documentLanguage` copy may be present in the initial YAML
even if the intended `params.languages` lists more locales. This tool does
not fabricate or require missing translations during scaffolding.

Config-level refinements and cross-item invariants may not be expressible in
JSON Schema. Such checks remain owned by each Engine configurator when an
author subsequently completes its TypeScript source. Course `type: lesson`
nodes in the YAML composition intentionally represent references to existing
Lessons (`lessonId`), rather than embedding a duplicate standalone Lesson.

The source format is subject to finalization in Issue #507; no existing
`*.schema.json` editorial plan is automatically migrated by this change.
