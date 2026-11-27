# Parallel Production Quality

A Ready same-repository `develop → main` promotion requires **all** production
gates, but independent workloads run on isolated concurrent runners. Never
conflate a green individual job with the required `Production Quality / verify`
aggregate: any failed, cancelled, missing or skipped dependency must fail it.

- `policy` checks the source before any npm installation and discovers all
  apps that implement `app:build`. Only that job publishes the app matrix.
- `repository`, `types`, `unit`, `generators`, `components`, `lint`, `packages`, and
  per-app `apps` jobs depend on `policy` and run independently.
- `generators` calls the authoritative reusable Engine generators workflow
  instead of copying a partial selection of its tests. This includes the
  Docker-isolated, SHA-pinned five-materializer round trip, CI-only security
  regressions, and generator CLI tests that root `npm test` does not cover.
  A failed or skipped reusable workflow blocks `Production Quality / verify`.
  On Ready `main` promotions, the separately PR-triggered Engine generators
  workflow still runs its npm-free publisher-isolation and CI-policy guards but
  skips its **second** expensive `generator-tests` job. The Production Quality
  reusable call explicitly passes `run_full_generator_tests: true`, so the
  complete Engine generator suite still executes once inside the strict
  protected aggregate. Standalone Ready PRs to `develop` or integration
  branches and manual `workflow_dispatch` still run the complete suite.
  This avoids redundant job initialization; no individual generator tests
  are removed, and a cost saving has not yet been measured in a real
  Ready `develop → main` promotion. Importantly, the reusable workflow's
  `github.workflow` context is the **calling workflow** name; its workflow-level
  concurrency group includes that value, keeping a direct Ready
  `Engine generators` run isolated from the separate `Production quality`
  reusable call. Both retain same-workflow cancellation of superseded
  runs without accidentally canceling the other path or its required gate.
  This separation has a focused `production-quality.spec.mjs` regression
  test; actual simultaneous Ready main event behavior remains to be verified.
  The Production-only targeted generator step now compares actual compiled
  test-file paths selected by the two independent routes. Standalone Ready and
  manual Engine generator runs retain the **entire original selection**. Only
  the protected Production Quality caller passes
  `only_unit_unique_generator_tests: true`: the targeted generator step
  skips concrete files already selected by the required exhaustive root
  Engine `npm test` job. It expands all original 35 generator selectors
  and the current Engine npm test selectors, rejecting missing compiled
  files, unrecognized root command shapes and empty generator-only scopes.
  If the root command stops selecting a file, that file automatically
  returns to the generator selection. All separate publisher, materializer,
  formatting, bank/Lesson security and trusted command steps are unchanged.
  The strict `Production Quality / verify` depends on both the unit and
  generators jobs. The new npm-free fixture tests cover selection and
  failure conditions; a current-HEAD Production Quality run is still needed
  to verify exact compiled-file counts, case-ID parity and any actual savings.
  This design does not share compiled output between runners.
- `components` selects Playground and Web only. The root `npm test` already
  covers UI Kit and Math component suites. The existing workspace planner builds
  exactly the selected tests' dependency closure; root npm script semantics
  remain **exhaustive**, without new partial-root aliases.
- The manifest-derived `apps` matrix runs every `app:build` and its declared
  `test:e2e`/`test:integration` suite from the **same checkout and runner**.
  Any new E2E workspace without `app:build` fails discovery rather than
  silently losing coverage.
- Package builds use the pinned local Turborepo DAG on one runner, after live
  verification of the complete task graph. The package worker has no legacy
  build-reuse state; Turbo executes each build once without caching.
  Compiled-export verification remains a full standalone gate. App builds independently compile their own needed dependencies.
  `SVITLO_CI_PACKAGE_BUILD_STATE` is strictly local to **each job**; never
  share its JSON or compiled output across runners.
- GitHub's `fail-fast: false` retains all app results. A stable final job
  checks every dependency result, including the matrix's aggregate result.
  Draft PRs do not pretend to have passed production quality.
- Logs remain bounded by quietRun; on failures, inspect the failed job/step,
  not full successful logs. E2E results upload per-app artifacts.

## Agent-triggered full diagnostics

Comment `/production-quality` on an open same-repository fix PR to launch the
existing full `production-quality.yml` against its head branch. The
`production-quality-command.yml` router runs from the default branch, checks
the same PR-comment author permissions as existing on-demand commands and
calls `gh workflow run production-quality.yml --ref <pr-branch>` using the
Actions `GITHUB_TOKEN`. It does not check out the PR, change the production
workflow or modify branch rules. It must first be merged into `develop`.

Locate the resulting `workflow_dispatch` run and confirm its `head_sha`
matches the latest fix PR head. Every production job and the final
`Production Quality / verify` must pass. A comment-triggered run does not
replace standard Ready PR checks or the real `develop → main` promotion gate.

This optimizes **wall-clock latency and time to first actionable failure** by
trading extra npm installations and possibly more billed runner-minutes for
parallelism. It does not promise a particular duration: only comparable,
successful Ready production runs can establish the speedup.

Verify static contracts from a clean checkout:

```sh
node --test scripts/ci/productionQuality/production-quality.spec.mjs
node --test scripts/runWorkspaceScript/run-workspace-script.spec.mjs
node --test scripts/ci/releaseSource/check-release-source.spec.mjs
```

Then run an actual Ready `develop → main` promotion to verify matrix jobs,
app bundles, browser suites and the required gate in GitHub Actions.

## Root TypeScript checks within the TypeScript worker

The root `npm run code:check:types` remains exhaustive over every workspace
that implements the canonical script. It first builds its complete dependency
closure **sequentially in topological order** so the job-local, SHA-verified
`SVITLO_CI_PACKAGE_BUILD_STATE` is never concurrently modified. It then
runs independent TypeScript checks through the same bounded worker pool as
FastGate (default `SVITLO_TYPECHECK_PARALLELISM=4`, supported values 1–8).
`@svitlo/web` and `@svitlo/mobile` run **after** that pool, one at a time,
because their npm pre-hooks can rewrite shared compiled outputs. Every check
retains its actual npm lifecycle; failures are aggregated without dropping
remaining independent workspaces. Other root operations remain sequential.

The shared scheduler and exhaustive phase planner have focused Node tests:

```sh
node --test scripts/runWorkspaceScript/typecheck-scheduler.spec.mjs scripts/runWorkspaceScript/run-workspace-script.spec.mjs scripts/runFastGate/run-fast-gate.spec.mjs
```

The baseline Production Quality run
[45883885605](https://github.com/KiT-Maverik/svitlo/actions/runs/45883885605)
spent 219.9s in root `code:check:types` (109.6s inside package builds).
This is a baseline, **not** a measured post-change speedup. Compare an actual
full run at the same source scope before claiming improvement.

## Turborepo package and lint task orchestration (PR #900)

Root `package:build` and `code:lint:check` use pinned `turbo@2.11.13`
and the real npm workspace graph with bounded concurrency 2. Run
`npm run repo:check:turbo` after `npm ci` to validate the actual
`--dry=json` task graph against all eligible npm workspaces. The
source-policy job runs deterministic graph tests without npm installation;
the package worker must verify the installed CLI's graph before building.
The package worker also runs an isolated real Turbo failure-propagation smoke
fixture: a failing upstream build must fail the command and prevent a dependent
build. This test requires the installed Turbo binary and does not run in the
pre-install source-policy job.

Both cache sources are disabled (`--cache=local:,remote:`) and each task has
`cache: false`; no remote service, cross-run `dist/` or persistent remote
cache is introduced. `envMode: loose` preserves inherited npm lifecycle and
generator variables; these outputs are never replayed from a Turbo cache.

Other root operations still require existing manifest-derived orchestration:
full typechecks with sequential Web/Mobile pre-hooks, tests, selected
components, app builds and verified job-local reuse. Trusted generator and
materialization workflows, selected-content publication and Chromium/E2E
jobs stay independent. This scoped adoption does **not** establish migration
of the full production suite or a measured speedup.

Verification from clean checkout:

```sh
npm ci --no-audit --no-fund
node --test scripts/ci/turboTaskGraph/verify-graph.spec.mjs scripts/ci/productionQuality/production-quality.spec.mjs
npm run repo:check:turbo
npm run package:build
npm run repo:check:artifacts
```

**Rollback:** revert the root `package:build` and `code:lint:check`
scripts to `runWorkspaceScript`, then remove Turbo installation/config
and the package-only graph gate. Preserve all existing protected check names,
release source checks, strict `verify` aggregator, app/browser suites and
security/materializer jobs. Use equivalent successful head-pinned full runs
to compare critical-path time, total runner minutes and diagnostics.
