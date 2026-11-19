# Benchmark production textbook matrix sharding

**Status:** Draft opt-in benchmark harness. The protected per-textbook matrix is unchanged; shard promotion is **not approved** until a same-SHA experiment demonstrates a gain.

## Baseline
`.github/workflows/content-build.yml` has `Content / prepare`, a per-textbook build matrix with `max-parallel: 5`, and stable required `Affected content / build, taxonomy and packaging`. In Ready main promotions all 17 eligible textbooks build in isolated jobs, each performing `npm ci`. In run 44605135850 the 17 installs summed to ~302 seconds (not wall-clock time), and all 17 content builds succeeded. That is not proof sharding is faster.

## Implementation
1. Record an apples-to-apples baseline: elapsed critical path, sum of job times, `npm ci` count/duration, successful/failed log bytes and per-package failure clarity. Include the full production case and an affected-one-textbook develop case.
2. Trial a deterministic bounded matrix of roughly 4–5 balanced shards *without changing which packages must build*. Install dependencies once per shard; retain isolated per-package publish/tarball portability, asset, taxonomy and compiled-export checks. Compare against current per-textbook jobs.
3. Preserve scoped develop/Draft/agent selection, `workflow_dispatch` full mode, fail-closed `Content / prepare` and the EXACT stable required `Affected content / build, taxonomy and packaging` context. No unconditional installs on docs-only PRs.
4. On an individual textbook failure, give a short identified `::error` plus an independently discoverable bounded diagnostic, continue reporting other selected package outcomes and fail the overall job. No unverified shared `node_modules` artifact across untrusted jobs.
5. Add planner/matrix tests for zero/one/all-selected, failed shard, missing package and legacy agent scopes. Benchmark at matching SHAs and document safety/runner-minute tradeoffs. If sharding is slower or unclear, retain the original matrix and submit measured findings only.

## Out of scope
Do not change Production Quality's root build aggregation (separate PR) or remove publication/portability checks. Do not weaken any protected required status.

## Measured baseline: successful full production selection

Source: [Content packages build run 44605135850](https://github.com/KiT-Maverik/svitlo/actions/runs/44605135850)
on 2026-11-19; all 19 jobs passed (prepare, 17 content jobs, verify).

| Metric | Measurement |
| --- | ---: |
| Complete workflow elapsed (first logged event to last) | ~231 seconds |
| Sum of logged job lifetimes, including prepare and verify | ~746 seconds |
| Matrix `npm ci` executions | 17 |
| Sum of matrix `npm ci` durations (quiet runner PASS summaries) | ~302.0 seconds |
| Prepare dependency installs (two steps, excluded above) | ~19.6 seconds |
| Combined decoded job log bytes | ~456 KB |
| Maximum original matrix concurrency | 5 |
| Selected packages passed | 17/17 |

The duration values derive from timestamped job logs; logged job lifetimes are
**not** identical to GitHub billed runner minutes. Summed install time is
**not** equivalent to critical-path savings because installs run concurrently.

## Controlled experiment

`workflow_dispatch` defaults to the original all-textbook matrix. Set
`benchmark_shards=true` on the PR branch to run **both** variants at the
same commit, with identical common prepare checks and all selected packages.
The extra `Content benchmark / shard-*` jobs install once per shard and use
the same per-book verifier as the unchanged baseline. The protected verify job
depends on the original matrix, **not** on the trial.

Before switching production, record the actual trial critical path, sum of
shard runner times, install durations, log volume, per-book errors and cost
against the baseline **in that same run**. Also compare a representative
one-textbook develop PR; sharding must not broaden its selected scope.
Verify explicit failed-shard handling. If evidence is inconclusive or regression
occurs, retain the original matrix and document the findings. The opt-in
benchmark is intentionally not a production optimization by itself.

**Pending live evidence:** same-SHA baseline-vs-shards run, develop one-package
measurement, GitHub billed minutes, failure injection and final cutover decision.
