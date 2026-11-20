# Course content, creators, Lessons and Episodes

**New Course production:** [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) coordinates the seven stages. Its **single temporary `course.yaml`** contains the reviewed Course specification and is directly materialized to TypeScript/Markdown Course sources and minimal new Lesson YAML handoffs; it is removed after verified finalization. **No intermediate or permanent Course `config.yaml` is produced.** The Stage 5 materializer is the only supported Course YAML-to-source authoring path.

**Current Course authoring:** Course/Module/Chapter children may include independent Episodes and standalone Lesson references. Episodes own their narrative Sections and are not Lesson subtypes; instructional Lessons remain independently reusable. An assessment-only Lesson may explicitly depend on reviewed upstream Course Lesson bank ownership without introducing a new Runtime Lesson kind. New Course editorial work uses only the [seven-stage Course Flow](../../skills/course-workflow/create-course-flow.skill.md) and the single temporary `course.yaml`. Stage 5 directly creates typed Course source and minimal Lesson YAMLs; approved Course-specific `build.overrides` patches live in permanent typed source. No alternate TOC, Config YAML or operations-based override input is supported.

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
A Course `type: lesson` slot in temporary YAML reuses an existing standalone Lesson by its verified `lessonId`, or holds a complete new Lesson methodology without an ID. The Stage 5 materializer resolves implemented Lesson sources where possible and allocates stable UUIDs plus minimal `lesson.yaml` handoffs for genuinely new Lessons. It never overwrites already authored standalone Lessons or opens their production PRs.

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

The Course-local patch uses the **current** stateless Engine `course.build.overrides(patch, { languages })` API directly in durable typed Course source, with slug-keyed `content.items`, `additionalItems` and `order` semantics. The generated `shared/engine/yaml-schemas/courseOverrides.schema.json` describes its shape, not an editable Course source file. No separate overrides YAML, second Course Config YAML, operations DSL or fluent compatibility API is supported. Independent pedagogical/scenario review is required for every substantive change.

The Stage 5 Course materializer emits deterministic TypeScript and Markdown drafts, not an approval, validator, translator, asset resolver, Props generator or publisher.
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

[Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) owns the Course's methodology in the single temporary `course.yaml` during Stages 1–4. Stage 5 directly materializes reviewed Course-wide and per-Module/Chapter methodology into durable `methodology.md` beside each authored source. Outcomes, learner profile, standards alignment with specific source/version, entry prerequisites and planned locales are part of that one Course specification, not a competing editable Methodology document. No separate TOC, source-format conversion or narrative decision is needed to finish methodological planning. Runtime enforcement and publication remain separate.

## Course methodology completeness — pedagogical technical specification

The Course's methodology (initially in the editorial `course.yaml` and durably in generated `methodology.md`) is an **implementation-ready educational specification**, not an outline or a token-saving summary. Its completeness is proportional to the actual Course scope; there is no arbitrary word count. Stage 1 may leave structural details for Stages 2–3, but **Stage 4 must not accept a Course plan whose final scope, progression or evidence obligations remain underspecified**.

- **Purpose, boundaries and learners:** state the educational problem, audience and entry profile, developmental/literacy/accessibility assumptions, supported depth and explicit exclusions. Age or grade alone is not a learner profile.
- **Verified outcomes and taxonomy:** specify observable learning outcomes, source-verified Skill IDs and their intended depth (introduction, guided use, independent performance or transfer). Distinguish prerequisite Skills from Skills the Course teaches; Domain/Group inclusion is not blanket mastery.
- **Sequence and dependencies:** explain why Modules, Chapters and Lesson slots occur in that order, how misconceptions and prerequisites are addressed, and where deliberate revisiting or reinforcement is needed.
- **Pedagogy and evidence:** describe subject-appropriate explanatory models, practice/feedback needs, likely conceptual errors and the type of assessment evidence needed to support each material objective. Place justified Quiz Sections within instructional Lessons or place a **separate ordinary `type: lesson` assessment-only slot** after a Chapter, Module or entire Course. Specify upstream Lesson slot keys/known UUIDs, target Skills and external Question Bank owners in that slot's full `methodology`; no `AssessmentPoint` type or Runtime `dependsOn` field. Do not pre-author Question UUIDs, answers, grading, Scenes or UI layouts assigned to specialists.
- **Sources, standards and constraints:** identify verifiable domain references, the jurisdiction/version and _actual extent_ of any claimed standard alignment, cultural/localization limits, accessible equivalent learning modes, offline/safety needs, known uncertainties and unresolved decisions with an owner.
- **Independent adequacy test:** a reviewer must be able to justify the learning sequence, coverage and required evidence from the approved source **without inventing missing educational requirements**. A structurally valid YAML, attractive prose or a list of headings is insufficient. Deficiencies require a Methodologist-owned amendment and new revision-specific review; a builder does not grant editorial approval.

Every new Lesson slot requires a complete [Lesson methodology](./lesson.md#lesson-methodology-completeness--pedagogical-technical-specification) **inside the one Course `course.yaml` during Stages 3–4**. Instructional Lessons should be independently reusable; an assessment-only Lesson may require preceding Course Lessons and their independently produced Question Banks. Stage 4 reviews its pedagogy and upstream ownership **before** Question UUIDs exist; this does not authorize production or claim that its Quiz is publishable. Stage 5 materializes the approved methodology into the new Lesson's `lesson.yaml`; later Lesson/Question Bank production is separately authorized. Course narrative/episode design remains separate.

## Lesson placement and Course languages

Stage 3 of [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) selects pedagogically suitable existing Lessons by verified Skill UUIDs and their actual methodology, audience, depth and locale coverage. The read-only [Lesson query](../../../shared/engine/scripts/queryLessons/README.md) lists candidate IDs and diagnostics; a Skill overlap or incomplete index does not prove a suitable Lesson exists. An existing suitable Lesson is referenced by its immutable `lessonId`. A genuinely new Lesson is specified with complete methodology **inside its Course YAML slot, without an early UUID or separate PR**. Only Stage 5 assigns a stable UUID and writes a minimal independently owned `lesson.yaml`; its separate Lesson PR requires later explicit authorization. Course-specific placement rationale remains Course-owned.

The Course declares intended `documentLanguage` and supported locales in its temporary `course.yaml`. The materializer preserves planned locales while using only the genuinely authored source language in active Config; future translated fields are not fabricated. The Course already declares supported languages as `parameters.languages`. The generic `Course<'data', SupportedLanguages>` propagates them through Module, Chapter, Episode, Scenario Sections and Course-owned content/overrides. `Locale_Options<SupportedLanguages>` permits a complete localized dictionary or an **intentionally invariant string**, not partial translations. External Lessons are referenced by ID: the publisher checks that each `Lesson.parameters.languages` includes **every** Course language; Lessons may support more.

The one Course `documentLanguage` must be an explicitly supported source locale; ordinary authored titles and descriptions become source-language-only localizations. Genuine language-invariant content remains invariant, but no untranslated title may be relabeled invariant to evade production coverage. All declared target locales require independent actual translation/review. Stage 5 draft materialization does not replace TypeScript validation, Props generation or the runtime JSON publisher.

## Standalone Lesson reuse and compact Course publications

Current Course/Module/Chapter Configs accept previously authored Lesson
configurators via the Build API. A Course's supported languages must be
a subset of those supported by every included Lesson. A reusable instructional Lesson remains standalone regardless of Course ownership or patching; an assessment-only Lesson with external bank dependencies is **not** represented as independently deployable until those dependencies actually resolve.

The Course publisher emits Course-local resources and sparse overrides
separately from standalone Lesson resources. The Course Stage 5 materializer
does not publish them. An editor must complete and typecheck authored
TypeScript before normal validation and publication.

## Course configuration review and override authorship

[Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) requires an independent holistic Stage 4 review of the complete pedagogy and Lesson placements before Stage 5. A separately authorized and independently reviewed Course-specific narrative may add Episodes and sparse, stateless Build API overrides **only in the durable Course code**, never by rewriting a standalone Lesson or maintaining another Course YAML. The Methodologist reviews educational effects; an independent scenario reviewer checks storytelling, learning coherence and accessibility for genuine scenario material. Every material change requires exact source-revision evidence and renewed relevant approval in the parent Course PR. Neither a typecheck nor the materializer grants editorial sign-off.

## EducationStandard relationship (planned)

A Course may later reference independently approved [EducationStandard](./education-standard.md) UUIDs to state and substantiate standards alignment. The same standard definition may be reused by multiple Courses. A reference is not an accreditation, certification or proof of coverage; mapping claims require separate methodological evidence and review. No Course Config, `Course.params` or Course YAML field for EducationStandard references is introduced by PR #637.
