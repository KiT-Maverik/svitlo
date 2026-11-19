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
