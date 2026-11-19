# Draft / Ready CI guard

AI Coding Agents push frequent incremental commits to Draft PRs. This policy
keeps cheap repository/artifact/blocker checks active on those commits, while
deferring costly npm installations, shared builds, host/native packages and
browser tests until Ready for review or an explicit manual workflow dispatch.

`draft-ci-policy.spec.mjs` guards the real GitHub Actions workflow triggers,
manual-entry points, required status contexts and heavy-job Draft conditions.
FastGate runs it **before installing npm packages**, including on Draft PRs.
It uses only Node's built-in modules; it does not build packages, mutate Git,
or call GitHub APIs. Content matrix selection is tested separately in
`../buildChangedContent/plan-content-builds.spec.mjs`.

Run from the repository root:

```bash
node --test scripts/ci/draftCiPolicy/draft-ci-policy.spec.mjs
node --test scripts/ci/buildChangedContent/plan-content-builds.spec.mjs
```

Manual full diagnostics: Actions → select a workflow → Run workflow → choose
the PR source branch; or `gh workflow run <workflow>.yml --ref <branch>`.
Normal GitHub rules apply: the workflow must be present on the default branch.
Never disable required checks, TODO/security guards or review-ready coverage.
