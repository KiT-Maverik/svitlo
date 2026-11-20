# Shard content builds: benchmark and production cutover

**Status:** The previously opt-in five-shard experiment is approved for
production promotion in [PR #729](https://github.com/KiT-Maverik/svitlo/pull/729).
The required status name and per-package tests are unchanged. Deployment
depends on merging the reviewed PR; this document does not claim a deployed
default-branch cutover.
## Baseline
In the **historical baseline**, `.github/workflows/content-build.yml` used `Content / prepare`, a per-textbook build matrix with `max-parallel: 5`, and stable required `Affected content / build, taxonomy and packaging`. In Ready main promotions all 17 eligible textbooks build in isolated jobs, each performing `npm ci`. In run 44605135850 the 17 installs summed to ~302 seconds (not wall-clock time), and all 17 content builds succeeded. That is not proof sharding is faster.

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

## Same-SHA result and cutover decision

[Successful run 44613383307](https://github.com/KiT-Maverik/svitlo/actions/runs/44613383307)
executed both designs on the same head SHA `f83b2a7f`:

| Measurement (content jobs only) | Original 17 jobs | Five shards |
| --- | ---: | ---: |
| Elapsed matrix wall time | ~183s | ~68s |
| Summed logged job lifetimes | ~717s | ~299s |
| `npm ci` invocations | 17 | 5 |
| Summed `npm ci` durations | ~282s | ~103s |
| Decoded logs | ~406 KB | ~121 KB |
| Successful packages | 17/17 | 17/17 |

The A/B variants shared CI runner scheduling and cache resources; these
measurements support the decision to cut over, but are not a guaranteed speed
improvement for every run. No billed runner-minute target applies.

## Production acceptance

- Preserve zero builds on Draft PRs and no-op selected scope on Ready PRs.
- Produce at most 5 shards, one install per shard, and check every selected
  package exactly once. Preserve agent scope and full manual/Ready-main coverage.
- Keep publication, tarball portability, asset, taxonomy and exports checks
  unchanged per textbook.
- For one failing package, annotate its path, process the remaining packages
  within that shard, return nonzero, and fail the stable protected verify job.
- Do not distribute `node_modules` or compiled outputs across runners.
- Retire the redundant opt-in parallel baseline matrix to avoid doubling work.
- The simulated failure test verifies actual child exit handling without
  deliberately corrupting educational content or performing a production deploy.
