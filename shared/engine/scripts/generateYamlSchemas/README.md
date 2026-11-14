# Engine YAML authoring schema generation

This is **build-time editor guidance**, not Lesson/Course YAML draft
validation. It composes the current Engine `*_Config_Schema` definitions
across the otherwise opaque `z.custom<Configurator>()` child boundaries.

The source files live in `configurators/yaml/`. Each polymorphic nested
node retains its required `type` literal, and the build-time factory name
registry `yamlFactoryByType` provides explicit `type -> define*` dispatch.

## Unified Config + production editor contract

For the new single-file `config.yaml` source, each entity node is
`{ config: <Engine Config>, production?: <authoring-only needs> }`. Technical
configuration is generated from existing Engine Zod; production requirements
are **manually authored** in
`shared/engine/yaml-schemas/production.schema.json` (per entity kind).
`generateYamlSchemas.mjs` composes those two contracts into the checked-in
`lesson.scaffold.schema.json` and `course.scaffold.schema.json`. These
compositions share the node's single identity in `config.id`, and production
never reaches `define*`, Overrides or Props. The composed editor documents have
only internal `$ref` pointers, embedding both manual production definitions and
the Course's direct Build overrides guide. Source language provenance is
`production.documentLanguage`.

YAML Zod projections preserve all Engine-required Config fields; the only
intentional type differences for pending local assets are `z.literal(null)`
for `image.src`, `audio.fileLocation`, `video.fileLocation`,
`video.poster`, `carouselSlide.src` and localized `subtitles.fileLocation`. Existing Config/Props schemas are
unchanged. The YAML editor schema requires these keys to exist and be null;
the TypeScript draft remains invalid until real asset paths are supplied.

The existing Config-only editor schemas and direct
`courseOverrides.schema.json` remain separately generated. This is
**editor guidance only**: neither TypeScript scaffolder validates full inputs
or tries to make generated source compile. Incomplete TS **fails typecheck by
design** where an explicit null media asset/Scene/import/translation is pending.

Production schema changes are edited by hand, not overwritten by the JSON
schema generator. A subsequent specialist implements missing resources from
generated UUID-addressed `specification.md` and resolves TypeScript errors.

## Generate

From the monorepo root:

```sh
npm run package:build --workspace @svitlo/engine
npm run content:generate:yaml-schemas --workspace @svitlo/engine
npm run content:check:yaml-schemas --workspace @svitlo/engine
node --test shared/engine/scripts/generateYamlSchemas/generateYamlSchemas.spec.mjs
```

Quest is an authoring-only `type: quest` Section variant with named `stages` and `tasks` maps (both requiring `start` at configurator validation), not a positional collection. The Zod-to-JSON-Schema projection recursively expands Quest Stages into their required medium/small video, three nullable audio slots, image, Subtitles, and Tasks into one Scene each. Subtitles WebVTT paths use pending `null` in technical drafts. This schema and the two draft scaffolders do **not** enable Quest in the runtime Section union or provide playback.

Generated, reviewable JSON Schemas are written to
`shared/engine/yaml-schemas/{contentBlock,section,question,flashcard,lesson,episode,course,courseOverrides}.schema.json` plus `lesson.scaffold.schema.json` and `course.scaffold.schema.json`. Manual `production.schema.json` is not generated.
The `--check` command is read-only and detects stale/absent files.

These schemas describe _authored Config structure_, not published Props and
not the role-specific editorial plans in `studio/skills/`. The Studio agents
can consume them as machine-readable guides for YAML authoring; they do not
supersede methodology, assessment, screenwriting or review documents.

## Separate responsibilities and YAML envelopes

- **Schema generator:** derives editor-facing JSON Schema from current Engine Zod Config
  compositions. Lesson/Course editor schemas include a small **draft YAML
  envelope**: `documentLanguage` (required for Lesson, optional for Course),
  complete required Config fields, literal null for pending media, and optional Course Lesson
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
