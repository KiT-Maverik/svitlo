# Build command observability for CI

This is **passive, job-local instrumentation**, not a build runner, cache,
cross-job artifact transport, or permission to dispatch Production Quality.
It is part of PR #925 Phase 0. The existing compiler commands, npm lifecycle
hooks, per-shard isolation and protected check names remain authoritative.

`record-build-command.mjs` executes one original command and, if the
`SVITLO_CI_BUILD_TELEMETRY` environment variable points to an absolute
JSONL file **outside the repository**, records its workspace, command origin,
success/failure, wall duration, clean source revision and Actions identity.

Example (execute only as part of an already authorized CI workload):

```sh
export SVITLO_CI_BUILD_TELEMETRY="$RUNNER_TEMP/svitlo-content-builds.jsonl"
node scripts/ci/buildTelemetry/record-build-command.mjs \
  --workspace @svitlo/engine --origin content-shard -- \
  npm run package:build --workspace @svitlo/engine
node scripts/ci/buildTelemetry/summarize-builds.mjs \
  --file "$RUNNER_TEMP/svitlo-content-builds.jsonl"
```

These JSONL events are **actual `package:build` command invocations**, not
evidence that `tsc` internally compiled exactly once. The
`packageBuildReuse` helper has its own `built/reused/failed` events for
verified job-local requests. A report distinguishes those from direct commands.

The Content workflow collects separate per-job traces from its `prepare`
and up to five `shard` runners. It wraps their explicit Engine build commands
and records textbook `package:build` commands in `buildChangedContent` and
conditional Engine/UI Kit fallback builds in `buildTextbook`. The special
skills-agent route may request another Engine build in its own shard:
instrumentation reports that request rather than silently changing its checks.

A summary appears in each job's log and GitHub job summary. Traces are not
shared between jobs, never used for output reuse, and do not alter a failed
command's exit status.

The Ready and manually requested FastGate jobs also trace each required
prerequisite `package:build` (origin `fastgate-prerequisite`), without
changing which workspaces are selected for typechecking. Production Quality's
`types` job emits per-workspace `packageBuildReuse` events and its summary;
its job-local state remains the only authority for verified reuse. All three
paths remain deferred for an ordinary Draft PR. A missing or invalid optional telemetry file is
reported as a warning, **not** a skipped test or an invented performance result.

**Limits:** This does not yet instrument all npm lifecycle hooks, Turbo
`package:build`, exact TypeScript compiler process invocations, or every app
host. It cannot yield a complete CI compilation count without correlating
those commands, explicit CI job steps, and actual runner logs. Draft PRs
skip expensive Content shards. A full comparable baseline requires authorized
Ready/workflow events on pinned source and workload.

Focused, npm-free tests (run by Engine generators' cheap CI policy job on
changes to this directory):

```sh
node --test scripts/ci/buildTelemetry/*.spec.mjs
node --test scripts/ci/packageBuildReuse/package-build-reuse.spec.mjs
```
