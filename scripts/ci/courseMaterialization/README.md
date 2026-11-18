# Course Stage 5 PR-command materialization (implementation handoff)

**Status: specification only — no CI workflow, runner or trigger is implemented by this commit.**
This document is the initial tracked work item for the [Draft PR](https://github.com/KiT-Maverik/svitlo/pulls) that will implement the Course Stage 5 automation. The PR body holds the detailed acceptance criteria; the implementing agent should update this README to describe the actual shipped command and lifecycle, not leave a speculative document behind.

## Intended user experience

An authorized maintainer enters `/course materialize` as a **top-level comment on an open same-repository Course parent PR**. A GitHub Actions workflow installed on `main` checks the current PR identity, independently accepted Stage 4 review at an exact Course source revision, permission of the invoking actor, and branch/source consistency. It invokes the existing read-only validation and `shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs` with `--write`, then `--check`, and commits only its verified outputs **to that Course PR's existing head branch** (never to `main` or to the automation PR). A separate `/course finalize` comment checks the already committed generation and runs `--finalize`, committing the deletion of the unchanged temporary `course.yaml` in a distinct commit.

For a manual fallback and CI testing, support `workflow_dispatch` with explicit `pr_number` and `operation` (`materialize` or `finalize`), with the **same** identity, authorization, approval and safety checks.

## Canonical sources to reuse

- `studio/skills/course-workflow/create-course-flow.skill.md`, especially Stage 4 and Stage 5.
- `shared/engine/scripts/materializeCourseFlow/README.md` and `materialize-course-flow.mjs` — the existing deterministic, create-only source materializer.
- `shared/engine/scripts/validateCourseFlow/validate-course-flow.mjs` with `--stage 3-complete`.
- `.github/workflows/get-lesson.yml` and `.github/workflows/sync-course-lessons.yml` — safe PR-comment command resolution, trusted/untrusted checkout separation and exact-head handling.
- `shared/engine/scripts/materializeCourseFlow/materialize-course-flow.spec.mjs` — no-clobber, stable IDs, lifecycle and regression coverage.
- `studio/rules/github-labels-and-naming.md`, `.github/labels.json`, `studio/rules/package-scripts.md`.

## Non-negotiable boundaries

1. **Fail closed** if Stage 4 has not been independently signed off, its review points at another Course source revision, the PR/source identity is ambiguous, the actor lacks write permission, the branch advances mid-run, or the PR is from a fork/closed/protected branch.
2. Treat the comment as the **explicit Stage 5 action authorization** only after Stage 4 is accepted; no automatic trigger on ordinary commits or Stage 4 progress.
3. Never execute untrusted PR-controlled code in a job that has a write-capable token. Run generation on a pinned SHA with read-only permissions; isolate and validate output before a separate restricted write step. Do not interpolate untrusted comment text or PR metadata into shell commands.
4. Limit changes to generated Course TypeScript/Markdown under the verified Course UUID directory and the minimal canonical `lesson.yaml` files for planned Lessons. Reuse stable UUIDs. Do not generate a separate `config.yaml`, Lesson TS, Question Banks, Flashcards, media, translations, approval records, or Lesson PRs.
5. Do not overwrite authored files, silently repair conflicting outputs, change Stage 4 evidence, modify unrelated files or merge/mark Ready. Repeated invocations must be idempotent or report an exact conflict.
6. **Finalize separately:** check committed materialized bytes and reviewer provenance first; delete only the original unchanged Course `course.yaml` in a subsequent commit. Keep generated `lesson.yaml` files and the approved history.
7. Use clear Actions job summaries and artifact/log evidence (including exact source and resulting commit SHAs), not comments as a destination for generated outputs. If temporary `.agent-ci-artifacts/` reports are committed, preserve the established cleanup requirement before merge.
8. Validate failure cases in tests: unauthorized trigger, wrong PR marker/UUID, stale approval, HEAD race, fork, path traversal/symlink, collision/non-clobber, restart after partial write, repeated materialize/finalize, missing or changed outputs and no-permission write.

**Publication is out of scope.** The output is authoring drafts plus methodology-only Lesson YAMLs, not a built/published Course. Before `Ready for Review`, follow the repository's real protected-branch checks and leave intentionally incomplete production resources visible.

## Initial target

[Course PR #653](https://github.com/KiT-Maverik/svitlo/pull/653) is the first intended caller **after** a real independent Stage 4 acceptance. Its currently in-progress Stage 4 is not evidence that an invocation may proceed now. The automation must work for any verified Course parent PR, not hardcode #653, the astronomy package, a UUID or a branch.
