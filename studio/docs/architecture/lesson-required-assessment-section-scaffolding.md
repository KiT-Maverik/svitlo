# Required Quiz and Flashcards Section source handoff

**Status:** PR #706 introduced the historical mandatory `lesson-assessment-sections` fence. PR #712 supersedes that mechanism. This document records the intended source-handoff contract; actual implementation and tests remain authoritative.

## Methodologist decisions

The root `lesson.yaml` authoring-only `production.quizRequired` and `production.flashcardsRequired` booleans indicate whether the completed Lesson eventually needs at least one Section of that kind. Omitted and `false` mean no such requirement. The Methodologist justifies these choices in normal `production.methodology` prose; no separate machine-readable inventory is required. Multiple Quiz or Flashcards Sections may be planned, each with its own canonical UUID and ordered placement. A separate Question Bank need not imply a local Quiz Section; bank ownership and Section requirements are distinct.

## Canonical source and one-time materialization

The **ten-stage** Lesson flow retains Stages 1–5 editorial, Stage 6.1 source materialization, Stage 6.2–6.4 accessibility/offline/validation, Stages 7–8 independent banks, and Stages 9–10 translation. Physical Scenes/media are separate resource blockers. Stages 1–5 retain accepted Section `config` and `production` nodes in one immutable-source `lesson.yaml`, including any unfinished assessment Sections. Stage 6's trusted `/lesson materialize` builds a source-only, TypeScript-valid Lesson by omitting unfinished Quiz/Flashcards Sections from the generated runtime-facing Section modules and collection. The original YAML remains byte-identical. The complete deferred Section Config, identity, authored copy, nested content and production notes are transferred into the `sectionDrafts: { items, order }` field of a temporary `questions.yaml` or `flashcards.yaml` bank draft. These fields are non-published handoffs for the independent bank flows, not invented Questions/Flashcards.

A requirement not yet satisfied produces a **real** `// TODO (BLOCKER):` immediately above the root `section` field in generated Lesson `index.ts`. Neither a missing Section nor an unfinished bank silently suppresses the blocker. A complete assessment Section stays in the normal Section collection; its resource verification remains the independent bank publication responsibility. Never invent Question/Flashcard UUIDs, disable validators, weaken Engine Section schemas or secretly change `config.params.quizRequiredForCompletion`. This property deliberately continues to describe the eventual completed-Lesson Quiz gate, even where its runtime completion behavior will be implemented separately.

## Finalize and safety

`/lesson materialize` is create-only and does not support repeat/no-op regeneration. On failure, review and explicitly remove only confirmed generated outputs before re-running; no automatic overwrite. `/lesson finalize` is a separately authorized operation that verifies the pinned canonical YAML, previously committed deterministic generated files and handoffs, then deletes **only unchanged `lesson.yaml`**. It does not delete bank YAML, edited TS, Scenes, media, review or handoff files. Source drift, uncommitted files, incomplete transfer and concurrent branch updates fail closed. Finalize is not Stage 6 completion or production publication.

## Readiness

Draft Section TODOs block Ready/merge, while fully published Lessons require independently reviewed and published Question/Flashcard resources with correct UUID, language and ownership resolution in the normal production pipeline. Stage 6 is four-step source preparation (6.1 materialization, 6.2 accessibility, 6.3 offline, 6.4 source validation). It may finish before independent Stage 7/8 bank production or physical Scene/media delivery; those remain separate final Ready/merge blockers. Preserve Sections' authored identity/order and approved copy through all flows.
