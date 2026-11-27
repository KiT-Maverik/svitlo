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

Root `package:build` and `code:lint:check` now execute via the pinned Turbo DAG, not this runner. The remaining root commands preserve their npm lifecycle hooks. See `studio/rules/package-scripts.md` and
`scripts/ci/productionQuality/README.md`.

Run focused validation:

```sh
node --test scripts/runWorkspaceScript/*.spec.mjs scripts/runFastGate/run-fast-gate.spec.mjs
```
