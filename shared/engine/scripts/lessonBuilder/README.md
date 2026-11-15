# Lesson YAML → TypeScript draft scaffolder

This Engine-owned script converts **one technical `config.yaml` file** into a named,
nested `define*` TypeScript **draft**, plus optional production handoff Markdown.
It is not a validator, translator, resource producer or Props publisher.

## One source per Lesson

Input: a `config.yaml` inside the textbook package. The canonical source is `content/<book>/data/lessons/<last-uuid-hex>/<uuid>/config.yaml`; for new work, `--source` may instead point directly to a staged `config.yaml` anywhere within the owning textbook. The generated Lesson UUID directory is computed from the single `config.id`.

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
              visual:
                config:
                  id: 00000000-0000-4000-8000-000000000002
                  slug: visual
                  type: image
                  params: { fill: true, aspectRatio: 1.5 }
                  locale:
                    alt: { en: Two equal groups }
                    src: null # Required pending asset; actual TS later needs the real path
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

- `index.ts` inside the canonical Lesson UUID directory: one `defineLesson` call, referencing
  named `section`, `flashcards`, and `questions` collections assembled by adjacent
  `sections/index.ts`, `flashcards/index.ts`, and `questions/index.ts`. Each nested
  Section, ContentBlock, Question, Flashcard, Checkpoint Item, Carousel Image/Scene slide,
  Quest Stage and Quest Task lives in its own `<slug>/index.ts` module. Generic
  arguments are based on the actual Engine Configurator signature.
- `review.ts`: non-exported `LessonReview` skeleton with mandatory direct
  `ai.<camelCaseStage>` fields (PR + review language), mapped explicitly from
  external Lesson Production stage slugs, plus a single
  `ai.locales` integration PR, and required `human.acceptance` and
  `human.locales` fields. Optional `human.scientific` is initially absent.
  **The const identifier and mandatory values are deliberately blank and
  syntactically invalid.** The specialist must first hash assembled Lesson
  Props, then confirm review evidence for that revision; this builder cannot
  hash an unfinished Lesson or fabricate sign-offs. A rerun never overwrites
  recorded reviews; `check` only requires the file to exist.
- `constants.ts`: source YAML `params.languages` as an Engine-checked readonly tuple
  and the shared `LessonLanguages` type. This is NOT an extra source of languages;
  the generated `defineLesson` references the same tuple, and nested definitions
  carry its derived type without synthesizing missing translations.
- Real Skill imports instead of hardcoded UUID string expressions, resolved
  strictly against the textbook's `data/skills/**/*.data.ts` exported `defineSkill`
  definitions; missing/ambiguous references are explicit diagnostics.
- **Stage 3 file-backed source (creation-only):**
  - Authored Markdown with an invariant `locale.value` string is materialized
    exactly as written into `<slug>/text.md`. A localized
    `locale.value.<documentLanguage>` becomes
    `<slug>/locale/<documentLanguage>.md`. No `default` or translated
    fallback file is fabricated. Its generated `defineMarkdown` uses
    `files: { moduleUrl: import.meta.url }` or
    `files: { moduleUrl: import.meta.url, languages: ['en'] }` for the
    authored locale and retains other locale metadata such as variables.
  - Authored `params.codeAsText` moves into `<slug>/code.<extension>` using a
    deterministic supported extension map (for example `python` → `.py`,
    `typescript` → `.ts`). Generated `params.codeAsText` reads
    `readCodeSource(import.meta.url, 'py')` from Engine Build; unknown
    Code languages fail rather than guess an extension.
  - Markdown, Code and Text are **not** given extra `specification.md`
    placeholders. The technical YAML must contain the real source-language
    learner text/code before scaffolding, authored through the approved
    editorial workflow. A production specification is not a replacement.
  - Existing Playground Markdown sources were migrated from
    `locales/<language>.md` to `locale/<language>.md` with byte-for-byte
    identical Git blobs. The old folder shape is no longer supported.
  - `check` compares exact bytes of the extracted sources; `generate`
    never changes existing author-edited source files or a Lesson that already
    has a root entrypoint. Pending/missing Config is not filled with fake
    content. These file readers run only at build time, and published Props
    contain the actual strings, not file paths.

- Nested `define*` source keeps the authored Config values and source-locale
  localization. Pending `src: null` deliberately **fails TypeScript checking**
  until a media specialist provides the real asset. Generated draft modules
  are syntactically valid but not guaranteed to be typecheck-clean. Exception: the intentionally incomplete `review.ts` has syntax errors until its missing const identifier, review PR numbers, and languages are filled; it also blocks formatting of that draft file. Do not suppress these diagnostics.
- `methodology.md` in the Lesson UUID directory, only when
  `production.methodology` is authored and the destination is safe to create.
- For this **Lesson builder only**, `scene.production.specification` and
  media production instructions are materialized as `specification.md`
  **beside the corresponding nested `<slug>/index.ts`**. The full UUID
  remains inside the Config; a Scene implementation and lazy registry entry
  still live under textbook-owned `scenes/<bucket>/<scene-id>/`. Course
  scaffolding retains its existing UUID-addressed production handoffs.
- For local Image `src: null`, Audio/Video/Subtitles
  `fileLocation: null`, and Video `poster: null`, the draft generates
  `resolveLessonMedia(import.meta.url, kind, role, language?)` from the
  **Engine Build-only** export. A scalar null requests invariant media;
  `{ uk: null }` requests source-language `locale/uk.<extension>`.
  Explicit external URLs remain unchanged. Asset filenames are:
  `<blockSlug>.<extension>`, `poster.<extension>`,
  `locale/<language>.<extension>`, and
  `locale/<language>.poster.<extension>` for localized posters.
- Supported source formats: images `svg/png/jpg/jpeg/webp/gif/avif`;
  video `mp4/webm`; audio `mp3/wav/ogg/m4a/flac`; subtitles `vtt/srt`.
  A resolver requires exactly one nonempty regular file for a role/locale;
  ambiguous extensions, missing files and symlinks fail explicitly.
- The textbook build stages matching source media from
  `data/lessons/<bucket>/<uuid>/<nested-slug-path>/` into
  `dist/static/textbooks/<book>/lessons/<bucket>/<uuid>/<nested-slug-path>/`.
  The published Props hold the URL `/textbooks/<book>/lessons/...`, never
  a filesystem path. Collisions with `public/` or `static/` are rejected,
  and the output is listed in the textbook manifest. No media files are
  fabricated or downloaded by scaffolding.

Generated colocated specifications are **handoffs, not implemented Scenes, images or
audio/video files**. An AI specialist performs those later and resolves the
expected TypeScript diagnostics. Do not add placeholders, `as any`,
`@ts-ignore`, invented media paths or fabricated locale strings to make the
draft compile.


### Checkpoint Answer role modules

Each `checkpointItem` Config contains exactly one `question` Text and one identified `answer` Configurator:

```text
<checkpointItemSlug>/
  index.ts                         # defineCheckpointItem
  question/index.ts                # exactly one defineText; no extra question slug directory
  answer/index.ts                  # defineCheckpointAnswer (authored UUID)
  answer/<contentBlockSlug>/index.ts # recursive ContentBlocks with local text/code/assets
```

The Answer's YAML must include `config: { id, slug, type: checkpointAnswer, content: { items, order } }`. Its ID is a permanent authored entity identity, never inferred by the builder; the previous bare `answer: { items, order }` shape is not accepted as an alternate API. The Question's original Text slug remains in Config despite the role-based file path. Child media/Scene source paths stay module-relative (each `import.meta.url` belongs to the nested block). The builder is create-only and deliberately does not typecheck unfinished authored media.

Quest Sections (`type: quest`) use named `stages` and `tasks` slug maps, each with a mandatory `start` entry. `questStage.content` contains two Video configurators (`video.medium`, `video.small`), nullable `audio.dialogue`/`narration`/`background`, one Image and one localized Subtitles configurator; `questTask.scene` contains exactly one Scene configurator. The builder emits `defineQuestSection`, `defineStage`, `defineTask`, and nested `define*` calls, without a Stage/Task `order` array. Missing media paths remain explicit `null` and Quest runtime playback remains **unsupported**; this is an authoring draft only.

The script selects factories only from
`configurators/yaml/yamlFactoryByType.ts`. It does not evaluate any complete
Config/Props, check approval or call `build.props()`.

### Stage boundaries

This is **Stage 2** of the [Lesson source-layout rollout](../../../../studio/docs/architecture/lesson-generated-source-layout.md).
It changes the **TypeScript module tree only**. Markdown/Code file loading,
co-located Scene/media specifications, optional Carousel child polymorphism,
Review creation and asset publication are intentionally unchanged and belong
to later stages. Quest `stages/` and `tasks/`, Checkpoint Item `question/` and `answer/`, and Question/Flashcard
`front/`, `back/`, `correct/` and `incorrect/` role directories remain
where sibling slug collisions would otherwise occur. Ordinary Section
ContentBlocks do **not** have type-grouped directories.

The previous single-file `renderLessonDraft` is retired; the source builder
now uses `renderLessonModules` to produce one non-destructive draft file per
authored node. Existing `*.data.ts` source Lessons remain recognized by the
Props publisher; a UUID directory must not contain both legacy and modular
entrypoints.

## Usage

```sh
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs generate --source content/<book>/data/lessons/<bucket>/<uuid>
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs generate --source content/<book>/staging/config.yaml
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs check --source content/<book>/data/lessons/<bucket>/<uuid>
npm run test:unit:lesson-builder
```

Without `--source`, discovers canonical Lesson directories containing `config.yaml`. A direct file source derives its output path from `config.id` without requiring the staging folder name to repeat the UUID.
`generate` **skips the entire Lesson before parsing YAML if any `*.data.ts`
or root `index.ts` exists in a canonical source UUID directory**, retaining the
creation-only safeguard from PR #531. Staged input derives the target from
`config.id` and performs the same check. New Lesson trees are written with
exclusive `wx` writes; an orphan module tree (e.g. `sections/` without a root
entrypoint) causes a diagnostic instead of partial replacement. `check` verifies
every expected module by checksum and compares existing production handoffs
without writes. Unsafe symlinks remain forbidden.

Studio's legacy `content.md`, `methodologist-brief.md` and role-owned
editorial artifacts remain valuable input references for migration. The new
technical `config.yaml` is authored explicitly from reviewed sources: this
scaffolder does not silently perform pedagogical migrations.

**Never run TypeScript validation as a scaffolder acceptance test.** Tests
must instead cover deterministic output, factory dispatch, source-language
filtering, safety and preservation of unresolved production work.

## Carousel child modules

Carousel accepts `defineImage` and `defineScene` children. The builder writes their
`index.ts` directly into `<carouselSlug>/<childSlug>/`, without an intermediate
`slides/` or kind-specific folder. Image assets and Scene production specifications
are colocated with the actual child module. A pending Image `src: null` uses
`resolveLessonMedia(import.meta.url, 'image', 'source', language?)` from its own
source folder. The builder rejects unsupported Carousel child kinds before
creating files. Scenes still require a separately authored implementation and
registry entry; a draft specification is not a working Scene.
