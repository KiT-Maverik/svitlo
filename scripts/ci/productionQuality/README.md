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
- `components` selects Playground and Web only. The root `npm test` already
  covers UI Kit and Math component suites. The existing workspace planner builds
  exactly the selected tests' dependency closure; root npm script semantics
  remain **exhaustive**, without new partial-root aliases.
- The manifest-derived `apps` matrix runs every `app:build` and its declared
  `test:e2e`/`test:integration` suite from the **same checkout and runner**.
  Any new E2E workspace without `app:build` fails discovery rather than
  silently losing coverage.
- Package builds and compiled-export verification remain a full standalone
  gate. App builds independently compile their own needed dependencies.
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

## Manual Turborepo A/B/C task-graph PoC (PR #896)

**Experimental branch only; not part of Production Quality.** This section
describes the actual opt-in implementation at
`ci/turborepo-task-orchestration-poc`. It does **not** claim production
parity, a measured speedup, or completed A/B/C runs.

A preexisting registered `engine-generators.yml` handles opt-in dispatch
with the `ci_mode` input. The normal `standard` mode preserves generator
checks. The three other modes run a **representative nine-task scope**:
`@svitlo/engine`, `@svitlo/ui-kit`, `@svitlo/math` ×
`package:build`, `code:check:types`, `test`. Current npm `pretest`
rebuilds Engine, so all variants suppress npm **lifecycle pre/post scripts**
while still executing the explicitly selected script. This experimental
behavior is not a generic replacement for the canonical root npm operations.

- **A `turbo-single`**: one runner with one `npm ci`, then a single Turbo
  task graph executing the selected packages. Turbo compiles prerequisites,
  parallelizes independent work, and checks compiled exports at the end.
- **B `turbo-distributed`**: nine independent GitHub reusable-workflow jobs,
  each on its own runner; `needs` edges enforce build → types → tests and
  upstream build prerequisites. Producer `dist` crosses only explicitly
  checked same-run/same-attempt artifact boundaries. No Turbo runtime is
  necessary for the B tasks; their static DAG is checked against the same
  package graph in the PoC policy tests.
- **C `turbo-hybrid`**: three GitHub jobs chained Engine → UI Kit → Math.
  Each runner executes its local package task graph through Turbo; completed
  package `dist` and local `.turbo/cache` are handed off together as Actions
  artifacts. This grouping is a **deliberately narrow serial chain**, not yet
  proof of the best hybrid grouping for the entire monorepo.

Turbo OSS CLI is pinned to **`turbo@2.11.13`** via `npm exec --yes
--package=turbo@2.11.13` **only in experiment jobs**. This temporary
PoC does **not** add Turbo to the root `package.json`/`package-lock.json`:
canonical `npm ci` and all protected CI remain unaffected. A production
migration would first add and lock the selected CLI version as an ordinary
devDependency. It uses only local Turbo cache plus official GitHub Actions
artifacts; no Nx Cloud, Vercel Remote Cache, remote runner, external account
or proprietary SaaS.

### Dispatch and verification

```sh
gh workflow run engine-generators.yml --ref ci/turborepo-task-orchestration-poc -f ci_mode=turbo-single
gh workflow run engine-generators.yml --ref ci/turborepo-task-orchestration-poc -f ci_mode=turbo-distributed
gh workflow run engine-generators.yml --ref ci/turborepo-task-orchestration-poc -f ci_mode=turbo-hybrid

gh run list --workflow engine-generators.yml --branch ci/turborepo-task-orchestration-poc --event workflow_dispatch
node --test scripts/ci/productionQuality/turbo-poc.spec.mjs
```

A real Turbo `--dry=json` for A is validated by
`scripts/ci/productionQuality/turbo-poc-graph.mjs` before task execution.
The source-level test checks the same expected nine-task DAG against actual
npm workspaces and tests failures for absent edges and missing scripts.
`turbo-poc-artifact.mjs` verifies required public JS/declaration exports,
complete SHA-256 trees, and rejects added/removed or changed predecessor
artifacts. In B, even timestamp rewrites are rejected; C permits Turbo to
restore identical upstream bytes from transferred local cache.

**Known semantic difference:** The existing root `npm test` planner builds
Engine and UI Kit for these three workspaces, but does **not** build
`@svitlo/math` itself before Math tests. This PoC intentionally builds Math
before its typecheck and tests to compare the **same explicit nine tasks** in
A/B/C. Therefore do not equate this experiment to the complete Production
Quality suite or claim it preserves all of `runWorkspaceScript`'s behavior.
FastGate public-contract affected-only logic, root command exhaustiveness,
release/source security, content builds and app/browser checks are out of
scope and unchanged.

### Benchmark methodology and rollback

Run **at least three successful runs per mode**, all on the **same immutable
branch SHA**, without overlapping modes, alternating the order (e.g. A/B/C,
C/B/A, B/A/C). Verify actual `head_sha` and job outcomes from GitHub API,
retain failures/cancellations, distinguish warm npm download cache from fresh
Turbo `.turbo/cache`, and report per-run wall-clock, summed active job
durations, dependency-install/build/typecheck/test times, artifact transfer,
cache hits, skip/failure propagation, and number of actual builds. Job-seconds
are not billed minutes. Graph correctness and coverage parity must be proven
before interpreting speed; no speedup has been established by this code alone.

To remove the experiment, revert this PoC's modified `turbo.json`,
`engine-generators.yml` and Draft-policy test, delete the two private
`turbo-poc-*.yml` reusable workflows and the
`turbo-poc-{artifact,graph}.mjs` plus their spec file, and remove this
documentation. Existing required Production Quality checks require no
migration/rollback. Cross-runner artifacts remain forbidden outside this
explicitly isolated benchmark until owner approval.
