# Benchmark production textbook matrix sharding

**Status:** implementation/benchmark specification for a Draft PR; no CI behavior changed by this document.

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
