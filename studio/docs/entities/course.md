# Course content, creators, Lessons, Episodes and Assessments

**New Course production:** [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) is the sole ten-stage procedure. Stages 1–3 progressively refine **one typed TypeScript Course object in `draft.ts`**, with `CourseWorkflowStage1`, `CourseWorkflowStage2`, and `CourseWorkflowStage3` from `@svitlo/engine/build`. Stage 4 is an independent _corrective review_ of that actual Stage 3 source, at a pinned final SHA, in the same Course PR. No temporary `course.yaml`, `toc.yaml`, `config.yaml`, second plan/review PR or separate production Issue is authored in the **new typed workflow**. Stage 5 requires its separately authorized, tested typed source materializer; see [Course Workflow](../../skills/course-workflow/README.md) for the integration boundary.

**Current Course authoring (#857 target):** Course/Module/Chapter slots may include reusable Lessons, independent Episodes and Course-owned Assessments. The authored reviewed Stage 3 `draft.ts` is a single inert, default-exported literal satisfying `CourseWorkflowStage3`. Reused Lessons are referenced by `production.existing.id`, matching evidence and optional plain sparse `sourcePatch` checked using a type-only import; no authored live `production.source`, built override Props, or executed `build.overrides()`. Trusted Course materialization later resolves and verifies the actual existing Lesson before invoking its real Build override. The deployed runner may still use direct invocation until #857 is integrated; inspect actual code.

**Source materialization and publication (#857 target):** The trusted shared Draft Reader parses exact pinned Course `draft.ts` bytes **without executing them**, canonical Stage 3 Zod validates the plain data, and only trusted Course materializer code generates normal executable `index.ts` Configurators, derived methodology and child seeds. The write-token publisher independently checks authorization, HEAD/blob, dependencies, hashes, paths and no-clobber and commits source without reexecution or regeneration. See [Course runbook](../../../scripts/ci/courseMaterialization/README.md) and verify an actual deployed run. Stages 4 independent review, 6/7 child readiness, 8/9 translation and mandatory human Stage 10 QA remain distinct; materialization does not publish Props.

**Status:** Authored Course Config/Props contracts, creator APIs and a Playground-only Course publication/navigation prototype exist. Full Course-owned Scene registry generation, production publisher hardening and progression/persistence remain separate integration work.

A **Course** is an ordered learning journey, distinct from a Curriculum. Its authored tree contains Modules, Chapters, Assessments, Episodes and ordinary instructional Lesson references/Build inputs (including historical assessment-only Lessons not automatically migrated), with optional sparse Lesson overrides. The canonical Lesson is linked at authoring/build time; no complete Lesson is duplicated in published Course JSON. A Module holds Chapters, Assessments, Episodes or Lessons; a Chapter holds Assessments, Episodes or Lessons. Episodes own `scenario` Sections; Scenes remain ContentBlocks.

## Course-owned Questions and Assessment workflow

The canonical [Course Workflow](../../skills/course-workflow/create-course-flow.skill.md) has **ten stages**. After authorized Course Stage 5, **Stage 6 Verify Questions Readiness** checks real, independently authored Lesson Question Bank dependencies; it does **not** duplicate bank authoring or automatically create a child PR. **Stage 7 Design Assessments** follows Questions readiness and delegates actual authoring/review/materialization to the [Assessment Workflow](../../skills/assessment-workflow/create-assessment-flow.skill.md) under its own authorization. The Course PR remains the **single tracker for all ten Course stages**, with the unchanged `svitlo-course-flow:v1` sentinel and a persistent Stage 7 checklist entry.

At **Stage 2 Design Course Structure**, the Methodologist decides Assessment necessity simply by placing **zero or more `type: 'assessment'` slots** into the ordered `content.items`/`content.order` of the owning Course, Module or Chapter. This already captures whether and where an Assessment is required; **do not add any separate Assessment-required flags** to Course/Module/Chapter Config or editorial `production`. Stage 7 applies if **any Assessment slot** exists in the verified complete Course tree, at any depth. If there are **zero slots across the entire tree**, record `Skipped` with the verified Course SHA and zero-slot traversal evidence in the Course PR's `Assessment decisions & handoffs` section. Do not rely on an incomplete tree or stale materialized inventory to claim Skipped. The existing Course PR-description inventory updater must preserve the ten-stage workflow/evidence; the additional `inventory.assessments` placement table is distinct from the Stage 7 state and is pending materializer integration with #823.

Stages **8–9** own Course translation and independent translation review; **Stage 10** is explicit **human** Course QA of the actual integrated hierarchy, including required Assessment completions, selected Question Banks and separate child review evidence. Neither designing Assessments nor completing the Questions checkpoint implies publication readiness.

## Navigation models

`Course_Toc`, `Course_TocModule`, `Course_TocChapter`, `Course_TocLesson` and `Course_TocEpisode` have independently typed `children`. Their `type` values are derived from the existing Course/Module/Chapter/Episode/Lesson contracts, not duplicated discriminator unions. Modules, Chapters and Episodes accept optional `iconKey`. Lesson icons are resolved from the existing Lesson Definition (`iconKey` is not redundantly authored in Lesson Data).

A TOC creator receives only `{ language }`. It reads localized Lesson titles from the already imported Lesson Data and emits compact TOC leaves with `type`, `id`, and localized `title`.

## Reusable Lesson and Course narrative boundary

A Course selects and orders reusable instructional Lessons, retains historical assessment-only Lessons without implicit migration, and may add **Course-owned Assessments** plus **Course-owned** Episodes, storyline, characters, missions, rewards and contextual transitions without rewriting Lesson content, target Skills, assessment meaning or scientific facts. Internal Lesson teaching order remains its own; broader curricular progression belongs to the Course. A Curriculum is an editorial learning plan, not automatically a runtime Course. Narrative events/rewards and cross-Course state are only supported where **current implementation and tests** prove they exist; an intended flow must not be reported as implemented. This consolidates the historical Program terminology; the active entity name and API are **Course**.

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
Stage 2 reserves ordered Lesson positions as `{ config: { type: 'lesson', skills: [...] } }` using **verified nonempty Skill UUIDs**, and Episode positions as `{ config: { type: 'episode' }, production: { focus, purpose } }`. Assessment positions are explicit ordered `type: 'assessment'` slots with source-language title, purpose and upstream/additional Lesson references; **no Course/Module/Chapter Assessment-required flag exists**. Stage 2 may contain Module/Chapter methodology and required `config.content: { items, order }` at all levels, but it does not assign Lesson identities, titles or methodologies. Stage 3 resolves every Lesson into `production.kind: 'new'` (real partial Lesson Config with Course-local slug/title and a complete new Lesson methodology; **no** UUID/Sections) or `production.kind: 'existing'` (verified matching source and one `production.existing: { id, base?, locale? }` object). For pure reuse, import the real Lesson and reference `{ id: existingLesson.id }`, while preserving the imported Configurator in `production.source`. For Course-local adaptation, use the real `existingLesson.build.overrides(patch, { languages: [...] })`, preserve the original plain Config patch in `production.sourcePatch`, identify the actual export in `production.sourceExportName`, and justify `overrideRationale`. There is no third kind, bare string, duplicated `config.id` or hand-constructed raw override. Existing Lesson sources and IDs cannot be modified by a Course-local plan. Stage 4's separate-context reviewer corrects methodology **in the same Course PR** and verifies the final Stage 3 source SHA before sign-off. During Stage 4, before final reinspection, CI evidence and sign-off, the same independently corrected exported Stage 3 object uses `satisfies CourseWorkflowStage3` (alias to Stage 3, not a separate schema or Stage 4 type). Stage 5 consumes the exact reviewed bytes without source changes. For every new/**existing** Lesson placement, `production.assessment` requires four independent booleans: `questionBankRequired`, `flashcardBankRequired`, `quizSectionRequired`, `flashcardsSectionRequired`. A bank is not a Section. `config.params.quizRequiredForCompletion: true` separately implies a real **enabled** Quiz Section at completed Lesson build; `disabled: true` cannot satisfy it. Stage 5 can allocate missing IDs only through the verified typed materializer, without starting a new Lesson PR.

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

The Course-local patch uses the **current** stateless Engine `course.build.overrides(patch, { languages })` API on the generated Course Configurator, while a direct source-materialization input preserves the original Lesson `build.overrides` patch in `production.sourcePatch`, with slug-keyed `content.items`, `additionalItems` and `order` semantics. The old Course override JSON Schema is outside the typed Course authoring contract; removed YAML-only schemas are not retained as a second live source. No separate overrides YAML, second Course Config YAML, operations DSL or fluent compatibility API is supported. Independent pedagogical/scenario review is required for every substantive change.

The typed Course Stage 5 materializer derives Course TypeScript, Markdown and Course-owned Lesson seeds from reviewed Stage 3 TypeScript. Its trusted dispatch is deployment-gated and must verify deterministic output, identity handoffs and pinned-source authorization before use. It generates deterministic **derived** human-readable `methodology.md` for owning Course/Module/Chapter in a stable order (identity/scope; outcomes/prerequisites; approach/depth/sequence; evidence, four assessment decisions and bank owners; access/languages; standards/sources/open decisions). It faithfully preserves substantive rationale; Markdown is never a second authoring source or a JSON dump. For each `production.kind: 'new'`, the only Lesson handoff is a UUID-addressed **`draft.ts satisfies CourseWorkflowLessonSeed`** containing the approved Course-derived metadata/methodology/assessment decisions. **No `defineLesson`, Sections, Quiz/Flashcards placeholder drafts or Lesson PR at Course Stage 5.** The later authorized Lesson Stage 1 replaces the seed in the same TS source with its independently owned `LessonWorkflowStage1` output; the UUID and placement remain unchanged; only later full Lesson materialization derives the Lesson's own `methodology.md` and may introduce visible `Not implemented`, reserved refs and `TODO (BLOCKER)` where needed. Verify `CourseWorkflowLessonSeed` against the current Engine contract before invoking Stage 5. The typed Stage 5 materializer does not constitute editorial approval, translation, asset resolution, Props generation or publication.
Generated TypeScript must always be valid against the current type contracts. Unfinished production resources are represented by valid typed placeholders and explicit `TODO (BLOCKER)` markers where required by the owning materializer. Publication readiness is separate.

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
- **Pedagogy and evidence:** describe subject-appropriate explanatory models, practice/feedback needs, likely conceptual errors and the type of assessment evidence needed to support each material objective. Place justified Quiz Sections within instructional Lessons or place a **Course-owned `type: assessment` slot** directly after a Chapter, Module or entire Course. Specify upstream Lesson slot keys/known UUIDs, target Skills and external Question Bank owners in that slot's full `methodology`; no added `AssessmentPoint` or runtime learner `dependsOn` field. Assessments are first-class Course/Module/Chapter children with production-only upstream Lesson dependencies. Do not pre-author Question UUIDs, answers, grading, Scenes or UI layouts assigned to specialists.
- **Sources, standards and constraints:** identify verifiable domain references, the jurisdiction/version and _actual extent_ of any claimed standard alignment, cultural/localization limits, accessible equivalent learning modes, offline/safety needs, known uncertainties and unresolved decisions with an owner.
- **Independent adequacy test:** a reviewer must be able to justify the learning sequence, coverage and required evidence from the approved source **without inventing missing educational requirements**. A structurally valid TypeScript object, attractive prose or a list of headings is insufficient. During independent Stage 4 the Methodologist/Assessment Architect must **immediately correct in-scope defects in the same Course PR**, re-read the final source and sign off on its corrected SHA. Do not reset Stage 3 or require another reviewer merely because the correction was fundamental. A builder does not grant editorial approval.

Every new Lesson slot requires a complete [Lesson methodology](./lesson.md#lesson-methodology-completeness--pedagogical-technical-specification) **in the same typed Course `production.methodology` slot during Stages 3–4**. Instructional Lessons stay independently reusable; new cross-Lesson evaluations are Course-owned Assessments with reviewed upstream/additional Lesson Question Bank dependencies. Keep any historical assessment-only Lesson unchanged. Stage 4 reviews its pedagogy and upstream ownership **before** Question UUIDs exist; this does not authorize production or claim that its Quiz is publishable. An authorized **typed** Stage 5 materializer will create minimal independent `CourseWorkflowLessonSeed` `draft.ts` handoffs with assigned UUIDs and only approved planning data; verify the type and output in the integrated implementation. Later Lesson/Question Bank production is separately authorized. Course narrative/episode design remains separate.

## Lesson placement and Course languages

Stage 3 of [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) selects pedagogically suitable existing Lessons by verified Skill UUIDs and their actual methodology, audience, depth and locale coverage. The read-only [Lesson query](../../../shared/engine/scripts/queryLessons/README.md) lists candidate IDs and diagnostics; a Skill overlap or incomplete index does not prove a suitable Lesson exists. An existing suitable Lesson is referenced via `production.existing: { id: existingLesson.id }` or an actual `build.overrides()` result. A genuinely new Lesson has its full methodology in the same typed Course object, without an early UUID or separate PR. The authorized replacement Stage 5 assigns stable UUIDs and produces minimal Course-owned `CourseWorkflowLessonSeed` handoffs; a Lesson PR requires later explicit authorization. Existing Lesson placements require real-source and resource verification, not automatic independent Lesson edits. Course-specific placement rationale remains Course-owned.

The editorial Course declares source and intended locales only in `production.languages.document` and `production.languages.planned` during Stage 1–3. A materializer may put genuinely supported locales into final Config only after real authoring; planned target locales are not fabricated translations. The Course already declares supported languages as `parameters.languages`. The generic `Course<'data', SupportedLanguages>` propagates them through Module, Chapter, Episode, Scenario Sections and Course-owned content/overrides. `Locale_Options<SupportedLanguages>` permits a complete localized dictionary or an **intentionally invariant string**, not partial translations. External Lessons are referenced by ID: the publisher checks that each `Lesson.parameters.languages` includes **every** Course language; Lessons may support more.

The one Course `documentLanguage` must be an explicitly supported source locale; ordinary authored titles and descriptions become source-language-only localizations. Genuine language-invariant content remains invariant, but no untranslated title may be relabeled invariant to evade production coverage. All declared target locales require independent actual translation/review. Stage 5 draft materialization does not replace TypeScript validation, Props generation or the runtime JSON publisher.

## Standalone Lesson reuse and compact Course publications

Current Course/Module/Chapter Configs accept previously authored Lesson
configurators via the Build API. A Course's supported languages must be
a subset of those supported by every included Lesson. A reusable instructional Lesson remains standalone regardless of Course ownership or patching; a Course-owned Assessment with upstream Lesson Question Banks is **not** independently deployable until those dependencies resolve. Historical assessment-only Lessons remain unchanged.

The Course publisher emits Course-local resources and sparse overrides
separately from standalone Lesson resources. The Course Stage 5 materializer
does not publish them. An editor must complete and typecheck authored
TypeScript before normal validation and publication.

## Course configuration review and override authorship

[Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md) requires an independent holistic Stage 4 review of the complete pedagogy and Lesson placements before Stage 5. A separately authorized and independently reviewed Course-specific narrative may add Episodes and sparse, stateless Build API overrides **only in the durable Course code**, never by rewriting a standalone Lesson or maintaining another editorial Course source. The Methodologist reviews educational effects; an independent scenario reviewer checks storytelling, learning coherence and accessibility for genuine scenario material. Stage 4 in-scope methodological corrections are final after the reviewer re-verifies the complete corrected source at its new SHA; genuinely later out-of-stage changes still require appropriate revision-pinned approval in the same Course PR. Neither a typecheck nor the materializer grants editorial sign-off.

## EducationStandard relationship (planned)

A Course may later reference independently approved [EducationStandard](./education-standard.md) UUIDs to state and substantiate standards alignment. The same standard definition may be reused by multiple Courses. A reference is not an accreditation, certification or proof of coverage; mapping claims require separate methodological evidence and review. No Course Config, `Course.params` or Course YAML field for EducationStandard references is introduced by PR #637.
