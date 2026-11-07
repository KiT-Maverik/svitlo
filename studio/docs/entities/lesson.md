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

- `methodology.md` (legacy `methodologist-brief.md`): approved _what/why/for whom_, prerequisite and Skill scope; an editorial-only source **not included in runtime configuration or client bundles**. Its `Target Skills` contains one direct relative Markdown link per Skill **to the canonical Skill `*.data.ts` path under `data/skills/`**, with the full source filename (including extension) as the link label. New Briefs **target `<PackageRoot>/data/skills/`** for Skill `*.data.ts` references. Validate every link to an existing source file. If that package has not migrated, report the gap as a blocker rather than writing broken links or pointing to `src/`.
- `content.md`: Screenwriter-owned _how to teach_, ordered Section/block plan, learner-facing content and interaction specifications; a **separate editorial document**, not the runtime config.
- `scenes/`: separate Scene specifications **only when needed**, later consumed by the Scene implementation workflow.
- Typed `*.data.ts` configuration and published resources are owned by implementation/build workflows, not by either editorial document.

**Observed contract:** [`Lesson<'data'>`](../../../shared/contracts/src/types/content/lesson.types.ts) identifies a Lesson with `id`, `slug`, `title`, `parameters` and ordered `sections`; the bucket is derived by Engine and is not authored. The contract is **not a complete editorial Lesson definition**; code presence does not establish editorial approval. Do not infer that the folder slug is the runtime ID. Read the current renderer and catalog types before implementation.

Related: [Lesson Content](./lesson-content.md), [Section](./section.md), [Program](./program.md), [Skill](./skill.md).

## Typed creator and publication boundary

The canonical builder is `createLesson<SupportedLanguages>()(data)` from
`@svitlo/engine/builders`. It accepts nested `createSection` creators or
ordinary typed Section data and returns a build-time creator. Authors export the
result of `creator.getData()` in their named `*.data.ts` module for reuse
inside Course authoring; Course/Chapter/Module creators also accept Lesson
creators directly. `createLessonOverrides(lesson.getData())` retains the
original Lesson identity and serializes only the Course-local changes.

`creator.toResource({ language })` projects the existing sparse
`config` / `flashcards` / `questions` JSON documents, and
`creator.getPublicationItems()` exposes the complete path-addressed file set.
`creator.toResponse({ language })` assembles a localized preview with the
same Engine merge and Lesson Response logic as runtime. The filesystem generator
owns discovery, loading and writing; the creator and specialized Engine helpers
own entity-level normalization, localization and resource preparation.
Neither creators nor authored TypeScript objects are part of runtime JSON.

See [Engine creator API](../../../shared/engine/README.md) and
[Section](./section.md) for composition examples.
