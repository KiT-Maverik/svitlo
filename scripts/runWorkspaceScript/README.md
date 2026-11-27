# Root workspace aggregation and TypeScript checking

`run-workspace-script.mjs` still owns typechecking, unit/component tests, app builds and other lifecycle-sensitive root operations. It discovers
all npm workspaces, selects only workspaces declaring the requested operation,
and prepares dependency builds in topological order. `code:check:types` uses
`typecheck-scheduler.mjs`, shared with FastGate, to check independent
workspaces concurrently **after** every prerequisite package build finishes.
This preserves job-local build-reuse integrity. Web and Mobile typechecks run
sequentially afterward, because their npm pre-hooks can write shared dist.

`SVITLO_TYPECHECK_PARALLELISM` controls root TypeScript concurrency (default 4,
valid 1–8). `SVITLO_FASTGATE_PARALLELISM` retains FastGate's existing
independent default of 2. Both flows run all selected checks and propagate
failures; no workspace is dropped to improve latency.

## Production unit-workspace timing diagnostics (PR #925 Phase 0a)

Root `npm test` is intentionally **exhaustive** and currently executes
workspace tests sequentially with npm `pretest`/`posttest` hooks intact.
`SVITLO_CI_UNIT_TEST_TIMINGS=1` adds *passive*, validated
`SVITLO_CI_UNIT_TIMING` text lines for each actual `package:build`
prerequisite and workspace `test` invocation. Each line contains the
workspace, operation, wall time and success/failure, including npm lifecycle
hooks within the workspace `test` duration. Ordinary execution does not
emit these lines. The existing `scripts/ci/quietRun/quiet-run.mjs` forwards
**only** this opt-in, narrowly validated protocol and standard GitHub
annotations, suppressing all other successful test noise. We intentionally
avoid GitHub `::notice` annotations for timings: the Actions API strips
them from decoded job logs, making source-pinned analysis inaccessible.

Production Quality sets the option **only** on the existing unit job's
`npm test` step; there is no change to tested packages, test IDs, npm
lifecycle, build caching, ordering, or concurrency. This is intentionally
not a test-case-level duration profiler and not evidence of parallel safety.
Use the resulting source-SHA-pinned job logs to identify which workspaces
warrant isolated investigation before considering a bounded parallelism A/B.

## Explicit unit-overlap diagnostic (Draft PR #925, not adopted CI)

The default root `npm test` and all required PR/production jobs remain **sequential**.
Only a deliberately selected `workflow_dispatch` with boolean input
`unit_overlap_experiment=true` activates
`SVITLO_CI_UNIT_OVERLAP_EXPERIMENT=1` in the existing Production unit runner.
The input is not enabled by the `/production-quality` PR-comment command.

The opt-in mode preserves the eight selected workspace test capabilities and
seven topologically ordered prerequisite builds. All package builds and the
six smaller workspace tests run sequentially first. The exact current UI Kit
`test` is `npm run test:logic && npm run test:components`, with no pretest
or posttest hooks. The logic stage (including nested npm, typecheck and
locale generation) runs **before** Engine integration tests, whose fixtures
temporarily create `content/*/package.json` manifests. Only Engine
`npm run test` and UI Kit `npm run test:components` overlap. Any change to
the reviewed UI Kit script/hooks or selected test graph stops the experiment.

The job-local Engine `pretest` remains active and must successfully reuse
fully verified existing Engine outputs. Its build-reuse helper refuses any
rebuild during overlap; it does not permit shared-state writes across runners
or change the normal fail-closed verification policy. Both concurrent test
processes must finish; any failure causes the root command to fail. Timings
retain the opt-in validated text format, now distinguishing UI Kit logic
from components in diagnostic mode. Do not infer parity or a speedup before
source-pinned real tests. CPU/memory contention, temporary fixture isolation
and final aggregate status must be checked in a matched A/B. On no-go,
disable the diagnostic input (or revert the experiment) without changing
canonical workspace test scripts.

Run source-level regressions:

```sh
node --test scripts/runWorkspaceScript/run-workspace-script.spec.mjs scripts/ci/quietRun/quiet-run.spec.mjs scripts/ci/packageBuildReuse/package-build-reuse.spec.mjs scripts/ci/productionQuality/production-quality.spec.mjs
```

Root `package:build` and `code:lint:check` now execute via the pinned Turbo DAG, not this runner. The remaining root commands preserve their npm lifecycle hooks. See `studio/rules/package-scripts.md` and
`scripts/ci/productionQuality/README.md`.

Run focused validation:

```sh
node --test scripts/runWorkspaceScript/*.spec.mjs scripts/runFastGate/run-fast-gate.spec.mjs
```
