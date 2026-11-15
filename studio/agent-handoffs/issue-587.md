# Agent 2 workstream — Issue #587

> **Temporary branch handoff only.** No implementation is claimed in this commit. The authoritative task, code boundaries, acceptance criteria and coordination details are recorded at https://github.com/KiT-Maverik/svitlo/issues/587 and the design reference is PR #557.

## Planned acceptance

- [ ] Audit and remove Lesson flashcards.order without losing required semantics.
- [ ] Implement Front/Back/Hint ordered ContentBlock collection Configurator and type-safe additionalItems overrides.
- [ ] Update Engine tests and hand off generator requirements to Agent 5.

## Handoff rules

- This branch is a standalone Draft PR targeting `main`, not an integration or agent-subtask PR.
- Read root `AGENTS.md`, `README.md`, `studio/` instructions, the named Engine scripts' README/JSDoc, current source and tests before code changes.
- Do not edit the hand-modified Lesson in PR #557, and do not run incomplete source drafts through production validators.
- **Remove this temporary handoff file before implementation is completed and the PR is eligible for review.** Replace it with actual implementation, documentation at its canonical location, and verified tests.
