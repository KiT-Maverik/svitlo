# Unified YAML → TypeScript draft-scaffolder handoff

**Status:** New technical handoff contract built on the draft-only Engine scaffolders
from [Issue #507](https://github.com/KiT-Maverik/svitlo/issues/507)
and the creation-only / Build API update from PR #531. It does **not**
replace independent specialist review or publish Lessons/Courses.

## One technical source, one entity identity

Each technical Lesson or Course has one `config.yaml`. The canonical entity directory is immutable under `data/{lessons,courses}/<last-uuid-hex>/<uuid>/`. A new source may be prepared in a textbook staging directory; the scaffolder reads its single `config.id` and writes only into the canonical UUID directory. Neither entity directory names nor extra CLI ID parameters are independent sources of identity. At the root
**and at each nested Configurator node**:

- `config`: current, Engine-derived Zod Config, using the existing
  `type` discriminator, `id`, `slug`, `params`, `locale` and
  nested `{ items, order }` collections.
- `production`: optional, manually specified, **authoring-only**
  requirements for this _same_ entity. It does not duplicate the ID,
  does not flow into `define*`, `build.overrides` or published Props,
  and may generate human-readable handoff files.

The generated Config-only schemas under
`shared/engine/yaml-schemas/{lesson,course,...}.schema.json` are
derived from live Engine Zod. The independently **hand-maintained**
`production.schema.json` defines per-kind requirements. The generator
combines them into `lesson.scaffold.schema.json` and
`course.scaffold.schema.json` to guide authors editing `config.yaml`.
The scaffolder does **not** use these schemas to validate YAML.

### Illustrative single-file Lesson draft

```yaml
config:
  id: 92177be3-97a1-5ca4-b21a-07f0dac27f50
  slug: equalityLesson
  type: lesson
  skills: [] # real Skill UUIDs must be supplied
  params:
    languages: [en, uk] # planned locales, not completed translations
    requireQuiz: false
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true }
  locale:
    title: { en: Equality }
  flashcards: { items: {}, order: [] }
  section:
    items:
      introduction:
        config:
          id: 00000000-0000-4000-8000-000000000001
          slug: introduction
          type: content
          params: {}
          locale:
            title: { en: Introduction }
            navigationLabel: { en: Introduction }
          content:
            items:
              equalityScene:
                config:
                  id: 00000000-0000-4000-8000-000000000002
                  slug: equalityScene
                  type: scene
                  params: {}
                  locale:
                    value:
                      en: { instruction: Compare both sides }
                production:
                  specification: |
                    # Equal-groups workbench
                    Model correct arithmetic equality. Provide keyboard,
                    touch, non-visual equivalent and RTL-friendly controls.
              illustration:
                config:
                  id: 00000000-0000-4000-8000-000000000003
                  slug: illustration
                  type: image
                  params: { fill: true, aspectRatio: 1.5 }
                  locale:
                    alt: { en: Two groups of five counters }
                    src: null # Pending asset, deliberately invalid in completed Engine Config
                production:
                  purpose: Explain equality by visual comparison
                  prompt: Two groups of five counters arranged differently
            order: [equalityScene, illustration]
    order: [introduction]
production:
  documentLanguage: en
  methodology: |
    # Equality Lesson methodology
    Target learners, prerequisites, outcomes, sources and pedagogy.
```

Real inputs must use correct Skill UUIDs, immutable entity UUIDs and all
required Engine Config fields. Only the explicit pending media `null` values
violate final Config typing; missing translations and Scene implementations
are separate downstream work.

### Course and Build overrides

A Course uses the same `config.yaml` node form for Course, Module, Chapter,
Episode, Section and ContentBlock. A Course `type: lesson` child is a
**reference** containing `config: { type: lesson, lessonId: ... }` and
optional safe source import coordinates, not an embedded Lesson definition.
No duplicated standalone Lesson exists in the Course. The Course's
`config.params.languages` and `config.params.prerequisites` remain
ordinary Engine fields.

Course-specific, sparse authoring changes belong to optional **root
`overrides`**, in the **same** `config.yaml` as the Course tree. They use
only current `course.build.overrides(patch, { languages })`. The former
ordered editorial `overrides.yaml` operation DSL and `createLessonOverrides`
must never be recreated. Newly added `additionalItems` can use paired
Config/production nodes, but only the Config is passed to Build.

### Production outputs

The authoring agent does not implement assets. When production text is
provided, scaffolders create:

- `<Lesson|Course UUID folder>/methodology.md` from
  `production.methodology`, without overwriting an existing approved file;
- `content/<book>/scenes/<last-hex>/<scene-id>/specification.md`
  from `scene.production.specification`, without a `sceneSpecKey`;
- `content/<book>/data/assets/<last-hex>/<resource-id>/specification.md`
  for pending image/audio/video requirements.

A Scene implementer and media specialist receive those generated files and
the original `config.yaml`; they supply real components/assets later.
`image.config.locale.alt` is authored now, while `src: null` is **not**
replaced with fake URLs. No generator invents translations or runtime
capabilities. Existing `*.data.ts` causes a whole-entity SKIP without any write. When the input is an existing canonical UUID directory, it is skipped **before** parsing stale YAML (PR #531); when it is a staged single-ID YAML file, its ID is parsed first to derive the output path. Existing or manually changed specification files cannot
be clobbered. `check` remains read-only and strict.

## Scope versus the specialist editorial workflow

Historical independent `methodologist-brief.md`, `content.md`,
`content.yaml`, Question Bank, Flashcard Bank, Course Methodology and TOC
may remain source material in existing Lessons/Courses. **Migration to the
new authoring source must be explicitly authorized**, with the approved
meaning and source revisions preserved. An agent does not silently declare
a Draft editorial document approved or fabricate Quiz requirements.

The new technical `config.yaml` may carry the approved methodology passport
under `production.methodology` for a **newly authored** entity; its
`methodology.md` output is then derivative, not a second independently
editable authoring source. For existing independently edited Methodology
documents, keep the original authoritative and avoid creating a competing
YAML copy until an explicit editorial migration is authorized.

Lesson `questions` and `flashcards` remain owned by their respective
specialists; if represented in the technical YAML they still require real,
approved content. A Quiz is a Section, not a ContentBlock. Only the authoring
source locale is present in the draft, even if planned languages include more.

## Non-goals and verification

The **purpose** of the Lesson/Course Builder is to save AI effort by
mechanically emitting deterministic `define*` TypeScript drafts. It may
(and for missing assets/translations **should**) generate code that does not
typecheck yet. Successful generation does **not** mean compile-ready,
validated, approved, translated, or published.

The builder does not run Zod/AJV/TypeScript, find all Lessons, infer
unknown types, generate Scene React implementations/media, produce Props,
or start publication. Only factory dispatch, source-language selection,
safe paths/no overwrite, syntactically sound emitted code, and specified
handoff files are tested here. The next AI coding/asset specialist performs
completion and TypeScript diagnostics.

See [Lesson Builder README](../../../shared/engine/scripts/lessonBuilder/README.md),
[Course Builder README](../../../shared/engine/scripts/courseBuilder/README.md)
and [Engine script instructions](../../../shared/engine/scripts/AGENTS.md)
for current executable behavior.
