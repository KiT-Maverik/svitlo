# Typed Course Stage 5 source orchestration

Course Stage 5 consumes the canonical UUID-addressed `draft.ts` satisfying `CourseWorkflowMaterializerInput` at its exact pinned Git commit and blob. Independent Stage 4 review is a separate editorial responsibility, not a parsed technical prerequisite.

- `materializeStage5.mjs` plans Course, Module, Chapter and Episode sources, with derived methodology Markdown and deterministic identities. Existing Lesson identity and verified overrides are preserved.
- `lessonDraft.mjs` creates only the new Lesson's `draft.ts` satisfying `CourseWorkflowLessonSeed`. It carries Course language context, allocates the UUID and leaves authorized Lesson Stage 1 to complete its independent contract in place. It does not create Sections, banks or a Lesson PR.
- `sourceCommit.mjs` verifies pinned source, branch lease, safe paths and absence of existing destinations, then deletes the reviewed draft and creates the materialized Course `index.ts` and all planned outputs in one Git commit. The reviewed parent commit and blob retain exact original bytes. Read-only checks do not change the branch or worktree.

Existing Lesson placements must resolve to actual materialized Lesson Configurators at verified UUID paths and compatible source languages. Pending placements and resources remain blockers. Source materialization does not publish Props, approve editorial work, implement missing resources or start downstream work.

Use the [trusted Course Stage 5 runbook](../../../../../scripts/ci/courseMaterialization/README.md). Confirm default-branch deployment before invoking the command.

Validation: adjacent `materializeStage5.spec.mjs`, `materializeStage5.build.spec.mjs` and `sourceCommit.spec.mjs`, Engine build/typecheck and content publication checks.
