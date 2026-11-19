# Unified YAML → TypeScript draft-scaffolder handoff

> **New Lesson authoring:** [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md) is authoritative. Stage 1–5 progressively own one `lesson.yaml`, not a separate new `content.yaml` or “Approved” frontmatter. Stage 6 runs one complete YAML preflight and safe finalization, distinct from the create-only Lesson Builder. Historical authoring inputs below are for non-destructive legacy migration only.

**Course Flow boundary:** new Course production follows [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md), which uses one reviewed temporary `course.yaml` and materializes TypeScript/Markdown directly, without a saved `config.yaml`. The Config-shaped Course scaffolder described below is a **separate existing technical/legacy tool**, not an extra step in new Course production.

**Status:** New technical handoff contract built on the draft-only Engine scaffolders
from [Issue #507](https://github.com/KiT-Maverik/svitlo/issues/507)
and the creation-only / Build API update from PR #531. It does **not**
replace independent specialist review or publish Lessons/Courses.

## One technical source, one entity identity

A technical Lesson has one `lesson.yaml`; a Course retains `config.yaml`. The canonical entity directory is immutable under `data/{lessons,courses}/<last-uuid-hex>/<uuid>/`. A new source may be prepared in a textbook staging directory; the scaffolder reads its single `config.id` and writes only into the canonical UUID directory. Neither entity directory names nor extra CLI ID parameters are independent sources of identity. At the root
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
`course.scaffold.schema.json` to guide authors editing the respective technical YAML.
The scaffolder does **not** use these schemas to validate YAML.

### Illustrative Lesson-only `lesson.yaml` draft

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
required **non-media** Engine Config fields. Technical Lesson YAML intentionally
omits `fileName` and `posterFileName`: its editor schema rejects these fields,
including `null`. The Lesson Builder generates required Nil UUID placeholders
with adjacent `TODO(asset)` comments in TypeScript. Missing translations and
Scene implementations remain separate downstream work.

### Quest Section nested Config authoring (draft only)

Quest is a Section in a standalone Lesson or a Course-owned Episode. Its
`stages` and `tasks` are camelCase slug maps with mandatory `start` keys;
they are not `{ items, order }` collections. Each Stage has two Video
configurators (`medium` and `small`), three independently nullable Audio
slots, one Image and one Subtitles configurator; each Task has one Scene.
See the [Quest entity contract](../entities/quest.md) for the complete
typed structure and the [Lesson Builder README](../../../shared/engine/scripts/lessonBuilder/README.md)
for the currently implemented draft handoff.

Technical Lesson YAML omits all physical media filename fields, including
nested Quest media. The Lesson Builder inserts `fileName` and, for Video,
`posterFileName` with reserved Nil UUIDs and adjacent `TODO(asset)`
comments into generated TypeScript. The sole authored `null` values in
this structure are optional absent Audio configurators, not required
physical filename placeholders.

Quest remains **authoring/Build-only**. Neither Lesson/Episode runtime
Section integration nor a Quest player is implemented by this contract;
authoring a Quest must not be mistaken for a publishable activity.

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
- For **modular Lesson source**, `specification.md` beside each nested Scene,
  Image, Video, Audio, Subtitles or CarouselSlide Config `index.ts`, with
  the Config UUID preserved and no `sceneSpecKey`. For **Course/legacy**
  production, Scene specs still use `content/<book>/scenes/<bucket>/<uuid>/`
  and media specs use `data/assets/<bucket>/<uuid>/` until independently
  migrated. Executable Scene code continues to live under the UUID-addressed
  registered `scenes/` subtree.

A Scene implementer and media specialist receive the generated handoff files and
the original technical YAML. For **Lesson drafts**, authored YAML contains no
media filename fields; `lessonBuilder` generates `locale.fileName` and, for
Video, `locale.posterFileName` with category-specific reserved Nil UUID
placeholders and `TODO(asset)` comments in generated TypeScript.
The media specialist supplies real `UUID.extension` assets under
`content/<book>/assets/{images,audio,video,subtitles}/` and replaces the
placeholders in TypeScript Config. The YAML source is left unchanged.

The Lesson Props publisher checks known media references against the textbook
assets tree, warns for missing/unresolved media in Draft, rejects these in
Production, and projects filenames to portable
`/textbooks/<book>/assets/<category>/<filename>` URLs in existing Runtime
`src`, `fileLocation` and `poster` fields. The textbook build packages
the complete assets tree. Neither Lesson Builder nor `build.props()` creates
media binaries or copies assets. The retired module-relative
`resolveLessonMedia(import.meta.url, ...)` API is **not** used for media.

**Course Builder is separate and not yet refactored**: the Course editor
JSON Schemas omit media filenames, but this does not establish the Lesson
Builder's Nil-placeholder behavior for Course TypeScript emission. Address
Course-specific media authoring and publishing in its own implementation.

Existing `*.data.ts` causes a whole-entity `SKIP` without writes; for
modular Lesson drafts, an existing root `index.ts` does the same. A canonical
UUID directory is skipped before stale YAML is parsed; staged single-ID
YAML is parsed only to derive the destination ID. Existing user-edited
`specification.md` files remain protected; `check` is read-only and strict.

## Scope versus the specialist editorial workflow

Historical independent `methodologist-brief.md`, `content.md`,
`content.yaml`, Question Bank, Flashcard Bank, Course Methodology and TOC
may remain source material in existing Lessons/Courses. **Migration to the
new authoring source must be explicitly authorized**, with the approved
meaning and source revisions preserved. An agent does not silently declare
a Draft editorial document approved or fabricate Quiz requirements.

The technical Lesson `lesson.yaml` (or Course `config.yaml`) may carry the approved methodology passport
under `production.methodology` for a **newly authored** entity; its
`methodology.md` output is then derivative, not a second independently
editable authoring source. For existing independently edited Methodology
documents, keep the original authoritative and avoid creating a competing
YAML copy until an explicit editorial migration is authorized.

Lesson `questions.yaml` and `flashcards.yaml` live in the same Lesson UUID root as `lesson.yaml` but remain independently owned and reviewed. Neither is embedded in the Lesson technical YAML, and their future TypeScript directories need not exist when these files are written. A Quiz is a Section, not a ContentBlock. Only the authoring
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
