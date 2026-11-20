# Reuse package builds during production validation

**Status:** job-local package reuse implemented; production performance acceptance pending after parallel orchestration.
**Source of truth:** `studio/rules/ci-workflow.md`, `studio/rules/package-scripts.md`, actual scripts and GitHub Actions.

## Historical problem

Before parallelization, the workflow now called `.github/workflows/production-quality.yml` (at that time `questions.yml`) sequentially invoked root `code:check:types`, `test`, `package:build`, `app:build`. `scripts/runWorkspaceScript/run-workspace-script.mjs` uses a new per-operation `built` set, so the same dependency builds may repeat in one runner; workspace `pretest` and app lifecycle hooks can introduce more builds. Avoid incorrectly attributing all repeated work to the root aggregator without measuring each source.

## Implementation

1. Capture the exact repeated package build count and command durations from a successful Ready `develop → main` Production Quality run and a comparable clean checkout.
2. Implement the smallest reliable build-preparation/reuse mechanism _within an individual production job_ (or justified prepared-only entrypoints). Preserve the canonical standalone root and workspace npm script semantics, clean-checkout behavior and automatic prereqs.
3. Keep full monorepo TypeScript, root tests, extra Web/Playground component tests, lint, all distributable packages, host builds, compiled exports and Chromium E2E. Do not bypass a required build when artifacts are missing or stale; do not rely on cross-runner `dist/` from Content Build.
4. Add failure-path tests and update canonical Studio CI documentation. Do not change `Content Build` matrix or PR #721 Draft gating here.

## Acceptance

- Real clean-run validation passes and failed compilation stops the stable `Production Quality / verify` check.
- Test verifies each reusable dependency is built only as needed, in topological order, and a missing output fails closed; no skipped typechecks/tests/E2E.
- Report before/after critical-path time, sum of runner/job time, package build count and log volume for equivalent inputs. If faster is not demonstrated, document the result instead of declaring savings.
- Keep PR Draft until owner authorizes Ready; do not merge into `main` directly.

## Implementation evidence (historical)

- Added a job-local, opt-in reuse helper with dependency-aware rebuild and
  full `dist/` SHA-256 verification. State is outside the checkout and cannot
  cross runner boundaries.
- Root workspace aggregation, Engine/Next.js/Electron test lifecycle builds,
  and Web/Mobile/Desktop textbook preparation use the helper. Without the
  production-only environment variable they still invoke normal
  `npm run package:build --workspace …`.
- The full Production Quality coverage, Content Build matrix, stable
  `Production Quality / verify` context and #721 Draft policy are preserved.
  Production work now runs in independent jobs with strictly job-local build reuse;
  see `scripts/ci/productionQuality/README.md`.
- Added fixture tests for dependency ordering, clean reuse, missing/modified
  artifacts, changed sources, compiler failures, invalid state, symlinks
  and missing outputs. The standard root workspace integrity check includes
  the new suite.

## Measurement status

Historical run [44609131674](https://github.com/KiT-Maverik/svitlo/actions/runs/44609131674)
for Ready PR #716 failed during root tests (missing Desktop renderer files).
Its available successful prefix includes `npm ci` 12.6s,
`repo:check:packages` 6.2s and root `code:check:types` 132.3s.
The earlier run [44596822108](https://github.com/KiT-Maverik/svitlo/actions/runs/44596822108)
also failed. Neither is a valid completed baseline for the full critical path,
runner minutes, output volume or package-build count.

**Outstanding owner/CI acceptance:** run a clean successful Ready
`develop → main` production promotion on a comparable revision, and compare
with the instrumented production job's package-build summary, critical-path
duration, total runner/job time and log volume. Do not claim savings without
matched evidence. Track live PR readiness and approvals only in GitHub, not in this specification.
