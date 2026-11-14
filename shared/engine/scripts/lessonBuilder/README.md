# Lesson YAML → TypeScript draft scaffolder

This Engine-owned script converts **one technical `config.yaml` file** into a named,
nested `define*` TypeScript **draft**, plus optional production handoff Markdown.
It is not a validator, translator, resource producer or Props publisher.

## One source per Lesson

Input: `content/<book>/data/lessons/<last-uuid-hex>/<uuid>/config.yaml`.

Each entity node has **exactly one identity**, inside its `config` object.
Its optional sibling `production` contains authoring instructions and never
reaches a `define*` factory:

```yaml
config:
  id: 00000000-0000-4000-8000-00000000000c
  slug: equalityLesson
  type: lesson
  skills: []
  params:
    languages: [en, uk]
  section:
    items:
      introduction:
        config:
          id: 00000000-0000-4000-8000-000000000001
          slug: introduction
          type: content
          content:
            items:
              visual:
                config:
                  id: 00000000-0000-4000-8000-000000000002
                  slug: visual
                  type: image
                  locale:
                    alt: { en: Two equal groups }
                  # src deliberately missing: later asset production must supply it
                production:
                  purpose: Show that equal quantities can look different
                  prompt: Two groups of five counters arranged differently
            order: [visual]
    order: [introduction]
production:
  documentLanguage: en
  methodology: |
    # Equality lesson methodology
    This Lesson teaches equality as a relation between values.
```

The `config` shape comes from the existing Engine `*_Config_Schema`, composed
recursively at Configurator child boundaries. The **manually maintained**
`shared/engine/yaml-schemas/production.schema.json` defines per-kind production
metadata. `lesson.scaffold.schema.json` combines the two for editor guidance.
`lesson.schema.json` remains an Engine Config-only guide.

`production.documentLanguage` is source-language provenance, **not** Config.
The script retains only its authored source-locale dictionaries; it does not
change `params.languages` or invent translations.

## Generated handoffs

- `<slug>.data.ts` beside `config.yaml`: recursively nested `define*`
  factory calls containing **only** each node's `config`. The output may be
  missing mandatory Config fields and **fail TypeScript checking by design**.
- `methodology.md` in the Lesson UUID directory, only when
  `production.methodology` is authored and the destination is safe to create.
- `content/<book>/scenes/<bucket>/<scene-id>/specification.md` from each
  `scene.production.specification`. No `sceneSpecKey` or duplicate Scene ID.
- `content/<book>/data/assets/<bucket>/<asset-id>/specification.md` for
  requested image/audio/video production. Image `alt` belongs in `config.locale.alt`;
  its pending `src` stays unfilled until a real asset exists.

Generated specifications are **handoffs, not implemented Scenes, images or
audio/video files**. An AI specialist performs those later and resolves the
expected TypeScript diagnostics. Do not add placeholders, `as any`,
`@ts-ignore`, invented media paths or fabricated locale strings to make the
draft compile.

The script selects factories only from
`configurators/yaml/yamlFactoryByType.ts`. It does not evaluate any complete
Config/Props, check approval or call `build.props()`.

## Usage

```sh
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs generate --source content/<book>/data/lessons/<bucket>/<uuid>
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs check --source content/<book>/data/lessons/<bucket>/<uuid>
npm run test:unit:lesson-builder
```

Without `--source`, discovers Lesson directories containing `config.yaml`.
`generate` **skips the entire Lesson before parsing YAML if any `*.data.ts`
exists** in its UUID directory, as established in PR #531. For a new Lesson,
writes are exclusive (`wx`); no existing code or independently edited
specification is overwritten. `check` is strict/read-only, and never silently
skips stale or missing draft outputs. Unsafe symlink paths are rejected.

Studio's legacy `content.md`, `methodologist-brief.md` and role-owned
editorial artifacts remain valuable input references for migration. The new
technical `config.yaml` is authored explicitly from reviewed sources: this
scaffolder does not silently perform pedagogical migrations.

**Never run TypeScript validation as a scaffolder acceptance test.** Tests
must instead cover deterministic output, factory dispatch, source-language
filtering, safety and preservation of unresolved production work.
