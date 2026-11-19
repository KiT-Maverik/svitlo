# Lesson YAML → TypeScript draft scaffolder

This Engine-owned script converts **one technical `lesson.yaml` file** into a named,
nested `define*` TypeScript **draft**, plus optional production handoff Markdown.
It is not a validator, translator, resource producer or Props publisher.

## One source per Lesson

Input: a `lesson.yaml` inside the textbook package. The canonical source is `content/<book>/data/lessons/<last-uuid-hex>/<uuid>/lesson.yaml`; for new work, `--source` may instead point directly to a staged `lesson.yaml` anywhere within the owning textbook. The generated Lesson UUID directory is computed from the single `config.id`.

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
The YAML `config.params.languages` is the **complete planned language set**;
the scaffolder never rewrites or truncates it. Generated `constants.ts` has
a provisional, source-language-only active `languages` tuple derived directly
from `production.documentLanguage`, and a commented-out declaration retaining
the complete planned tuple in its original order. The script retains only
authored source-locale dictionaries and never invents translations.

**Independent editorial sidecars:** `questions.yaml` and `flashcards.yaml` may be authored directly next to `lesson.yaml` when their separate stages are approved. No `questions/` or `flashcards/` directory is required at YAML creation time. This builder never reads either sidecar, creates bank TS modules, or overwrites existing bank source directories. Embedded `config.questions` / `config.flashcards` cause an explicit error.

## Required assessment Section drafts

The Lesson Builder already dispatches Quiz and Flashcards Sections via its ordinary recursive Section emitter. Every authored assessment Section creates sections/<slug>/index.ts with the real defineQuizSection or defineFlashcardsSection factory, existing TypeScript generics and nested content; its collection order is preserved exactly. It also places **one actual "// TODO (BLOCKER):" comment immediately above the Section export** explaining that the independently reviewed Question/Flashcard integration must be verified. This is intentionally creation-only: a UUID-shaped selection does not prove that the bank was reviewed, integrated, owned and available in the Lesson's effective locales. Only the responsible bank/Section specialist removes that comment after verifying real resources and complete Quiz params. On subsequent generate runs the builder skips all previously authored source, never clobbering verified edits.

A Section not required by the Methodologist is never created by the generator. The Stage 1 inventory and Stage 2 mapping reside in production.methodology and per-Section production.productionNotes, respectively, and are checked by the **separate** Stage 6 finalizer, not this draft-only builder. The existing Blocker TODOs workflow tolerates Draft PRs and blocks unresolved source blockers for Ready-to-main PRs.

## Generated handoffs

- `index.ts` inside the canonical Lesson UUID directory: one `defineLesson` call, referencing the `section` collection assembled by
  `sections/index.ts`. The Lesson root exports the plain `config.slug` identifier (no `_Lesson` suffix). Each nested Section, ContentBlock, Checkpoint Item,
  Carousel Image/Scene slide, Quest Stage and Quest Task lives in its own `<slug>/index.ts` module. Generic
  arguments are based on the actual Engine Configurator signature.
- `review.ts`: non-exported `LessonReview` skeleton with mandatory direct
  `ai.<camelCaseStage>` fields (PR + review language), matching the same
  camelCase identifiers in Lesson Production trackers, plus a single
  `ai.locales` integration PR, and required `human.acceptance` and
  `human.locales` fields. Optional `human.scientific` is initially absent.
  **The const identifier and mandatory values are deliberately blank and
  syntactically invalid.** The specialist must first hash assembled Lesson
  Props, then confirm review evidence for that revision; this builder cannot
  hash an unfinished Lesson or fabricate sign-offs. A rerun never overwrites
  recorded reviews; `check` only requires the file to exist.
- `constants.ts`: exactly one active, Engine-checked `languages` readonly tuple,
  initially `[production.documentLanguage]`, plus `LessonLanguages = typeof languages`.
  The original **full** YAML `config.params.languages` tuple is retained only as
  a commented-out alternative `export const languages` declaration. For example,
  planned `[en, uk, pl, qm]` with source language `uk` emits:

  ```ts
  import type { SupportedLanguages } from '@svitlo/engine/build';

  // TODO (BLOCKER): Restore the complete language set when translations are ready:
  // export const languages = ["en","uk","pl","qm"] as const satisfies SupportedLanguages;

  export const languages = ['uk'] as const satisfies SupportedLanguages;
  export type LessonLanguages = typeof languages;
  ```

  The Lesson root `defineLesson` and all nested Configurator generics use this
  **single active** tuple. After the planned translations are genuinely authored,
  the editor can manually activate the commented full declaration and remove or
  comment out the provisional declaration. Existing language type constraints
  will then require complete coverage. Neither the YAML nor existing authored
  TypeScript drafts are modified by subsequent scaffolder runs. Only the active
  source language is available for source-draft preview/publication; this is
  not a claim that the planned translations already exist.

- Real Skill imports instead of hardcoded UUID string expressions, resolved
  strictly against the textbook's `data/skills/**/*.data.ts` exported `defineSkill`
  definitions; missing/ambiguous references are explicit diagnostics.
- **Stage 3 file-backed source (creation-only):**
  - Authored Markdown with invariant `locale.value` string is materialized
    exactly as written into `<slug>/markdown.md`. A localized
    `locale.value.<documentLanguage>` becomes `<slug>/<documentLanguage>.md`.
    No default or translated fallback is fabricated. Generated `defineMarkdown`
    receives `locale: { value: readMarkdown(import.meta.url) }` for invariant
    text, or `locale: { value: readMarkdown(import.meta.url, ['en']) }`
    with the actual `production.documentLanguage` for localized text. The
    read helper requires every requested file to exist and be nonempty,
    and preserves other locale metadata such as replacement variables.
  - Authored `params.codeAsText` moves into `<slug>/code.<extension>` using a
    deterministic supported extension map (for example `python` → `.py`,
    `typescript` → `.ts`). Generated `params.codeAsText` reads
    `readCodeSource(import.meta.url, 'py')` from Engine Build; unknown
    Code languages fail rather than guess an extension.
  - Markdown, Code and Text are **not** given extra `specification.md`
    placeholders. The technical YAML must contain the real source-language
    learner text/code before scaffolding, authored through the approved
    editorial workflow. A production specification is not a replacement.
  - Existing Playground Markdown source files retain their established `locale/`
    subdirectories and pass those source directories explicitly to `readMarkdown`;
    newly scaffolded modules use sibling `<language>.md` files.
  - `check` compares exact bytes of the extracted sources; `generate`
    never changes existing author-edited source files or a Lesson that already
    has a root entrypoint. Pending/missing Config is not filled with fake
    content. These file readers run only at build time, and published Props
    contain the actual strings, not file paths.

- Technical `lesson.yaml` deliberately **omits** `fileName` and
  `posterFileName` from all media blocks, including nested Carousel and Quest
  media. The Lesson Builder inserts a deterministic, reserved
  `00000000-0000-0000-0000-000000000000` filename (with a type-correct
  extension) and an adjacent `TODO(asset)` into each generated media Config.
  Each generated media module also gets exactly one real `// TODO (BLOCKER):`
  immediately above its export, covering any pending asset requirements
  (including a Video poster). This comment is recognized by existing CI.
  This placeholder is **not** an assigned resource identity. A later media
  specialist replaces it in TypeScript with the real textbook-wide UUID
  filename. Draft Props can warn and preview unresolved media; Production
  refuses Nil placeholders even if matching binary files are present.
  The YAML source and create-only `SKIP` policy remain unchanged.
- `methodology.md` in the Lesson UUID directory is generated only when
  `production.methodology` is authored and the destination is safe to create.
- Scene and media production instructions are emitted as
  `specification.md` **beside the corresponding nested `<slug>/index.ts`**.
  These are specialist handoffs, not asset files. A Scene implementation and
  lazy registry still live under `scenes/<bucket>/<scene-id>/`.
- The Lesson builder inserts required `fileName` and (for Video)
  `posterFileName` fields **only in generated TypeScript**, never in YAML.
  It does not invent real resource identities, create binaries or read the
  textbook's `assets/` directory. Physical media later lives under
  `content/<textbook>/assets/{images,audio,video,subtitles}/`.
  Finished TypeScript Configs may use invariant or localized filename
  references; no locale folders exist under `assets/`.
- Supported extensions: images `svg/png/jpg/jpeg/webp/gif/avif`;
  video `mp4/webm`; audio `mp3/wav/ogg/m4a/flac`; subtitles `vtt/srt`.
  The publication generator projects typed local references to Runtime
  `src`, `fileLocation`, `poster` URLs and the portable textbook build
  stages the complete assets tree. Existing remote media URLs remain remote;
  malformed UUID names are rejected by the Engine Config schema.

Generated colocated specifications are **handoffs, not implemented Scenes, images or
audio/video files**. The reserved Nil UUID and TODO(asset) are the **only**
authorized temporary media placeholders. A media specialist replaces them with
real files and validated references in TypeScript. Do not add `as any`,
`@ts-ignore`, invented media paths or fabricated locale strings.

### Checkpoint Answer role modules

Each `checkpointItem` Config contains exactly one `question` Text and one identified `answer` Configurator:

```text
<checkpointItemSlug>/
  index.ts                         # defineCheckpointItem
  question/index.ts                # exactly one defineText; no extra question slug directory
  answer/index.ts                  # defineCheckpointAnswer (authored UUID)
  answer/<contentBlockSlug>/index.ts # recursive ContentBlocks with local text/code/assets
```

The Answer's YAML must include `config: { id, slug, type: checkpointAnswer, content: { items, order } }`. Its ID is a permanent authored entity identity, never inferred by the builder; the previous bare `answer: { items, order }` shape is not accepted as an alternate API. The Question's original Text slug remains in Config despite the role-based file path. Scene and Markdown/Code sources stay module-relative; binary media references are textbook-wide UUID filenames. The builder is create-only and does not typecheck generated drafts.

Quest Sections (`type: quest`) use named `stages` and `tasks` slug maps, each with a mandatory `start` entry. `questStage.content` contains two Video configurators (`video.medium`, `video.small`), nullable `audio.dialogue`/`narration`/`background`, one Image and one localized Subtitles configurator; `questTask.scene` contains exactly one Scene configurator. The builder emits `defineQuestSection`, `defineStage`, `defineTask`, and nested `define*` calls, without a Stage/Task `order` array. Media reference placeholders are generated in TypeScript, not authored in YAML; Quest runtime playback remains **unsupported**; this is an authoring draft only.

The script selects factories only from
`configurators/yaml/yamlFactoryByType.ts`. It does not evaluate any complete
Config/Props, check approval or call `build.props()`.

### Stage boundaries

This is **Stage 2** of the [Lesson source-layout rollout](../../../../studio/docs/architecture/lesson-generated-source-layout.md).
It changes the **TypeScript module tree only**. Markdown/Code file loading,
co-located Scene/media specifications, optional Carousel child polymorphism,
Review creation and asset publication are intentionally unchanged and belong
to later stages. Quest `stages/` and `tasks/` and Checkpoint Item `question/` and `answer/` role directories remain
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
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs generate --source content/<book>/staging/lesson.yaml
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs check --source content/<book>/data/lessons/<bucket>/<uuid>
npm run test:unit:lesson-builder
```

Without `--source`, discovers canonical Lesson directories containing `lesson.yaml`. A direct file source derives its output path from `config.id` without requiring the staging folder name to repeat the UUID.
`generate` **skips the entire Lesson before parsing YAML if any `*.data.ts`
or root `index.ts` exists in a canonical source UUID directory**, retaining the
creation-only safeguard from PR #531. Staged input derives the target from
`config.id` and performs the same check. New Lesson trees are written with
exclusive `wx` writes; an orphan module tree (e.g. `sections/` without a root
entrypoint) causes a diagnostic instead of partial replacement. `check` verifies
every expected module by exact generated bytes and compares existing production handoffs
without writes. Unsafe symlinks remain forbidden.

Studio's legacy `content.md`, `methodologist-brief.md` and role-owned
editorial artifacts remain valuable input references for migration. The new
technical `lesson.yaml` is authored explicitly from reviewed sources: this
scaffolder does not silently perform pedagogical migrations.

**Never run TypeScript validation as a scaffolder acceptance test.** Tests
must instead cover deterministic output, factory dispatch, source-language
filtering, safety and preservation of unresolved production work.

## Carousel child modules

Carousel accepts `defineImage` and `defineScene` children. The builder writes their
`index.ts` directly into `<carouselSlug>/<childSlug>/`, without an intermediate
`slides/` or kind-specific folder. Scene and media production specifications are colocated with the child
module; physical Images are textbook-wide UUID-named assets. A pending Image
receives a generated Nil UUID `locale.fileName` placeholder before the file is created. The builder rejects unsupported Carousel child kinds before
creating files. Scenes still require a separately authored implementation and
registry entry; a draft specification is not a working Scene.

## Concise generated modules

New TypeScript drafts have no injected scaffold banner or per-file SHA comment. `check` compares generated bytes to detect stale or manually edited drafts; `generate` retains create-only SKIP and never rewrites an existing Lesson entrypoint. Authored comments, unresolved review TODOs and production handoffs are not stripped.

Nested Configurator modules import `LessonLanguages` through the textbook-owned native `#lessonsData/<bucket>/<uuid>/constants` specifier. PascalCase Scene Configurator symbols end in `Config`, distinct from the separately scaffolded React component. The Lesson-only builder does not create or import Question/Flashcard banks.
