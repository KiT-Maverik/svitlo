# CI log output: full-workflow optimization

**Status:** implementation brief for the follow-up to merged [PR #900](https://github.com/KiT-Maverik/svitlo/pull/900). This document describes the approved *scope* of investigation and improvement, **not** an implemented logging architecture or a required new abstraction. Replace/complete it with measured findings and the actual final behavior during the PR.

## Problem and evidence

GitHub Actions output must remain useful to humans while being cheap for AI agents to inspect. On PR #900's successful full Production Quality run [#46011291152](https://github.com/KiT-Maverik/svitlo/actions/runs/46011291152), all 16 jobs passed. An earlier full successful run [#46007490987](https://github.com/KiT-Maverik/svitlo/actions/runs/46007490987) generated **246,152 Unicode characters across 16 job logs**. This is a reference point for *one* workflow on an earlier SHA, **not** a complete all-workflow baseline, token count, or proof of an optimization opportunity in each step.

At brief creation, the `develop` tree contains **27 workflow YAML files** in `.github/workflows/`; a literal source inspection counted **106 mentions** of `quiet-run.mjs` across those files (not 106 verified executions). Several trusted/command workflows deliberately do not use it. Runner setup, checkout, caching, GitHub Actions service output and third-party actions may account for a large irreducible portion of a log. Do not claim all of it is under our control.

## Required complete scope

Audit **every job and step of every current workflow**, including reusable workflows, dynamically constructed matrix jobs, scheduled/dispatch-only flows and indirectly invoked repository/package scripts. Start from the complete file listing in `.github/workflows/` and walk through `.github/actions/` (if present), `scripts/ci/`, applicable application/package scripts and npm scripts. The current workflow inventory comprises:

```text
agent-ci-artifacts.yml          assessment-materialization.yml
backfill-labels.yml            bank-materialization.yml
blocker-todos.yml              content-build.yml
contentblock-build-api.yml     course-navigation-web.yml
course-typed-materialization.yml db-controllers-e2e.yml
desktop-ci.yml                 engine-coverage.yml
engine-generators.yml          episode-materialization.yml
fast-gate.yml                  frontend-components.yml
get-lesson.yml                 lesson-materialization.yml
mobile.yml                     pr-auto-format.yml
pr-clear-blocked-on-merge.yml  pr-labeler.yml
production-quality-command.yml production-quality.yml
repository-git-audit.yml       sync-labels.yml
ui-kit-storybook.yml
```

That inventory is a starting snapshot, not a permanently maintained allowlist. Discover new/renamed workflows dynamically when validating coverage.

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
