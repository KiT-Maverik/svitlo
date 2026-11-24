# Engine scripts: mandatory agent handoff

Before editing scripts, read root AGENTS.md, README.md, the Studio GitHub/CI rules, task Persona/Skill, architecture, this file and the named script's README, leading entrypoint JSDoc and actual tests.

## Typed production is the canonical editorial format

Course, Lesson, Question Bank and Flashcard Bank each use one evolving Stage-specific TypeScript `draft.ts` object, with `config` and `production` kept distinct. The Course Stage 5, Lesson Stage 6.1 and Bank Stage 5 trusted source-materialization pipelines are in `shared/engine/generators/materializers/` and `scripts/ci/{courseMaterialization,lessonMaterialization,bankMaterialization}/`. Preserve historical user-authored sources and their provenance until explicitly authorized for migration.

1. Inspect concrete authoring/configurator contracts and current stage types. Editorial `production` metadata does not enter final Config/Props.
2. Keep one independent materializer per concrete Configurator kind. Parent source orchestration determines child placement and ordering; it does not duplicate the child's renderer.
3. Preserve exact independently reviewed source bytes, Git blob/commit SHA, identity, provenance, safe paths and source imports. Trusted PR commands run **only default-branch code**; candidate TypeScript is treated as inert data. Prevent side effects, symlink/traversal, stale review, branch races, inconsistent manifests and overwrites.
4. New Course Stage 5 yields minimal reviewed Lesson Stage 1 `draft.ts` handoff, not a finished Lesson or automatically started Lesson PR. Lesson Stage 6.1 materializes reviewed Stage 2 Lesson source, but Stages 6.2/6.3 own actual resources/Scenes and Stages 7–10 own independent banks/localization.
5. Question/Flashcard Banks retain independent seven-stage PRs and source-SHA-pinned transitions. A required Quiz/Flashcards Section needs a real enabled Section. References to unreviewed bank IDs, Nil media UUIDs, TODO(asset), incomplete Scenes and untranslated placeholders are **publication blockers**, never grounds to fabricate completion.
6. `generateLessonProps`, `generateCourseProps` and `generateAssessmentResources` publish **completed** independently authored Configs; their output is not a stage materializer. Do not add filesystem writers to `define*` Configurators or import build-only tools from `@svitlo/engine/runtime`.

## Script authoring and verification

Every permanent script lives in its owning named directory with README, entrypoint JSDoc and adjacent tests. Use the package's ignored `temp/` for one-off transformations. Before changes inspect npm callers, nearby tests, media/Scene and source-publication contracts. Respect deterministic UUIDs, slugged `items/order`, exact language scope, path ownership and the read-only analyze / privileged publish boundary.

Incomplete drafts must remain valid TypeScript against their current Stage contract; unresolved resources or review evidence must remain visible release blockers. A successful scaffold or a passing `tsc` does not establish editorial approval, bank completeness, asset readiness, translation or publishing eligibility. Do not silence defects with `as any`, `@ts-ignore`, invented resource IDs, fake translations or implicit defaults.

For each changed script, run focused positive/negative tests, Engine package build/typecheck as applicable, and the affected trusted-command/Props regression suite. Production Quality is a separate full-suite check; never claim it passed before its actual current-HEAD run completes. Check default-branch rollout and actual GitHub invocation separately.
