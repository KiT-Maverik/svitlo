# Lesson Workflow

Each task is an **independent specialist skill**. The Lesson UUID directory is stable and Course-neutral; editors explicitly approve each role-owned artifact before downstream work.

1. [Create Lesson Brief](./create-lesson-brief.skill.md) — **Methodologist Persona**. Creates `methodology.md` with pedagogical scope, verified Skill links, separate `documentLanguage` vs `supportedLanguages`, and an **explicit `assessmentPlan`**. This can declare zero, one or multiple pedagogically necessary Quizzes, each with verified Skill IDs and typed `AssessmentMethodKey` values. See [Methodology frontmatter schema](./lesson-methodology-frontmatter.schema.json). The [Course Lesson matcher](../course-workflow/match-course-toc-lessons.skill.md) reuses these same requirements when drafting missing Lessons.
2. [Create Lesson Content](./create-lesson-content.skill.md) — **Educational Screenwriter Persona**, after Methodology approval. Creates **`content.yaml`** — ordered, machine-readable Section/ContentBlock/Quiz plan with source-language learner copy, accessibility and implementation dependencies. See [Lesson Content schema](./lesson-content.schema.json). Optional `scenes/*.scene-spec.md` documents provide the independent source for bespoke Scene implementation.
3. **Subsequent work, not automatically launched:** specialist Question/Quiz assessment authoring, [Design Scene](../design-scene.skill.md), Lesson TypeScript implementation, media production, translation and publishing. No `Implement Lesson` skill is currently claimed here.

## Language and generation boundary

The canonical Screenwriter plan has **one** `documentLanguage`, included in its planned `supportedLanguages`. A **future** YAML-to-entity generator may scaffold file/folder structure and write learner-facing source content **only in `documentLanguage`**, using the actual Lesson/Section/ContentBlock creator API where available. It must not invent values for missing locales or bypass TypeScript. Missing-locale TS errors during intermediate authoring are expected signals to the translator; publishing waits until actual supported-language coverage and normal checks pass.

Existing `content.md` files are legacy editorial materials. Do not duplicate competing canonical content sources or migrate them without explicit approval. `methodologist-brief.md` is the legacy Methodology filename and is retained in place when revising an existing Lesson.
