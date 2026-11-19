# CI workflows, branch policy and agent output

**Status:** mandatory guidance for new work. Actual CI YAML and GitHub rulesets determine implemented behavior. Also follow [GitHub label rules](./github-labels-and-naming.md) and [npm script conventions](./package-scripts.md).

## Branch topology

- `develop` is the integration branch for new development; new standalone and parent Course/Lesson/translation Draft PRs target it. Child PRs target their verified immediate integration parent, including nested Course → Lesson → Question/Flashcard work.
- `main` is production. Promote through a separate Ready `develop → main` PR only after full validation and owner authorization. Deploy a pinned release commit/tag, not arbitrary Draft work.
- Do not mass-retarget in-flight PRs. Their existing base/parent branch relationships and independent review evidence remain valid until individually reconciled.
- The default branch is `develop`. Active branch-protection rulesets target literal `main` and `develop`; changing required checks is a separate GitHub Settings operation, not a workflow YAML change.
- Require stable `Agent CI Artifacts / clean`, `Blocker TODOs / clean`, `Affected content / build, taxonomy and packaging` status contexts on protected branches, with FastGate on develop and full Quality on main as appropriate. Verify every required status is emitted for its target and enforce current-head checks. Labels alone cannot prevent merges.

## Validation tiers

| Event                                   | Scope                                                                                                                 |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Draft PR (any target)                  | Cheap source/security/artifact guards and authored `TODO (BLOCKER):` warnings; defer npm installs, builds and E2E |
| Ready PR to `develop`                | Changed/dependent workspace FastGate, targeted generators/host/browser suites, selected content build, blocking TODO checks |
| Ready child PR to an integration parent | Applicable targeted checks and selected content builds, blocking authored TODO checks; FastGate is only required for `develop` |
| Ready promotion PR to `main`           | All textbook builds, complete package checks, E2E, full tracked-source blocker scan; no redundant FastGate |
| Manual `workflow_dispatch`             | Explicit full diagnostics/builds on a selected branch, including a Draft branch |
| Push to `main`                         | Avoid duplicating expensive pre-merge quality checks; run deployment-specific checks only when needed |

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

Run actual validation before merging: `node --test scripts/ci/quietRun/quiet-run.spec.mjs`, `node --test scripts/runFastGate/run-fast-gate.spec.mjs`, `node --test scripts/ci/checkBlockerTodos/check-blocker-todos.spec.mjs`, `node --test scripts/ci/buildChangedContent/*.spec.mjs`, `node .github/scripts/verify-labels.cjs`, `npm run repo:check:packages`, and any affected workflow tests. Exercise zero-content Draft, changed-content Ready, authored-blocker child, and production-promotion cases; compare billed minutes, wall time and agent-visible log volume. These commands are instructions, **not claims of passing checks**.

The default branch is now `develop`; the two active protection rulesets target their literal branches. Comment-triggered workflows use code deployed to the current default branch.

Dedicated EducationStandard catalog/reference GitHub workflows are removed. Existing UI Kit `test:locales` validates definitions and localized outputs; FastGate tests the reference generator only when implementation changes. The on-demand `/agent-artifacts generate education-standards` functionality remains available.

**Branch-protection audit (2026-11-19):** The active literal-target
`Protect main` ruleset requires `Agent CI Artifacts / clean`,
`Affected content / build, taxonomy and packaging`, `Blocker TODOs / clean`
and `Production Quality / verify`. `Protect develop` requires the first
three plus `FastGate / verify`. Both require PR-based integration.
Verify this live GitHub Settings state before modifying any required check;
workflow YAML alone does not update rulesets.
