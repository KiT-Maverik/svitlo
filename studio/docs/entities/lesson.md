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
- `flashcards/flashcards.yaml`: Flashcard Learning Architect's source-language recall bank, written **only after** approved Questions. Includes typed editorial ContentBlocks, resolvable Question field references, an explicit typed `flags` array (`list` count, `warning`, `acronym`, and `custom` value/color/optional icon), and a single canonical graph of card-to-card relations using the nine `FlashcardRelationType` keys. The Engine materializes approved YAML edges on both cards using the relationship model in [Flashcard schemas](../../../shared/engine/configurators/flashcards/defineFlashcard/defineFlashcard.schemas.ts), with stable partner IDs. The existing UI Kit Flashcard now renders typed flags automatically. Locale-specific acronym wording still requires independent translation; UI relationship navigation and scheduler semantics remain separate capabilities.
- Typed `*.data.ts` configuration and published resources are owned by implementation/build workflows, not by either editorial document.

**Observed contract:** [Engine Lesson Config and Props](../../../shared/engine/configurators/lessons/defineLesson/defineLesson.schemas.ts) model a Course-neutral Lesson with stable identity, supported languages, ordered Sections, Flashcards and a Question Bank. Published Props contain resolved learner-facing data. Folder addressing follows the permanent UUID, not the slug. Check renderers separately for actual UI support.

Related: [Lesson Content](./lesson-content.md), [Section](./section.md), [Program](./program.md), [Skill](./skill.md).

## Typed authoring and publication boundary

Use [`defineLesson`](../../../shared/engine/configurators/lessons/defineLesson/defineLesson.ts) from `@svitlo/engine/build`. It composes the named, ordered `section` collection, `flashcards` and a Question Bank grouped by type, and declares supported `params.languages`. Each nested configurator validates its own authored shape.

`lesson.build.props({ languages })` produces `base` and sparse `locale` Props fragments. `lesson.build.overrides(patch, { languages })` prepares Course-specific patches without mutating the Lesson. Generators, not configurators, write files.

At runtime, [`assembleLessonProps`](../../../shared/engine/assemblers/assembleLessonProps/assembleLessonProps.ts) merges the published base and selected locale with optional Course overrides and validates the complete Props.

**Editorial localization:** `content.yaml.documentLanguage` identifies the only locale populated by the initial YAML-to-entity generator; `supportedLanguages` sets the intended Lesson language tuple. Remaining locales require separate translation, and interim TypeScript errors must stay visible until translations exist. Initial generation is not proof of publication readiness.

## YAML TypeScript draft authoring handoff

The Screenwriter-owned `content.yaml` is an editorial plan; the independent `lesson.config.yaml` technical projection carries the authored Engine `defineLesson` Config tree, plus a removable source-language `documentLanguage` provenance field. The Engine YAML draft scaffolder converts it to incomplete named `*.data.ts` source using `@svitlo/engine/build` factories without validating, translating, typechecking or publishing. See [Config-shaped YAML handoff](../architecture/yaml-config-scaffolding.md). The published Props pipeline remains separate.
