# CI workflows, branch policy and agent output

**Status:** mandatory guidance for new work. Actual CI YAML and GitHub rulesets determine implemented behavior. Also follow [GitHub label rules](./github-labels-and-naming.md) and [npm script conventions](./package-scripts.md).

## Branch topology

- `develop` is the integration branch for new development; new standalone and parent Course/Lesson/translation Draft PRs target it. Child PRs target their verified immediate integration parent, including nested Course → Lesson → Question/Flashcard work.
- `main` is production. Only same-repository Ready `develop → main` PRs are allowed by `Production Quality / verify`, including on edited/retargeted PRs. Full validation and owner authorization are required. Deploy a pinned release commit/tag, not arbitrary Draft work.
- Do not mass-retarget in-flight PRs. Their existing base/parent branch relationships and independent review evidence remain valid until individually reconciled.
- **Verified 2026-11-19:** `develop` is already the default branch. Active `Protect develop` and `Protect main` rulesets target literal branches and require pull requests. Preserve historical nested PR ancestry; owner approval is needed for any individual reconciliation.
- Require stable `Agent CI Artifacts / clean`, `Blocker TODOs / clean`, `Affected content / build, taxonomy and packaging` status contexts on protected branches, with FastGate on develop and full Quality on main as appropriate. Verify every required status is emitted for its target and enforce current-head checks. Labels alone cannot prevent merges.

## Validation tiers

| Event                                   | Scope                                                                                                                 |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Draft/Ready PR to `develop`             | Changed/dependent workspace FastGate, focused tests, selected content build                                           |
| Child PR to a parent integration branch | Focused checks and new `TODO (BLOCKER):` authored-source diff validation                                              |
| Ready promotion PR to `main`            | All textbook builds, complete package checks, E2E, full tracked-source blocker scan; no redundant FastGate            |
| Manual `workflow_dispatch`              | Full diagnostic, coverage, content or publication suites                                                              |
| Push to `main`                          | Avoid duplicating expensive full validation already required before merge; run deployment-specific checks when needed |

FastGate builds prerequisite public exports once in dependency order, then runs independent workspace checks concurrently (default two; `SVITLO_FASTGATE_PARALLELISM=1..8`). Root `npm run code:check:types` checks all workspaces and is not the FastGate default. Content Build plans scope before npm install: `develop` selects impacted textbooks; Ready `main` PRs and manual dispatch build all. With zero selected textbooks, avoid `npm ci` but still return a stable required status. Do not run the full Engine suite again during an unrelated Biology build.

## Production package-build reuse

`Production Quality / verify` keeps its full root typecheck, unit/component tests,
lint, distributable package builds, host builds, compiled-export checks and Chromium
E2E. Its sequential job sets `SVITLO_CI_PACKAGE_BUILD_STATE` to a **runner-local**
temporary JSON path. The root workspace aggregator, Engine/adapter test hooks,
and Web/Mobile/Desktop textbook preparation use
`scripts/ci/packageBuildReuse/package-build-reuse.mjs` when requesting a package
build. Outside the opt-in job the helper runs the canonical npm build normally.

A reuse requires the same clean checked-out Git revision, unchanged dependency
build generations and an exact SHA-256 match for every file in the package's
`dist/`. Missing, modified, or invalid output triggers an actual rebuild;
compilation failure remains fatal. State is never transferred between
workflows, runners or commits. Keep this job sequential: the JSON state is not
a concurrent build server and is not a substitute for Content Build's matrix.

The always-run summary records build requests, real builds, verified reuses and
build durations. Comparable successful Ready `develop → main` runs are still
required to substantiate wall-clock, total runner-time and log-volume savings;
a counterfactual request count is not a measured before/after improvement.
Regression coverage: `node --test scripts/ci/packageBuildReuse/package-build-reuse.spec.mjs`.

## Quiet logs and agents

- Prefer `node scripts/ci/quietRun/quiet-run.mjs -- <command> [args...]` for installs, tests, builds and typechecks. Success prints status and duration, failure preserves the nonzero exit and bounded useful diagnostics; `SVITLO_CI_VERBOSE=1` enables full output on an intentional rerun.
- Never wrap a command whose stdout is consumed by another process or by GitHub, including structured JSON, workflow-command output, a shell pipeline, GitHub API/token operations and source generation. Preserve `GITHUB_OUTPUT`, error annotations and all security checks. Do not upload potentially sensitive full successful logs.
- Agents read short check summaries and failed steps first; do not fetch thousands of successful test lines into the model context. Only retrieve the relevant failure or opt-in verbose trace.
- On-demand comment jobs (`/course`, `/lesson`, `/questions`, `/flashcards`, `/agent-artifacts`, `/get lesson`, `/engine-coverage`, `/repo-audit`) must use **trusted default-branch code** and pinned PR source, preserving actor authorization, source SHA and staged artifact verification. Quiet output must not modify this trust boundary.
- PR Auto-format still runs on Ready transitions and only changed files. Prettier `--log-level warn` removes per-file success chatter while preserving errors and App-authenticated post-format recheck.

## Educational labels and TODO blockers

- `work: course` is matched from authored `content/**/data/courses/**`. Lesson-owned source YAML/index/methodology/sections earns `work: lesson`. `questions.yaml` and `questions/**` match `work: questions`; `flashcards.yaml` and `flashcards/**` match `work: flashcards`. Bank-only changes must not receive Lesson label solely from path ancestry. Engine tooling changes do not imply an educational authoring label.
- `Blocker TODOs / clean` always runs on PR events. Draft PRs changing Course/Lesson/bank sources report newly introduced blockers as warnings without failing; Ready PRs to develop or intermediate integration branches reject blockers in all source files changed by the PR (including inherited comments); Ready main promotion scans **all supported tracked source** including inherited TODOs. This guard deliberately does not parse Markdown.
- A required GitHub status check, not the label itself, enforces the no-blocker merge rule. Nested intermediate branches require an enforceable ruleset if merges can occur without GitHub's protected-target checks.

## Verification

Run actual validation before merging: `node --test scripts/ci/quietRun/quiet-run.spec.mjs`, `node --test scripts/runFastGate/run-fast-gate.spec.mjs scripts/runFastGate/public-contract-impact.spec.mjs scripts/ci/prDiff/changed-files.spec.mjs scripts/ci/releaseSource/check-release-source.spec.mjs`, `node --test scripts/ci/checkBlockerTodos/check-blocker-todos.spec.mjs`, `node --test scripts/ci/buildChangedContent/*.spec.mjs`, `node .github/scripts/verify-labels.cjs`, `npm run repo:check:packages`, and any affected workflow tests. Exercise zero-content Draft, changed-content Ready, authored-blocker child, and production-promotion cases; compare billed minutes, wall time and agent-visible log volume. These commands are instructions, **not claims of passing checks**.

The default branch is now `develop`; the two active protection rulesets target their literal branches. Comment-triggered workflows use code deployed to the current default branch.

Dedicated EducationStandard catalog/reference GitHub workflows are removed. Existing UI Kit `test:locales` validates definitions and localized outputs; FastGate tests the reference generator only when implementation changes. The on-demand `/agent-artifacts generate education-standards` functionality remains available.

**Actual branch-protection audit (2026-11-19):** GitHub already has `develop` as default and active literal-branch rulesets. Both `Protect main` and `Protect develop` now require a pull request before merging. `Protect main` now requires **`Production Quality / verify`** alongside Agent CI Artifacts, Affected content and Blocker TODOs; `Protect develop` requires **`FastGate / verify`** alongside the same three checks. Verified from active GitHub rulesets on 2026-11-19. GitHub ruleset state is an operational setting rather than a YAML guarantee.

## Production and nested-PR enforcement follow-ups

- Required `Affected content / build, taxonomy and packaging` runs the full
  selected-content matrix on every Ready main PR, with publication and tarball
  portability checks for each eligible textbook. Production Quality does **not**
  rerun those publication/portability suites; it retains full TypeScript, root
  tests, app builds, package artifacts and Chromium E2E coverage.
- FastGate determines changed files from the merge-base, compares the public
  declaration surface of re-exported modules and propagates affected workspace
  typechecks through real dependencies, including transitive consumers.
  Private implementation-only edits remain scoped. Root manifest and lockfile
  edits conservatively check all workspaces.
- An open child PR targeting an unprotected integration branch cannot be
  blocked by a failing check alone. **Owner decision pending:** optionally
  require `Blocker TODOs / clean` on a narrowly verified `integration/*`
  parent-ref pattern, with explicit GitHub App bypass for authorized
  materialization pushes. Do not apply it to all `agent/*` branches. GitHub
  ruleset targets are refs, not educational labels.
- Historical Course PR #653 targets `integration-branch`, while the trusted
  Course materialization gate requires the current repository default branch
  (`develop`). This is a known legacy mismatch; do not broadly bypass the
  gate or retarget any Course/Lesson PR without owner approval and ancestry
  reconciliation.
- Required context provisioning, live Ready promotion/failure injection and
  comparable before/after runner-minute benchmarks remain operational owner
  handoffs, not claims established by committed workflow YAML.
