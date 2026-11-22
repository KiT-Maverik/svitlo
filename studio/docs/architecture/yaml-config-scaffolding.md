# Legacy YAML → TypeScript draft scaffolding (active non-Course consumers)

> **Typed-production migration (parent #775; Lesson #782, Questions #783, Flashcards #784 remain separate Drafts):** New editorial work progresses through one TypeScript source per entity. Existing YAML builders and trusted PR commands remain operational **legacy paths** until an integrated, source-SHA-pinned typed replacement is tested. The concrete, kind-level source materializers from merged #776–#780 are implemented on #775; their presence is not proof that a staged-workflow adapter, trusted CI handoff or safe writer is deployed. Never replace a source converter with a Props publisher.

**Canonical authoring boundaries:** [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md) and independent bank workflows still have live YAML source/tooling dependencies. [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) now authors Stages 1–3 in **one typed TS object** and independently corrects that source in Stage 4. The existing [Course YAML materializer](../../../shared/engine/scripts/materializeCourseFlow/README.md) is a **legacy implementation retained for live consumers** until the replacement typed Stage 5 and protected trusted command path in #775 are verified; it is not the new Course workflow.

## Canonical typed sources versus remaining YAML consumers

**Approved typed target, not yet a deployed end-to-end replacement:** `CourseWorkflowStage1` → `Stage2` → `Stage3` (independent Stage 4 direct correction) → `CourseWorkflowMaterializerInput` at Course Stage 5. It hands off a new Lesson's Stage 1 `index.ts` with assigned UUID and reviewed methodology/assessment intent, never completed Lesson/Quiz/Flashcards Sections. #782 advances a single typed Lesson plan through Stage 1/2 and independent specialist Stages 3–5; only authorized Lesson Stage 6 materializes its Sections/Blocks. #783/#784 advance independent bank sources through Stage 1–3 and Stage 4 review, then Stage 5 source conversion; later bank Stages 6–7 localize and independently review. A Stage 1 child file publishes nothing.

`LessonProductionAssessmentRequirements` specifies **four independent decisions**: `questionBankRequired`, `flashcardBankRequired`, `quizSectionRequired`, `flashcardsSectionRequired`. A bank is not a Lesson Section, and runtime `quizRequiredForCompletion` is separate. Actual Quiz/Flashcards Section Config imports final Question/Card Configurators and references their `.id` values; do not create another selection ledger. Generated `methodology.md` is a readable derived projection, not a second editable source.

**Legacy operational tooling:** the YAML examples below document still-supported commands for existing editorial PRs, not recommended new authoring. Existing `lesson.yaml`, `questions.yaml`, `flashcards.yaml`, schemas and create-only builders remain until #775 verifies compatible typed, SHA-pinned trusted Stage 6/Stage 5 successors. `generateLessonProps`, `generateAssessmentResources`, `generateLessonReviewArtifacts`, `generateQuestionReviewArtifacts`, `generateFlashcardReviewArtifacts`, and Scene support are **separate** publication, review and implementation dependencies.

### Implemented source-rendering layer (integrated #776–#780)

**Observed on #775 at `ceac5b56`:** 43 concrete source materializer folders under [Engine materializers](../../../shared/engine/generators/materializers/) cover Course/Module/Chapter/Episode and catalog entities (#776), Lesson/Section/Quest (#777), Text/Code/Markdown and media (#778), Carousel/Checkpoint/Scene (#779), and nine Question kinds plus Flashcard/Card Side (#780). They take already-authored plain Config/production input and emit deterministic TypeScript/Markdown/specification **plans** with diagnostics; they are not YAML parsers, immutable Git writers, course/bank workflow coordinators or Props publishers. The Engine `test` script now includes `.test-build/generators/materializers/*/*.spec.js` and `generators/materializers/*/*.spec.mjs`. This establishes **test registration**, not that the integrated #775 run executed all these suites: its Draft Engine-generators job skipped the generator-tests shard on the inspected SHA.

**Still required in #775:** adapt and check the reviewed `CourseWorkflowMaterializerInput` / subsequent Lesson and bank staged inputs into validated concrete Config shapes; mint/persist child UUIDs; handle occupied `index.ts` editorial/final source entrypoints without clobber; verify immutable source/review SHA, file/path scope, pending IDs, enabled required Quiz, real locales/assets and publication eligibility; then connect trusted workflows to a safe atomic writer. Only after those gates are proven can the legacy CLI/CI dependencies below be retired.

## Validation boundaries across the four entity workflows

| Entity flow    | What is **not** a separate authoring-stage gate                                                                         | One authoritative materialization boundary                                                                                                         | Required checks that remain                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Course (typed target)** | No separate YAML or JSON Schema check in Stages 1–4; check `satisfies CourseWorkflowStage1/2/3` plus actual source/evidence | Authorized **typed** Stage 5 materializer once implemented and verified; until then legacy YAML Stage 5 is a retirement candidate, not a valid TS consumer | Separate-context Stage 4 reviewer corrects the same Course TS and verifies final SHA; protect trusted source checks and final publication/Ready gates |
| **Lesson**     | Stage-by-stage technical Zod/TypeScript validation of incomplete methodology, Sections or media before authoring review | Stage 6.1 `lessonBuilder`/`finalizeLesson` validates the actual Lesson input, with strict typed/resource checks in Stage 6.2 and later publication | Independent editorial review Stages 3–5, scene implementation, identity/paths/asset safety, SHA and strict production checks |
| **Questions**  | Separate schema-check CLI as a prerequisite to Stages 1–4 or to assessment specialist sign-off                          | Questions Stage 5 `questionsBuilder` preflight/materialization validates the actual reviewed `questions.yaml` and bank shape before writing        | Stage 4 independent Assessment Review, no-overwrite, real Quiz/Question UUID/locale, source SHA, publisher/production checks |
| **Flashcards** | Repeated Zod/TypeScript validation of an intentionally incomplete early `flashcards.yaml` in Stages 1–4                 | Flashcards Stage 5 `flashcardBuilder` preflight/materialization validates the reviewed bank and typed nested objects before writing                | Stage 4 Memory Design Review, Lesson/Question dependencies, safe paths, source SHA, media/resource/locale/production checks  |

Use Engine-derived schemas as **editor aids and final-boundary inputs**, not mandatory manual gates for every partially written draft. All four flows must fail closed on invalid completed materialization input before writes. Existing optional `--preflight`, `--check` and diagnostic commands remain available; final materialization and production CI must still run as specified. The final validation boundary never replaces an independent editorial or linguistic review, and `Ready for review` still triggers the scoped TypeScript/build/format and safety checks. Do not create a new per-commit YAML-validation workflow, duplicate CLI job, source format, review stage or status file.

## Legacy technical Lesson YAML authoring (existing callers only)

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

Course/Module/Chapter/Episode composition and Lesson reuse are reviewed in the **same typed Course object** through `CourseWorkflowStage3`; independent Stage 4 corrects the same source. The older `course.yaml` materializer remains a temporary **legacy implementation**, not the typed Stage 5. Referenced Lessons remain independent entities. Subsequent Course-specific overrides use the **typed** `course.build.overrides(patch, { languages })` API in authored Course code; there is no intermediate Course Config YAML, separate overrides YAML or compatibility operations language. Such patches never mutate an independent Lesson and require independent pedagogical/scenario review.

### Production outputs

The authoring agent does not implement assets. When production text is
provided, scaffolders create:

- `<Lesson UUID folder>/methodology.md` from verified `production.methodology`, without overwriting existing approved content; Course/Module/Chapter Markdown was generated by the legacy Course Stage 5 materializer; typed Stage 5 must prove equivalent output before replacement;
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

A Lesson Builder emits typed but potentially incomplete Draft modules, source-language content and production handoffs; it does not claim a publishable Lesson, create physical assets, invent missing translations or execute the full validation/approval workflow. The legacy Course Stage 5 materializer emits Course-specific typed Drafts and initial Lesson YAMLs **from a reviewed legacy YAML input**; the new typed Stage 5 replacement is pending implementation/verification. Neither may initiate Lesson production or publish Course Props. Source integrity, stable UUIDs, deterministic output, no-clobber and syntax checking belong to those scripts; typechecking, asset supply, independent reviews and production publication occur later.

See [Lesson Builder](../../../shared/engine/scripts/lessonBuilder/README.md), [legacy Course YAML materializer](../../../shared/engine/scripts/materializeCourseFlow/README.md), [typed Course workflow](../../skills/course-workflow/create-course-flow.skill.md) and [Engine script instructions](../../../shared/engine/scripts/AGENTS.md).
