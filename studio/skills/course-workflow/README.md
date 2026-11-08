# Course workflow

Independent course-authoring skills; explicit artifact prerequisites, **no mandatory full pipeline**.

- [Create Course Methodology](./create-course-methodology.skill.md) — Methodologist; writes durable Course `methodology.md`.
- [Create Course Table of Contents](./create-course-toc.skill.md) — Methodologist; requires `methodology.md` and Skill Taxonomy; creates ordered skill-based `toc.yaml`.
- [Match Course TOC Lessons](./match-course-toc-lessons.skill.md) — Methodologist; requires existing `methodology.md` and `toc.yaml`, discovers candidates with [Lessons by Skill ID](../../../scripts/generate-lessons-by-skill.mjs), adds `lessonId` or creates an independent Lesson Methodology draft.

## Course configuration review gates

Once matched Lessons and their actual authoring data are available, compose and review the Course **before final Builder generation/publication**. These are independent specialist skills, not automatic side effects of creating the TOC:

1. **Course Screenwriting (future optional stage)** — authors approved Course-owned narrative, Episodes, Scenes and any scenario-specific changes to the shared `overrides.yaml`. This is not yet a shipped Course-authoring skill.
2. [Review Course Scenario](./review-course-scenario.skill.md) — independent scenario/narrative review **only for Courses with an actual scenario layer**. A Course without scenario content skips this gate.
3. [Review Course Methodology and Configuration](./review-course-methodology.skill.md) — Methodologist checks the assembled Course, each actual Lesson's default settings, progression and assessment. When pedagogically justified, the Methodologist **adds or revises methodological operations in the same `overrides.yaml`**, subject to independent editorial approval. This is the required methodological configuration review before final generation.

The two reviews have distinct criteria and revision-specific sign-offs. They can examine independently ready content without a rigid execution ordering, but changes affecting scenario content/behavior must be rechecked by the scenario reviewer, and changes affecting pedagogy must be rechecked by the Methodologist. A reviewer cannot approve their own authored override. New or changed overrides remain **draft** until approved; do not pass them to the Builder as approved. Review reports live in the Course directory as `scenario-review.md` (when applicable) and `methodology-review.md`.

**Timing:** TOC authoring has no reliable Lesson Data; Lesson Matching may identify editorial-only drafts. Concrete slug/parameter overrides require actual authored Lessons. Other completed slots may be reviewed while missing Lessons remain in production, but the complete Course is not signed off until the required scope is verified. Current Builder validates YAML status and references, not review-document approvals; enforce these editorial gates in the workflow.

The editorial TOC format is defined by [course-toc.schema.json](./course-toc.schema.json). Narrative, UX and production are independent optional operations.

## Approved Course-owned overrides

[Course Lesson Overrides](./course-overrides.md) defines the **separate** `overrides.yaml` editorial format, validated by [course-overrides.schema.json](./course-overrides.schema.json). It is not part of `toc.yaml` and never edits a standalone Lesson. The Course Methodologist can author **pedagogical** overrides during Course Methodology Review, while the future Course Screenwriter can author **scenario** overrides during Course screenwriting; both contribute to **one** approved Course-owned file. A reviewed Course integration author can use it to specify sparse parameter changes, Section/ContentBlock slug modifications, ordering and approved Course-owned TS source references for new Sections/blocks or metadata patches. The deterministic Course Builder at `scripts/course-builder/` turns these instructions into existing `createLessonOverrides` API calls. Scenario content/asset sources must already exist and be approved; their authorship is not delegated to the builder.

## Localization convention

Course Methodology records its editorial `documentLanguage` and planned `supportedLanguages`. The skill-based TOC declares its own source `documentLanguage` (which must belong to `supportedLanguages` for direct publication) and repeats the planned Course languages. Ordinary titles are translatable text; `{ value: "...", invariant: true }` identifies genuine language-independent titles. Standalone Lessons must cover every Course locale but may support more; matching checks this independently.

**Downstream Lesson Workflow:** Methodologist proposals in [Match Course TOC Lessons](./match-course-toc-lessons.skill.md) must contain the same explicit `assessmentPlan` as independently authored Lesson Briefs. After approval, [Create Lesson Content](../lesson-workflow/create-lesson-content.skill.md) writes `content.yaml`, not a free-form `content.md`.

## Course → Lesson Production handoff

The authorized [Match Course TOC Lessons](./match-course-toc-lessons.skill.md) task deduplicates all new/unimplemented standalone Lesson UUIDs from its **selected matching batch** and creates/reuses **one [Lesson Production Issue](../lesson-workflow/manage-lesson-production.skill.md)**. Record the Course UUID, source `toc.yaml` revision, matched slot-key → Lesson-ID map, Methodologist Drafts and any existing editorial approvals. Reused implemented Lessons do **not** produce new Lesson Production Issues; translation-only gaps route to [Translation Production](../translation-workflow/manage-translation-production.skill.md). A new Methodologist Brief is Draft until separately approved. Merely creating the Issue never auto-launches a Screenwriter, generator/builder, Scene Coding Agent or publication. Course Methodology and TOC planning skills remain independent of this handoff.
