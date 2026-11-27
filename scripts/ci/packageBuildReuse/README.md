# Production Quality package build reuse

This **job-local** helper deduplicates `package:build` requests from the remaining root typecheck/test planner, npm test lifecycle hooks, and Web/Mobile/Desktop content preparation. The standalone Production Quality package worker uses Turbo to schedule every build once and does **not** set this helper's state variable. Do not use a cross-job cache or inherit a `dist/` directory from
the separate textbook Content Build matrix.

Production Quality sets `SVITLO_CI_PACKAGE_BUILD_STATE` to an absolute file
in the runner's temporary directory. Every build request:

1. Resolves buildable dependencies in topological order.
2. Checks that Git tracked inputs still match the checked-out commit.
3. Verifies **all** previously compiled `dist/` files by name, size and SHA-256,
   including exported files and textbook publication resources.
4. Rebuilds on missing/changed outputs, changed sources, changed dependency
   generation or missing state, and records a new state only after success.
5. Immediately propagates build/validation failures. A corrupted or foreign
   state is not trusted.

The state is **not** an npm cache and is not shared between jobs, commits,
checkouts, or runners. If the environment variable is absent, the helper
always invokes the ordinary workspace `npm run package:build` command.
Do not enable it for arbitrary parallel CI jobs: concurrent writers to the
same job state are outside its deliberately sequential contract.

Usage:

```bash
node scripts/ci/packageBuildReuse/package-build-reuse.mjs @svitlo/engine
node scripts/ci/packageBuildReuse/package-build-reuse.mjs --summary
node --test scripts/ci/packageBuildReuse/package-build-reuse.spec.mjs
```

## Opt-in per-workspace compilation telemetry (PR #925 Phase 0)

`package-build-reuse.mjs` supports optional job-local JSON Lines diagnostics when
`SVITLO_CI_BUILD_TELEMETRY` points to an **absolute file outside the repository**
(for example `$RUNNER_TEMP/svitlo-typecheck-builds.jsonl`).
Do not set this to the build-reuse state JSON itself. This does not enable
caching, rebuild anything differently, or change source/task selection. It is
disabled by default. For a manually authorized, independently isolated TypeScript
trial with a fresh `SVITLO_CI_PACKAGE_BUILD_STATE`:

```sh
export SVITLO_CI_PACKAGE_BUILD_STATE="$RUNNER_TEMP/svitlo-typecheck-state.json"
export SVITLO_CI_BUILD_TELEMETRY="$RUNNER_TEMP/svitlo-typecheck-builds.jsonl"
SVITLO_WEB_TEST_SELECTION=web-fixture-alpha npm run code:check:types
node scripts/ci/packageBuildReuse/package-build-reuse.mjs --summary
```

Each line records a versioned event with timestamp, `GITHUB_RUN_ID`,
`GITHUB_RUN_ATTEMPT`, `GITHUB_JOB`, `GITHUB_SHA`, workspace name,
`package:build`, outcome (`built`, `reused`, or `failed`),
request duration (including dist validation), checked-out clean source revision
(or `null`), and successful dist SHA-256 digest (or `null` on failure).
A failure to write this **optional diagnostic** logs a warning and never turns a
failed compiler into a success or a successful build into a failure. JSONL is
not a trusted cache, not an artifact permission grant, and must not be shared
between runner jobs or trials.

This is **partial Phase 0 telemetry**: it covers build requests through this
helper only. Direct `npm run package:build` calls in Content `prepare` and
shards, standalone Turbo package builds and possible npm lifecycle hooks are
**not counted** by these events. For complete CI compilation counts, instrument
those entrypoints separately and correlate actual compiler invocations; do not
infer a duplicate build from a request count. Draft PR validation will not run
these expensive commands and cannot produce a Production baseline.

Validation without CI:
```sh
node --test scripts/ci/packageBuildReuse/package-build-reuse.spec.mjs
```

Production Quality retains the existing typecheck, test, lint, package
artifact, application build and E2E commands. The summary reports requested,
executed and reused package builds plus measured build-command duration; it
does not manufacture a historical before/after wall-time comparison. Use
matched successful Ready `develop → main` jobs for that comparison.
