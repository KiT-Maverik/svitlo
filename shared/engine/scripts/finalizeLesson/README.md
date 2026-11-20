# Finalize Lesson — Stage 6 source handoff

This command is the trusted, explicit preflight/orchestration boundary for the canonical Lesson `lesson.yaml`. It validates the accepted technical source and creates the existing Lesson Builder output; it is not a bank author, Props publisher, translator or reviewer.

## Authoring decision contract

The root optional `production.quizRequired` and `production.flashcardsRequired` booleans describe whether the eventual Lesson needs at least one Quiz/Flashcards Section. A missing or false flag creates no Section obligation. The Methodologist explains reasoning in `production.methodology`; no `lesson-assessment-sections` fenced inventory, Section intent key or integration-status string is required. A substantive Question Bank may be created even with no in-Lesson Quiz.

`config.params.quizRequiredForCompletion` remains the actual Lesson Engine completion-contract property. Its authored value is never rewritten by this finalizer. Current Engine validation checks an enabled Quiz Section when the Lesson is built; future frontend learner-completion logic may strengthen the runtime behavior independently.

## CLI

```sh
node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs preflight --source content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml
node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs preflight-draft --source content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml
node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs handoff --source content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml
node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs finalize --source content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml --preserve-config
```

Strict `preflight` applies the complete Engine-derived YAML schema and rejects outstanding assessment Section obligations. `preflight-draft` is isolated to authored incomplete assessments and relaxes only their draft source parameters while retaining all other schema, UUID, ordering, source-locale and collection checks. `handoff` invokes the existing create-only Lesson Builder and always preserves `lesson.yaml`. Strict first-time `finalize --preserve-config` is likewise source-preserving; strict local `finalize` without that flag retains the legacy safe-delete behavior **only for a first-time full and verified transfer**, never on an existing Lesson tree. Do not invoke it on an edited generated Lesson.

Incomplete Quiz/Flashcards Sections are omitted from build-facing TS, preserved without data loss in temporary independently-owned bank `questions.yaml` or `flashcards.yaml` `sectionDrafts`, and represented by root `TODO (BLOCKER)` comments. No incomplete Section Configurator or fabricated bank record is emitted. Other unfinished media/Scene drafts may still have TypeScript diagnostics and source blockers. `production-handoff.json` stores production guidance, not a second canonical Lesson Config.

## Trusted GitHub flow

Prefer `/lesson materialize` on the existing Draft Lesson PR after Stages 1–5 are accepted. The trusted resolve/analyze/publish workflow pins the original source blob, commits new files without overwriting them and retains identical YAML. No repeat/no-op integration is supported. An explicit `/lesson finalize` on the same PR performs an **entirely separate read-only source-fidelity and committed-output check**, then publishes exactly one allowlisted deletion: the unchanged `lesson.yaml`. The independent `questions.yaml` and `flashcards.yaml`, generated TS, Markdown, specifications, handoff, bank sources, media and authored Scene implementations are never removed by it. Pinned HEAD/blob, actor authorization, symlink protection and non-force Git ref update remain mandatory. An edited, divergent, partial or uncommitted source fails closed; it must be reconciled explicitly rather than auto-regenerated.

Neither source handoff nor YAML retirement marks Stage 6 complete, clears unresolved blockers or proves independently reviewed/published assessment banks. Completion and final release still require actual Section/Question/Flashcard integration, appropriate media/Scene work, required locales, typed Props and production asset/manifest validation.

## Scoped checks

```sh
node --test shared/engine/scripts/finalizeLesson/finalizeLesson.spec.mjs
node --test shared/engine/scripts/lessonBuilder/lessonBuilder.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-materialization.spec.mjs
```
