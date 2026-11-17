# Lesson Workflow

**Start at [Create Lesson Flow](./create-lesson-flow.skill.md)** for all new or resumed standalone/Course-originated Lessons. One Draft Lesson PR tracks eight stages and independent review SHAs; one temporary `lesson.yaml` holds ordered `config` + nested `production` through Stages 1–5. Historical Lesson Production Issues remain evidence but are no longer mandatory for new production. Questions/Flashcards are separate child workflows; **Questions must be completed before Flashcards unless Questions is explicitly Not Applicable with Methodologist rationale**. Translation Production Issues keep their own rules.

Specialist operations:

1. [Create Lesson Brief](./create-lesson-brief.skill.md) — Methodologist Stage 1; reuse adequate existing Course/standalone methodology, create missing standalone methodology.
2. [Create Lesson Content](./create-lesson-content.skill.md) — Screenwriter Stage 2; full source-language learning Content in the same `lesson.yaml`.
3. [Review Lesson Content](./review-lesson-content.skill.md) — independent Content Review Stage 3.
4. [Review Lesson Experience](./review-lesson-experience.skill.md) — independent Experience Review Stage 4.
5. [Review Lesson Methodology](./review-lesson-methodology.skill.md) — independent Methodology Compliance Stage 5.
6. [Implement Scene](./implement-scene.skill.md) — Stage 6 specialist; [Finalize Lesson](../../../shared/engine/scripts/finalizeLesson/README.md) validates, scaffolds and safely deletes YAML only after verified transfer.
7. [Create Lesson Questions](./create-lesson-questions.skill.md) (separate seven-stage [Create Questions Flow](./create-questions-flow.skill.md), [PR #647](https://github.com/KiT-Maverik/svitlo/pull/647)) and [Create Lesson Flashcards](./create-lesson-flashcards.skill.md) (separate seven-stage [PR #646](https://github.com/KiT-Maverik/svitlo/pull/646)) — child Draft PRs with strict Questions-first prerequisite, not main Lesson stages.
8. [Manage Lesson Production](./manage-lesson-production.skill.md) — legacy Issue evidence recovery/migration only.

Flashcards Flow includes an independent **Flashcards Section Design** stage: the Section selects a small, review-justified ordered UUID subset; the standalone bank is not embedded into Lesson Props. See [Create Flashcards Flow](./create-flashcards-flow.skill.md) for the complete seven-stage procedure and Questions-first gate.

Old `lesson-content.schema.json` and `lesson-methodology-frontmatter.schema.json` are read-only **legacy editorial input** contracts, not new Lesson authoring requirements. At Stage 6 only, validate completed `lesson.yaml` using the Engine-derived `lesson.scaffold.schema.json` + `production.schema.json`; draft stages may be structurally incomplete without artificial `draft` or `approved` flags. No new `content.yaml` or fabricated locales.
