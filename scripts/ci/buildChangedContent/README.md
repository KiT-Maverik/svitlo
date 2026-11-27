# Content package CI matrix

`plan-content-builds.mjs` discovers buildable workspaces from `content/*` and
`content/languages/*`, using their own `package.json` manifests. It produces
GitHub Actions job outputs `shards`, `has_builds`, `all` and `agent_mode`
without performing a build or modifying authored files.

- Pull requests promoting to production `main` **after** leaving Draft and manual workflow
  dispatch build every currently eligible content workspace. This remains true
  on later `synchronize` events while the PR is review-ready.
- **All Draft PRs** defer content package compilation/publication. The planner
  emits an empty matrix and the same stable required verification status; it
  does not install dependencies. Draft authored-blocker reporting is still
  enforced independently by `Blocker TODOs / clean`.
- **Ready PRs** targeting `develop` or intermediate integration branches build
  touched textbooks, with representative smoke packages for shared tooling.
  Ready `main` promotions build every eligible textbook.
- The existing `feat/<subject>-skills-agent-N` child branch contract retains
  its assigned-domain TypeScript/structure check instead of a full package build.
- If nothing is selected, the matrix skips and the stable final required check
  succeeds only if the prepare job passed.
- The selected packages are grouped deterministically into at most **three shards**.
  Each runner installs dependencies once, then invokes
  `build-changed-content.mjs --package <path> <kind>` independently for every
  package in its shard. Publication, taxonomy, portability and compiled-export
  checks remain per package. A changed Math package additionally runs its
  package-owned `test:types` and `test` scripts; its remaining taxonomy locale
  assertions are not React component tests. A failed package is annotated; remaining packages
  in the shard still run and its job fails at the end.
  Runner outputs and generated resources remain isolated between shards.
- The prepare job owns common tests, review-ready resource readiness,
  `repo:check:packages` and artifact-guard regression tests. The final
  `Affected content / build, taxonomy and packaging` job preserves the
  existing Protect main required-status context and fails if preparation or any
  required selected matrix build fails.

`workflow_dispatch` is the explicit full-build entrypoint, including for a
still-Draft PR branch selected manually in the Actions UI or via
`gh workflow run content-build.yml --ref <branch>`. It bypasses Draft deferral
and checks all content packages. Use the workflow rather than invoking the
planner locally without `BASE_SHA`, `HEAD_SHA` and GitHub event variables.

## Three-shard cost optimization (PR #925)

The owner chose **lower total runner time** over the approximately six-second
median Content shard wall-time difference observed in three same-SHA paired
experiments. The default planner and maximum parallel shard jobs are now both
**three**; the per-shard install, Engine build, selected package verification,
publication/portability checks, and final required status are unchanged.
Partial scopes still use only the required one to three shards, and a failed
shard still fails the aggregate.

All three paired measurements used exactly the same commit
`d9ffc591d15009736f5e664a7303d1e6fc780e2c` (17/17 packages per
variant, all jobs successful; full Production Quality also passed):

| Run                                                                           | Five-shard wall / total runner seconds | Three-shard wall / total runner seconds |
| ----------------------------------------------------------------------------- | -------------------------------------- | --------------------------------------- |
| [46058035050](https://github.com/KiT-Maverik/svitlo/actions/runs/46058035050) | 66 / 304                               | 59 / 168                                |
| [46058613129](https://github.com/KiT-Maverik/svitlo/actions/runs/46058613129) | 79 / 329                               | 85 / 230                                |
| [46059163590](https://github.com/KiT-Maverik/svitlo/actions/runs/46059163590) | 84 / 307                               | 152 / 298                               |
| **Median**                                                                    | **79 / 307**                           | **85 / 230**                            |

Three shards reduced median runner seconds by about **25%** for the shard
group, but increased median group wall time by about **7.6%** and showed
considerable runner variance. This A/B ran on temporary isolated diagnostic
jobs in parallel with Production Quality, **not** the ordinary Content Build
prepare and protected verify chain; it is not a measured end-to-end CI
speedup or a billing claim. The owner accepted this cost/latency tradeoff.
The temporary diagnostic jobs were removed after measurement. Preserve
source-pinned parity and verify the new production selection under actual
Ready/dispatch content builds before any merge.

## Verified five-shard cutover

Same-commit comparison from
[run 44613383307](https://github.com/KiT-Maverik/svitlo/actions/runs/44613383307)
confirmed 17/17 packages passing with both layouts. The shard matrix took
about 68 seconds versus 183 seconds for the original, with about 103 seconds
versus 282 seconds in summed installs. These are measurements of runner logs,
not assumptions about billed minutes.

`Content / prepare` still fails closed. Draft PRs create no build shards;
Ready develop PRs build only the selected packages (one shard if one package
is affected); Ready main PRs and manual dispatch cover all eligible packages.
The required `Affected content / build, taxonomy and packaging` job depends
on successful preparation and **all selected shards**. A failed package
produces a bounded `::error` annotation, all other packages in the shard
still run, and the shard returns a nonzero status. The failure regression
test executes real child processes, deliberately fails one, and asserts that
the rest are attempted and that the resulting shard status is nonzero.
