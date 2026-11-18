# Course workflow

**Canonical entry point:** [Create Course Flow](./create-course-flow.skill.md) — a seven-stage, PR-tracked, restartable Course production process.
The canonical Skill requires a user-facing seven-stage progress checklist and a single copyable next-action prompt at every handoff or PR-number resume. After Stage 5 it recommends pausing Course work to begin one separately authorized, verified Lesson UUID; Course Stages 6–7 remain pending. All seven completed stages must be declared explicitly, distinct from publication readiness. Stage 3 completes Course and Lesson-slot authoring without a separate approval gate. Stage 4 is a single substantive whole-Course review in another agent chat/context, recorded in the parent Course PR checklist; the agent may use the author's GitHub account. Stage 5 requires that completed Stage 4 tracker plus an explicit maintainer operation trigger. GitHub review identities, approval events and review-signature text are not Stage 5 authorization inputs. New Course production uses **one temporary `course.yaml`** for the complete reviewed plan. Stage 5 materializes it directly to typed Course sources and initial YAMLs for new Lessons, then safely removes the temporary Course YAML. It **does not generate `config.yaml` or automatically create Lesson PRs**. The resulting Course-owned Module/Chapter/Episode sources use a single root `content/` directory with recursively nested `<slug>/index.ts` and `<slug>/methodology.md`, not type-grouped folders; independent Lessons are imported instead of duplicated. Specialist skills below remain available for bounded historical/maintenance tasks.

- [Create Course Methodology](./create-course-methodology.skill.md) — Methodologist; writes durable Course `methodology.md`.
- [Create Course Table of Contents](./create-course-toc.skill.md) — Methodologist; requires `methodology.md` and Skill Taxonomy; creates ordered skill-based `toc.yaml`.
- [Match Course TOC Lessons](./match-course-toc-lessons.skill.md) — Methodologist; requires existing `methodology.md` and `toc.yaml`, discovers candidates with [Lessons by Skill ID](../../../shared/engine/scripts/generateLessonsBySkill/generate-lessons-by-skill.mjs), adds `lessonId` or creates an independent Lesson Methodology draft.

## Quest, guided practice and assessment responsibilities

Course Methodology and the skill-based TOC decide **what learners should achieve**, not which player to render. Do not insert Quest or Quiz Sections into `toc.yaml` just because the format exists. At the optional Course Screenwriting / Episode authoring stage, the Educational Screenwriter may propose a **Quest Section** when a coherent guided demonstration or narrative mission needs one persistent interactive workspace, named presentation Stages and Scene-driven Tasks with branching feedback. Ordinary explanations and independent media belong in Content Sections; linear steps may remain Learning Flow. Quest is not mandatory for a story.

The Methodologist determines where evidence belongs: zero/one/multiple justified **Quiz Sections** in an instructional Lesson, or a separate ordinary **assessment-only Lesson** after Chapter/Module/Course content selecting Questions from earlier Lessons' independent banks. Nontrivial instructional Lessons should have their own Question Bank by default even when their own Quiz is absent. A justified assessment-only Lesson may instead have **no own bank** and names its upstream Lesson slots in the one Course methodology. The actual Question UUID selection waits for reviewed, integrated, published upstream banks and cross-Lesson loader support in PR #668. The Learning Assessment Architect owns Question/Quiz validity and scoring. A Quest Task may give immediate formative feedback and practice opportunities, but **does not replace an approved Quiz, Question Bank, or verified mastery evidence**. An Episode has no standalone Lesson Quiz requirement; do not silently add scoring to a Quest to imitate one.

A technical editor may place approved Quest Config nodes inside an Episode's `section.items/order` or a standalone Lesson's `section.items/order`. Quest itself uses `stages` and `tasks` camelCase maps, both with `start`, and no internal `order`; Stage media and Task Scenes become nested factories in the YAML → TypeScript **draft** pipeline. Consult [Quest](../../docs/entities/quest.md) and [YAML Config handoff](../../docs/architecture/yaml-config-scaffolding.md). **Runtime Section registration, player, and publication remain unavailable**. The Screenwriter, technical editor and independent scenario reviewer must record that dependency rather than calling the Course finished or playable.

## Course configuration review gates

Once matched Lessons and their actual authoring data are available, compose and review the Course **before final TypeScript completion and publication**. These are independent specialist skills, not automatic side effects of creating the TOC:

1. **Course Screenwriting (future optional stage)** — authors approved Course-owned narrative, Episodes, Scenes and any scenario-specific changes to the canonical sparse Course Build patch. This is not yet a shipped Course-authoring skill.
2. [Review Course Scenario](./review-course-scenario.skill.md) — independent scenario/narrative review **only for Courses with an actual scenario layer**. A Course without scenario content skips this gate.
3. [Review Course Methodology and Configuration](./review-course-methodology.skill.md) — Methodologist checks the assembled Course, each actual Lesson's default settings, progression and assessment. When pedagogically justified, the Methodologist **adds or revises a methodological Build API patch in that same canonical Course overrides source**, subject to independent editorial approval. This is the required methodological configuration review before final generation.

The two reviews have distinct criteria and revision-specific sign-offs. They can examine independently ready content without a rigid execution ordering, but changes affecting scenario content/behavior must be rechecked by the scenario reviewer, and changes affecting pedagogy must be rechecked by the Methodologist. A reviewer cannot approve their own authored override. New or changed overrides remain **draft** until independently approved; do not label them approved simply because an Engine scaffolder can emit code. Record detailed findings and exact source revisions in the review PR/Issue, without creating `scenario-review.md` or `methodology-review.md`. When a typed Course-owned `review.ts` and verifiable assembled Course revision exist, the authorized coordinator indexes the completed review PR there; do not write Course review evidence into a standalone Lesson's `LessonReview`.

**Timing:** TOC authoring has no reliable Lesson Data; Lesson Matching may identify editorial-only drafts. Concrete slug/parameter overrides require actual authored Lessons. Other completed slots may be reviewed while missing Lessons remain in production, but the complete Course is not signed off until the required scope is verified. The generic YAML → TypeScript draft scaffolder does **not** validate YAML approval status, references or review PR and typed Review records (when supported). Enforce these editorial gates in Studio, independently of scaffolding.

The editorial TOC format is defined by [course-toc.schema.json](./course-toc.schema.json). Narrative, UX and production are independent optional operations.

**Existing technical source maintenance only:** the Engine Course Builder may scaffold draft TypeScript from a legacy Config-shaped `config.yaml` with nested `config` and `production` nodes. This is not part of the new seven-stage Course Flow, which uses only the temporary reviewed `course.yaml` and writes no intermediate `config.yaml`. Historical `toc.yaml` and methodology remain specialist maintenance inputs. See [Unified YAML handoff](../../docs/architecture/yaml-config-scaffolding.md).

## Approved Course-owned overrides

[Course Build Overrides](./course-overrides.md) defines the **single supported**
Course-owned override format. `config.yaml.overrides` in new technical sources, or a separate current-format `overrides.yaml` in an existing legacy source, contains a direct stateless
`course.build.overrides(patch, { languages })` patch, guided by the
[generated Engine Course Overrides Schema](../../../shared/engine/yaml-schemas/courseOverrides.schema.json).
Legacy ordered editorial operations are obsolete and unsupported.

Methodological and scenario review still determines whether each Course-specific
change is justified and approved; approval is distinct from technical
scaffolding and from the final Engine Config/Props validation. Override patches
must not mutate any reusable standalone Lesson.

## Historical/technical Engine YAML draft handoff (separate from new Course Flow Stage 5)

The editorial `toc.yaml` uses ordered arrays of skill-based slots; it is **not** a Config-shaped `defineCourse` YAML input. After Lesson matching and applicable approvals, a separate handoff converts verified Course/Module/Chapter/Episode nodes to typed `content: { items, order }` collections with explicit nested `type`, and each `type: lesson` item to an existing standalone `lessonId` reference. This handoff uses [the composed Course scaffold editor schema](../../../shared/engine/yaml-schemas/course.scaffold.schema.json) plus the manually defined [Production schema](../../../shared/engine/yaml-schemas/production.schema.json). It does not automatically approve or replace editorial Methodology/TOC; for new technical sources, the sparse Build patch is embedded as root `overrides` in `config.yaml`.

## Localization convention

Course Methodology records its editorial `documentLanguage` and planned `supportedLanguages`. The skill-based TOC declares its own source `documentLanguage` (which should belong to `supportedLanguages` when projected to a Course Config) and repeats the planned Course languages. Ordinary titles are translatable text; `{ value: "...", invariant: true }` identifies genuine language-independent titles. The projected Config contains source-language-only `locale` values while retaining intended `params.languages`. The scaffolder neither translates nor publishes. Standalone Lessons must ultimately cover every Course locale but may support more; matching checks this independently.

**Downstream Lesson Workflow:** in new work, missing Lesson methodologies are authored or reused in a standalone `lesson.yaml` `production.methodology` and reviewed against the [Lesson methodology quality contract](../../docs/entities/lesson.md#lesson-methodology-completeness--pedagogical-technical-specification). [Create Lesson Content](../lesson-workflow/create-lesson-content.skill.md) enriches that same Lesson YAML; legacy `content.yaml` is an explicit migration input, never a newly required parallel source.

## Course → Lesson Draft PR handoff

For a selected matching batch, deduplicate unresolved Lesson UUIDs and use [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md) to create/reuse **one linked Draft Lesson PR per UUID**, not an old fixed-batch Lesson Production Issue. Preserve source Course UUID, slot ↔ Lesson ID, Methodologist specification, verified SHA and existing review provenance in PR descriptions. Historical Issues remain searchable evidence, not the state tracker for new work. Translation-only gaps follow the separate Translation workflow. Do not imply matching authorizes subsequent content or implementation stages.
