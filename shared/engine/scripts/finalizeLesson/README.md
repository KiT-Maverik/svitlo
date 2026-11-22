# Finalize Lesson — Stage 6 source handoff

> **Legacy YAML-only operation:** The local `finalizeLesson` YAML preflight/handoff CLI remains for existing approved Lesson PRs, and trusted `/lesson materialize` still handles their source conversion. The **trusted `/lesson finalize` command is currently disabled** by `scripts/ci/lessonMaterialization/lesson-gate.mjs`; documentation of its safety design does not authorize invocation. New #782 typed Lesson Stages 1/2 need a separately verified #775 adapter, collision-safe Stage 6 transition, source-SHA checks and full resource validation. Do not feed staged `index.ts` source to this YAML entrypoint or remove the existing trusted command before its replacement works.

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

Incomplete Quiz/Flashcards Sections are **retained in build-facing TS**, with all mandatory Config fields present and reserved `feedc0de-` UUIDv8 selection placeholders instead of unreviewed bank entities. Root, Section and field-level `TODO (BLOCKER)` comments remain active; the original accepted Section source is separately preserved without data loss in temporary `questions.yaml`/`flashcards.yaml` `sectionDrafts` specialist handoffs. Production publishing rejects the reserved IDs and draft labels even if TODOs are removed. No fabricated Question or Flashcard bank record is emitted. Other unfinished media/Scene drafts may still have TypeScript diagnostics and source blockers. `production-handoff.json` stores production guidance, not a second canonical Lesson Config.

## Trusted GitHub flow

Prefer `/lesson materialize` on the existing Draft Lesson PR after Stages 1–5 are accepted. The trusted resolve/analyze/publish workflow pins the original source blob, commits new files without overwriting them and retains identical YAML. No repeat/no-op integration is supported. The planned `/lesson finalize` path is **currently fail-closed/disabled by the trusted Lesson gate**. If it is separately implemented and authorized in the future, it must prove full source fidelity against committed output before permitting deletion of **only** an unchanged `lesson.yaml`. No GitHub comment currently performs that retirement. The independent `questions.yaml` and `flashcards.yaml`, generated TS, Markdown, specifications, handoff, bank sources, media and authored Scene implementations are never removed by it. Pinned HEAD/blob, actor authorization, symlink protection and non-force Git ref update remain mandatory. An edited, divergent, partial or uncommitted source fails closed; it must be reconciled explicitly rather than auto-regenerated.

Neither source handoff nor YAML retirement marks Stage 6 complete, clears unresolved blockers or proves independently reviewed/published assessment banks. Completion and final release still require actual Section/Question/Flashcard integration, appropriate media/Scene work, required locales, typed Props and production asset/manifest validation.

## Scoped checks

```sh
node --test shared/engine/scripts/finalizeLesson/finalizeLesson.spec.mjs
node --test shared/engine/scripts/lessonBuilder/lessonBuilder.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-materialization.spec.mjs
```
