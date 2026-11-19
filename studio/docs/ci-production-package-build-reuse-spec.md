# Reuse package builds during production validation

**Status:** implementation specification for a Draft PR. Not implemented by this document.
**Source of truth:** `studio/rules/ci-workflow.md`, `studio/rules/package-scripts.md`, actual scripts and GitHub Actions.

## Problem
`.github/workflows/questions.yml` sequentially invokes root `code:check:types`, `test`, `package:build`, `app:build`. `scripts/runWorkspaceScript/run-workspace-script.mjs` uses a new per-operation `built` set, so the same dependency builds may repeat in one runner; workspace `pretest` and app lifecycle hooks can introduce more builds. Avoid incorrectly attributing all repeated work to the root aggregator without measuring each source.

## Implementation
1. Capture the exact repeated package build count and command durations from a successful Ready `develop → main` Production Quality run and a comparable clean checkout.
2. Implement the smallest reliable shared build-preparation/reuse mechanism *within the production job* (or justified prepared-only entrypoints). Preserve the canonical standalone root and workspace npm script semantics, clean-checkout behavior and automatic prereqs.
3. Keep full monorepo TypeScript, root tests, extra Web/Playground component tests, lint, all distributable packages, host builds, compiled exports and Chromium E2E. Do not bypass a required build when artifacts are missing or stale; do not rely on cross-runner `dist/` from Content Build.
4. Add failure-path tests and update canonical Studio CI documentation. Do not change `Content Build` matrix or PR #721 Draft gating here.

## Acceptance
- Real clean-run validation passes and failed compilation stops the stable `Production Quality / verify` check.
- Test verifies each reusable dependency is built only as needed, in topological order, and a missing output fails closed; no skipped typechecks/tests/E2E.
- Report before/after critical-path time, sum of runner/job time, package build count and log volume for equivalent inputs. If faster is not demonstrated, document the result instead of declaring savings.
- Keep PR Draft until owner authorizes Ready; do not merge into `main` directly.
