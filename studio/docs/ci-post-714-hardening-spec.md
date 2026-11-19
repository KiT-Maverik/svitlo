# Harden development and production CI after PR #714

**Status:** implementation checklist and evidence ledger for Draft PR #717. Changes should be evaluated against the code and CI results, not assumed complete from this brief. Do not merge or mark Ready without the owner's explicit decision.

**Implemented in this Draft branch:**
- Release source gate fails before npm install for non-develop or fork-origin Ready PRs targeting main, including edited/retargeted PR events. Stable check: `Production Quality / verify`.
- FastGate and Content Build use merge-base/triple-dot changes and include both sides of moved files.
- FastGate analyzes exported TS surfaces and the actual workspace dependency graph, following direct/transitive consumers while keeping private implementation edits scoped.
- Production Quality no longer repeats per-textbook publisher/portability checks already enforced by the required full Content Build; its extra IndexedDB integration invocation was also redundant with `npm test`.
- CI branch/default documentation and the remaining manual protections are updated.

**Operational evidence:** `Protect main` now requires `Production Quality / verify` (owner configured; active GitHub ruleset verified 2026-11-19). The existing Ready production run on #716 failed closed on real TS errors. **Still not demonstrated:** green Ready production promotion after this branch is integrated, deliberate unauthorized-source failure against the live required context, nested ruleset owner decision, trusted command end-to-end executions, and comparable performance measurements.

**Baseline:** PR #714 was merged into develop on 2026-11-19. Keep develop as the default development integration branch and main as production. Preserve nested Course → Lesson → Questions/Flashcards PR parentage and existing authorization boundaries.

## Outcomes and non-goals

1. A small, reliable, required development gate; exhaustive validation only before production promotion.
2. No silent misses when an edited shared public contract breaks a consuming workspace.
3. Minimize duplicate compilation, npm installation, tests, runner minutes, wall-clock latency and agent-visible logs.
4. Maintain fail-closed TODO, content readiness, source provenance and security checks without penalizing unfinished Draft content.
5. Do not introduce new Education Standards workflows, blanket monorepo checks on each develop PR, unreviewed ruleset changes, mass PR retargeting, or expensive post-merge revalidation.

## Verified starting state (not work to repeat)

- Protect develop already requires FastGate / verify, Agent CI Artifacts / clean, Blocker TODOs / clean and Affected content / build, taxonomy and packaging. Do not describe FastGate as missing.
- Protect main requires PRs, the three stable checks, **and Production Quality / verify** as configured by the owner after this baseline was written. The job is in .github/workflows/questions.yml and is created only for Ready main PRs or manual dispatch. The similarly spelled Production quality / quality is NOT its check context.
- Both active rulesets target their literal branches; develop is already the default branch. Neither requires an approving review (currently configured as zero), which is separate from requiring a PR.
- The owner added Production Quality / verify to Protect main. Current active ruleset was verified on 2026-11-19; the successful promotion exercise and release-source failure injection remain separate.
- PR #714 removed the standalone Education Standards jobs and introduced quietRun, selective Content Build, Draft-warning/Ready-failing TODO guard, path-based educational labels, and scoped FastGate. Preserve those behaviors.

## Implementation scope

### P0 — Make the production promotion enforceable

- Add a small, deterministic, test-covered gate to reject Ready PRs targeting main when the source branch is not develop. Use a stable, meaningful required status if the gate is made independent; alternatively make the existing mandatory production status fail. Never make security dependent on mutable labels. Do not silently retarget or invalidate historical PRs; enumerate and reconcile existing non-develop → main PRs with owner approval before activating the restriction.
- For valid Ready develop → main promotions, keep full monorepo typecheck, required package/component/browser suites, *all* textbook builds, source TODO scan, and content/asset publication readiness. No expensive full suite on push to main after an already validated merge.
- Smoke-test a real Ready develop → main promotion with the required context active. Verify both success and deliberate failure block the merge, and that the check is reported for the latest SHA. Do not merge the test promotion prematurely. Record manual ruleset action separately from committed code.
- Preserve valid Draft semantics; Ready-only production checks must not accidentally report a misleading pass for unfinished Draft work.

### P0 — Cover affected downstream workspaces without running every workspace

- Revisit scripts/runFastGate/run-fast-gate.mjs: chooseChecks currently selects directly changed workspaces plus a few hand-written IndexDB/Web exceptions; it does not compute general reverse dependencies.
- Derive the workspace dependency graph from real package manifests and public exports. For changed public API/contracts, select relevant direct/transitive consumers for typechecking and high-value tests; for private implementation/tooling changes, select only necessary owners and specific integration tests. Handle shared Engine, UI Kit, adapters and host consumers. Include changes to manifests and dependency lockfile deliberately.
- Continue prebuilding needed shared distributions only once in topological order; keep a bounded amount of parallelism. Do not expand an arbitrary Engine-internal edit to a full monorepo run. Update tests that currently codify the narrower Engine behavior.
- Add focused positive and negative regression fixtures: contract change requiring consumer, private change not requiring consumer, transitive dependencies, changed manifest and missing dependency/cycle handling.

### P1 — Correct affected-file diff semantics

- In scripts/runFastGate/run-fast-gate.mjs and scripts/ci/buildChangedContent/build-changed-content.mjs, investigate the current two-commit git diff base head. Prefer PR merge-base (triple-dot) for changed-file impact if tests confirm that this avoids false positives when develop advances. Include explicit divergent-history tests and a clean merge-commit scenario; do not lose actual PR changes, including deleted and renamed files.
- Inspect any other PR-impact scripts using direct base/head comparison; change only those with the same demonstrated selection bug. Keep full tracked-source scanning on Ready main PRs independently of these scoped diffs.

### P1 — Remove duplicated work based on real coverage

- Compare .github/workflows/questions.yml with .github/workflows/content-build.yml and actual root/workspace npm scripts. Publication/tarball portability checks appear both in Production Quality and in each Content Build package job. Remove repeated execution only after verifying the required Content Build check on main covers the same content/workspaces/conditions and cannot be skipped.
- Audit FastGate vs Engine Generators vs ContentBlock Build API vs IndexedDB/host jobs. Retain a standalone runner only for unique tests, host/OS/browser environments or meaningful failure isolation; avoid recompiling the same Engine artifacts and rerunning the same suite merely because multiple workflows match a PR.
- Evaluate overhead from per-textbook matrix jobs (independent npm ci, setup and builds). Benchmark current max-parallel=5 against fewer balanced shards/shared setup or caching without compromising isolation or successful package verification. Prefer observed runner-minute and wall-time savings, not assumed benefits.
- Review Production Quality's use of if: !cancelled() for most expensive later steps: avoid needlessly running all release checks after an early definite failure, while preserving adequate actionable diagnostics. Keep manual deep-diagnostic runs possible.
- Rename misleading workflow/artifact names (e.g. questions.yml and questions-test-results) if safe, without changing the stable external check context accidentally.

### P1 — Enforce TODO policy at nested integration boundaries

- Current Blocker TODOs / clean runs on child PRs; a failure does not itself enforce branch protection on unprotected intermediate targets. Propose the smallest GitHub ruleset targeting verified parent branch patterns (e.g. integration/* or approved course/*) so Ready child PRs cannot merge with blockers.
- **Owner decision required before applying any such ruleset.** Audit whether authorized bots must directly push to Course/Lesson working branches. Design minimal GitHub App bypass/branch exclusions; do NOT protect all agent/* branches or block legitimate materialization pushes. Keep Draft authored blockers warnings, Ready integration blockers failures, Ready main full-source failures.
- Do not rely on PR work: course/lesson/questions/flashcards labels to select GitHub branch rulesets: rulesets target refs/patterns, not labels.

### P1 — Verify default-branch comment automation and legacy branch ancestry

- Exercise a representative authorized /lesson or /course materialize command, relevant /questions and /flashcards builders, and /agent-artifacts command after default branch moved to develop. Check actor authorization, trusted workflow source, pinned PR SHA, no-clobber/source preservation and final generated commit/status; do not claim success after posting a comment alone.
- Inspect Course gate logic in scripts/ci/courseMaterialization/course-gate.mjs and course-materialization.mjs, which checks parent base against the default branch. Historical Course PR #653 targets integration-branch; establish whether it now fails, and propose a safe *per-PR owner-approved* reconciliation without broadly weakening the gate or mass-retargeting children.
- Confirm automatic labels still correctly distinguish bank-only PRs from Lesson and preserve existing parent roles. Regression-test agent autoformat behavior on Ready transitions after bot pushes.

### P2 — Documentation, quiet diagnostics and evidence

- Update stale setup instructions in studio/rules/ci-workflow.md: develop is already default, Protect develop already requires FastGate, and both branches require PRs. Document the exact remaining main required context and the release promotion source policy after implementation.
- Keep quietRun compact on success, useful on failure, with preserved exit code, annotations, early diagnostics and SVITLO_CI_VERBOSE=1 opt-in. Do not swallow machine-readable output or reveal credentials. Agents must inspect check conclusions and failing steps first, only then fetch bounded relevant logs.
- Verify that no duplicate full CI automatically runs after merge into main; report expected PR event and push event matrices. Ensure required jobs are always emitted for the PRs that require them (never hidden behind paths filters), including no-content/doc-only PRs.

## Acceptance evidence

- Provide a CI trigger/check matrix for Draft child, Ready child, docs-only develop, Engine public API develop, UI Kit, single textbook develop, Ready develop → main and main push.
- Execute tests of graph impact, divergent PR diff, branch-source gate, blocker semantics, zero-content selection, required status naming and representative bot authorization. Record each command and its actual result; do not claim unexecuted checks passed.
- For the same representative changes before/after, measure: critical-path wall time, sum of runner job times, number of npm ci calls, number of repeated suite executions, successful/failed job-log bytes, and agent-facing context read. Separate billed minutes from elapsed time.
- Failure injection must show a consumer type error, failed release suite, unfinished authored TODO and unauthorized production source each block the appropriate merge.
- No full develop suite triggered for an unrelated documentation or private Engine tooling edit; no dilution of production coverage. Confirm latest-head green CI before owner-authorized Ready/merge.

## Out of scope / decisions

- No new localization/Education Standards CI, no new blanket quality jobs, no broad change to approved content contracts.
- The owner has updated main's required check in GitHub Settings. Any optional parent-branch ruleset still requires explicit owner approval; GitHub Actions code alone cannot enforce branch protection.
- Make any trade-off that increases checks or runner minutes explicit with measured benefit. Do not treat a reviewer's recommendations as instructions to add tests indiscriminately.

## Trigger and required-status matrix (implementation branch)

| Event/scope | FastGate / verify | Affected content / build, taxonomy and packaging | Blocker TODOs / clean | Production Quality / verify |
| --- | --- | --- | --- | --- |
| Draft Course/Lesson/bank child (integration target) | Not emitted | Scoped selection, often zero | Warning-only for authored blockers | Not emitted |
| Ready Course/Lesson/bank child (integration target) | Not emitted | Scoped selection | Fails on authored blockers; intermediate target protection still needs owner decision | Not emitted |
| Docs-only PR to develop | Emitted, skips npm install | Emitted, zero-package fast path | Emitted | Not emitted |
| Exported Engine/UI Kit API PR to develop | Emitted, graph-based downstream typechecks | Emitted, scoped unless content/tooling changes | Emitted | Not emitted |
| Private Engine implementation PR to develop | Emitted, owner only | Emitted, scoped | Emitted | Not emitted |
| Single textbook PR to develop | Emitted, changed owner | Emitted, changed textbook | Emitted | Not emitted |
| Ready same-repo develop → main | Not emitted | All eligible textbook builds and publishers | Full tracked-source scan | Full monorepo, browser and release-source gate |
| Push to main | Not emitted | Not emitted | Not emitted | Not emitted |

Required contexts are enforced by the actual GitHub rulesets, not by these
descriptions. As of 2026-11-19 `Production Quality / verify` is an active required
status in the `Protect main` GitHub ruleset.
The parent-branch requirement is an unapproved proposal.

## Baseline observations and limitations

- PR #716 is an existing Ready `develop → main` promotion candidate. On
  2026-11-19 its all-textbook Content Build ran successfully:
  [Actions run 44596822428](https://github.com/KiT-Maverik/svitlo/actions/runs/44596822428).
  This run predates the merged deployment of #717 and is **not** proof of the
  new source guard or a matching before/after timing benchmark.
- The graph/Diff/source-policy regression tests run inside FastGate after
  `npm ci`. Separate optional runners (e.g. Chromium IndexedDB and
  Engine-generator scoped gates) are retained for their non-equivalent checks.
- Per-textbook matrix `npm ci`/runner-minute optimization is deliberately not
  changed without actual representative release measurements; compare a bounded
  shard trial against the existing max-parallel=5 baseline before approval.
- No representative authorized comment materialization commands were executed
  by this PR. Source trust/default branch and pinned SHA are reviewed in YAML,
  not falsely reported as live end-to-end verification.

## Live production baseline observation — PR #716

The actual Ready `develop → main` [Production Quality run
44596822108](https://github.com/KiT-Maverik/svitlo/actions/runs/44596822108)
**failed** on 2026-11-19. The first material defect was the repository's
UI Kit TypeScript test fixtures still using `requireQuiz` instead of
`quizRequiredForCompletion`; Web fixture type errors were also reported.
The old `if: !cancelled()` policy then continued into expensive app builds,
publication checks and Playwright despite an earlier definitive failure,
adding secondary errors such as missing generated package artifacts. This is
evidence for the fail-fast change, **not** a production-promotion pass.
The independently required [all-textbook Content Build
44596822428](https://github.com/KiT-Maverik/svitlo/actions/runs/44596822428)
completed successfully. Fixing unrelated Lesson fixture contract failures
belongs to the owning packages, not this CI hardening change.
