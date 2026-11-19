# Content package CI matrix

`plan-content-builds.mjs` discovers buildable workspaces from `content/*` and
`content/languages/*`, using their own `package.json` manifests. It produces
GitHub Actions job outputs `matrix`, `has_builds`, `all` and `agent_mode`
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
- Each matrix runner invokes `build-changed-content.mjs --package <path> <kind>`,
  which rechecks selection, validates its own distribution, publishing and
  portability, and runs the scoped built-artifact check. Each runner owns its
  ephemeral `dist/` and generated outputs; no artifacts are shared across jobs.
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

## Opt-in same-SHA sharding benchmark

The normal per-package matrix and the protected `Affected content / build, taxonomy and packaging`
status remain unchanged. To compare a candidate five-shard layout against the existing
17-job baseline **on the same commit**, manually run **Content packages build** from
Actions > Run workflow, select this branch/ref, and enable `benchmark_shards`.
Manual runs still select **all** eligible textbooks. The normal `Content / content/*`
jobs and additional `Content benchmark / shard-*` jobs run after the same preparation.
Each benchmark shard does one `npm ci`, then invokes the unchanged
`build-changed-content.mjs --package` pipeline separately for every assigned package.
That includes package build, lint where configured, publisher tests, portability and
scoped compiled-export validation. Each book receives bounded logs and a distinct
failure annotation; other books in its shard still run. No dependencies or build
artifacts cross runner boundaries.

Use the same run's job timelines/logs to compare critical-path time, summed
runner duration, dependency-install count/duration and log bytes. The benchmark
costs extra runner minutes on purpose; run it only on demand. The selected-scope
planner remains unchanged for Draft/develop/agent PRs, including zero selected
workspaces. Promotion to the sharded matrix requires a measured improvement and
separate code review; this experiment deliberately cannot weaken protected checks.
