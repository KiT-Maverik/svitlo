# Agent CI reports — run-scoped GitHub Actions artifacts

**Status:** On-demand, read-only report transport. No production runtime or Git-tracked report workspace.

## Trust and lifecycle

1. An authorized user posts a scoped command on an existing same-repository PR or dispatches the existing workflow. The workflow code comes from the **default branch (develop)**, verifies the user's permission and resolves the open PR to an immutable HEAD SHA. Analyzer jobs check out that SHA with `contents: read` and `persist-credentials: false`.
2. Find the **actual successful Actions run** for that command. List its artifacts and download the ZIP for that exact run, not just a similar name from a previous request. Artifact names include PR/run IDs where applicable. The zip is retained for **one day** (`retention-days: 1`); no generated files are committed or pushed.
3. Extract only regular, bounded ZIP entries. Validate the JSON envelope or manifest: correct run ID, PR, source SHA, requested scope/entity/locale, completeness, listed filenames, SHA-256 and bytes where applicable. Fail closed on stale, absent, incomplete or mismatched data. A generated preview does not prove independent review.
4. After canonical source changes, generate a new report pinned to the new PR HEAD. Record durable findings and approvals in the PR and the entity-owned `review.ts` where the actual contract applies. Do not rely on expiring artifact bytes as permanent review evidence.

Agents with the GitHub connector can list and download actual run artifacts and inspect the ZIP's Markdown and JSON. A comment alone does not prove generation: verify the run, its conclusion and the artifact. Once a workflow is merged into the default branch, its comment triggers become active. Older in-flight PRs must synchronize the generator source code before they can produce the new manifest format.

## Artifact contracts

| Workflow / command                       | ZIP files                                                                | Artifact name                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `/agent-artifacts generate <family> ...` | `manifest.json` plus only the requested entity/locale `*.md` views       | `agent-reference-pr-<pr>-<run>`                                    |
| `/get lesson by id                       | skill ...`                                                               | Single `result.json` (query, PR, run, SHA, result and diagnostics) | `get-lesson-<pr>-<run>` |
| `/engine-coverage`                       | Single `engine-gaps.json` (gaps, PR, run and analyzed SHA)               | `engine-coverage-gaps-pr-<pr>-<run>`                               |
| `/repo-audit`                            | `git-audit.json` and concise `git-audit.md`, also an Actions Job Summary | `repository-git-audit-<run>`                                       |

Machine JSON alone is enough for lookup/coverage; no second duplicate Markdown is needed. Git audit retains readable Markdown for the on-run human summary.

### Lesson and Question Bank Markdown commands

Use these exact commands on the existing PR (or the `lesson` input in the workflow's manual dispatch):

```text
/agent-artifacts generate lessons content/playground <lesson-uuid> en
/agent-artifacts generate questions content/playground <lesson-uuid> en
/agent-artifacts generate lessons content/playground <lesson-uuid>
/agent-artifacts generate questions content/playground <lesson-uuid>
/agent-artifacts generate lessons content/playground en
/agent-artifacts generate questions content/playground en
```

The Lesson UUID is optional and precedes the optional locale; the final lone language code remains a locale, preserving existing textbook-wide commands. A UUID without locale selects that Lesson's supported languages; a UUID with locale requests only its matching Markdown. `questions` selects the Question Bank owned by that Lesson, with associated Quiz text, not banks in other Lessons. Incorrect UUIDs, ambiguous extra arguments and missing entities fail the request. The manifest's `scope.lesson` contains the canonical lowercase UUID, and each `generated[]` entry must reference only that Lesson path and selected locale(s).

These are **read-only reference exports**, not bank/Lesson source materialization and not proof of editorial review. The dispatcher passes the UUID to the existing generator and validates the exact `sourceCommit`, PR, run ID, Lesson/locale scope, file inventory, byte sizes and SHA-256 before uploading the one-day ZIP. A comment command becomes available only after its YAML is deployed to default `develop`; pre-merge tests of an integration branch do not prove the live command works.

The reference generator writes only under `$RUNNER_TEMP/agent-reference-library/` (or ignored local `temp/agent-reference-library/`). `manifest.json` schemaVersion 3 includes `sourceCommit`, `pr`, `runId`, exact `scope`, `generated[]` relative ZIP-root paths, `failures[]`, `summary`, `status` and per-document `bytes` and `sha256`. Markdown hyperlinks are permalinks to source Code at that SHA. The generator supports one selected reference family and named textbook/locale/UUID component scope; missing localized `%%MISSING%%` values yield non-review-ready previews.

This workflow is **not** a Lesson/Course/Question/Flashcard _source materialization_ workflow. Those commands intentionally create authorized real source files and are not replaced by report artifacts.

## Legacy tracked reports and branch rulesets

The previous mechanism created a Git-tracked `.agent-ci-artifacts/` directory. The new report workflow does not write there, and the separate `Agent CI Artifacts / clean` workflow has been **deleted**. Existing historical PRs may still contain tracked reports; inspect their tree and remove those files via explicit normal commits before merging.

**Verified against live GitHub rulesets on 2026-11-24:** `Protect develop` requires `Affected content / build, taxonomy and packaging`, `Blocker TODOs / clean` and `FastGate / verify`; `Protect main` requires the first two plus `Production Quality / verify`. Neither ruleset requires the deleted `Agent CI Artifacts / clean` context. No ruleset change or replacement check is needed for that historical status. Recheck live rulesets when merge requirements change.

There is no `/agent-artifacts cleanup` operation, no cleanup-on-Ready, and no privileged diagnostic report publisher. One-day Actions artifact expiration never changes tracked source files.
