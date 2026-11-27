# CI log output: full-workflow optimization

**Status (2026-11-27):** implementation and source-level inventory are in progress on [PR #915](https://github.com/KiT-Maverik/svitlo/pull/915), with both success and failure baseline samples verified against Actions source SHAs. Full after-data and independent reviews are tracked in the PR conversation. This guide records architecture decisions and empirical limitations; it is **not** an assertion that all matrix/event paths executed.

## Problem and evidence

GitHub Actions output must remain useful to humans while being cheap for AI agents to inspect. On PR #900's successful full Production Quality run [#46011291152](https://github.com/KiT-Maverik/svitlo/actions/runs/46011291152), all 16 jobs passed. An earlier full successful run [#46007490987](https://github.com/KiT-Maverik/svitlo/actions/runs/46007490987) generated **246,152 Unicode characters across 16 job logs**. This is a reference point for _one_ workflow on an earlier SHA, **not** a complete all-workflow baseline, token count, or proof of an optimization opportunity in each step.

At brief creation, the `develop` tree contains **27 workflow YAML files** in `.github/workflows/`; a literal source inspection counted **106 mentions** of `quiet-run.mjs` across those files (not 106 verified executions). Several trusted/command workflows deliberately do not use it. Runner setup, checkout, caching, GitHub Actions service output and third-party actions may account for a large irreducible portion of a log. Do not claim all of it is under our control.

## Required complete scope

Audit **every job and step of every current workflow**, including reusable workflows, dynamically constructed matrix jobs, scheduled/dispatch-only flows and indirectly invoked repository/package scripts. Start from the complete file listing in `.github/workflows/` and walk through `.github/actions/` (if present), `scripts/ci/`, applicable application/package scripts and npm scripts. The source-level starting inventory and current changes are recorded in the **27-workflow snapshot** below, with each job, step, condition, reusable call and source reference in the [independent static job/step inventory](./ci-log-output-job-step-inventory.md). Discover the current tree again before final acceptance; neither document is a maintained allowlist.\n\nThat inventory is a starting snapshot, not a permanently maintained allowlist. Discover new/renamed workflows dynamically when validating coverage.

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
- Compare representative successful and failed workflows _before and after_ with exact SHAs, bytes/characters, agent-retrieved excerpts, and workflow/job timing. Explain variance and portions that cannot be optimized.
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

| Job (short name)                        |       Job ID |       Bytes | Unicode characters |
| --------------------------------------- | -----------: | ----------: | -----------------: |
| prior result                            | 140547165481 |      10,341 |             10,339 |
| source policy                           | 140547251795 |      13,877 |             13,811 |
| lint                                    | 140547366377 |      12,487 |             12,485 |
| TypeScript                              | 140547366470 |      14,882 |             14,880 |
| repository integrity                    | 140547366499 |      12,985 |             12,983 |
| distributable packages                  | 140547366511 |      14,190 |             14,188 |
| unit tests                              | 140547366552 |      13,757 |             13,755 |
| extra component tests                   | 140547366555 |      14,945 |             14,943 |
| apps-platform                           | 140547366557 |      16,523 |             16,521 |
| apps-web                                | 140547366632 |      19,152 |             19,150 |
| apps-desktop                            | 140547366685 |      16,425 |             16,423 |
| apps-mobile                             | 140547366767 |      17,657 |             17,655 |
| Engine generators / policy              | 140547367296 |      18,307 |             18,235 |
| Engine generators / publisher isolation | 140547367365 |      20,180 |             20,070 |
| Engine generators / tests               | 140547367367 |      24,502 |             24,474 |
| verify aggregate                        | 140549412025 |       5,493 |              5,491 |
| **Total**                               |              | **245,703** |        **245,403** |

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

| Workflow                       | Jobs / special scope                                                                                          | Current decision or change                                                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `agent-ci-artifacts`           | resolve, generate; PR comment/dispatch                                                                        | Keep pinned-source resolution, generated artifact metadata and file outputs direct; Engine package build already quiet                                                                           |
| `assessment-materialization`   | verify, resolve, analyze, publish                                                                             | Native compact Node test output, quiet only verify-job install/build; trusted analyze/publish protocol direct                                                                                    |
| `backfill-labels`              | backfill; workflow_run/dispatch                                                                               | Unchanged: GitHub Script state transitions                                                                                                                                                       |
| `bank-materialization`         | typed_resolve, typed_analyze, typed_publish                                                                   | Keep existing scoped quiet build/typed commands and source-pin protections; no blind changes                                                                                                     |
| `blocker-todos`                | clean                                                                                                         | Existing quiet unit tests; keep active blocker scan and annotations direct                                                                                                                       |
| `content-build`                | prepare, build, verify; dynamically selected shards                                                           | Existing quiet builds; keep scope planner and output/asset validation direct                                                                                                                     |
| `contentblock-build-api`       | verify                                                                                                        | Existing quiet install/tests                                                                                                                                                                     |
| `course-navigation-web`        | verify; browser run                                                                                           | Existing quiet install/build/Playwright; preserve browser artifacts                                                                                                                              |
| `course-typed-materialization` | verify-implementation, resolve, analyze, publish, reconcile-pr-tables                                         | Native compact verify tests, quiet verify install/build; preserve trusted transaction, Git checks and reconciliation output                                                                      |
| `db-controllers-e2e`           | browser-controllers                                                                                           | Existing quiet build/browser tests; keep artifacts                                                                                                                                               |
| `desktop-ci`                   | desktop, native-installers (macOS/Windows)                                                                    | Keep npm-audit JSON/exit statuses direct; summarize successful `npm explain` provenance through existing quiet runner while preserving failed diagnostics; native packaging/smoke remain visible |
| `engine-coverage`              | analyze; on-demand report                                                                                     | Native compact reporter only for the direct report unit test; keep coverage metrics/report and upload visible                                                                                    |
| `engine-generators`            | publisher-isolation, ci-policy, generator-tests; reusable `workflow_call`                                     | Native compact reporter for three direct test commands; existing quiet generator suite and security checks unchanged                                                                             |
| `episode-materialization`      | verify, resolve, analyze, publish                                                                             | Native compact tests and quiet verify install/build; preserve trusted analyze/publish                                                                                                            |
| `fast-gate`                    | verify; PR/dispatch                                                                                           | Native compact focused stub-guard test; keep TypeScript planner, required status and source guard direct                                                                                         |
| `frontend-components`          | verify; push/dispatch                                                                                         | Quiet direct root `npm test` as an existing human-readable suite; other commands already quiet                                                                                                   |
| `get-lesson`                   | resolve, analyze; PR comment/dispatch                                                                         | Unchanged: source-pinned resolution and generated report transport                                                                                                                               |
| `lesson-materialization`       | typed-resolve, typed-analyze, typed-publish                                                                   | Existing scoped quiet execution; leave trust-transaction output and boundaries unchanged pending audit                                                                                           |
| `mobile`                       | web, android, ios                                                                                             | Existing quiet npm commands; use Gradle native `--quiet` for Android task chatter, retaining Gradle errors; manual-only iOS xcodebuild remains raw until verified                                |
| `pr-auto-format`               | format                                                                                                        | Unchanged: source-mutating formatter and commit/branch lease diagnostics                                                                                                                         |
| `pr-clear-blocked-on-merge`    | cleanup                                                                                                       | Unchanged: GitHub Script and label actions                                                                                                                                                       |
| `pr-labeler`                   | apply                                                                                                         | Unchanged: provider action outputs are not shell chatter                                                                                                                                         |
| `production-quality-command`   | dispatch; on-comment                                                                                          | Unchanged: authorization and workflow dispatch feedback                                                                                                                                          |
| `production-quality`           | reuse, policy, repository, types, unit, generators, components, lint, packages, apps (dynamic matrix), verify | Native compact source-policy tests; existing quiet build/test workers and mandatory aggregate preserved                                                                                          |
| `repository-git-audit`         | audit; dispatch/comment                                                                                       | Existing quiet tests; keep generated audit/report protocol direct                                                                                                                                |
| `sync-labels`                  | synchronize                                                                                                   | Unchanged: provider GitHub Script for label mutations                                                                                                                                            |
| `ui-kit-storybook`             | storybook; browser checks                                                                                     | Quiet human-readable Playwright dependency installer; retain test and server-artifact diagnostic channels                                                                                        |

### Transitive call-site decisions and matrix coverage

This audit followed commands into the _current_ root and selected workspace manifests and named script entrypoints; labels in the structural inventory describe source **steps**, while a single step can execute multiple nested npm lifecycle scripts. The following ownership is material for stdout decisions:

| Entrypoint / job family                                         | Actual downstream output and required handling                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Root `package:build` and `code:lint:check`                      | Pinned local Turbo task graph, no caches, bounded concurrency. Existing outer `quiet-run` hides successful per-workspace scheduling and preserves failed task excerpts; cache and dependency behavior untouched                                                                                                                                                         |
| Root `test`, `code:check:types`, `app:build`, `test:components` | `runWorkspaceScript` discovers manifests, runs topological dependency builds, emits per-workspace progress; npm `pretest` / `preapp:build` hooks remain active. Outer quiet-run is safe for human-readable output only; verbose reproduction is available                                                                                                               |
| FastGate `runFastGate`                                          | Uses a nested quiet command runner; the top-level planner must stay direct because it reports selected targets, failures and Draft/Ready scope, and can spawn builds and typechecks                                                                                                                                                                                     |
| Production `plan-app-matrix`                                    | Discovers **all four** `app:build` hosts from manifests (web/platform/mobile/desktop in the pinned sample), emits the matrix to `GITHUB_OUTPUT`, and rejects E2E-only apps without a build. It is deliberately not wrapped. Production also calls the _reusable_ Engine generators workflow                                                                             |
| Selected content planner and sharded builder                    | `plan-content-builds` chooses affected textbooks and writes `GITHUB_OUTPUT`; dynamic `content-shards` must retain per-textbook failure provenance. No hardcoded static shard set replaces the dynamic planner                                                                                                                                                           |
| Backfill labels / Desktop native installers                     | Backfill has a fixed four-shard matrix `[0,1,2,3]`. Desktop installer matrix is **macOS + Windows** in the cited run, with a separate Linux packaging path in the main desktop job; preserve native artifact verification                                                                                                                                               |
| Web/Playground/UI Kit/Math test workspaces                      | Vitest, Node test runner and Playwright are invoked via npm scripts, sometimes with compilation, content preparation and browser artifact prerequisites. Do not substitute dot reporting for an npm script whose internal runner is not a direct `node --test` invocation                                                                                               |
| Trusted Course/Episode/Lesson/Assessment/Bank PR commands       | Default-branch authorization, actor permission, pinned source SHA, isolated analyzer, sealed manifest and privileged Git publication retain their stdout and `GITHUB_OUTPUT` semantics. The existing older quiet-wrapped Bank/Lesson/Course analyzer invocations have **not** been broadened; new noise suppression targets only explicitly scoped verify-only commands |
| Desktop audit / provenance                                      | `npm audit --json` writes machine data to files; audit statuses and advisory summaries stay direct. `npm explain` was the single largest safe human-readable success source in a Desktop job; quiet its success output while retaining failed command diagnostics and the existing lockfile resolution check                                                            |
| Mobile native compilation                                       | `./gradlew assembleDebug --no-daemon --quiet` selects Gradle's supported native logging mode without changing the task or exit code. The iOS Simulator `xcodebuild` command is manual-only and remains unchanged; source and observed native build failures must remain reviewable                                                                                      |
| Agent artifact, lesson lookup and coverage jobs                 | SHA-pinned generated manifest checks, report files, JSON fields, coverage summaries and uploads are intentionally direct; diagnostic artifacts are one-day scoped. Do not wrap machine-readable stdout or hide first-cause coverage errors                                                                                                                              |
| GitHub runner/provider steps                                    | Checkout/setup/cache/action post-cleanup and third-party actions are independent log producers. The source cannot safely erase their setup or security audit trail, and their output establishes a baseline floor                                                                                                                                                       |

The `.github/actions/` directory was absent in the examined tree. The [step-by-step inventory](./ci-log-output-job-step-inventory.md) records every YAML-defined job step. Its matrix expressions and conditional branches are **definitions**, not claims about unobserved platform or manual dispatch executions.

### Additional source-pinned before samples

These are **different source SHAs and scopes**, not directly comparable throughput measurements. The byte count measures complete decoded UTF-8 **job logs** retrieved from Actions. Unicode characters count code points (not tokens). Duration is full workflow wall-clock from Actions metadata, even where only one job is measured.

| Workflow, outcome, event / immutable SHA                                                                                                                     | Job measured                                         | UTF-8 bytes / Unicode characters | Workflow time |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | -------------------------------: | ------------: |
| [Frontend #46012031612](https://github.com/KiT-Maverik/svitlo/actions/runs/46012031612), success, dispatch, `97d65ffca506784fc94d75547c2b10c974532b4c`       | 140549710185                                         |                220,217 / 216,564 |         724 s |
| [Frontend #46010806830](https://github.com/KiT-Maverik/svitlo/actions/runs/46010806830), failure, dispatch, `3e0a3026263137f8ab06a6f4e4f2a636699eed1c`       | 140545517860                                         |                231,835 / 228,919 |         261 s |
| [Desktop #46013560739](https://github.com/KiT-Maverik/svitlo/actions/runs/46013560739), success, PR, `67dcd7368f4b65cf2a84ca28f0a18e174c0f5f7e`              | 140554915804 (main desktop only)                     |                  84,982 / 84,972 |         235 s |
| [Mobile #46013560353](https://github.com/KiT-Maverik/svitlo/actions/runs/46013560353), success, PR, same SHA as Desktop                                      | 140554997936 (Android only)                          |                  37,050 / 37,046 |         134 s |
| [Engine generators #46013560492](https://github.com/KiT-Maverik/svitlo/actions/runs/46013560492), success, PR, same SHA                                      | three jobs: 140554898733, 140554899188, 140554899228 |                  65,225 / 65,015 |         117 s |
| [Engine generators #46013960595](https://github.com/KiT-Maverik/svitlo/actions/runs/46013960595), failure, PR, `7f3886a064157e7ad0ea2d9c9ca05119dd870e21`    | 140556229076 (failing tests only)                    |                  29,843 / 29,755 |         105 s |
| [Typed Course #46013960636](https://github.com/KiT-Maverik/svitlo/actions/runs/46013960636), success, PR, same `7f3886a...` SHA                              | 140556228976                                         |                  29,136 / 28,968 |          71 s |
| [Typed Course #46009626824](https://github.com/KiT-Maverik/svitlo/actions/runs/46009626824), failure, PR, `cb11abd7461b177e5f02ae9b948e240773a755ac`         | 140541524572                                         |                  28,915 / 28,741 |          65 s |
| [Engine coverage #46009961761](https://github.com/KiT-Maverik/svitlo/actions/runs/46009961761), failure, comment, `74758a8651eb16c056e382c5e0b3e632e6c778db` | 140542647694                                         |                  44,807 / 44,745 |         252 s |

Pre-change Frontend's unwrapped `npm test` step accounted for approximately **201,033 of its 216,564 total log characters** (from source log boundaries), a clear optimization target. In successful Desktop, the long `npm explain` provenance segment accounted for approximately **54,363 of 84,972 log characters**. In Android, `./gradlew assembleDebug` accounted for approximately **17,662 of 37,046 log characters**. Those figures include step metadata and neighboring text between run markers; treat them as approximate **source attribution**, not exact command stdout byte measurements.

For agent handling, **complete job-log API retrieval costs the whole cited number of bytes**, even if the assistant selects only a small error excerpt for context. Extracting a bounded first-cause excerpt does not reduce server-side job logs or Actions billing. Before/after agent-context cost must be reported separately from raw Actions storage and from end-to-end workflow runtime.

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

### Verification, review and comparable after-data

- Changes to this PR can be verified with the existing Draft policy job (which directly tests `quiet-run` diagnostics), then the Ready-target workflows and a **user-authorized** full Production Quality dispatch. The owner has authorized the Production Quality run for #915 on 2026-11-27; always pin the resulting run to the final tested HEAD.
- The relevant regression file covers bounded success/failure output, early workflow annotations (including across output-tail rollover and separate stdout/stderr streams), first spawn cause, exit status and child signal, GitHub environment/output/step-summary files, explicit verbose opt-in and Windows npm execution. Syntax and changed-workflow policy are also validated by current Ready checks and source-policy tests; never claim unexecuted manual paths passed.
- Record matched after-run totals, job/step source attributions, duration and agent-selected excerpt size **in the PR description**, referencing the exact Actions run and source SHA. This keeps experiment results tied to an immutable run without rewriting a canonical architecture file for each diagnostic run. Preserve honestly unmatched baseline results as qualitative only.
- Independent Development and QA reviews must be performed in **distinct contexts** against the exact resulting SHA; they are not satisfied by implementation self-review or CI. The PR must never be merged by the agent.
