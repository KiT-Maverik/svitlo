# Unified YAML → TypeScript draft-scaffolder handoff

**Canonical authoring boundaries:** [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md) owns one `lesson.yaml` through its editorial review and independently authorized Stage 6 source preparation. [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) owns **one temporary `course.yaml`** through Course Stages 1–4, then [materializes it directly](../../../shared/engine/scripts/materializeCourseFlow/README.md) to permanent Course TypeScript/Markdown and new Lesson YAML handoffs at Stage 5. The Course plan is never converted to a second editable YAML source.

## Validation boundaries across the four entity workflows

| Entity flow    | What is **not** a separate authoring-stage gate                                                                         | One authoritative materialization boundary                                                                                                         | Required checks that remain                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Course**     | Re-running `validateCourseFlow --stage 1                                                                                | 2                                                                                                                                                  | 3                                                                                                                            | 3-complete`during Stages 1–4; temporary`TMP_*` placements need not satisfy the complete final schema | Stage 5 `materializeCourseFlow` calls `checkPlan('3-complete')` on its one parsed `course.yaml` before output, then checks the derived Engine Course/Episode contracts | Stage 4 independent whole-Course review, source SHA, UUID/Skill/locale safety, no-clobber, complete publisher/Ready checks |
| **Lesson**     | Stage-by-stage technical Zod/TypeScript validation of incomplete methodology, Sections or media before authoring review | Stage 6.1 `lessonBuilder`/`finalizeLesson` validates the actual Lesson input, with strict typed/resource checks in Stage 6.2 and later publication | Independent editorial review Stages 3–5, scene implementation, identity/paths/asset safety, SHA and strict production checks |
| **Questions**  | Separate schema-check CLI as a prerequisite to Stages 1–4 or to assessment specialist sign-off                          | Questions Stage 5 `questionsBuilder` preflight/materialization validates the actual reviewed `questions.yaml` and bank shape before writing        | Stage 4 independent Assessment Review, no-overwrite, real Quiz/Question UUID/locale, source SHA, publisher/production checks |
| **Flashcards** | Repeated Zod/TypeScript validation of an intentionally incomplete early `flashcards.yaml` in Stages 1–4                 | Flashcards Stage 5 `flashcardBuilder` preflight/materialization validates the reviewed bank and typed nested objects before writing                | Stage 4 Memory Design Review, Lesson/Question dependencies, safe paths, source SHA, media/resource/locale/production checks  |

Use Engine-derived schemas as **editor aids and final-boundary inputs**, not mandatory manual gates for every partially written draft. All four flows must fail closed on invalid completed materialization input before writes. Existing optional `--preflight`, `--check` and diagnostic commands remain available; final materialization and production CI must still run as specified. The final validation boundary never replaces an independent editorial or linguistic review, and `Ready for review` still triggers the scoped TypeScript/build/format and safety checks. Do not create a new per-commit YAML-validation workflow, duplicate CLI job, source format, review stage or status file.

## Technical Lesson YAML authoring

A Lesson uses the one `lesson.yaml` at `data/lessons/<last-uuid-hex>/<uuid>/`. Its root and nested Configurator nodes have a `config` with Engine-derived `type`, immutable `id`, `slug`, `params`, `locale` and typed collections; optional `production` fields contain editorial-only requirements for the same entity. Production metadata never flows into `define*`, `build.overrides` or published Props.

The Engine Zod-derived `shared/engine/yaml-schemas/lesson.schema.json`, manual `production.schema.json` and composed `lesson.scaffold.schema.json` are editing aids; generation alone is **not approval**. The Lesson Builder remains create-only with stable IDs, safe paths, syntax validity and no fabricated translations, media or Lessons. No generic Course Config YAML Builder is part of this architecture.

### Illustrative Lesson-only `lesson.yaml` draft

```yaml
config:
  id: 92177be3-97a1-5ca4-b21a-07f0dac27f50
  slug: equalityLesson
  type: lesson
  skills: [] # real Skill UUIDs must be supplied
  params:
    languages: [en, uk] # planned locales, not completed translations
    quizRequiredForCompletion: false
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

### Course composition and overrides

Course/Module/Chapter/Episode composition and Lesson reuse are reviewed together in the **same** Course `course.yaml` and directly materialized through the dedicated Stage 5 utility. Referenced Lessons remain independent entities. Subsequent Course-specific overrides use the **typed** `course.build.overrides(patch, { languages })` API in authored Course code; there is no intermediate Course Config YAML, separate overrides YAML or compatibility operations language. Such patches never mutate an independent Lesson and require independent pedagogical/scenario review.

### Production outputs

The authoring agent does not implement assets. When production text is
provided, scaffolders create:

- `<Lesson UUID folder>/methodology.md` from verified `production.methodology`, without overwriting existing approved content; Course/Module/Chapter Markdown is generated separately by the Course Stage 5 materializer;
- For **modular Lesson source**, `specification.md` beside each nested Scene,
  Image, Video, Audio, Subtitles or CarouselSlide Config `index.ts`, with
  the Config UUID preserved and no `sceneSpecKey`. Executable Scene code continues to live under the UUID-addressed registered `scenes/` subtree. Course-owned Episodes retain their own materializer's typed content and unresolved media handoffs.

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

**Course Episode rendering** uses the dedicated Stage 5 Episode renderer for its current typed authoring contract; required physical media remain explicit Draft blockers and require independent source, accessibility and production checks.

Existing `*.data.ts` causes a whole-entity `SKIP` without writes; for
modular Lesson drafts, an existing root `index.ts` does the same. A canonical
UUID directory is skipped before stale YAML is parsed; staged single-ID
YAML is parsed only to derive the destination ID. Existing user-edited
`specification.md` files remain protected; `check` is read-only and strict.

## Editorial ownership and approval

Educational methodology and Course/Lesson plans are reviewed through their **respective canonical Skills**, not alternate Markdown, TOC or Config-YAML trackers. Source-side `production.methodology` is the approved authoring input, while generated `methodology.md` is its durable output. Independently authored Question and Flashcard banks retain separate Lesson-root YAML and review/production workflows. A valid draft or generated file is not a review approval, release readiness or translation evidence.

## Non-goals and verification

A Lesson Builder emits typed but potentially incomplete Draft modules, source-language content and production handoffs; it does not claim a publishable Lesson, create physical assets, invent missing translations or execute the full validation/approval workflow. The Course Stage 5 materializer emits Course-specific typed Drafts and initial Lesson YAMLs **directly from the approved one-file Course plan**, and never initiates Lesson production or publishes Course Props. Source integrity, stable UUIDs, deterministic output, no-clobber and syntax checking belong to those scripts; typechecking, asset supply, independent reviews and production publication occur later.

See [Lesson Builder](../../../shared/engine/scripts/lessonBuilder/README.md), [Course Flow materializer](../../../shared/engine/scripts/materializeCourseFlow/README.md) and [Engine script instructions](../../../shared/engine/scripts/AGENTS.md).
