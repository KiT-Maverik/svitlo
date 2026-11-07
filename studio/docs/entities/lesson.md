# Lesson

**Entity category:** standalone, Program-neutral educational material.

A **Lesson** independently teaches **one or more approved Skills**. It must make sense without a Program, Curriculum, mascot, quest, reward system, external plot or special learner history. The Lesson owns the actual instructional material and its purposeful order of learning experiences; a Program can place it into a larger journey but does not own its pedagogical content.

## PEDAGOGICAL RESPONSIBILITIES

- Present accurate content through appropriate explanations, demonstrations, interactions, guided practice and reflection. No fixed Section count, fixed `theory → practice → quiz` recipe or one-Skill-per-Lesson rule.
- Link each Lesson's intended learning to the Methodologist's approved outcomes and Skill definitions; teaching, completing a Lesson, marking a checkpoint and demonstrating mastery are **different** concepts.
- A Lesson can have an **instructional sequence** and staged revelation. It has **no Program narrative** (characters, missions, external story, points/rewards or quest progression). See [Program](./program.md).
- Lesson content is assembled from ordered [Sections](./section.md) with typed resources. Its educational design is documented in the separate [Lesson Content](./lesson-content.md), authored by the Educational Screenwriter.

## EDITORIAL ARTIFACTS AND IMPLEMENTATION

Lesson files live under `<PackageRoot>/data/lessons/<last-hex-digit>/<uuid>/`. The [shared UUID addressing rule](../architecture/entity-uuid-addressing.md) determines this path from the permanent Lesson ID. Keep the human-readable camelCase slug in Lesson metadata, not in the directory name. Existing folders do not move when a slug changes.

- `methodology.md` (legacy `methodologist-brief.md`): approved _what/why/for whom_, prerequisite, Skill scope and the Methodologist's explicit `assessmentPlan` (no Quiz, or one/more Quizzes with required `AssessmentMethodKey` values); an editorial-only source **not included in runtime configuration or client bundles**. Its `Target Skills` contains one direct relative Markdown link per Skill **to the canonical Skill `*.data.ts` path under `data/skills/`**, with the full source filename (including extension) as the link label. New Briefs **target `<PackageRoot>/data/skills/`** for Skill `*.data.ts` references. Validate every link to an existing source file. If that package has not migrated, report the gap as a blocker rather than writing broken links or pointing to `src/`.
- `content.yaml`: Screenwriter-owned **machine-readable** _how to teach_ plan with ordered Sections/ContentBlocks, learner-facing text in the declared `documentLanguage` and explicit assessment/Scene/media dependencies. Legacy `content.md` requires explicit migration; it is not a parallel canonical artifact.
- `scenes/`: separate Scene specifications **only when needed**, later consumed by the Scene implementation workflow.
- Typed `*.data.ts` configuration and published resources are owned by implementation/build workflows, not by either editorial document.

**Observed contract:** [`Lesson<'data'>`](../../../shared/contracts/src/types/content/lesson.types.ts) identifies a Lesson with `id`, `slug`, `title`, `parameters` and ordered `sections`; the bucket is derived by Engine and is not authored. The contract is **not a complete editorial Lesson definition**; code presence does not establish editorial approval. Do not infer that the folder slug is the runtime ID. Read the current renderer and catalog types before implementation.

Related: [Lesson Content](./lesson-content.md), [Section](./section.md), [Program](./program.md), [Skill](./skill.md).

**Editorial localization:** `content.yaml.documentLanguage` identifies the only locale populated by the initial YAML-to-entity generator; `supportedLanguages` sets the intended Lesson language tuple. Remaining locales require separate translation, and interim TypeScript errors must stay visible until translations exist. Initial generation is not proof of publication readiness.
