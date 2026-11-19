# Course content, creators, Lessons and Episodes

**New Course production:** [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) coordinates the seven stages. Its **single temporary `course.yaml`** contains the reviewed Course specification and is directly materialized to TypeScript/Markdown Course sources and minimal new Lesson YAML handoffs; it is removed after verified finalization. **No intermediate or permanent Course `config.yaml` is produced.** The separate generic Config-shaped Course Builder below remains for historical maintenance, not the new Course Flow.

**Current authoring rule (Episode configurator migration):** A Course, Module or Chapter may contain independent `defineEpisode` children alongside `defineLesson` children. Episodes own narrative Sections and are not Lesson subtypes. Instructional Lessons remain pedagogically Course-neutral even when physically authored under one Course; a separately placed assessment-only Lesson may instead depend on its reviewed Course sequence without adding new Engine entity types or fields. The legacy creator/publication details below describe historical APIs and need separate runtime migration. **For Issue #507 YAML draft-scaffolding, the current authority is [Engine's Config-shaped YAML handoff](../architecture/yaml-config-scaffolding.md): typed `content.items/order`, explicit nested `type`, and existing standalone Lesson `lessonId` references.** The editorial `toc.yaml` is distinct from technical Course YAML; `overrides.yaml` uses only the current Build API patch shape and has its own review requirements.

**Status:** Authored Course contracts, creator APIs and a Playground-only Course publication/navigation prototype are implemented. Course-owned React Scene registry generation, full publisher hardening, and progression/persistence remain future integration work.

A **Course** is an ordered learning journey, distinct from a Curriculum. Its authored tree contains Modules, Chapters, Episodes and ordinary Lesson references/Build inputs (including independently reusable instruction and justified Course-sequence-specific assessment Lessons), with optional sparse Lesson overrides. The canonical Lesson is linked at authoring/build time; no complete Lesson is duplicated in published Course JSON. A Module holds Chapters, Episodes or Lessons; a Chapter holds Episodes or Lessons. Episodes own `scenario` Sections; Scenes remain ContentBlocks.

## Navigation models

`Course_Toc`, `Course_TocModule`, `Course_TocChapter`, `Course_TocLesson` and `Course_TocEpisode` have independently typed `children`. Their `type` values are derived from the existing Course/Module/Chapter/Episode/Lesson contracts, not duplicated discriminator unions. Modules, Chapters and Episodes accept optional `iconKey`. Lesson icons are resolved from the existing Lesson Definition (`iconKey` is not redundantly authored in Lesson Data).

A TOC creator receives only `{ language }`. It reads localized Lesson titles from the already imported Lesson Data and emits compact TOC leaves with `type`, `id`, and localized `title`.

## Reusable Lesson and Course narrative boundary

A Course selects and orders Lessons (reusable instructional Lessons and, when justified, Course-sequence-specific assessment-only Lessons), and may add **Course-owned** Episodes, storyline, characters, missions, rewards and contextual transitions without rewriting Lesson content, target Skills, assessment meaning or scientific facts. Internal Lesson teaching order remains its own; broader curricular progression belongs to the Course. A Curriculum is an editorial learning plan, not automatically a runtime Course. Narrative events/rewards and cross-Course state are only supported where **current implementation and tests** prove they exist; an intended flow must not be reported as implemented. This consolidates the historical Program terminology; the active entity name and API are **Course**.

## Course teaching outcomes and referenced educational standards

Current Engine Course Config/Props support optional `params.outcomes` with
`skills`, `skillGroups`, `skillDomains` UUID arrays. This describes
**intended competencies to teach**; existing `params.prerequisites`
describes **entry conditions** and remains separate. Referencing a Domain or
Group defines scope, not mastery of every descendant Skill. The optional
`locale.outcomesText` supplies short learner-facing copy, while substantive
methodological rationale stays in the Course editorial plan and later
`methodology.md`. Optional audience ranges are `params.age` (0–125) and
`params.grade` (0–40), each `{ min, max }` with `min <= max`, and must be
interpreted within the specified jurisdiction/learner context.

Optional `params.educationStandards` stores immutable EducationStandard UUID
references. It is **not** proof of accreditation, certification, compliance,
or real coverage; alignment sources/versions and scoped evidence require
separate Course methodology and independent review. The Engine does not
silently create standards, translate their separately owned frontend text,
or automatically check educational alignment. For complete Course editing,
regenerate the derived YAML JSON schemas using `generateYamlSchemas` after
the Zod Config change; the independent generator is authoritative.

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

## Course methodology completeness — pedagogical technical specification

The Course's methodology (initially in the editorial `course.yaml` and durably in generated `methodology.md`) is an **implementation-ready educational specification**, not an outline or a token-saving summary. Its completeness is proportional to the actual Course scope; there is no arbitrary word count. Stage 1 may leave structural details for Stages 2–3, but **Stage 4 must not accept a Course plan whose final scope, progression or evidence obligations remain underspecified**.

- **Purpose, boundaries and learners:** state the educational problem, audience and entry profile, developmental/literacy/accessibility assumptions, supported depth and explicit exclusions. Age or grade alone is not a learner profile.
- **Verified outcomes and taxonomy:** specify observable learning outcomes, source-verified Skill IDs and their intended depth (introduction, guided use, independent performance or transfer). Distinguish prerequisite Skills from Skills the Course teaches; Domain/Group inclusion is not blanket mastery.
- **Sequence and dependencies:** explain why Modules, Chapters and Lesson slots occur in that order, how misconceptions and prerequisites are addressed, and where deliberate revisiting or reinforcement is needed.
- **Pedagogy and evidence:** describe subject-appropriate explanatory models, practice/feedback needs, likely conceptual errors and the type of assessment evidence needed to support each material objective. Place justified Quiz Sections within instructional Lessons or place a **separate ordinary `type: lesson` assessment-only slot** after a Chapter, Module or entire Course. Specify upstream Lesson slot keys/known UUIDs, target Skills and external Question Bank owners in that slot's full `methodology`; no `AssessmentPoint` type or Runtime `dependsOn` field. Do not pre-author Question UUIDs, answers, grading, Scenes or UI layouts assigned to specialists.
- **Sources, standards and constraints:** identify verifiable domain references, the jurisdiction/version and _actual extent_ of any claimed standard alignment, cultural/localization limits, accessible equivalent learning modes, offline/safety needs, known uncertainties and unresolved decisions with an owner.
- **Independent adequacy test:** a reviewer must be able to justify the learning sequence, coverage and required evidence from the approved source **without inventing missing educational requirements**. A structurally valid YAML, attractive prose or a list of headings is insufficient. Deficiencies require a Methodologist-owned amendment and new revision-specific review; a builder does not grant editorial approval.

Every new Lesson slot requires a complete [Lesson methodology](./lesson.md#lesson-methodology-completeness--pedagogical-technical-specification) **inside the one Course `course.yaml` during Stages 3–4**. Instructional Lessons should be independently reusable; an assessment-only Lesson may require preceding Course Lessons and their independently produced Question Banks. Stage 4 reviews its pedagogy and upstream ownership **before** Question UUIDs exist; this does not authorize production or claim that its Quiz is publishable. Stage 5 materializes the approved methodology into the new Lesson's `lesson.yaml`; later Lesson/Question Bank production is separately authorized. Course narrative/episode design remains separate.

## Course TOC Lesson matching

The [Match Course TOC Lessons](../../../studio/skills/course-workflow/match-course-toc-lessons.skill.md) workflow enriches editorial `toc.yaml` slots with `lessonId` references. These point either to reviewed existing Lessons or to stable UUIDs reserved for standalone Methodologist drafts. There is no redundant per-slot implementation-status flag; actual Lesson `*.data.ts` presence determines implementation. Course-specific selection rationale stays in the TOC; Lesson Methodology remains independently reusable. The read-only [Lessons by Skill ID](../../../scripts/generate-lessons-by-skill.mjs) helper produces a flat PR-scoped Markdown reference library. This is not an auto-publishing or runtime Course matching feature.

## Course languages and editor-authored TOC locale

**Current Course scaffolder boundary:** `shared/engine/scripts/courseBuilder/` reads Config-shaped `course.yaml` or supported partial `toc.yaml` and optional direct Build API `overrides.yaml`. It never accepts the former editorial operations DSL, resolves missing Lessons by guessing, or publishes Props.

The Course already declares supported languages as `parameters.languages`. The generic `Course<'data', SupportedLanguages>` propagates them through Module, Chapter, Episode, Scenario Sections and Course-owned content/overrides. `Locale_Options<SupportedLanguages>` permits a complete localized dictionary or an **intentionally invariant string**, not partial translations. External Lessons are referenced by ID: the publisher checks that each `Lesson.parameters.languages` includes **every** Course language; Lessons may support more.

Editorial `methodology.md` declares its own prose `documentLanguage` and planned `supportedLanguages`. The [skill-based TOC](../../../studio/skills/course-workflow/create-course-toc.skill.md) repeats supported languages and declares its **own** `documentLanguage` as the source locale for ordinary titles. Invariant titles are explicit `{value: "...", invariant: true}`. The separately reviewed projection puts ordinary TOC text into `locale.<field>.<documentLanguage>` only and preserves the intended `params.languages`; it cannot fabricate translations or treat the other locales as implemented. The TOC's source `documentLanguage` should be in `supportedLanguages` when projected, even if Methodology was written in another editorial language. The TypeScript draft scaffolder does not replace Course authoring, normal typechecks, Props generation or the runtime JSON publisher.

## Standalone Lesson reuse and compact Course publications

Current Course/Module/Chapter Configs accept previously authored Lesson
configurators via the Build API. A Course's supported languages must be
a subset of those supported by every included Lesson. A reusable instructional Lesson remains standalone regardless of Course ownership or patching; an assessment-only Lesson with external bank dependencies is **not** represented as independently deployable until those dependencies actually resolve.

The Course publisher emits Course-local resources and sparse overrides
separately from standalone Lesson resources. The Course YAML scaffolder
does not publish them. An editor must complete and typecheck authored
TypeScript before normal validation and publication.

## Course configuration review and override authorship

[Course Workflow](../../../studio/skills/course-workflow/README.md) separates Lesson matching/production from the **review of the assembled Course**. [Scenario Review](../../../studio/skills/course-workflow/review-course-scenario.skill.md) checks actual Course-owned scenario material when present; [Course Methodology and Configuration Review](../../../studio/skills/course-workflow/review-course-methodology.skill.md) checks progression, real Lesson settings and the methodological necessity of Course-local changes. The Methodologist may write sparse pedagogical overrides during this review, while a future Course Screenwriter may write scenario overrides; both use the **same** optional `overrides.yaml` without modifying standalone Lessons. Each material edit needs source-revision-specific re-review and independent editorial sign-off before `status: approved`. Editorial review and approval gates stay in Studio; the generic Course draft scaffolder does not inspect Markdown approvals or certify readiness.

## EducationStandard relationship (planned)

A Course may later reference independently approved [EducationStandard](./education-standard.md) UUIDs to state and substantiate standards alignment. The same standard definition may be reused by multiple Courses. A reference is not an accreditation, certification or proof of coverage; mapping claims require separate methodological evidence and review. No Course Config, `Course.params` or Course YAML field for EducationStandard references is introduced by PR #637.
