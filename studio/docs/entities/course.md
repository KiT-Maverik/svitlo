# Course content, creators, Lessons and Episodes

**Current authoring rule (Episode configurator migration):** A Course, Module or Chapter may contain independent `defineEpisode` children alongside `defineLesson` children. Episodes own narrative Sections and are not Lesson subtypes. A Lesson remains pedagogically Course-neutral even if physically authored under one Course. The legacy creator/publication details below describe historical APIs and need separate runtime migration.

**Status:** Authored Course contracts, creator APIs and a Playground-only Course publication/navigation prototype are implemented. Course-owned React Scene registry generation, full publisher hardening, and progression/persistence remain future integration work.

A **Course** is an ordered learning journey, distinct from a Curriculum. Its authored tree contains Modules, Chapters, Episodes and **complete reusable Lesson Data objects** or sparse Lesson override entries with the canonical Lesson attached at authoring time. This is a build-time-only dependency; no complete Lesson is duplicated in published Course JSON. A Module holds Chapters, Episodes or Lessons; a Chapter holds Episodes or Lessons. Episodes own `scenario` Sections; Scenes remain ContentBlocks.

## Navigation models

`Course_Toc`, `Course_TocModule`, `Course_TocChapter`, `Course_TocLesson` and `Course_TocEpisode` have independently typed `children`. Their `type` values are derived from the existing Course/Module/Chapter/Episode/Lesson contracts, not duplicated discriminator unions. Modules, Chapters and Episodes accept optional `iconKey`. Lesson icons are resolved from the existing Lesson Definition (`iconKey` is not redundantly authored in Lesson Data).

A TOC creator receives only `{ language }`. It reads localized Lesson titles from the already imported Lesson Data and emits compact TOC leaves with `type`, `id`, and localized `title`.

## Creator and publication boundaries

All Course-family creators return authored data via `getData()`.
`createModule`, `createChapter` and `createEpisode` compose typed
nested entities; they do **not** build their own TOC. The Course creator
traverses its complete content tree and owns navigation projection.

```ts
const episode = createEpisode(episodeData);
const chapter = createChapter({ ...chapterData, content: [lessonA, episode] });
const module = createModule({ ...moduleData, content: [chapter, lessonB] });
const course = createCourse({ ...courseData, content: [module] });

course.getData(); // Authored, complete, build-only
course.getContentEntries(); // Flattened authoring entities for publisher
course.getBase(); // { toc, episodes, overrides } invariant data
course.getLocale('uk'); // Sparse patch for the selected language
course.toToc({ language: 'uk' }); // Fully localized authoring preview only
```

`getContentEntries()` also exists on Module, Chapter and Episode creators.
It returns `lessons`, `episodes`, `groups` and `overrides`, **not files**.
The Course generator owns path construction, serialization and publication
of `toc/base.json` plus `toc/<language>.json`, and equivalent resources
under `episodes/<id>/` and `overrides/<lessonId>/`.

Only the Course builds TOC. Its base holds types, IDs, icons and hierarchy;
locale patches hold only localized navigation strings, without duplicating
invariant fields or child-array structure. Runtime merges the base and
the requested language before navigation or applying a Course-local patch.
Standalone Lesson Data never appears in published Course resources.

## Sparse Lesson override API

```ts
const overridden = createLessonOverrides(lesson)
  .setParams({ sections: { allowSkipping: false } })
  .sections.bySlug.theory.content.bySlug.intro.set({
    locales: localizedMarkdown,
  })
  .sections.bySlug.theory.content.setOrder(['intro', newHintBlock])
  .sections.setOrder(['theory', courseScenario, 'practice', 'quiz']);

overridden.build(); // minimum changed-field patch
overridden.getData(); // same authored patch
overridden.getContentEntries(); // Build-time Lesson and patch references; no files or TOC
```

`build()` returns `{ type: 'lessonOverride', lessonId, lesson, overrides }` with **only changed override fields**; the `lesson` property is the original, unmodified Lesson Data available solely at authoring/build time. The publisher strips it and emits only `lessonId` plus the sparse override. Unchanged sections, blocks, questions, flashcards, language sets and Lesson Definition are never copied into the published patch. The `sections` field uses an explicit patch model:

```ts
{
  order?: string[];
  added?: { section: SectionData, source: { type: 'course' } }[];
  removed?: string[];
  bySlug?: {
    [sectionSlug]: {
      title?: LocalizedTitle;
      navigationLabel?: LocalizedLabel;
      skippable?: boolean;
      content?: {
        order?: string[];
        added?: { block: ContentBlockData, source: { type: 'course' } }[];
        removed?: string[];
        bySlug?: { [blockSlug]: PartialBlockFields };
      };
    };
  };
}
```

This shape preserves source ownership only where needed: **new Course-owned Sections and blocks**. Existing Lesson-owned items are resolved by slug from the referenced Lesson and retain their original Scene Definition registry, even after a data override.

**Merge semantics:** object fields can be deep-merged into canonical **Lesson Data**; Section and ContentBlock arrays MUST be processed via `removed`, `added`, and `order` with stable slug identities. Do not use generic array-index deep merge. Keep Lesson Definition unchanged: Course-owned Definitions/Scene registries remain Course-owned. This merge/materialization is a future publisher responsibility.

The builder validates duplicate IDs/slugs, unknown references, missing order entries, and quiz-section invariants. Global Lesson ID resolution, question references and locale integrity still require publisher validation. `remove()` eliminates a slug from subsequent typed `bySlug` views.

## Boundaries

This change does **not** install Course-specific Scene renderers, write static Course JSON, provide a Course runtime, or change the Lesson registry. The existing textbook-generated Scene registry is the only registry intended for the final composed package.

## Playground published-course prototype

The shared textbook build discovers `data/courses/*.data.ts`, resolves Lesson
references against authored Lesson IDs and emits localized TOC, sparse overrides
and standalone Episode resources into `data/pages/courses/<courseId>/`.
The existing packed Publish CLI copies these resources with the rest of the
textbook assets.

The Web host exposes `/[language]/course/[courseId]` with a TOC,
`/[language]/course/[courseId]/lesson/[lessonId]` with a composited
LessonResponse, and `/[language]/course/[courseId]/episode/[episodeId]` with
a Scenario-section Episode. Ordinary Lesson URLs remain independent.

Course-specific patches apply **after** the published Lesson's own locale
assembly. `applyCourseLessonOverride` deep-merges object properties but
uses explicit slug-keyed operations for Section and ContentBlock membership and
ordering. The applied response does not mutate the standalone Lesson.
A Course-owned React Scene still requires an explicit build-time registry
integration before it can render; the demonstration uses Markdown only.

This is a proof of content publishing and navigation, **not yet** a full
Course session/controller with completion across Lessons or persisted Course state.

## Course methodological specification

The independent [Create Course Methodology](../../../studio/skills/course-workflow/create-course-methodology.skill.md) skill writes a persistent editorial `methodology.md` under `content/<textbook>/data/courses/<bucket>/<courseId>/`. It records the intended audience, pedagogical rationale, standards compatibility, entry prerequisites, documentLanguage and planned supportedLanguages. It does **not** create a TOC, Course Data, Lessons or narrative. The authored Course currently supports optional `prerequisites` (skills, skillGroups, skillDomains, courses and a localized free-text Markdown block) and `scenarioMode: 'none' | 'story'`; legacy Courses may omit these fields. An omitted scenarioMode is not an assertion that a Course has a storyline. These contract fields do not imply automatic editorial Markdown ingestion, standards validation, prerequisite gating or narrative playback; those require separate implementation.

## Course TOC Lesson matching

The [Match Course TOC Lessons](../../../studio/skills/course-workflow/match-course-toc-lessons.skill.md) workflow enriches editorial `toc.yaml` slots with `lessonId` references. These point either to reviewed existing Lessons or to stable UUIDs reserved for standalone Methodologist drafts. There is no redundant per-slot implementation-status flag; actual Lesson `*.data.ts` presence determines implementation. Course-specific selection rationale stays in the TOC; Lesson Methodology remains independently reusable. The read-only [Lessons by Skill ID](../../../scripts/generate-lessons-by-skill.mjs) helper produces a flat PR-scoped Markdown reference library. This is not an auto-publishing or runtime Course matching feature.

## Course languages and editor-authored TOC locale

**Implemented Course Builder update:** `scripts/course-builder/build-course.mjs` validates approved Course Methodology, TOC and optional `overrides.yaml` (a distinct Course-owned [editorial schema](../../skills/course-workflow/course-overrides.schema.json)) and generates a typed Course composition factory. It uses existing Course creators, reuses standalone Lesson Data imports, emits sparse `createLessonOverrides` operations and writes no standalone Lesson assets. Course titles/descriptions and missing translations still require separately approved frontend authoring input; the existing flat Course publication entrypoint must provide them. Course-owned Episodes/Scenario Sections can be referenced as approved typed sources but are never fabricated by this builder. See [Course Overrides](../../skills/course-workflow/course-overrides.md).

The Course already declares supported languages as `parameters.languages`. The generic `Course<'data', SupportedLanguages>` propagates them through Module, Chapter, Episode, Scenario Sections and Course-owned content/overrides. `Locale_Options<SupportedLanguages>` permits a complete localized dictionary or an **intentionally invariant string**, not partial translations. External Lessons are referenced by ID: the publisher checks that each `Lesson.parameters.languages` includes **every** Course language; Lessons may support more.

Editorial `methodology.md` declares its own prose `documentLanguage` and planned `supportedLanguages`. The [skill-based TOC](../../../studio/skills/course-workflow/create-course-toc.skill.md) repeats supported languages and declares its **own** `documentLanguage` as the source locale for ordinary titles. Invariant titles are explicit `{value: "...", invariant: true}`. The implemented Course YAML composition builder puts ordinary TOC text only into that source locale and requires complete typed translations before a final Course Data entrypoint can publish. It must not copy untranslated source values as fallback. Its source `documentLanguage` must be in `supportedLanguages` for direct projection, even if the separate Methodology was written in another language. The builder does not replace the Course frontend authoring or runtime JSON publisher.

## Full Lesson Data in authoring, compact Course publications

Course/Module/Chapter creators now accept full `Lesson<'data', SupportedLanguages>` objects instead of bare Lesson IDs. The shared Course generic propagates through nested entities and Lesson Data. This ensures the TS compiler sees the Lesson's declared languages and localized values at authoring time. `createLessonOverrides(lesson).build()` also carries its original Lesson Data for the same check. As with the existing Lesson contracts, scalar strings remain intentionally invariant; locale dictionaries must be complete.

The Course publisher consumes `createCourse(course).getBase()`, `getLocale(language)` and `getContentEntries()`, not manual recursive Lesson lookups. It writes localized TOC, Episodes, and sparse Lesson overrides, not embedded Lesson objects. Duplicate IDs, invalid buckets, missing authoring data and output collisions remain generator integrity checks. **Run TypeScript typecheck on authored Course sources before publication:** esbuild/transpilation alone does not typecheck. The Course's compatible Lesson entry type accepts a standalone Lesson whose locale tuple is a **superset** of Course languages. The Engine creator checks that `Course.parameters.languages` is a subset of each referenced `Lesson.parameters.languages`; generated Course factories additionally typecheck literal tuples. Course-owned entries remain strictly localized for Course languages, and `Locale_Options` is unchanged.

## Course configuration review and override authorship

[Course Workflow](../../../studio/skills/course-workflow/README.md) separates Lesson matching/production from the **review of the assembled Course**. [Scenario Review](../../../studio/skills/course-workflow/review-course-scenario.skill.md) checks actual Course-owned scenario material when present; [Course Methodology and Configuration Review](../../../studio/skills/course-workflow/review-course-methodology.skill.md) checks progression, real Lesson settings and the methodological necessity of Course-local changes. The Methodologist may write sparse pedagogical overrides during this review, while a future Course Screenwriter may write scenario overrides; both use the **same** optional `overrides.yaml` without modifying standalone Lessons. Each material edit needs source-revision-specific re-review and independent editorial sign-off before `status: approved`. No Course Builder automation currently enforces the Markdown review gate.
