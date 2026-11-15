# Agent 1 workstream — Issue #586

> **Temporary branch handoff only.** No implementation is claimed in this commit. The authoritative task, code boundaries, acceptance criteria and coordination details are recorded at https://github.com/KiT-Maverik/svitlo/issues/586 and the design reference is PR #557.

## Planned acceptance

- [ ] Flatten ai.stages into ai and rename stage keys to camelCase in Engine.
- [ ] Update review draft template, all consumers, tests and architecture documentation.
- [ ] Preserve intentionally unresolved digest and evidence requirements.

## Handoff rules

- This branch is a standalone Draft PR targeting `main`, not an integration or agent-subtask PR.
- Read root `AGENTS.md`, `README.md`, `studio/` instructions, the named Engine scripts' README/JSDoc, current source and tests before code changes.
- Do not edit the hand-modified Lesson in PR #557, and do not run incomplete source drafts through production validators.
- **Remove this temporary handoff file before implementation is completed and the PR is eligible for review.** Replace it with actual implementation, documentation at its canonical location, and verified tests.
