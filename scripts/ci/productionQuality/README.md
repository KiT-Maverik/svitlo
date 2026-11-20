# Parallel Production Quality

A Ready same-repository `develop → main` promotion requires **all** production
gates, but independent workloads run on isolated concurrent runners. Never
conflate a green individual job with the required `Production Quality / verify`
aggregate: any failed, cancelled, missing or skipped dependency must fail it.

- `policy` checks the source before any npm installation and discovers all
  apps that implement `app:build`. Only that job publishes the app matrix.
- `repository`, `types`, `unit`, `components`, `lint`, `packages`, and
  per-app `apps` jobs depend on `policy` and run independently.
- `components` selects Astronomy Scenes, Playground and Web. The root `npm test`
  already covers UI Kit and Math component suites. The existing workspace planner builds
  exactly the selected tests' dependency closure; root npm script semantics
  remain **exhaustive**, without new partial-root aliases.
- The manifest-derived `apps` matrix runs every `app:build` and its declared
  `test:e2e`/`test:integration` suite from the **same checkout and runner**.
  Any new E2E workspace without `app:build` fails discovery rather than
  silently losing coverage.
- Package builds and compiled-export verification remain a full standalone
  gate. App builds independently compile their own needed dependencies.
  `SVITLO_CI_PACKAGE_BUILD_STATE` is strictly local to **each job**; never
  share its JSON or compiled output across runners.
- GitHub's `fail-fast: false` retains all app results. A stable final job
  checks every dependency result, including the matrix's aggregate result.
  Draft PRs do not pretend to have passed production quality.
- Logs remain bounded by quietRun; on failures, inspect the failed job/step,
  not full successful logs. E2E results upload per-app artifacts.

## Agent-triggered full diagnostics

Comment `/production-quality` on an open same-repository fix PR to launch the
existing full `production-quality.yml` against its head branch. The
`production-quality-command.yml` router runs from the default branch, checks
the same PR-comment author permissions as existing on-demand commands and
calls `gh workflow run production-quality.yml --ref <pr-branch>` using the
Actions `GITHUB_TOKEN`. It does not check out the PR, change the production
workflow or modify branch rules. It must first be merged into `develop`.

Locate the resulting `workflow_dispatch` run and confirm its `head_sha`
matches the latest fix PR head. Every production job and the final
`Production Quality / verify` must pass. A comment-triggered run does not
replace standard Ready PR checks or the real `develop → main` promotion gate.

This optimizes **wall-clock latency and time to first actionable failure** by
trading extra npm installations and possibly more billed runner-minutes for
parallelism. It does not promise a particular duration: only comparable,
successful Ready production runs can establish the speedup.

Verify static contracts from a clean checkout:

```sh
node --test scripts/ci/productionQuality/production-quality.spec.mjs
node --test scripts/runWorkspaceScript/run-workspace-script.spec.mjs
node --test scripts/ci/releaseSource/check-release-source.spec.mjs
```

Then run an actual Ready `develop → main` promotion to verify matrix jobs,
app bundles, browser suites and the required gate in GitHub Actions.
