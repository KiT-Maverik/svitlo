# Standardize low-token CI diagnosis for AI agents

**Purpose:** design rationale and acceptance criteria for efficient CI failure triage. Canonical instructions live in [CI workflow rules](../rules/ci-workflow.md#agent-ci-failure-triage-low-token-default) and [Quiet Run README](../../scripts/ci/quietRun/README.md). See [PR #730](https://github.com/KiT-Maverik/svitlo/pull/730) for change history; GitHub, not Studio, owns PR status, latest SHA and checks.

## Problem
`scripts/ci/quietRun/quiet-run.mjs` already condenses command output, but direct ingestion of complete GitHub Actions logs still costs context and includes successful runner setup/checkout noise. The canonical Studio policy recommends reading failures first but lacks a precise reusable triage procedure. The CI hardening evidence ledger must be treated as dated implementation history, not a live PR status tracker.

## Implementation
1. In `studio/rules/ci-workflow.md` document an explicit AI-agent workflow:
   - Verify PR number, latest head SHA, base and Draft/Ready state; enumerate required checks and their conclusions.
   - Identify only failed/cancelled/blocked required jobs, fetch step summaries, then read the *relevant failing job's* bounded diagnostic or matched error lines.
   - Fetch successful logs only for a concrete unresolved dependency; prefer per-step duration and `PASS`/failure markers; never paste entire multi-job logs into model context.
   - For insufficient failure evidence, rerun only the targeted check with `SVITLO_CI_VERBOSE=1`; redact secrets and do not hide CI exit codes/annotations.
   - Distinguish latest-head CI from superseded/cancelled runs and record precisely what was/was not verified.
2. Clarify `scripts/ci/quietRun/README.md` for exceptions: generated structured stdout, GitHub workflow commands, API/authorization operations and piping must not be quiet-wrapped.
3. Update the status of `studio/docs/ci-post-714-hardening-spec.md` to mark #717 merged while retaining historical evidence. Check Studio index links for consistency.
4. No changes to production checks, build coverage or security boundaries. Add small docs-linked policy assertions only if the repository already has an appropriate lightweight testing pattern.

## Acceptance
A new agent can diagnose one failed CI check without retrieving unrelated successful job logs; documented steps distinguish required vs optional and live vs historical checks. No claim of benchmarked token savings without a measured before/after retrieval transcript. Consult live GitHub metadata and repository PR policy for review/merge state.
