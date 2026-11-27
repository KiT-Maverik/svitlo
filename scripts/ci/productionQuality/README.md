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

## Opt-in Engine Build Once versus Build Each benchmark (PR #895)

This is **experimental, manually dispatched diagnostics**, not Production
Quality or an approved general cross-runner build cache. It deliberately
tests the current Studio prohibition on sharing `dist/` across runners
without changing that repository-wide rule or any required check. The
existing `.github/workflows/engine-generators.yml` is registered on the
default `develop` branch; its `workflow_dispatch` choices select **exactly one** manually triggered
benchmark variant, while `ci_mode=standard` keeps the original checks.

### Build Once (`ci_mode=build-once-engine`)

This variant runs three jobs:

1. `Experiment / Engine build producer`: checkout, independent `npm ci`,
   one canonical Engine `package:build`, compiled-export validation, and
   `actions/upload-artifact@v6` of all `shared/engine/dist/` files.
2. `Experiment / UI Kit TypeScript consumer`: own checkout and `npm ci`,
   verified absent Engine dist before download, same-run artifact download
   and full `@svitlo/ui-kit` `code:check:types` without Engine build.
3. `Experiment / Engine unit test consumer`: own checkout and `npm ci`,
   same-run artifact download, and the actual Engine `test` script with
   `npm --ignore-scripts run test --workspace @svitlo/engine`. That option
   **still runs the explicitly requested `test` script** while suppressing
   the `pretest` lifecycle hook that otherwise rebuilds Engine. The script
   compiles its own independent `.test-build/` test output, not `dist/`.

The two consumers start only after the producer succeeds; they can run
concurrently. Both snapshot the complete downloaded Engine file tree before
their checks and reject any added, missing, modified, or rewritten
`dist/` file afterward (SHA-256, size and mtime). Missing or malformed
compiled exports fail **before** testing. The transfer is per run and per
attempt; it never uploads `node_modules`, shares a mutable build-reuse state,
or copies artifacts from another workflow run. Native job statuses and logs
remain distinct. Producer upload and consumer download are timed in step
summaries; reported size is uncompressed bytes.

### Build Each control (`ci_mode=build-each-engine`)

The control consists of **two independent jobs** that start in parallel,
without a producer, artifact transfer or `needs` dependency. Each checks out
the same ref, installs the same npm dependencies using the same Node version
and npm cache settings, and runs one **local** Engine `package:build` before
its consumer check. UI Kit executes exactly the same two-project TypeScript
check as the Build Once consumer. Engine executes exactly the same explicit
test script with `--ignore-scripts`, so `pretest` cannot introduce an
unmeasured third Engine build. Both jobs snapshot and verify their locally
compiled `dist/` and reject any modifications during checks. The control
therefore performs **two Engine production builds**, versus one in Build Once.

This tests both redundant builds and their real scheduling cost. The topologies
have intentionally different runner counts and dependency edges. Do not treat
one successful functional Build Once run as evidence of reduced latency or
billed cost.

### Manual invocation

Select the **experiment branch** explicitly. The workflow itself is already
registered on default; a *new* standalone workflow added solely on a feature
branch would not be dispatchable.

```sh
gh workflow run engine-generators.yml \
  --ref ci/build-once-engine-artifact-experiment \
  -f ci_mode=build-once-engine
# Select the independent-build control on the same branch and SHA:
gh workflow run engine-generators.yml \
  --ref ci/build-once-engine-artifact-experiment \
  -f ci_mode=build-each-engine
gh run list --workflow engine-generators.yml \
  --branch ci/build-once-engine-artifact-experiment \
  --event workflow_dispatch --limit 5
gh run view <run-id> --json jobs,createdAt,updatedAt,headSha
```

Execute **three successful runs of each mode**, alternating their order
(once/each, each/once, once/each) and **pinning the same commit SHA**. Wait
for each execution to finish before dispatching the next; otherwise GitHub
runner contention or per-mode concurrency cancellation may bias the sample.
Retain six run links and include any failed runs instead of silently
discarding them. These modes are not an automatic repeat or Production Quality
gate.

The ordinary `ci_mode=standard` (and calls from Production Quality) keep
the existing generator jobs. The choice-based mode is intentionally **not**
a boolean input. Confirm the dispatched run's **head SHA**, three experiment
job outcomes, and native timing logs before saying the proof of concept
succeeded. GitHub's Actions UI may render the default-branch input form
until the branch version is registered; CLI/API with an explicit `--ref` and
choice value is the preferred experimental entrypoint. Do not dispatch
`production-quality.yml` just to run this experiment.

### Evidence and next decision

Record, for the **same run**: producer install, build, export validation and
upload durations; both consumer installs, download durations and check durations;
uncompressed artifact size; number of Engine builds (expected **one** across
all three jobs); total experiment wall-clock from earliest job start to latest
completion; and sum of the **three** job durations in seconds from the Actions
jobs API. Do not confuse summed job-seconds with billed runner-minutes. Include
source SHA, runner OS/Node version, and cache profile. Prior run
[45900076927](https://github.com/KiT-Maverik/svitlo/actions/runs/45900076927)
is historical repeated-build context, **not** a matching-SHA A/B benchmark.
The control now exists as the second choice. For each run record wall-clock
from the GitHub workflow run timestamps, **sum of active job durations** from
the Actions jobs API (all three jobs for Build Once; both for Build Each),
runner image, Node version, cache hit or miss, build time and count, npm
install time, transfer time, and final test outcome. Compare the **median**
of three successful runs per variant and show the range. Summed job-seconds
are not the same as GitHub-billed minutes; neither should be reported as
cost savings without a comparable billing calculation. Capture failed runs
as failures, and rerun matched pairs only after investigating failures. The
first Build Once run #45951806063 remains functional evidence, not a
matched-SHA datapoint for this revised benchmark.

Static and failure-path checks (no npm install required):

```sh
node --test scripts/ci/productionQuality/production-quality.spec.mjs \
  scripts/ci/productionQuality/engine-artifact-guard.spec.mjs
```

To roll back the PoC, remove all five `experiment-*` jobs, the
`ci_mode` dispatch option and their guards from
`engine-generators.yml`, plus this experiment-only guard/test and docs.
No normal production or release workflow changes are necessary.
