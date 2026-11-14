# Course workflow

Independent course-authoring skills; explicit artifact prerequisites, **no mandatory full pipeline**.

- [Create Course Methodology](./create-course-methodology.skill.md) — Methodologist; writes durable Course `methodology.md`.
- [Create Course Table of Contents](./create-course-toc.skill.md) — Methodologist; requires `methodology.md` and Skill Taxonomy; creates ordered skill-based `toc.yaml`.
- [Match Course TOC Lessons](./match-course-toc-lessons.skill.md) — Methodologist; requires existing `methodology.md` and `toc.yaml`, discovers candidates with [Lessons by Skill ID](../../../shared/engine/scripts/generateLessonsBySkill/generate-lessons-by-skill.mjs), adds `lessonId` or creates an independent Lesson Methodology draft.

## Course configuration review gates

Once matched Lessons and their actual authoring data are available, compose and review the Course **before final TypeScript completion and publication**. These are independent specialist skills, not automatic side effects of creating the TOC:

1. **Course Screenwriting (future optional stage)** — authors approved Course-owned narrative, Episodes, Scenes and any scenario-specific changes to the shared `overrides.yaml`. This is not yet a shipped Course-authoring skill.
2. [Review Course Scenario](./review-course-scenario.skill.md) — independent scenario/narrative review **only for Courses with an actual scenario layer**. A Course without scenario content skips this gate.
3. [Review Course Methodology and Configuration](./review-course-methodology.skill.md) — Methodologist checks the assembled Course, each actual Lesson's default settings, progression and assessment. When pedagogically justified, the Methodologist **adds or revises a methodological Build API patch in the same `overrides.yaml`**, subject to independent editorial approval. This is the required methodological configuration review before final generation.

The two reviews have distinct criteria and revision-specific sign-offs. They can examine independently ready content without a rigid execution ordering, but changes affecting scenario content/behavior must be rechecked by the scenario reviewer, and changes affecting pedagogy must be rechecked by the Methodologist. A reviewer cannot approve their own authored override. New or changed overrides remain **draft** until independently approved; do not label them approved simply because an Engine scaffolder can emit code. Review reports live in the Course directory as `scenario-review.md` (when applicable) and `methodology-review.md`.

**Timing:** TOC authoring has no reliable Lesson Data; Lesson Matching may identify editorial-only drafts. Concrete slug/parameter overrides require actual authored Lessons. Other completed slots may be reviewed while missing Lessons remain in production, but the complete Course is not signed off until the required scope is verified. The generic YAML → TypeScript draft scaffolder does **not** validate YAML approval status, references or review-document approvals. Enforce these editorial gates in Studio, independently of scaffolding.

The editorial TOC format is defined by [course-toc.schema.json](./course-toc.schema.json). Narrative, UX and production are independent optional operations.

## Approved Course-owned overrides

[Course Build Overrides](./course-overrides.md) defines the **single supported**
Course-owned override format. `overrides.yaml` contains a direct stateless
`course.build.overrides(patch, { languages })` patch, guided by the
[generated Engine Course Overrides Schema](../../../shared/engine/yaml-schemas/courseOverrides.schema.json).
Legacy ordered editorial operations are obsolete and unsupported.

Methodological and scenario review still determines whether each Course-specific
change is justified and approved; approval is distinct from technical
scaffolding and from the final Engine Config/Props validation. Override patches
must not mutate any reusable standalone Lesson.

## Engine YAML draft handoff

The editorial `toc.yaml` uses ordered arrays of skill-based slots; it is **not** a Config-shaped `defineCourse` YAML input. After Lesson matching and applicable approvals, a separate handoff converts verified Course/Module/Chapter/Episode nodes to typed `content: { items, order }` collections with explicit nested `type`, and each `type: lesson` item to an existing standalone `lessonId` reference. This handoff and [nested Course example](../../docs/architecture/yaml-config-scaffolding.md#partial-course-config-shaped-yaml-example) are governed by the actual [Engine YAML schemas](../../../shared/engine/scripts/generateYamlSchemas/README.md). They do not replace the Methodologist's plan or the Course's optional `overrides.yaml`.

## Localization convention

Course Methodology records its editorial `documentLanguage` and planned `supportedLanguages`. The skill-based TOC declares its own source `documentLanguage` (which should belong to `supportedLanguages` when projected to a Course Config) and repeats the planned Course languages. Ordinary titles are translatable text; `{ value: "...", invariant: true }` identifies genuine language-independent titles. The projected Config contains source-language-only `locale` values while retaining intended `params.languages`. The scaffolder neither translates nor publishes. Standalone Lessons must ultimately cover every Course locale but may support more; matching checks this independently.

**Downstream Lesson Workflow:** Methodologist proposals in [Match Course TOC Lessons](./match-course-toc-lessons.skill.md) must contain the same explicit `assessmentPlan` as independently authored Lesson Briefs. After approval, [Create Lesson Content](../lesson-workflow/create-lesson-content.skill.md) writes `content.yaml`, not a free-form `content.md`.

## Course → Lesson Production handoff

The authorized [Match Course TOC Lessons](./match-course-toc-lessons.skill.md) task deduplicates all new/unimplemented standalone Lesson UUIDs from its **selected matching batch** and creates/reuses **one [Lesson Production Issue](../lesson-workflow/manage-lesson-production.skill.md)**. Record the Course UUID, source `toc.yaml` revision, matched slot-key → Lesson-ID map, Methodologist Drafts and any existing editorial approvals. Reused implemented Lessons do **not** produce new Lesson Production Issues; translation-only gaps route to [Translation Production](../translation-workflow/manage-translation-production.skill.md). A new Methodologist Brief is Draft until separately approved. Merely creating the Issue never auto-launches a Screenwriter, generator/builder, Scene Coding Agent or publication. Course Methodology and TOC planning skills remain independent of this handoff.
