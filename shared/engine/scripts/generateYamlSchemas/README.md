# Engine authoring JSON Schema generation

This build-time generator derives TypeScript authoring Config guides from current
Engine Zod configurator schemas. It expands nested Configurator boundaries so
editors can surface actual required types and fields. The output is **not**
editorial approval, data publication or runtime validation.

## Separate Lesson and Course authoring contracts

- **Lesson:** one independently owned `lesson.yaml` contains Engine Config
  (`config`) plus optional authoring-only production data. The checked-in
  `lesson.scaffold.schema.json` combines Engine Zod structure with the
  manually maintained `production.schema.json`. Only the Lesson Builder
  consumes this source format.
- **Course:** [Create Course Flow](../../../../studio/skills/course-workflow/create-course-flow.skill.md)
  owns one temporary `course.yaml`, guided by
  [course-flow.schema.json](../../../../studio/skills/course-workflow/course-flow.schema.json)
  and its stage-aware validator. Stage 5 directly materializes that reviewed
  plan to typed Course/Module/Chapter/Episode sources and initial Lesson YAMLs.
  There is no alternate Course editor envelope, `course.scaffold.schema.json`,
  `config.yaml` pipeline or editorial TOC source.
- **Engine Config/overrides:** `course.schema.json` describes the current
  Engine Course configurator shape; `courseOverrides.schema.json` describes
  its stateless `build.overrides(patch, { languages })` shape. These are API
  reference guides, not new YAML sources and not a separate Course workflow.

All generated schemas are based on the current `@svitlo/engine/build`
configurator contracts. Media Config schemas omit physical filenames from
editable Draft descriptions; complete TypeScript Configs still require real
category-correct `UUID.extension` references. The Lesson Builder emits
reserved Nil UUIDs and explicit `TODO(asset)` markers for missing media.
Neither a generated schema nor a draft asserts that an asset, translation,
Scene implementation or playable Quest exists.

## Commands

Run from the monorepo root after building Engine:

```sh
npm run package:build --workspace @svitlo/engine
npm run content:generate:yaml-schemas --workspace @svitlo/engine
npm run content:check:yaml-schemas --workspace @svitlo/engine
node --test shared/engine/scripts/generateYamlSchemas/generateYamlSchemas.spec.mjs
```

The generator emits nine JSON Schema files:
`contentBlock.schema.json`, `section.schema.json`,
`question.schema.json`, `flashcard.schema.json`,
`lesson.schema.json`, `episode.schema.json`, `course.schema.json`,
`courseOverrides.schema.json`, and `lesson.scaffold.schema.json`.
The manual `production.schema.json` is **not** generated.

`--check` is read-only and fails for stale/missing expected schemas.
`--write` updates only the named generated outputs; deleting retired output
files belongs to explicit repository maintenance.

A Course Lesson child is a reference to an independent `lessonId`, not an
embedded authored Lesson. The Course Flow independently verifies reuse,
methodology, scope and locales; it never fabricates missing assets or Lessons.
