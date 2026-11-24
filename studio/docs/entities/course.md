# Course content, creators, Lessons and Episodes

**New Course production:** [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) is the sole eight-stage procedure. Stages 1–3 progressively refine **one typed TypeScript Course object in `draft.ts`**, with `CourseWorkflowStage1`, `CourseWorkflowStage2`, and `CourseWorkflowStage3` from `@svitlo/engine/build`. Stage 4 is an independent _corrective review_ of that actual Stage 3 source, at a pinned final SHA, in the same Course PR. No temporary `course.yaml`, `toc.yaml`, `config.yaml`, second plan/review PR or separate production Issue is authored in the **new typed workflow**. Stage 5 requires its separately authorized, tested typed source materializer; see [Course Workflow](../../skills/course-workflow/README.md) for the integration boundary.

**Current Course authoring:** Course/Module/Chapter children may include independent Episodes and standalone Lesson references. Episodes own narrative Sections and are not Lesson subtypes; instructional Lessons remain separately reusable. New planning uses `config` and editorial `production` within a single typed object. `production.languages.document` and `production.languages.planned` own source/planned language intent, not early `config.params.languages`. Existing Lesson references use the real imported Lesson ID or its `build.overrides()` result; the Course does not duplicate the Lesson. Stage 5 is the first point at which new Lesson UUIDs and handoffs may be generated.

**Source materialization and publication:** Course Stage 5 uses the trusted typed materializer. Verify the default-branch workflow and authorized run evidence using the [Course materialization runbook](../../../scripts/ci/courseMaterialization/README.md). Course Config/Props publication is a separate downstream operation. Course completion requires mandatory human Stage 8 QA of the integrated Course, including its Lesson and Episode dependencies, after translation review; the human verdict and tested revision are recorded in the same Course PR. See the canonical Skill for the procedure. QA does not authorize merge.

**Status:** Authored Course Config/Props contracts, creator APIs and a Playground-only Course publication/navigation prototype exist. Full Course-owned Scene registry generation, production publisher hardening and progression/persistence remain separate integration work.

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
or automatically check educational alignment. For the new typed editorial workflow, validate with current TypeScript contracts
and source checks. The removed `generateYamlSchemas` outputs are neither Course authoring inputs nor an acceptance gate. Review real TS source/Engine contracts instead.

## Current Build API and Course-owned overrides

`defineCourse` composes independently authored `defineModule`, `defineChapter`,
`defineEpisode`, and **existing standalone `defineLesson` configurators**.
Stage 2 reserves ordered Lesson positions as `{ config: { type: 'lesson', skills: [...] } }` using **verified nonempty Skill UUIDs**, and Episode positions as `{ config: { type: 'episode' }, production: { focus, purpose } }`. Stage 2 may contain Module/Chapter methodology and required `config.content: { items, order }` at all levels, but it does not assign Lesson identities, titles or methodologies. Stage 3 resolves every Lesson into `production.kind: 'new'` (real partial Lesson Config with Course-local slug/title and a complete new Lesson methodology; **no** UUID/Sections) or `production.kind: 'existing'` (verified matching source and one `production.existing: { id, base?, locale? }` object). For pure reuse, import the real Lesson and write `{ id: existingLesson.id }`; for localized Course adaptation, use `existingLesson.build.overrides(patch, { languages: [...] })` and justify `overrideRationale`. There is no third kind, bare string, duplicated `config.id` or hand-constructed raw override. Existing Lesson sources and IDs cannot be modified by a Course-local plan. Stage 4's separate-context reviewer corrects methodology **in the same Course PR** and verifies the final Stage 3 source SHA before sign-off. Immediately before authorized Stage 5, the same independently corrected Stage 3 object also `satisfies CourseWorkflowMaterializerInput` (alias to Stage 3, not a separate schema or Stage 4 type). For every new/**existing** Lesson placement, `production.assessment` requires four independent booleans: `questionBankRequired`, `flashcardBankRequired`, `quizSectionRequired`, `flashcardsSectionRequired`. A bank is not a Section. `config.params.quizRequiredForCompletion: true` separately implies a real **enabled** Quiz Section at completed Lesson build; `disabled: true` cannot satisfy it. Stage 5 can allocate missing IDs only through the verified typed materializer, without starting a new Lesson PR.

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

The Course-local patch uses the **current** stateless Engine `course.build.overrides(patch, { languages })` API directly in durable typed Course source, with slug-keyed `content.items`, `additionalItems` and `order` semantics. The old Course override JSON Schema is outside the typed Course authoring contract; removed YAML-only schemas are not retained as a second live source. No separate overrides YAML, second Course Config YAML, operations DSL or fluent compatibility API is supported. Independent pedagogical/scenario review is required for every substantive change.

The typed Course Stage 5 materializer derives Course TypeScript, Markdown and Lesson Stage 1 handoffs from reviewed Stage 3 TypeScript. Its trusted dispatch is deployment-gated and must verify deterministic output, identity handoffs and pinned-source authorization before use. It generates deterministic **derived** human-readable `methodology.md` for owning Course/Module/Chapter in a stable order (identity/scope; outcomes/prerequisites; approach/depth/sequence; evidence, four assessment decisions and bank owners; access/languages; standards/sources/open decisions). It faithfully preserves substantive rationale; Markdown is never a second authoring source or a JSON dump. For each `production.kind: 'new'`, the only Lesson handoff is a UUID-addressed **`draft.ts satisfies LessonWorkflowStage1`** containing the approved Course-derived metadata/methodology/assessment decisions. **No `defineLesson`, Sections, Quiz/Flashcards placeholder drafts or Lesson PR at Course Stage 5.** The later authorized Lesson Flow advances the same TS source; only later full Lesson materialization derives the Lesson's own `methodology.md` and may introduce visible `Not implemented`, reserved refs and `TODO (BLOCKER)` where needed. Verify `LessonWorkflowStage1` against the current Engine contract before invoking Stage 5. The typed Stage 5 materializer does not constitute editorial approval, translation, asset resolution, Props generation or publication.
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

[Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) owns the complete Course methodology in the one typed `production` object during Stages 1–4. Stage 2 adds Module/Chapter `production` methodology. Stage 3 adds complete new-Lesson in-place methodology and verified existing-Lesson matching evidence. Independent Stage 4 review reads and directly corrects the same source; approved materialization later creates durable source modules and methodology artifacts. Runtime enforcement, localization and publication remain separate.

## Course methodology completeness — pedagogical technical specification

The Course's methodology (in the typed `production.methodology` and later in durable materialized methodology documents) is an **implementation-ready educational specification**, not an outline or a token-saving summary. Its completeness is proportional to the actual Course scope; there is no arbitrary word count. Stage 1 may leave structural details for Stages 2–3, but **Stage 4 must not accept a Course plan whose final scope, progression or evidence obligations remain underspecified**.

- **Purpose, boundaries and learners:** state the educational problem, audience and entry profile, developmental/literacy/accessibility assumptions, supported depth and explicit exclusions. Age or grade alone is not a learner profile.
- **Verified outcomes and taxonomy:** specify observable learning outcomes, source-verified Skill IDs and their intended depth (introduction, guided use, independent performance or transfer). Distinguish prerequisite Skills from Skills the Course teaches; Domain/Group inclusion is not blanket mastery.
- **Sequence and dependencies:** explain why Modules, Chapters and Lesson slots occur in that order, how misconceptions and prerequisites are addressed, and where deliberate revisiting or reinforcement is needed.
- **Pedagogy and evidence:** describe subject-appropriate explanatory models, practice/feedback needs, likely conceptual errors and the type of assessment evidence needed to support each material objective. Place justified Quiz Sections within instructional Lessons or place a **separate ordinary `type: lesson` assessment-only slot** after a Chapter, Module or entire Course. Specify upstream Lesson slot keys/known UUIDs, target Skills and external Question Bank owners in that slot's full `methodology`; no `AssessmentPoint` type or Runtime `dependsOn` field. Do not pre-author Question UUIDs, answers, grading, Scenes or UI layouts assigned to specialists.
- **Sources, standards and constraints:** identify verifiable domain references, the jurisdiction/version and _actual extent_ of any claimed standard alignment, cultural/localization limits, accessible equivalent learning modes, offline/safety needs, known uncertainties and unresolved decisions with an owner.
- **Independent adequacy test:** a reviewer must be able to justify the learning sequence, coverage and required evidence from the approved source **without inventing missing educational requirements**. A structurally valid TypeScript object, attractive prose or a list of headings is insufficient. During independent Stage 4 the Methodologist/Assessment Architect must **immediately correct in-scope defects in the same Course PR**, re-read the final source and sign off on its corrected SHA. Do not reset Stage 3 or require another reviewer merely because the correction was fundamental. A builder does not grant editorial approval.

Every new Lesson slot requires a complete [Lesson methodology](./lesson.md#lesson-methodology-completeness--pedagogical-technical-specification) **in the same typed Course `production.methodology` slot during Stages 3–4**. Instructional Lessons should be independently reusable; an assessment-only Lesson may require preceding Course Lessons and their independently produced Question Banks. Stage 4 reviews its pedagogy and upstream ownership **before** Question UUIDs exist; this does not authorize production or claim that its Quiz is publishable. An authorized **typed** Stage 5 materializer will create minimal independent `LessonWorkflowStage1` `draft.ts` handoffs with assigned UUIDs and only approved planning data; verify the type and output in the integrated implementation. Later Lesson/Question Bank production is separately authorized. Course narrative/episode design remains separate.

## Lesson placement and Course languages

Stage 3 of [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) selects pedagogically suitable existing Lessons by verified Skill UUIDs and their actual methodology, audience, depth and locale coverage. The read-only [Lesson query](../../../shared/engine/scripts/queryLessons/README.md) lists candidate IDs and diagnostics; a Skill overlap or incomplete index does not prove a suitable Lesson exists. An existing suitable Lesson is referenced via `production.existing: { id: existingLesson.id }` or an actual `build.overrides()` result. A genuinely new Lesson has its full methodology in the same typed Course object, without an early UUID or separate PR. The authorized replacement Stage 5 assigns stable UUIDs and produces minimal independently authored `LessonWorkflowStage1` handoffs; a Lesson PR requires later explicit authorization. Existing Lesson placements require real-source and resource verification, not automatic independent Lesson edits. Course-specific placement rationale remains Course-owned.

The editorial Course declares source and intended locales only in `production.languages.document` and `production.languages.planned` during Stage 1–3. A materializer may put genuinely supported locales into final Config only after real authoring; planned target locales are not fabricated translations. The Course already declares supported languages as `parameters.languages`. The generic `Course<'data', SupportedLanguages>` propagates them through Module, Chapter, Episode, Scenario Sections and Course-owned content/overrides. `Locale_Options<SupportedLanguages>` permits a complete localized dictionary or an **intentionally invariant string**, not partial translations. External Lessons are referenced by ID: the publisher checks that each `Lesson.parameters.languages` includes **every** Course language; Lessons may support more.

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

[Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) requires an independent holistic Stage 4 review of the complete pedagogy and Lesson placements before Stage 5. A separately authorized and independently reviewed Course-specific narrative may add Episodes and sparse, stateless Build API overrides **only in the durable Course code**, never by rewriting a standalone Lesson or maintaining another editorial Course source. The Methodologist reviews educational effects; an independent scenario reviewer checks storytelling, learning coherence and accessibility for genuine scenario material. Stage 4 in-scope methodological corrections are final after the reviewer re-verifies the complete corrected source at its new SHA; genuinely later out-of-stage changes still require appropriate revision-pinned approval in the same Course PR. Neither a typecheck nor the materializer grants editorial sign-off.

## EducationStandard relationship (planned)

A Course may later reference independently approved [EducationStandard](./education-standard.md) UUIDs to state and substantiate standards alignment. The same standard definition may be reused by multiple Courses. A reference is not an accreditation, certification or proof of coverage; mapping claims require separate methodological evidence and review. No Course Config, `Course.params` or Course YAML field for EducationStandard references is introduced by PR #637.
