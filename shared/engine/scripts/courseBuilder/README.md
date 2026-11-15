# Course YAML → TypeScript draft scaffolder

The Course Builder creates **draft TypeScript**, not a completed Course,
working Lesson, validation result or runtime resource. Its new primary input
is one `content/<book>/data/courses/<bucket>/<uuid>/config.yaml` with paired
`config` (Engine Config) and `production` (authoring-only) at each nested
entity. It inherits the non-destructive output and draft-only rules from
`../AGENTS.md` and PR #531.

## Single-file Course authoring

```yaml
config:
  id: 30ecbde1-97fd-5fe7-a353-ea89b9ef4a67
  slug: spaceCourse
  type: course
  params:
    languages: [en, uk]
    prerequisites:
      skills: []
  locale:
    title: { en: Space }
    description: { en: Foundations of astronomy }
  content:
    items:
      firstLesson:
        config:
          type: lesson
          lessonId: d3048d21-8690-5255-b62c-984c69ac272c
          # Optional source: { path: "../../../lessons/.../lesson.data.ts", export: lesson_Lesson }
        production:
          placementReason: Introduces the initial concept
    order: [firstLesson]
production:
  documentLanguage: en
  methodology: |
    # Course methodology
    Explain the goals, audience and teaching approach.
overrides:
  content:
    items:
      firstLesson:
        params:
          sections:
            allowSkipping: false
```

The optional **root `overrides`** is an exact direct sparse patch for
`course.build.overrides(patch, { languages })`, not the obsolete ordered
editorial operations DSL. It shares the same YAML source and has no duplicate
Course identity; new nested `additionalItems` may use the same wrapped
Config nodes.

- `config` is derived from current Engine Config schemas, including
  existing `params.languages` and `params.prerequisites`.
- `production` is described by the manually owned
  `shared/engine/yaml-schemas/production.schema.json`.
- `course.scaffold.schema.json` composes both for editor guidance.
  `course.schema.json` remains Config-only; `courseOverrides.schema.json`
  describes the Build API patch.
- `production.documentLanguage` selects the authored source locale and
  is removed before `defineCourse`.
- `production.methodology` may create a new `methodology.md` in the Course
  UUID folder, with no overwrite of a pre-existing independent document.
- Course-owned Episode Sections may contain Quest (`type: quest`) with named `stages` and `tasks` maps (each with a mandatory `start`), Stage media configurators (medium/small video, three nullable audio tracks, Image and Subtitles), and Task Scene configurators. These become nested `defineQuestSection`/`defineStage`/`defineTask` draft calls, **not** a playable/publishable Quest player.
- Scene and media specifications in nested Episode/Section/ContentBlock
  nodes use their own Config IDs for deterministic specification paths.
- Existing `type: lesson` Course children refer to **standalone Lessons**.
  They never instantiate new `defineLesson` objects. Missing import
  coordinates remain explicit unresolved references/TODOs.

All generated TypeScript may be **invalid under TypeScript by design**
until a later AI agent resolves explicit `null` media fields, imports,
Scene implementations and translations. Required YAML Config structure
must already be complete. The scaffolder must not attempt to
make it typecheck with placeholders or type suppression.

## Usage

```sh
node shared/engine/scripts/courseBuilder/courseBuilder.mjs \
  --package content/<book> --course <course-uuid> --write

node shared/engine/scripts/courseBuilder/courseBuilder.mjs \
  --package content/<book> --course <course-uuid> --check

node --test shared/engine/scripts/courseBuilder/courseBuilder.spec.mjs
```

A new single-ID invocation is also supported:

```sh
node shared/engine/scripts/courseBuilder/courseBuilder.mjs \
  --package content/<book> --config content/<book>/staging/config.yaml --write
```

The `config.id` determines the Course UUID directory; no separate `--course` ID is supplied. For that mode the generator must read the source ID **before** checking the destination for existing `*.data.ts`, then SKIPs without modifying anything. For the older `--course` command, it still skips before parsing YAML.

The builder chooses `config.yaml` when present. Its previously supported
`course.yaml` and editorial `toc.yaml` sources remain available as distinct
upstream draft inputs; they are not the new single-file contract. Legacy
`overrides.yaml` is only read with those older source formats, never when
`config.yaml` is selected.

**Creation-only:** if any `*.data.ts` already exists in the destination
Course UUID folder, `--write` logs `SKIP` **before parsing YAML**, and writes
nothing. Files are created exclusively and never overwritten. Divergent
pre-existing `specification.md` / `methodology.md` handoffs are protected.
`--check` remains strict and read-only; no Zod, AJV, full TS validation,
content approvals, localization or Props publishing is performed.
