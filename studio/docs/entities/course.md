# Course content, creators and Lesson composition

**Status:** Authored Course contracts, creator APIs and a Playground-only Course publication/navigation prototype are implemented. Course-owned React Scene registry generation, full publisher hardening, and progression/persistence remain future integration work.

A **Course** is an ordered learning journey, distinct from a Curriculum. Its authored tree can contain Modules, Chapters, Episodes and standalone Lesson ID references or sparse Lesson override entries. A Module holds Chapters, Episodes or Lessons; a Chapter holds Episodes or Lessons. Episodes own `scenario` Sections; Scenes remain ContentBlocks.

## Navigation models

`Course_Toc`, `Course_TocModule`, `Course_TocChapter`, `Course_TocLesson` and `Course_TocEpisode` have independently typed `children`. Their `type` values are derived from the existing Course/Module/Chapter/Episode/Lesson contracts, not duplicated discriminator unions. Modules, Chapters and Episodes accept optional `iconKey`. Lesson icons are resolved from the existing Lesson Definition (`iconKey` is not redundantly authored in Lesson Data).

A TOC creator receives `{ language, resolveLesson(id) }`. Since a Course references Lessons by ID, a Chapter cannot invent or derive a Lesson's title/icon without this resolver.

## Shared creator API

Every authoring creator implements `Course_Creator<Data, Toc, Languages>`:

```ts
const episode = createEpisode(episodeData);
const chapter = createChapter({
  type: 'chapter',
  id: 'introduction',
  title: chapterTitle,
  iconKey: 'book',
  content: [lessonA.id, episode],
});
const module = createModule({
  type: 'module',
  id: 'foundations',
  title: moduleTitle,
  content: [chapter, lessonB.id],
});

chapter.getData(); // normalized, authoring-time Chapter Data
chapter.toToc(context); // localized, hierarchy-safe Course_TocChapter
chapter.toResource(context); // { data, toc }, JSON-compatible publisher input
```

Nested creators are unwrapped when producing `getData()`; no methods or closures enter published resource inputs. `toResource()` currently provides **prepared source data and the localized TOC**, not a fully localized Course Response. A subsequent publisher performs reference checks, full locale projection, static registry inclusion and file IO. Creator methods perform no IO.

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
overridden.toToc(context); // Lesson TOC leaf, with possible title override
overridden.toResource(context); // { data: patch, toc }
```

`build()` returns `{ type: 'lessonOverride', lessonId, overrides }` with **only changed fields**; unchanged sections, blocks, questions, flashcards, language sets and Lesson Definition are never copied. The `sections` field uses an explicit patch model:

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
