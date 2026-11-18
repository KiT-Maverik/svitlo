# Content package CI matrix

`plan-content-builds.mjs` discovers buildable workspaces from `content/*` and
`content/languages/*`, using their own `package.json` manifests. It produces
GitHub Actions job outputs `matrix`, `has_builds`, `all` and `agent_mode`
without performing a build or modifying authored files.

- Pull requests targeting `main` **after** leaving Draft and manual workflow
  dispatch build every currently eligible content workspace. This remains true
  on later `synchronize` events while the PR is review-ready.
- Draft `main` PRs and PRs targeting another branch build only touched
  textbooks, with representative smoke packages for shared textbook tooling.
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

`workflow_dispatch` is the explicit full-build entrypoint. Use the workflow
rather than invoking the planner locally without the `BASE_SHA`, `HEAD_SHA`
and GitHub event environment variables.
