# Course workflow

This directory contains independent course-authoring skills. Each skill owns its own inputs and output artifacts; listing a skill here does **not** require running other skills or imply a mandatory end-to-end pipeline.

- [Create Course Methodology](./create-course-methodology.skill.md) — Methodologist Persona; produces the durable `methodology.md` for a single Course. Does not create a TOC or lessons.
- [Create Course Table of Contents](./create-course-toc.skill.md) — Methodologist Persona; requires an existing Course `methodology.md` and verified taxonomy, produces the **skill-based editorial `toc.yaml`**. Does not select implemented Lessons or create Episodes. The machine-readable format is specified by [course-toc.schema.json](./course-toc.schema.json).

Future Lesson matching, narrative planning and production are separate optional operations, not implicit parts of either skill.
