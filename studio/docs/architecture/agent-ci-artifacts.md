# Agent CI reports — run-scoped GitHub Actions artifacts

**Status:** On-demand, read-only report transport. No production runtime or Git-tracked report workspace.

## Trust and lifecycle

1. An authorized user posts a scoped command on an existing same-repository PR or dispatches the existing workflow. The workflow code comes from the **default branch (develop)**, verifies the user's permission and resolves the open PR to an immutable HEAD SHA. Analyzer jobs check out that SHA with `contents: read` and `persist-credentials: false`.
2. Find the **actual successful Actions run** for that command. List its artifacts and download the ZIP for that exact run, not just a similar name from a previous request. Artifact names include PR/run IDs where applicable. The zip is retained for **one day** (`retention-days: 1`); no generated files are committed or pushed.
3. Extract only regular, bounded ZIP entries. Validate the JSON envelope or manifest: correct run ID, PR, source SHA, requested scope/entity/locale, completeness, listed filenames, SHA-256 and bytes where applicable. Fail closed on stale, absent, incomplete or mismatched data. A generated preview does not prove independent review.
4. After canonical source changes, generate a new report pinned to the new PR HEAD. Record durable findings and approvals in the PR and the entity-owned `review.ts` where the actual contract applies. Do not rely on expiring artifact bytes as permanent review evidence.

Agents with the GitHub connector can list and download actual run artifacts and inspect the ZIP's Markdown and JSON. A comment alone does not prove generation: verify the run, its conclusion and the artifact. Once a workflow is merged into the default branch, its comment triggers become active. Older in-flight PRs must synchronize the generator source code before they can produce the new manifest format.

## Artifact contracts

| Workflow / command | ZIP files | Artifact name |
| --- | --- | --- |
| `/agent-artifacts generate <family> ...` | `manifest.json` plus only the requested entity/locale `*.md` views | `agent-reference-pr-<pr>-<run>` |
| `/get lesson by id|skill ...` | Single `result.json` (query, PR, run, SHA, result and diagnostics) | `get-lesson-<pr>-<run>` |
| `/engine-coverage` | Single `engine-gaps.json` (gaps, PR, run and analyzed SHA) | `engine-coverage-gaps-pr-<pr>-<run>` |
| `/repo-audit` | `git-audit.json` and concise `git-audit.md`, also an Actions Job Summary | `repository-git-audit-<run>` |

Machine JSON alone is enough for lookup/coverage; no second duplicate Markdown is needed. Git audit retains readable Markdown for the on-run human summary.

The reference generator writes only under `$RUNNER_TEMP/agent-reference-library/` (or ignored local `temp/agent-reference-library/`). `manifest.json` schemaVersion 3 includes `sourceCommit`, `pr`, `runId`, exact `scope`, `generated[]` relative ZIP-root paths, `failures[]`, `summary`, `status` and per-document `bytes` and `sha256`. Markdown hyperlinks are permalinks to source Code at that SHA. The generator supports one selected reference family and named textbook/locale/UUID component scope; missing localized `%%MISSING%%` values yield non-review-ready previews.

This workflow is **not** a Lesson/Course/Question/Flashcard *source materialization* workflow. Those commands intentionally create authorized real source files and are not replaced by report artifacts.

## Legacy tracked reports and branch rulesets

A previous mechanism created a tracked `.agent-ci-artifacts/` directory. New reports never write there. The stable `Agent CI Artifacts / clean` required check remains temporarily to stop those legacy files from reaching `develop` or `main`. The owner must reconcile already-open PRs containing tracked reports and remove/replace this required context in the protected-branch rulesets **before** deleting the guard workflow. Do not silently bypass protection.

There is no new `/agent-artifacts cleanup` operation, Ready-for-review cleanup, or privileged report publisher. Old tracked files, where present, require a normal explicit deletion commit. The agent must not claim they vanished automatically.
