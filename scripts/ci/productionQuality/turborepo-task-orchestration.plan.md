# Turborepo CI task orchestration — controlled proof of concept

**Status:** Draft PR handoff specification. **Implementation has not started in this PR.**
**Base:** `develop`. **Prior experiment:** [PR #895](https://github.com/KiT-Maverik/svitlo/pull/895) (Build Once versus Build Each for two Engine consumers, deliberately a different topology).

## Objective and question

Determine whether **Turborepo OSS** can replace Svitlo's custom npm workspace dependency planning and task scheduling **without losing build/test coverage, correctness or GitHub-native diagnostics**. Compare the real costs of (A) a single Turbo-runner, (B) one GitHub Actions job per package-operation task, and (C) a hybrid. Compare all three against the existing Production Quality topology. Do not conclude that single-runner, distributed, or hybrid is best before comparable measurements.

**Owner constraints:** No Nx Cloud, Vercel Remote Cache or paid external CI provider; no mandatory third-party SaaS, registry or remote-execution dependency. Use GitHub Actions runners and official same-run artifacts for cross-runner transfers, where the variant needs them. Local Turbo cache is permitted for measurements; cache-hits and misses must be recorded and compared separately.

This is an **opt-in, reversible experiment**, NOT permission to migrate protected CI gates or relax the Studio runner-isolation policy.

## Mandatory starting points (read, don't infer from this plan)

1. Root `AGENTS.md`, `README.md`; explore `studio/`, read `studio/rules/ci-workflow.md`, `studio/rules/package-scripts.md`, `studio/rules/github-labels-and-naming.md`, `.github/labels.json`; select the actual Coding Agent, Development Reviewer and QA Reviewer responsibilities. Consult `studio/docs/architecture/README.md` and `studio/docs/architecture/monorepo-and-textbook.md`.
2. Inspect `package.json`, `package-lock.json`, all relevant workspace `package.json` files, `turbo.json`, `scripts/AGENTS.md`, `scripts/README.md`, and the local docs, entrypoint JSDoc and tests for:
   - `scripts/runWorkspaceScript/` (dependency discovery, planning, typecheck scheduler)
   - `scripts/runFastGate/` (affected workspace/public contract selection)
   - `scripts/ci/packageBuildReuse/` (job-local state and output validation)
   - `scripts/ci/productionQuality/` and `.github/workflows/production-quality.yml`
   - `.github/workflows/fast-gate.yml`, `.github/workflows/engine-generators.yml`, and all downstream workflows called by Production Quality.
3. Read current official Turborepo documentation for task syntax with colon-delimited names, `dependsOn`, `outputs`, `inputs`, `env`, `--filter`, `--dry=json`, caching behavior and monorepo discovery. Pin a documented, npm-compatible version; verify actual Node/npm requirements. Do not assume a previously unused `turbo.json` already describes current tasks.
4. Inspect PR #895's benchmark evidence and results as *context only*. Its three-job producer bottleneck and 28-second median delta are **not** an A/B result for this full-repository architecture.

## Baseline observed from develop (revalidate after code changes)

- The root scripts invoke `scripts/runWorkspaceScript/run-workspace-script.mjs` for `package:build`, `code:check:types`, `test`, `test:components`, `app:build`, etc. `discoverWorkspaces`, `planWorkspaceOperation`, and `planTypecheckPhases` implement custom planning; separate `runFastGate` and job-local `packageBuildReuse` handle affected/check scheduling and compilation reuse.
- The checked-in `turbo.json` declares `build`, `typecheck`, `lint`, `test`, `dev`; these **do not match** important current canonical script names such as `package:build`, `code:check:types`, `code:lint:check`. Turbo is not an installed root dependency in the inspected baseline.
- The current Production Quality has required result `Production Quality / verify`, source-policy gate, independent repository/types/unit/generators/components/lint/packages/app jobs, and a manifest-defined app matrix. It must not silently lose any existing checks, generators, signed/source safety gates, app test/packaging steps, or standalone package export verification.
- `@svitlo/engine` has `package:build` and a rebuild-triggering `pretest`; `@svitlo/ui-kit` depends on Engine; `@svitlo/math` declares Engine dependency and UI Kit development dependency. Content package publication, Web selected-textbook build, npm lifecycle scripts and multiple TS configurations may create additional outputs/side effects. Inspect the actual full graph, not just these examples.
- Current package script policy requires root commands to remain exhaustive and package-specific commands to keep their canonical meaning; do not replace root `test` with a narrowed or partial test suite.

## Experiment stages

### Stage 1 — Establish ground truth and graph parity

- Enumerate workspaces and supported operations from actual npm manifests. Record workspace dependency edges (including relevant dev/peer/optional dependency semantics), task prerequisites, cycles, non-buildable workspaces and scripts with implicit npm `pre*`/`post*` actions.
- Pin Turbo **locally** (package-lock updated and committed by implementing agent) and define its tasks using actual Svitlo script names. Detect and avoid root task recursion where a root npm script currently calls a custom all-workspace aggregator.
- Create a machine-readable task graph (`turbo run ... --dry=json` or officially documented equivalent). Compare it with the existing planner for representative and full selections. Document any semantic difference explicitly: missing tasks, additional builds, ordering, affected-only consumers, double execution, side effects or inaccurate inputs/outputs.
- Verify generated runtime assets, `dist`, `.test-build`, `.next`, content publishing outputs, environment-dependent variants and package public exports are accounted for. Never mark a task cacheable until its inputs/outputs are complete and verified. Correctness first, performance second.
- Define and test behavior when TypeScript fails: a `test` task that has an explicitly configured `dependsOn` on that typecheck must not run; genuinely independent tests should remain independent. Do not claim this dependency is automatically inferred from npm scripts.

### Stage 2 — Minimal reproducible variants

Implement the following **on the same source commit and same validation scope**, initially for a small representative chain (Engine, UI Kit, Math plus any verified real prerequisites) and extend to the full required package/task scope only after parity is proven.

| Variant | Execution topology | Must prove |
| --- | --- | --- |
| A — Single Turbo | One GitHub Actions runner with one npm install; Turbo schedules a dependency-aware task DAG, parallelizes eligible work and uses only approved local task cache | All expected tasks and public output artifacts exist; correct order and no false cache hits; one GitHub job status |
| B — Per-task GitHub jobs | Independent job for each selected `workspace × operation`; `needs` edges follow the **actual** dependency graph; per-package build artifacts transferred from the producing job, with independent install and no shared mutable `node_modules` | True GitHub-native job statuses, no missing prerequisites or unintended rebuilds; compare runner startup/install/transfer overhead; faithful failure propagation |
| C — Hybrid | Several independent GitHub jobs grouped only where measured/justified; within each group Turbo schedules local tasks; cross-job `needs`/artifacts for genuinely required boundaries | Intermediate groups can start as soon as their relevant prerequisites finish, without a global producer barrier; report grouping rationale |

**GitHub Actions limitation:** `needs` is a workflow-definition DAG, not dynamically generated by a preceding job. A runtime matrix cannot inject arbitrary new `needs` between matrix elements. For variant B/C, use either (a) a small static representative DAG, or (b) an explicitly generated and **checked-in, reviewable** YAML workflow with deterministic generation and source-level parity tests. Do **not** claim an arbitrary runtime-planned DAG can become GitHub jobs natively. Avoid creating elaborate custom orchestration machinery merely to manufacture a benchmark.

For B/C, use same-run, same-attempt artifact names, explicit checks for missing/corrupt or modified `dist`, and one well-defined producer per compiled output. Never share mutable build-reuse state across runners. If the existing Studio policy forbidding cross-runner `dist` conflicts with the experimental implementation, keep it isolated to a manual PoC; changing that policy requires separate approval and evidence.

### Stage 3 — Opt-in GitHub Actions execution

- Provide a **genuinely dispatchable** experiment from the feature branch: prefer opt-in modes in an already registered `workflow_dispatch` workflow on `develop`, or another solution whose real dispatchability is verified. A novel branch-only workflow may not register in the default-branch UI.
- Ensure ordinary `pull_request`, Ready, `workflow_call`, release and materializer paths do **not** execute PoC jobs or change required check names. Never change `.github/workflows/production-quality.yml` for normal production gating as part of this PoC.
- Use isolated concurrency keys per variant to avoid cross-mode cancellation; take measurements non-overlapping when feasible. Record any cancelled/retried/failing runs instead of hiding them.
- Keep correct status semantics: skipped or missing required checks must **not** be reported as success by a final aggregate; producer/task failure must block dependent tasks correctly.
- Include focused source-level tests for mode isolation, task graph parity, workflow DAG integrity and artifact completeness/consistency; include failure-path tests for missing outputs and bad build prerequisites. Avoid duplicate implementations of existing checks.

### Stage 4 — Controlled A/B/C benchmarking

- Before benchmarking, verify all variants run **the same task set** and equivalent assertions/outputs. Separate task execution time from workflow elapsed time, runner provisioning, `npm ci`, cache restoration, artifact upload/download and job waiting.
- Use the **same pinned head SHA**, runner OS/image, Node/npm/Turbo versions, lockfile and environment selection. Execute at least **three successful non-overlapping runs per variant** with interleaved ordering. Record all attempted/cancelled runs; investigate failures.
- Compare cold-cache and warm-cache cases separately. Do not present warmed-cache results as equivalent to first-run execution; make cache keys/seed assumptions explicit. The absence of a remote cache is a feature of the chosen no-SaaS design, not an unmentioned omission.
- Report exact source SHA, mode, native job outcomes, timing source, build-command count, duplicated builds, wall-clock seconds, sum of active experimental job seconds, time-to-first-useful-failure when measurable, cache hits, transfer bytes/times, and resource contention caveats. **Job-seconds are not GitHub billing minutes**; report costs only with appropriate verified billing assumptions.
- Compare with the current Production Quality only on a controlled equivalent source/task scope. Historical runs (including #895) are context, not matched baselines.

### Stage 5 — Evidence-based architecture decision

Deliver a concise decision record in this PR:
- Which Turbo capabilities **genuinely replace** current code (`runWorkspaceScript`, `runFastGate`, `packageBuildReuse`, typecheck scheduler); which behaviors remain distinct and must stay. Do not assert an entire script can be deleted based only on functional overlap.
- Per-variant performance table, task coverage parity, failure isolation, config/generated-YAML maintenance cost, number of custom LOC that can actually be removed, and risk of output/stale-cache bugs.
- Recommendation among A/B/C/**keep existing architecture** with tradeoffs. A different result for small Engine-only tasks versus the complete Production Quality task graph is acceptable and expected.
- Whether a future production migration is warranted and, if so, its **separate** implementation/rollout/rollback plan. Explicitly distinguish proof of concept from production adoption.

## Acceptance criteria

- [ ] Every selected workspace/task is supported by actual manifest scripts; graph parity and missing-workspace/cycle behavior tested.
- [ ] Turbo OSS installed and pinned; **no Nx Cloud, paid remote cache, SaaS dependency, or mandatory external account**.
- [ ] Task configuration matches canonical Svitlo names and real build outputs; safe behavior under npm lifecycle side effects and cache invalidation.
- [ ] Variant A runs on one runner; Variant B yields independent GitHub job statuses per selected task; Variant C has a documented multi-runner grouping. No untested assumption that Turbo creates GitHub jobs by itself.
- [ ] Existing full-quality gates, manual security/source checks, app/browser/packaging and scoped FastGate behavior are **not changed or silently dropped**.
- [ ] True opt-in branch dispatch verified on pinned SHA; failure and skip semantics verified; no incompatible CI status changes.
- [ ] At least 3 comparable successful non-overlapping runs per variant (plus documented failures/cancellations), with cache state controlled and per-job timing collected.
- [ ] Independent Development Review verifies architecture and task parity; QA review verifies equivalence of assertions and benchmark methodology.
- [ ] PR description records measured outcome and decision; **no merge/migration without owner approval**.

## Not in scope / handoff

This initial commit contains **only this specification**. The implementing agent should edit this **existing branch and PR**, not create a parallel work PR; install/configure Turbo and add the experiment with tests after inspecting latest source. Do not rewrite the monorepo, replace official root commands, delete the old scheduler, remove Studio policies, create protected required checks, or alter release/materializer security as a shortcut. Limit code change to what the PoC requires; keep permanent migration out of scope.

The assistant preparing this handoff will independently review the implementing agent's PR and benchmark evidence. PR #895 remains untouched and retains its original narrowly scoped benchmark.
