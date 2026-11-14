# Course content, creators, Lessons and Episodes

**Current authoring rule (Episode configurator migration):** A Course, Module or Chapter may contain independent `defineEpisode` children alongside `defineLesson` children. Episodes own narrative Sections and are not Lesson subtypes. A Lesson remains pedagogically Course-neutral even if physically authored under one Course. The legacy creator/publication details below describe historical APIs and need separate runtime migration. **For Issue #507 YAML draft-scaffolding, the current authority is [Engine's Config-shaped YAML handoff](../architecture/yaml-config-scaffolding.md): typed `content.items/order`, explicit nested `type`, and existing standalone Lesson `lessonId` references.** The editorial `toc.yaml` is distinct from technical Course YAML; `overrides.yaml` uses only the current Build API patch shape and has its own review requirements.

**Status:** Authored Course contracts, creator APIs and a Playground-only Course publication/navigation prototype are implemented. Course-owned React Scene registry generation, full publisher hardening, and progression/persistence remain future integration work.

A **Course** is an ordered learning journey, distinct from a Curriculum. Its authored tree contains Modules, Chapters, Episodes and **complete reusable Lesson Data objects** or sparse Lesson override entries with the canonical Lesson attached at authoring time. This is a build-time-only dependency; no complete Lesson is duplicated in published Course JSON. A Module holds Chapters, Episodes or Lessons; a Chapter holds Episodes or Lessons. Episodes own `scenario` Sections; Scenes remain ContentBlocks.

## Navigation models

`Course_Toc`, `Course_TocModule`, `Course_TocChapter`, `Course_TocLesson` and `Course_TocEpisode` have independently typed `children`. Their `type` values are derived from the existing Course/Module/Chapter/Episode/Lesson contracts, not duplicated discriminator unions. Modules, Chapters and Episodes accept optional `iconKey`. Lesson icons are resolved from the existing Lesson Definition (`iconKey` is not redundantly authored in Lesson Data).

A TOC creator receives only `{ language }`. It reads localized Lesson titles from the already imported Lesson Data and emits compact TOC leaves with `type`, `id`, and localized `title`.

## Current Build API and Course-owned overrides

`defineCourse` composes independently authored `defineModule`, `defineChapter`,
`defineEpisode`, and **existing standalone `defineLesson` configurators**.
A Course `type: lesson` node in YAML is a `lessonId` reference, not an embedded
Lesson Config. The Course TypeScript draft scaffolder imports the existing
Lesson when its optional `source` import coordinates are known, or leaves an
explicit unresolved reference for a separate Lesson Production handoff.
It must never create or overwrite files in a standalone Lesson directory.

The **only** current override mechanism is the stateless nested Build API:

```ts
const course = defineCourse(courseConfig);
const courseOverrides = course.build.overrides(
  { content: { items: { opening: { params: { sections: { allowSkipping: false } } } } } },
  { languages: ['uk'] },
);
```

At each Module/Chapter boundary the sparse patch uses `content.items` keyed
by stable authored slugs. `items`, `additionalItems`, and `order` are the
current collection operations; the applicable child configurator owns
validation. The Course-specific patch does not change the source Lesson.
Identity fields and supported Lesson languages cannot be rewritten.

The optional Course-local `overrides.yaml` is **that direct Build API patch**.
See [Course Build Overrides](../../skills/course-workflow/course-overrides.md)
and the generated `shared/engine/yaml-schemas/courseOverrides.schema.json`.
The former `createLessonOverrides` fluent API, `operations` array DSL, and
`_OverrideEditorial` output are obsolete and unsupported.

The YAML → TypeScript scaffolder is a mechanical draft emitter, not a
validator, translator, reviewer, asset resolver, Props generator, or publisher.
Generated TypeScript may deliberately be incomplete until an AI editor
finishes imports, authored fields and locale coverage. Publication is separate.

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

**Current Course scaffolder boundary:** `shared/engine/scripts/courseBuilder/` reads Config-shaped `course.yaml` or supported partial `toc.yaml` and optional direct Build API `overrides.yaml`. It never accepts the former editorial operations DSL, resolves missing Lessons by guessing, or publishes Props.

The Course already declares supported languages as `parameters.languages`. The generic `Course<'data', SupportedLanguages>` propagates them through Module, Chapter, Episode, Scenario Sections and Course-owned content/overrides. `Locale_Options<SupportedLanguages>` permits a complete localized dictionary or an **intentionally invariant string**, not partial translations. External Lessons are referenced by ID: the publisher checks that each `Lesson.parameters.languages` includes **every** Course language; Lessons may support more.

Editorial `methodology.md` declares its own prose `documentLanguage` and planned `supportedLanguages`. The [skill-based TOC](../../../studio/skills/course-workflow/create-course-toc.skill.md) repeats supported languages and declares its **own** `documentLanguage` as the source locale for ordinary titles. Invariant titles are explicit `{value: "...", invariant: true}`. The separately reviewed projection puts ordinary TOC text into `locale.<field>.<documentLanguage>` only and preserves the intended `params.languages`; it cannot fabricate translations or treat the other locales as implemented. The TOC's source `documentLanguage` should be in `supportedLanguages` when projected, even if Methodology was written in another editorial language. The TypeScript draft scaffolder does not replace Course authoring, normal typechecks, Props generation or the runtime JSON publisher.

## Standalone Lesson reuse and compact Course publications

Current Course/Module/Chapter Configs accept previously authored Lesson
configurators via the Build API. A Course's supported languages must be
a subset of those supported by every included Lesson. The reusable Lesson
remains standalone regardless of Course ownership or patching.

The Course publisher emits Course-local resources and sparse overrides
separately from standalone Lesson resources. The Course YAML scaffolder
does not publish them. An editor must complete and typecheck authored
TypeScript before normal validation and publication.

## Course configuration review and override authorship

[Course Workflow](../../../studio/skills/course-workflow/README.md) separates Lesson matching/production from the **review of the assembled Course**. [Scenario Review](../../../studio/skills/course-workflow/review-course-scenario.skill.md) checks actual Course-owned scenario material when present; [Course Methodology and Configuration Review](../../../studio/skills/course-workflow/review-course-methodology.skill.md) checks progression, real Lesson settings and the methodological necessity of Course-local changes. The Methodologist may write sparse pedagogical overrides during this review, while a future Course Screenwriter may write scenario overrides; both use the **same** optional `overrides.yaml` without modifying standalone Lessons. Each material edit needs source-revision-specific re-review and independent editorial sign-off before `status: approved`. Editorial review and approval gates stay in Studio; the generic Course draft scaffolder does not inspect Markdown approvals or certify readiness.
