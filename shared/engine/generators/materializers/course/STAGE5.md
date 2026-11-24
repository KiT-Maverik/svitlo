# Direct Course Stage 5 source orchestration

An independently reviewed, UUID-addressed `draft.ts` keeps its complete `CourseWorkflowStage3` Stage 3 plan and invokes `materializeCourse(reviewedCourse)` once. No separate AST decoding, source-to-source analyzer, special esbuild bundle or privileged replay is supported in the active source materialization path.

- `materializeCourseDirect.ts` validates the input through the Engine Course Zod schema and composes the concrete `materializeStage5.mjs` Course/Module/Chapter/Episode source renderers, including deterministic UUIDs and derived methodology.
- `lessonDraft.mjs` creates only the new Lesson's `draft.ts satisfies CourseWorkflowLessonSeed` and Stage 1 handoff; no unrelated Lesson work is started.
- Existing Lessons are actual imported Configurators in `production.source`, with their real `production.sourceExportName` and original plain `production.sourcePatch` when overridden. Identity, independently reviewed source SHA, supported languages and verified Build API equivalence are mandatory.
- Trusted `scripts/ci/courseMaterialization/typed-course-direct.mjs` runs the reviewed direct entrypoint in the shared non-root, no-network, no-token worker, verifies immutable Lesson dependencies and emits a bounded source manifest.
- The separate trusted `typed-course-publish.mjs` verifies review/HEAD/file hashes/path confinement/no-clobber without running the draft. In one Git commit it consumes the reviewed draft and creates `index.ts` plus its approved source files.

Pending Lessons, Episodes, translations, media/Scenes and downstream publication remain explicit blockers. Materialization never approves Props or QA. Follow the [trusted direct Course runbook](../../../../../scripts/ci/courseMaterialization/README.md); an actual authorized default-branch run is required before operational acceptance.

Validation: `npm run package:build --workspace @svitlo/engine`, `npm run code:check:types --workspace @svitlo/engine`, `node --test scripts/ci/courseMaterialization/typed-course-direct.spec.mjs` and adjacent concrete Engine tests. Record actual results, not assumed success.
