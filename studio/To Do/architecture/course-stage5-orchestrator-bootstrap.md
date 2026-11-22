# Temporary bootstrap for the typed Course Stage 5 source orchestrator

This file exists only so the dedicated Draft agent-subtask PR has an independently
reviewable Git diff. **Delete this bootstrap file during implementation.**

Authoritative requirements: the PR description, root `AGENTS.md`, actual
`CourseWorkflowMaterializerInput = CourseWorkflowStage3`, the canonical
Create Course Flow Skill, and the present individual materializers under
`shared/engine/generators/materializers/`.

Scope: implement the verified Course Stage 5 entrypoint and composition of
existing materializers, the typed new-Lesson Stage 1 handoff, existing-Lesson
references and built-sparse-override bridge, deterministic IDs, safe
SHA-pinned/create-only source write plan and authorization-controlled commit,
and focused real compiler/Build regression tests. Do not author Lessons,
Question/Flashcard Banks, translations or published Props.

Current immediate parent: #775. Parallel typed Lesson/assessment contracts
are coordinated in intermediate #786 (children #782–#785). Do not edit their
owned contracts/Skills or merge/retarget those PRs from this branch.

**No orchestrator implementation or test success is claimed by this file.**
