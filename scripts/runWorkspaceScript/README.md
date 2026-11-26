# Root workspace aggregation and TypeScript checking

The canonical root workspace runner is `run-workspace-script.mjs`. It discovers
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

Other root operations keep their existing sequential execution and npm
lifecycle hooks. See `studio/rules/package-scripts.md` and
`scripts/ci/productionQuality/README.md`.

Run focused validation:

```sh
node --test scripts/runWorkspaceScript/*.spec.mjs scripts/runFastGate/run-fast-gate.spec.mjs
```
