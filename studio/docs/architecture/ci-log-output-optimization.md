# CI log output: full-workflow optimization

**Status (2026-11-27):** active, **partial** implementation and evidence on [PR #915](https://github.com/KiT-Maverik/svitlo/pull/915). The full-workflow baseline, matched after-runs, transitive script audit, and independent reviews remain open. This is not a claim that the acceptance criteria have passed.

## Problem and evidence

GitHub Actions output must remain useful to humans while being cheap for AI agents to inspect. On PR #900's successful full Production Quality run [#46011291152](https://github.com/KiT-Maverik/svitlo/actions/runs/46011291152), all 16 jobs passed. An earlier full successful run [#46007490987](https://github.com/KiT-Maverik/svitlo/actions/runs/46007490987) generated **246,152 Unicode characters across 16 job logs**. This is a reference point for *one* workflow on an earlier SHA, **not** a complete all-workflow baseline, token count, or proof of an optimization opportunity in each step.

At brief creation, the `develop` tree contains **27 workflow YAML files** in `.github/workflows/`; a literal source inspection counted **106 mentions** of `quiet-run.mjs` across those files (not 106 verified executions). Several trusted/command workflows deliberately do not use it. Runner setup, checkout, caching, GitHub Actions service output and third-party actions may account for a large irreducible portion of a log. Do not claim all of it is under our control.

## Required complete scope

Audit **every job and step of every current workflow**, including reusable workflows, dynamically constructed matrix jobs, scheduled/dispatch-only flows and indirectly invoked repository/package scripts. Start from the complete file listing in `.github/workflows/` and walk through `.github/actions/` (if present), `scripts/ci/`, applicable application/package scripts and npm scripts. The source-level starting inventory and current changes are recorded in the **27-workflow snapshot** below. Discover the workflow set from the current tree again before final acceptance; this is not a maintained allowlist.\n\nThat inventory is a starting snapshot, not a permanently maintained allowlist. Discover new/renamed workflows dynamically when validating coverage.

## Design priorities

1. **Measure first.** Use source-SHA-verified Actions evidence to count log bytes/Unicode characters, per job, step and major source category, on representative successes and failures. Record workflow/run IDs, events, job matrix scope, sample sizes, duration, and whether an older run is comparable. Measure agent-retrieved diagnostic volume separately from total GitHub log volume.
2. **Minimize at the source.** Prefer each tool's supported quiet/summary/reporting settings (npm, Turbo, TypeScript, ESLint, tests, builds, generators, app/desktop/mobile tooling) and compact project-owned script output at the call site. Keep useful failures and machine-consumed results intact. Reduce duplicated install, build and command-output chatter without quietly dropping work.
3. **Re-evaluate `quiet-run` from first principles.** Read `scripts/ci/quietRun/quiet-run.mjs`, its tests and consumers; compare keeping it, simplifying it, replacing it with smaller purpose-specific mechanisms, or removing it. Do not preserve or delete it by fiat; avoid layering a new universal wrapper on top of noisy original sources.
4. **Distinguish reporting from execution.** Existing GitHub job/step statuses, annotations and native `GITHUB_STEP_SUMMARY` can provide compact summaries without creating an unnecessary new service or artifact protocol. Prefer selective failed-step retrieval for agents rather than loading complete successful logs.
5. **Preserve correctness and trust.** Never suppress exit codes, workflow commands/annotations, security and authorization feedback, trusted-materialization source pins, actionable first errors, package verification or required status checks. Never intercept structured stdout, credentials or protocol output unsafely. Prevent secret exposure; keep detailed failure diagnostics accessible through a deliberate safe path.
6. **Avoid fabricated thresholds.** Set realistic goals after measuring controllable vs runner-generated output. No arbitrary universal 4 KB-per-job requirement, log-size success at the cost of debugging, or unsupported speedup/token-savings claims.

## Evidence and acceptance

- Publish a complete workflow/job/step inventory showing every applicable invocation, its selected strategy, exceptions and why they must remain verbose/protocol-safe. Do not omit rare/manual/security workflows.
- Implement and test the simplest coherent solution; update source logs, workflows and any obsolete `quiet-run` docs/tests consistently. Remove dead implementation only after reference audit and behavior parity.
- Exercise successful, failing, cancelled and relevant invalid-command/exit cases. Assert failure cause visibility, exit propagation, annotation integrity, native outputs, and trusted PR-command/materializer boundaries. Test supported platforms for changed spawn behavior where feasible.
- Compare representative successful and failed workflows *before and after* with exact SHAs, bytes/characters, agent-retrieved excerpts, and workflow/job timing. Explain variance and portions that cannot be optimized.
- Preserve Draft/Ready/main protections, shell/CI environment, required contexts, app/browser/E2E/test/build coverage and authorizations. Run focused tests, Ready checks, and Production Quality **only when owner-authorized under CI policy**.
- Update canonical `studio/rules/ci-workflow.md`, affected READMEs and architecture documentation to reflect actual implementation; avoid maintaining duplicate lists of workflow names.

**Ownership:** one Coding Agent may implement the coherent cross-workflow change on this Draft PR; separate independent Development and QA review contexts verify actual behavior before Ready. Do not split into competing workflow migrations without an explicit, non-overlapping dependency plan.

## Measured pre-change reference

On the successful `Production Quality` workflow_dispatch run
[#46011291152](https://github.com/KiT-Maverik/svitlo/actions/runs/46011291152)
at source SHA `6096706c4c638c4ff4e755b0d94c0a4b797bcf17`
(merged #900 candidate, 2026-11-27), the **16 complete job logs** returned by
the GitHub Actions API sum to **245,703 UTF-8 bytes** and **245,403 Unicode
code points**. Bytes and code points were counted from the retrieved decoded
logs, not estimated from GitHub's UI. A job is not a test suite and the
sum is **not** an all-27-workflow baseline.

| Job (short name) | Job ID | Bytes | Unicode characters |
| --- | ---: | ---: | ---: |
| prior result | 140547165481 | 10,341 | 10,339 |
| source policy | 140547251795 | 13,877 | 13,811 |
| lint | 140547366377 | 12,487 | 12,485 |
| TypeScript | 140547366470 | 14,882 | 14,880 |
| repository integrity | 140547366499 | 12,985 | 12,983 |
| distributable packages | 140547366511 | 14,190 | 14,188 |
| unit tests | 140547366552 | 13,757 | 13,755 |
| extra component tests | 140547366555 | 14,945 | 14,943 |
| apps-platform | 140547366557 | 16,523 | 16,521 |
| apps-web | 140547366632 | 19,152 | 19,150 |
| apps-desktop | 140547366685 | 16,425 | 16,423 |
| apps-mobile | 140547366767 | 17,657 | 17,655 |
| Engine generators / policy | 140547367296 | 18,307 | 18,235 |
| Engine generators / publisher isolation | 140547367365 | 20,180 | 20,070 |
| Engine generators / tests | 140547367367 | 24,502 | 24,474 |
| verify aggregate | 140549412025 | 5,493 | 5,491 |
| **Total** | | **245,703** | **245,403** |

Most success-side project commands in this run already print only
`PASS` and a duration via `quiet-run`. Logs continue to include runner
provisioning, step declarations/echoed command lines, checkout, setup-node,
cache setup/cleanup, and third-party action diagnostics. These portions
cannot be assumed removable without losing traceability or changing setup
behavior. A separate successful reference
[#46007490987](https://github.com/KiT-Maverik/svitlo/actions/runs/46007490987)
ran at **different** SHA `385673b5d971807d940348a2d228c2abe462bf1f`;
its previously reported 246,152 characters are **not** a matched
performance comparison.

For a **non-comparable failure example**, Engine generators run
[#46015555368](https://github.com/KiT-Maverik/svitlo/actions/runs/46015555368)
at `6c2729f4637ff012a98e24efa33f2d299695e722` produced a
29,270-byte / 29,158-character failing `generator-tests` job log
(job 140561643690). The failed wrapped test step still reported
`FAIL node --test (exit 1)` and a bounded excerpt. This is evidence of
failure-log behavior, **not** comparable before/after data for #915.

## Source-level snapshot: 27 workflows

The repository's `.github/workflows/` directory was enumerated and all
27 YAML sources inspected on the PR branch. No `.github/actions/` directory
was present at that revision. Entries below list job IDs (the reusable
workflow call is called out explicitly); matrix values and transitive
scripts must be followed again at final verification. `Unchanged` is a
deliberate first-pass choice, **not** proof of zero remaining noise.

| Workflow | Jobs / special scope | Current decision or change |
| --- | --- | --- |
| `agent-ci-artifacts` | resolve, generate; PR comment/dispatch | Keep pinned-source resolution, generated artifact metadata and file outputs direct; Engine package build already quiet |
| `assessment-materialization` | verify, resolve, analyze, publish | Native compact Node test output, quiet only verify-job install/build; trusted analyze/publish protocol direct |
| `backfill-labels` | backfill; workflow_run/dispatch | Unchanged: GitHub Script state transitions |
| `bank-materialization` | typed_resolve, typed_analyze, typed_publish | Keep existing scoped quiet build/typed commands and source-pin protections; no blind changes |
| `blocker-todos` | clean | Existing quiet unit tests; keep active blocker scan and annotations direct |
| `content-build` | prepare, build, verify; dynamically selected shards | Existing quiet builds; keep scope planner and output/asset validation direct |
| `contentblock-build-api` | verify | Existing quiet install/tests |
| `course-navigation-web` | verify; browser run | Existing quiet install/build/Playwright; preserve browser artifacts |
| `course-typed-materialization` | verify-implementation, resolve, analyze, publish, reconcile-pr-tables | Native compact verify tests, quiet verify install/build; preserve trusted transaction, Git checks and reconciliation output |
| `db-controllers-e2e` | browser-controllers | Existing quiet build/browser tests; keep artifacts |
| `desktop-ci` | desktop, native-installers | Existing quiet common commands; do **not** intercept npm-audit JSON/exit statuses, native packaging or smoke diagnostics |
| `engine-coverage` | analyze; on-demand report | Native compact reporter only for the direct report unit test; keep coverage metrics/report and upload visible |
| `engine-generators` | publisher-isolation, ci-policy, generator-tests; reusable `workflow_call` | Native compact reporter for three direct test commands; existing quiet generator suite and security checks unchanged |
| `episode-materialization` | verify, resolve, analyze, publish | Native compact tests and quiet verify install/build; preserve trusted analyze/publish |
| `fast-gate` | verify; PR/dispatch | Native compact focused stub-guard test; keep TypeScript planner, required status and source guard direct |
| `frontend-components` | verify; push/dispatch | Quiet direct root `npm test` as an existing human-readable suite; other commands already quiet |
| `get-lesson` | resolve, analyze; PR comment/dispatch | Unchanged: source-pinned resolution and generated report transport |
| `lesson-materialization` | typed-resolve, typed-analyze, typed-publish | Existing scoped quiet execution; leave trust-transaction output and boundaries unchanged pending audit |
| `mobile` | web, android, ios | Existing quiet install/build/test; preserve native Android/iOS tool output where needed for packaging diagnosis |
| `pr-auto-format` | format | Unchanged: source-mutating formatter and commit/branch lease diagnostics |
| `pr-clear-blocked-on-merge` | cleanup | Unchanged: GitHub Script and label actions |
| `pr-labeler` | apply | Unchanged: provider action outputs are not shell chatter |
| `production-quality-command` | dispatch; on-comment | Unchanged: authorization and workflow dispatch feedback |
| `production-quality` | reuse, policy, repository, types, unit, generators, components, lint, packages, apps (dynamic matrix), verify | Native compact source-policy tests; existing quiet build/test workers and mandatory aggregate preserved |
| `repository-git-audit` | audit; dispatch/comment | Existing quiet tests; keep generated audit/report protocol direct |
| `sync-labels` | synchronize | Unchanged: provider GitHub Script for label mutations |
| `ui-kit-storybook` | storybook; browser checks | Quiet human-readable Playwright dependency installer; retain test and server-artifact diagnostic channels |

### Implemented choice and local probe

Use Node's native `--test-reporter=dot` on **ten direct Node test commands**
in seven workflow files, without removing any existing test paths or changing
job conditions. The existing Engine generators CI-policy job also runs the
`quiet-run.spec.mjs` file directly (once), exercising the new regressions on
Draft PRs without adding a workflow or spawning nested test processes. The native reporter retains failure details and returns
the original nonzero test status. The direct reporter is intentionally not
forced on every process or into `NODE_OPTIONS`. On a **synthetic local
Node v22** test file with 80 successful subtests, TAP produced **8,082 bytes**
and the native dot reporter **85 bytes**. A separate synthetic failing
subtest printed its first-cause `Error` and exited nonzero. This is a
CLI behavior probe, **not** a measurement of GitHub-run savings.

Retain `quiet-run` for existing safe human-readable commands and the few
identified missing wrappers (verify-only installs/builds, root frontend
tests, Storybook Playwright installation). It remains explicitly forbidden
around machine-consumed stdout, GitHub workflow commands, authentication/
authorization and source-pinned materializer transaction protocols.
The existing `quiet-run` regression file now covers warning/error
annotations, nonzero exit, child signal, and file-based `GITHUB_OUTPUT`
alongside its prior failure-excerpt/Windows cases.

### Still required before Ready

1. Audit transitive scripts and matrix expansions at real executed source
   SHA, not just YAML sources; classify top log producers per step and job.
2. Obtain source-pinned **success and failure** baselines across the other
   workflows with exact event/branch, runtime, runner minutes, bytes,
   Unicode characters, and bounded agent diagnostic retrieval cost.
3. Run actual repository-focused test suites and YAML/format checks on the
   final branch SHA; confirm shell commands, statuses, cancellation, GitHub
   annotations/outputs and PR-command source trust still work.
4. Collect representative **matched after** Actions logs and distinguish
   raw output reduction, job time, runner cost, and reduced API retrieval.
   The 80-test micro-probe does not substitute for this.
5. Obtain independent Development and QA reviews in separate contexts,
   resolve findings, transition to Ready and inspect the resulting checks.
   Do **not** manually dispatch full Production Quality without owner
   authorization.
