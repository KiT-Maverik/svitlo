# Course workflow

Independent course-authoring skills; explicit artifact prerequisites, **no mandatory full pipeline**.

- [Create Course Methodology](./create-course-methodology.skill.md) — Methodologist; writes durable Course `methodology.md`.
- [Create Course Table of Contents](./create-course-toc.skill.md) — Methodologist; requires `methodology.md` and Skill Taxonomy; creates ordered skill-based `toc.yaml`.
- [Match Course TOC Lessons](./match-course-toc-lessons.skill.md) — Methodologist; requires existing `methodology.md` and `toc.yaml`, discovers candidates with [Lessons by Skill ID](../../../scripts/generate-lessons-by-skill.mjs), adds `lessonId` or creates an independent Lesson Methodology draft.

The editorial TOC format is defined by [course-toc.schema.json](./course-toc.schema.json). Narrative, UX and production are independent optional operations.

## Localization convention

Course Methodology records its editorial `documentLanguage` and planned `supportedLanguages`. The skill-based TOC declares its own source `documentLanguage` (which must belong to `supportedLanguages` for direct publication) and repeats the planned Course languages. Ordinary titles are translatable text; `{ value: "...", invariant: true }` identifies genuine language-independent titles. Standalone Lessons must cover every Course locale but may support more; matching checks this independently.

**Downstream Lesson Workflow:** Methodologist proposals in [Match Course TOC Lessons](./match-course-toc-lessons.skill.md) must contain the same explicit `assessmentPlan` as independently authored Lesson Briefs. After approval, [Create Lesson Content](../lesson-workflow/create-lesson-content.skill.md) writes `content.yaml`, not a free-form `content.md`.
