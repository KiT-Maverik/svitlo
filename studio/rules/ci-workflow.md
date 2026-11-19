# CI workflows, branch policy and agent output

**Status:** mandatory guidance for new work. Actual CI YAML and GitHub rulesets determine implemented behavior. Also follow [GitHub label rules](./github-labels-and-naming.md) and [npm script conventions](./package-scripts.md).

## Branch topology

- `develop` is the integration branch for new development; new standalone and parent Course/Lesson/translation Draft PRs target it. Child PRs target their verified immediate integration parent, including nested Course → Lesson → Question/Flashcard work.
- `main` is production. Promote through a separate Ready `develop → main` PR only after full validation and owner authorization. Deploy a pinned release commit/tag, not arbitrary Draft work.
- Do not mass-retarget in-flight PRs. Their existing base/parent branch relationships and independent review evidence remain valid until individually reconciled.
- **GitHub admin action required:** existing `Protect main` ruleset matches `~DEFAULT_BRANCH`, not literal `main`. Before changing default to `develop`, make that ruleset target literal `main`, add a separate `develop` ruleset, and set Settings → General → Default branch to `develop`. The connected GitHub App cannot change these settings.
- Require stable `Agent CI Artifacts / clean`, `Blocker TODOs / clean`, `Affected content / build, taxonomy and packaging` status contexts on protected branches, with FastGate on develop and full Quality on main as appropriate. Verify every required status is emitted for its target and enforce current-head checks. Labels alone cannot prevent merges.

## Validation tiers

| Event | Scope |
| --- | --- |
| Draft/Ready PR to `develop` | Changed/dependent workspace FastGate, focused tests, selected content build |
| Child PR to a parent integration branch | Focused checks and new `TODO (BLOCKER):` authored-source diff validation |
| Ready promotion PR to `main` | All textbook builds, complete package checks, E2E, full tracked-source blocker scan; no redundant FastGate |
| Manual `workflow_dispatch` | Full diagnostic, coverage, content or publication suites |
| Push to `main` | Avoid duplicating expensive full validation already required before merge; run deployment-specific checks when needed |

FastGate builds prerequisite public exports once in dependency order, then runs independent workspace checks concurrently (default two; `SVITLO_FASTGATE_PARALLELISM=1..8`). Root `npm run code:check:types` checks all workspaces and is not the FastGate default. Content Build plans scope before npm install: `develop` selects impacted textbooks; Ready `main` PRs and manual dispatch build all. With zero selected textbooks, avoid `npm ci` but still return a stable required status. Do not run the full Engine suite again during an unrelated Biology build.

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

**Actual branch-protection audit (2026-11-19):** GitHub already has `develop` as default and active literal-branch rulesets. `Protect main` still lacks `Require a pull request before merging`, and its current required contexts omit `Production Quality / verify`. `Protect develop` currently omits `FastGate / verify`. These are **GitHub Settings operations** not implemented by this file. Set main PR requirement and the two missing status checks before treating the release and integration gates as enforced.
