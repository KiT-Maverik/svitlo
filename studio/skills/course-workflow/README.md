# Course workflow

Independent course-authoring skills; explicit artifact prerequisites, **no mandatory full pipeline**.

- [Create Course Methodology](./create-course-methodology.skill.md) — Methodologist; writes durable Course `methodology.md`.
- [Create Course Table of Contents](./create-course-toc.skill.md) — Methodologist; requires `methodology.md` and Skill Taxonomy; creates ordered skill-based `toc.yaml`.
- [Match Course TOC Lessons](./match-course-toc-lessons.skill.md) — Methodologist; requires existing `methodology.md` and `toc.yaml`, discovers candidates with [Lessons by Skill ID](../../../scripts/generate-lessons-by-skill.mjs), adds `lessonId` or creates an independent Lesson Methodology draft.

The editorial TOC format is defined by [course-toc.schema.json](./course-toc.schema.json). Narrative, UX and production are independent optional operations.
