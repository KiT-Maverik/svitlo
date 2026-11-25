# Engine build-time scripts

Engine-owned workflows have named directories, adjacent tests and immutable source contracts. Read [script instructions](./AGENTS.md) and root/studio guidance before changes.

## Typed source materialization

The canonical Course/Episode/Lesson/Question Bank/Flashcard Bank/Assessment editorial source is a progressively typed, inert, default-exported `draft.ts` configuration object in the #857 target architecture; materialization atomically creates `index.ts` and consumes the reviewed draft. The concrete source emitters live in `../generators/materializers/`; the trusted PR-command gates and transactions are in `../../../scripts/ci/{courseMaterialization,episodeMaterialization,lessonMaterialization,bankMaterialization,assessmentMaterialization}/`, with shared trusted static reading and transaction primitives in `../../../scripts/ci/directMaterialization/` (target contract; current deployed runner may differ). They produce authored TS/Markdown source trees, **not** runtime Props. Real default-branch deployment and source integrity checks are required before live use. None of the six entity materializers parses editorial PR records. Independent reviews and stage tracking remain editorial; the trusted commands enforce authorization and pinned typed source/transaction integrity. Historical YAML lesson files are unconverted editorial provenance, not an alternate supported new workflow. Do not execute an authored draft or invoke `materializeX()` from it; the trusted reader and materializer own this boundary after #857 is deployed. Use the [canonical architecture](../../../studio/docs/architecture/typed-production-materialization.md).

## Separate completed-resource publishers

- [Lesson Props](./generateLessonProps/README.md), [Course Props](./generateCourseProps/README.md) and [Assessment resources](./generateAssessmentResources/README.md) consume **completed** typed Configurators. Never pass an incomplete Stage 1/2 bank or Lesson object to them.
- [Scene scaffolding](./sceneScaffolding/README.md) provides opt-in React Scene **drafts**, never playable Scenes, registry updates or approved media.
- [Asset audit](./auditTextbookMedia/README.md) is read-only. [Lesson lookup](./queryLessons/README.md) discovers existing typed Lessons or historical source; it does not materialize drafts.
- [Review reference generators](./generateLessonReviewArtifacts/generate-lesson-review-artifacts.mjs), [Question references](./generateQuestionReviewArtifacts/README.md) and [Flashcard references](./generateFlashcardReviewArtifacts/README.md) remain independent source-evidence tools.
- Taxonomy scripts, content publishers and hosted textbook build orchestration remain separate from typed source materialization.

Retired conversion code must not be resurrected as a hidden fallback, and generated JSON or Props must not become a second editable authoring source.
