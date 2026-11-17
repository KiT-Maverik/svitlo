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

## Methodology quality contract — implementation-ready Course specification

**The Course methodology is a technical specification for educational production, not a summary, outline, marketing description, or token-saving placeholder.** It establishes the complete Course-wide educational contract: what must be learned, by whom, why, to what depth, in which progression, and what evidence will demonstrate that the intended learning occurred. An independent Methodologist and downstream Course author must be able to apply the specification **without inventing educational requirements**.

A complete Course-level methodology makes the following explicit, with evidence and detail proportional to the subject's actual complexity:

1. **Purpose and scope:** the educational problem, intended role of the Course, substantive subject boundaries, depth, exclusions, and what this Course does **not** claim to teach.
2. **Learner entry profile:** intended learners, developmental/professional context, language and literacy assumptions, relevant accessibility needs, and justified prerequisite Skills, SkillGroups, SkillDomains, Courses or separately explained prior knowledge. Age/grade classification alone is **not** a learner profile.
3. **Learning outcomes and coverage:** specific observable end-of-Course competencies and the intended degree of understanding, application, transfer, or other appropriate depth; alignment to approved Skill definitions and a way to trace each significant outcome to intended instruction/assessment. Never infer Skill meaning from its UUID or display name alone.
4. **Progression and structure:** conceptual dependencies, ordering rationale, anticipated Modules/Chapters/Lesson groups and any deliberate reinforcement or revisiting of Skills. Identify gaps, overload, unnecessary repetition, and assumptions that depend on material not yet taught. Organisational Module/Chapter titles are not a substitute for this reasoning.
5. **Pedagogical approach:** subject-specific models, explanation and practice principles, known misconceptions, differentiated support, meaningful interaction where warranted, and constraints that later specialists must respect. Justify important choices instead of using generic claims such as "interactive and engaging".
6. **Assessment and success criteria:** what kind of observable evidence is needed to judge Course objectives and prerequisite readiness, what counts as progress versus assessed competence, and how the planned Lesson assessment obligations collectively cover the Course goals. Do not invent Question content, scoring policy, or UI details assigned to other specialists.
7. **Standards, references and constraints:** applicable verified educational standards with jurisdiction, edition and **actual extent of alignment**; factual sources, unresolved scientific/editorial questions, inclusivity, localization, cultural, safety, offline and accessibility requirements when relevant. Never label intended alignment as certified compliance.
8. **Unresolved decisions:** concrete unknowns, their impact, an owner for resolution and whether each blocks authoring or approval. Explicitly mark unverified assumptions rather than padding a document with confident prose.

**Adequacy gate:** Review the Course against its planned Skill taxonomy and structural progression. A reviewer must be able to explain *why this sequence and instructional scope will achieve the declared outcomes* and identify the evidence required to evaluate them. If the methodology merely lists topics, grades, generic teaching methods, or broad aspirations, it is **incomplete**, even when every template heading is present. Do not pass incomplete specifications downstream simply to save authoring tokens. There is **no arbitrary word count**: completeness and precision, not verbosity, determine readiness.

**Boundary between Course and Lesson methodologies:** The Course methodology specifies the Course-wide design and dependencies. **Each Lesson independently requires a complete [Lesson methodology](./lesson.md#methodology-quality-contract--implementation-ready-lesson-specification)** with enough substantive detail to guide its Screenwriter. A Course-level overview or a brief Lesson slot is not a replacement for a Lesson's own technical specification. Course-owned storyline or Episode implementation is separate from reusable, Course-neutral Lesson content.

**Proposed initial Course-plan workflow (not yet implemented):** One temporary, Git-committed `course.yaml` would embed the **full Markdown Course methodology and the full Markdown methodology for every newly planned Lesson** for Course-wide independent review *before* entities are materialized. The Course materializer would create the authoritative Course and Lesson `methodology.md` files **without shortening, reinterpreting or silently extending** their approved pedagogical requirements; the temporary YAML would be deleted in a subsequent commit only after verified generation. A Lesson Workflow would implement the already approved specification, not expand it as an ordinary production step. Any necessary substantive amendment requires explicit Methodologist/editor revision and renewed review. This is a **target design**, not behavior of today's Course Builder, which is a separate draft-only Config scaffolder and must not create standalone Lessons.

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
