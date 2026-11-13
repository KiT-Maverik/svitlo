# Lesson

**Entity category:** self-contained, Course-neutral educational material. Can be standalone, reused across Courses, or authored under one Course without acquiring narrative responsibilities.

A **Lesson** independently teaches **one or more approved Skills**. It must make sense without a Program, Curriculum, mascot, quest, reward system, external plot or special learner history. The Lesson owns the actual instructional material and its purposeful order of learning experiences; a Program can place it into a larger journey but does not own its pedagogical content.

## PEDAGOGICAL RESPONSIBILITIES

- Present accurate content through appropriate explanations, demonstrations, interactions, guided practice and reflection. No fixed Section count, fixed `theory → practice → quiz` recipe or one-Skill-per-Lesson rule.
- Link each Lesson's intended learning to the Methodologist's approved outcomes and Skill definitions; teaching, completing a Lesson, marking a checkpoint and demonstrating mastery are **different** concepts.
- A Lesson can have an **instructional sequence** and staged revelation. It has **no Program narrative** (characters, missions, external story, points/rewards or quest progression). See [Program](./program.md).
- Lesson content is assembled from ordered [Sections](./section.md) with typed resources. Its educational design is documented in the separate [Lesson Content](./lesson-content.md), authored by the Educational Screenwriter.

## EDITORIAL ARTIFACTS AND IMPLEMENTATION

Reusable/standalone Reusable/standalone Lesson files live under `<PackageRoot>/data/lessons/<last-hex-digit>/<uuid>/`. Course-owned (but still pedagogically Course-neutral) Lessons may be authored beneath their owning Course; see [Episode](./episode.md) for Course-owned narrative activities. Course-owned (but still pedagogically Course-neutral) Lessons may be authored beneath their owning Course; see [Episode](./episode.md) for Course-owned narrative activities. The [shared UUID addressing rule](../architecture/entity-uuid-addressing.md) determines this path from the permanent Lesson ID. Keep the human-readable camelCase slug in Lesson metadata, not in the directory name. Existing folders do not move when a slug changes.

- `methodology.md` (legacy `methodologist-brief.md`): approved _what/why/for whom_, prerequisite, Skill scope and the Methodologist's explicit `assessmentPlan` (no Quiz, or one/more Quizzes with required `AssessmentMethodKey` values); an editorial-only source **not included in runtime configuration or client bundles**. Its `Target Skills` contains one direct relative Markdown link per Skill **to the canonical Skill `*.data.ts` path under `data/skills/`**, with the full source filename (including extension) as the link label. New Briefs **target `<PackageRoot>/data/skills/`** for Skill `*.data.ts` references. Validate every link to an existing source file. If that package has not migrated, report the gap as a blocker rather than writing broken links or pointing to `src/`.
- `content.yaml`: Screenwriter-owned **machine-readable** _how to teach_ plan with ordered Sections/ContentBlocks, learner-facing text in the declared `documentLanguage` and explicit assessment/Scene/media dependencies. Legacy `content.md` requires explicit migration; it is not a parallel canonical artifact.
- `scenes/`: separate Scene specifications **only when needed**, later consumed by the Scene implementation workflow.
- `questions/questions.yaml`: Assessment Architect's approved source-language Question bank (specialist workflow, subject to separate editorial approval). It is the mandatory upstream input for Flashcard authoring; its future generator supplies canonical typed Question objects.
- `flashcards/flashcards.yaml`: Flashcard Learning Architect's source-language recall bank, written **only after** approved Questions. Includes typed editorial ContentBlocks, resolvable Question field references, an explicit typed `flags` array (`list` count, `warning`, `acronym`, and `custom` value/color/optional icon), and a single canonical graph of card-to-card relations using the nine `FlashcardRelationType` keys. The Engine materializes each YAML edge **on both cards** as typed `FlashcardRelation[]`, with actual partner card IDs; this relation metadata is part of the `Flashcard<'data'>` and response contracts. The existing UI Kit Flashcard now renders typed flags automatically. Locale-specific acronym wording still requires independent translation; UI relationship navigation and scheduler semantics remain separate capabilities.
- Typed `*.data.ts` configuration and published resources are owned by implementation/build workflows, not by either editorial document.

**Current technical source:** Engine `lesson_Config_Schema` at [defineLesson](../../../shared/engine/configurators/lessons/defineLesson/defineLesson.schemas.ts) owns Lesson identity, intended `params.languages`, `skills`, source-language `locale.title`, `section.items/order`, `questions` and `flashcards.items/order`. The bucket is derived from immutable UUID, not a folder slug. [Engine YAML Config authoring guidance](../architecture/yaml-config-scaffolding.md) is separate from the Methodologist/Screenwriter/Assessment editorial plans. Code presence does not establish approval or publication readiness.

Related: [Lesson Content](./lesson-content.md), [Section](./section.md), [Program](./program.md), [Skill](./skill.md).

## Current typed Config and publication boundary

Current authored Lesson sources use `defineLesson` from `@svitlo/engine/build` with nested typed `define*` configurators. `lesson_Config_Schema` accepts a source-language-only localized Config tree with Sections as `{ items, order }`, Questions grouped by type and optional Flashcards as `{ items, order }`; it is **not** the old positional `createLesson<SupportedLanguages>()` creator contract. The YAML → TypeScript scaffolder emits an **unfinished draft** based on these Configs, not Lesson Props or published resources.

`documentLanguage` belongs to the editorial sources and provenance; `params.languages` holds the intended coverage while initial `locale` dictionaries can contain only the approved authoring language. Do not fabricate translations for missing locales. The subsequent Coding Agent must complete required fields, references, typechecks and media/a11y work; editorial approvals and `generateLessonProps`/publication are independent later steps. See [Lesson YAML Builder](../architecture/lesson-yaml-builder.md) and [Config-shaped handoff](../architecture/yaml-config-scaffolding.md).

Related: [Lesson Content](./lesson-content.md), [Section](./section.md), [Course](./course.md).
