# Lesson Workflow

Each task is an **independent specialist skill**. The Lesson UUID directory is stable and Course-neutral; editors explicitly approve each role-owned artifact before downstream work. For an authorized new Lesson production scope, **locate or initialize one standard GitHub Issue for the entire frozen Lesson UUID set** before opening specialist PRs; reuse it through all stages and across chats. Do not create an Issue per Lesson or step.

1. [Create Lesson Brief](./create-lesson-brief.skill.md) — **Methodologist Persona**. Creates `methodology.md` with pedagogical scope, verified Skill links, separate `documentLanguage` vs `supportedLanguages`, and an **explicit `assessmentPlan`**. This can declare zero, one or multiple pedagogically necessary Quizzes, each with verified Skill IDs and typed `AssessmentMethodKey` values. See [Methodology frontmatter schema](./lesson-methodology-frontmatter.schema.json). The [Course Lesson matcher](../course-workflow/match-course-toc-lessons.skill.md) reuses these same requirements when drafting missing Lessons.
2. [Create Lesson Content](./create-lesson-content.skill.md) — **Educational Screenwriter Persona**, after Methodology approval. Creates **`content.yaml`** — ordered, machine-readable Section/ContentBlock/Quiz plan with source-language learner copy, accessibility and implementation dependencies. See [Lesson Content schema](./lesson-content.schema.json). Optional `scenes/*.scene-spec.md` documents provide the independent source for bespoke Scene implementation.
3. [Review Lesson Experience](./review-lesson-experience.skill.md) — independent [Learning Experience Expert](../../personas/learning-experience-expert.persona.md). Checks educational effectiveness, interaction appropriateness, accessibility and production dependencies; writes `experience-review.md` tied to a `content.yaml` source revision.
4. [Review Lesson Methodology](./review-lesson-methodology.skill.md) — independent Methodologist. Confirms subject correctness, Skill/outcome/prerequisite coverage and Quiz/Assessment Method alignment; writes `methodology-review.md` tied to the **current** source revision.
5. [Manage Lesson Production](./manage-lesson-production.skill.md) — GitHub coordinator for **one or multiple Lessons in one fixed-scope Issue**, using [the Issue Form](../../../.github/ISSUE_TEMPLATE/lesson-production.yml), per-Lesson status rows and cross-chat PR handoffs. An authorized specialist may process all ready Lessons in a batch; do not ask for "continue" after every Lesson.

6. [Implement Scene](./implement-scene.skill.md) — **Coding Agent Persona**, after approved Scene specs and separate scaffold generation. Implements Scene behavior, **source-language-only** typed text, co-located tests, lazy registry integration and code TODOs for unresolved questions/assets. No translations and no YAML→Lesson generator.
7. **Separate stages:** a deterministic YAML→typed Lesson/Section/ContentBlock builder (scripted tooling), Quiz/Question design, media production, translation and publication. The Scene Coding Agent must not replace the builder.

## Language and generation boundary

The canonical Screenwriter plan has **one** `documentLanguage`, included in its planned `supportedLanguages`. A **future** YAML-to-entity generator may scaffold file/folder structure and write learner-facing source content **only in `documentLanguage`**, using the actual Lesson/Section/ContentBlock creator API where available. It must not invent values for missing locales or bypass TypeScript. Missing-locale TS errors during intermediate authoring are expected signals to the translator; publishing waits until actual supported-language coverage and normal checks pass.

Existing `content.md` files are legacy editorial materials. Do not duplicate competing canonical content sources or migrate them without explicit approval. `methodologist-brief.md` is the legacy Methodology filename and is retained in place when revising an existing Lesson.

## Approval and group-production handoffs

Review files are independent, source-revision-specific recommendations: a reviewer `pass` does not automatically give editorial approval. The Screenwriter revises `content.yaml` for accepted changes; affected reviews must be repeated against the new source. [Lesson Production lifecycle](../../docs/architecture/lesson-production-workflow.md) defines the per-Lesson approval and status model, while the GitHub Issue holds the batch's persistent cross-agent coordination. The Issue can contain many Lessons; do not create a new Issue or PR for every short step by default.

## Code-visible unfinished Scene work

Source `TODO(scene/asset/i18n/a11y/test)` comments remain beside real unresolved implementation paths and link the Lesson Production Issue. Remove each TODO in the fix that genuinely resolves and verifies it; do not drop unresolved blockers to claim completion. See [Implement Scene](./implement-scene.skill.md).
