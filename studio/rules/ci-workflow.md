# CI workflows, branch policy and agent output

**Status:** mandatory guidance for new work. Actual CI YAML and GitHub rulesets determine implemented behavior. Also follow [GitHub label rules](./github-labels-and-naming.md) and [npm script conventions](./package-scripts.md).

## Branch topology

- `develop` is the integration branch for new development; new standalone and parent Course/Lesson/translation Draft PRs target it. Child PRs target their verified immediate integration parent, including nested Course → Lesson → Question/Flashcard work.
- `main` is production. Only same-repository Ready `develop → main` PRs are allowed by `Production Quality / verify`, including on edited/retargeted PRs. Full validation and owner authorization are required. Deploy a pinned release commit/tag, not arbitrary Draft work.
- Do not mass-retarget in-flight PRs. Their existing base/parent branch relationships and independent review evidence remain valid until individually reconciled.
- **Verified 2026-11-19:** `develop` is already the default branch. Active `Protect develop` and `Protect main` rulesets target literal branches and require pull requests. Preserve historical nested PR ancestry; owner approval is needed for any individual reconciliation.
- Require stable `Agent CI Artifacts / clean`, `Blocker TODOs / clean`, `Affected content / build, taxonomy and packaging` status contexts on protected branches, with FastGate on develop and full Quality on main as appropriate. Verify every required status is emitted for its target and enforce current-head checks. Labels alone cannot prevent merges.

## Validation tiers

| Event                                   | Scope                                                                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Draft PR (any target)                   | Cheap source/security/artifact guards and authored `TODO (BLOCKER):` warnings; defer npm installs, builds and E2E              |
| Ready PR to `develop`                   | Changed/dependent workspace FastGate, targeted generators/host/browser suites, selected content build, blocking TODO checks    |
| Ready child PR to an integration parent | Applicable targeted checks and selected content builds, blocking authored TODO checks; FastGate is only required for `develop` |
| Ready promotion PR to `main`            | All textbook builds, complete package checks, E2E, full tracked-source blocker scan; no redundant FastGate                     |
| Manual `workflow_dispatch`              | Explicit full diagnostics/builds on a selected branch, including a Draft branch                                                |
| Push to `main`                          | Avoid duplicating expensive pre-merge quality checks; run deployment-specific checks only when needed                          |

### Why Draft is a first-class CI mode

Svitlo is AI-native and Git-first: Coding Agents open **Draft PRs** and push
frequent incremental commits while implementing, generating and revising
content or code. During this phase incomplete files, temporary blockers, and
quick successive commits are expected. Rebuilding every dependent package,
installing browsers, packaging native apps and rerunning E2E for each commit
would burn runner minutes, delay actionable feedback and create noisy,
quickly obsolete CI results. Draft means **work in progress**, not a release
candidate and not permission to merge unchecked code.

Draft and target branch are independent dimensions: a Draft to `develop`,
a nested Course/Lesson child Draft and a Draft targeting `main` all receive
lightweight guards. Ready for review is the **explicit validation boundary**:
`ready_for_review` must trigger the necessary checks even if no source SHA
changes, and subsequent `synchronize` events on a Ready PR must rerun them
for the latest revision. Draft PRs still report fast required contexts
(`FastGate / verify`, `Affected content / build, taxonomy and packaging`)
without pretending to have run the deferred suite; the logs must explicitly
mark deferred coverage. Artifact safety, actor authorization, blocker TODO
reporting and trustworthy source provenance cannot be disabled to save time.

Use the **Actions → Run workflow** control (or `gh workflow run <workflow>.yml
--ref <pr-branch>`) to request a deep suite on a Draft branch before Ready;
`workflow_dispatch` must bypass Draft deferral while retaining normal security
checks. The workflow must exist on the default branch for the manual control.
Do not use a fake success job or a permanent Draft skip for any check that
must execute before merge.

### Validation on Ready

FastGate builds prerequisite public exports once in dependency order, then
runs independent workspace checks concurrently (default two;
`SVITLO_FASTGATE_PARALLELISM=1..8`). Root `npm run code:check:types` checks all
workspaces and is not the FastGate default. Content Build plans scope before
npm install: Draft defers distribution builds, Ready `develop` selects impacted
textbooks, and Ready `main` or manual dispatch builds all. With zero selected
textbooks, avoid `npm ci` while emitting the same stable required status.
Do not rerun the full Engine suite during an unrelated Biology build.

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
- Agents follow the **latest-head failure-triage procedure** below rather than fetching full successful or multi-job logs. Check status/step summaries first, then bounded relevant diagnostics. See [Quiet CI command execution](../../scripts/ci/quietRun/README.md) for output and safety exceptions.
- On-demand comment jobs (`/course`, `/lesson`, `/questions`, `/flashcards`, `/agent-artifacts`, `/get lesson`, `/engine-coverage`, `/repo-audit`) must use **trusted default-branch code** and pinned PR source, preserving actor authorization, source SHA and staged artifact verification. Quiet output must not modify this trust boundary.
- PR Auto-format **fixes** changed files on Ready PRs targeting `develop`, using an App-authenticated commit to the unprotected PR source branch and a read-only `workflow_dispatch` recheck. It does **not** run on `develop → main` release promotions: no automation may push formatting commits directly to protected `develop` or `main`. Manual formatting checks remain available. Prettier `--log-level warn` removes per-file success chatter while preserving errors.

## Agent CI failure triage (low-token default)

Use this sequence for PR diagnosis: **latest-head required check → failing job → failing step → bounded diagnostic**. A green historical run or an optional check is not evidence that the current PR can merge.

1. **Establish the live target.** Read the PR number, base branch, **current head SHA**, and Draft/Ready state. Query the target branch's actual required contexts/ruleset and the check runs/statuses for that SHA (not just the PR's overall check badge). Record each required context's `queued`, `in_progress`, `completed` conclusion, missing/not-reported state and associated URL. Draft and Ready can emit different workflows; do not mistake a deliberately absent Ready-only check on Draft for a successful production gate. On `develop`, check `FastGate / verify`; on Ready `main`, check `Production Quality / verify`, alongside the shared required contexts. See [branch policy](#branch-topology) for current conventions; confirm live rulesets before claiming a check is required.
2. **Separate current from obsolete runs.** Match a workflow/check's source head SHA and latest attempt to the PR snapshot. A superseded run, old merge ref or cancelled run is **not** a current-head pass. Distinguish cancellation due to supersession from a current-head cancellation or unresolved block; inspect the corresponding workflow run status/reason before deciding whether a retry is useful. If the PR head changes during diagnosis, re-snapshot before drawing conclusions.
3. **Select only actionable failures.** From required checks, prioritize `failure`, `timed_out`, `action_required`, cancelled/blocked or unexpectedly missing contexts; distinguish genuinely failing jobs from skipped jobs or unfinished dependencies. Optional checks may be relevant to the defect but must be labeled **optional**. Do not infer readiness from successful jobs while a required context is pending or absent.
4. **Narrow before reading logs.** For the affected workflow, obtain its job list, then fetch **step names, conclusions and durations** for the relevant failing job. Inspect its failing step and job summary/error annotations first. Look for `::error`, `[error]`, `error TS...`, `Error:`, `FAIL`, `not ok`, `fatal:`, and nearby `PASS`/failure markers. Retrieve only a bounded excerpt of the **specific failed job** (e.g. up to 50 relevant lines or ~12 KB), including enough surrounding context to identify the first cause rather than downstream cascade failures. If the API only supplies a whole log, filter/redact it **before** adding it to agent context; never paste full multi-job logs into the prompt.
5. **Escalate only when evidence is insufficient.** Fetch a successful job's log only to resolve a concrete dependency or contradicted outcome, and name that reason. Prefer step duration/status and compact summary over logs. Retry the **individual job/check**, not the whole suite, only when current-head cancellation, transient failure or missing evidence warrants it. For a supported **manual diagnostic dispatch or controlled local reproduction**, opt in with `SVITLO_CI_VERBOSE=1`; ordinary GitHub "Re-run jobs" does **not** let agents inject a new environment variable into an existing workflow. Preserve process exit codes, GitHub annotations, security/trust boundaries and authorization; redact secrets before sharing excerpts. Quiet output is not a secret scrubber.
6. **Report auditable evidence.** State the PR/base/state and inspected head SHA; required vs optional check name and conclusion; workflow/job/step links; decisive bounded error excerpt; whether a run was cancelled/superseded; exactly which reruns or local checks actually executed; and what remains unverified. No quantified token or runner-minute savings without a measured comparable before/after retrieval.

This is a **diagnostic retrieval policy**, not a change to workflow triggers, required checks, test coverage, `quietRun` behavior or the production release trust boundary. Studio documentation defines stable procedures and decisions; GitHub is the sole source for individual PR lifecycle state, latest commit SHA and check results. Do not mirror live PR status in Studio files.

## Educational labels and TODO blockers

- `work: course` is matched from authored `content/**/data/courses/**`. Lesson-owned source YAML/index/methodology/sections earns `work: lesson`. `questions.yaml` and `questions/**` match `work: questions`; `flashcards.yaml` and `flashcards/**` match `work: flashcards`. Bank-only changes must not receive Lesson label solely from path ancestry. Engine tooling changes do not imply an educational authoring label.
- `Blocker TODOs / clean` always runs on PR events. Draft PRs changing Course/Lesson/bank sources report newly introduced blockers as warnings without failing; Ready PRs to develop or intermediate integration branches reject blockers in all source files changed by the PR (including inherited comments); Ready main promotion scans **all supported tracked source** including inherited TODOs. This guard deliberately does not parse Markdown.
- On protected targets, a required GitHub status check (not a label) enforces the no-blocker rule. Intermediate integration branches are intentionally unprotected: a failed child PR check is diagnostic feedback, **not** a GitHub-enforced merge block.

## Verification

Run actual validation before merging: `node --test scripts/ci/quietRun/quiet-run.spec.mjs`, `node --test scripts/runFastGate/run-fast-gate.spec.mjs scripts/runFastGate/public-contract-impact.spec.mjs scripts/ci/prDiff/changed-files.spec.mjs scripts/ci/releaseSource/check-release-source.spec.mjs`, `node --test scripts/ci/checkBlockerTodos/check-blocker-todos.spec.mjs`, `node --test scripts/ci/buildChangedContent/*.spec.mjs`, `node .github/scripts/verify-labels.cjs`, `npm run repo:check:packages`, and any affected workflow tests. Exercise zero-content Draft, changed-content Ready, authored-blocker child, and production-promotion cases; compare billed minutes, wall time and agent-visible log volume. These commands are instructions, **not claims of passing checks**.

The default branch is now `develop`; the two active protection rulesets target their literal branches. Comment-triggered workflows use code deployed to the current default branch.

Dedicated EducationStandard catalog/reference GitHub workflows are removed. Existing UI Kit `test:locales` validates definitions and localized outputs; FastGate tests the reference generator only when implementation changes. The on-demand `/agent-artifacts generate education-standards` functionality remains available.

**Actual branch-protection audit (2026-11-19):** GitHub already has `develop` as default and active literal-branch rulesets. Both `Protect main` and `Protect develop` now require a pull request before merging. `Protect main` now requires **`Production Quality / verify`** alongside Agent CI Artifacts, Affected content and Blocker TODOs; `Protect develop` requires **`FastGate / verify`** alongside the same three checks. Verified from active GitHub rulesets on 2026-11-19. GitHub ruleset state is an operational setting rather than a YAML guarantee.

## Production and nested-PR enforcement follow-ups

- Required `Affected content / build, taxonomy and packaging` runs the full
  selected-content workload across at most five deterministic shards on every Ready
  main PR. Each shard installs dependencies once and preserves independent
  publication and tarball portability checks for every eligible textbook. Production Quality does **not**
  rerun those publication/portability suites; it retains full TypeScript, root
  tests, app builds, package artifacts and Chromium E2E coverage.
- FastGate determines changed files from the merge-base, compares the public
  declaration surface of re-exported modules and propagates affected workspace
  typechecks through real dependencies, including transitive consumers.
  Private implementation-only edits remain scoped. Root manifest and lockfile
  edits conservatively check all workspaces.
- **Owner decision:** do **not** introduce Rulesets for intermediate `integration/*`,
  historical `integration-branch`, or `agent/*` branches. Their failed checks
  remain visible to reviewers and agents but do not prevent a GitHub merge.
  Authorized materialization GitHub App commits may continue directly to
  unprotected integration branches under the existing trusted-workflow checks;
  no new bypass is needed or permitted for protected `develop` and `main`.
  Historical integration branches and PR ancestry are left unchanged for
  eventual owner-managed cleanup.
- Historical Course PR #653 targets `integration-branch`, while the trusted
  Course materialization gate requires the current repository default branch
  (`develop`). Preserve this legacy mismatch as-is; the owner will retire old
  integration branches later. Do not alter the gate, retarget historical PRs
  or migrate their ancestry as part of CI optimization.
- Required context provisioning, live Ready promotion/failure injection and
  comparable before/after runner-minute benchmarks remain operational owner
  handoffs, not claims established by committed workflow YAML.
