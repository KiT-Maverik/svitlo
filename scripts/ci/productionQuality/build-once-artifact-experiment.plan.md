# Build-once Engine artifact experiment — implementation handoff

**Status:** Proposed experimental implementation; no CI behavior has been changed by this planning document. This file exists solely to seed a Draft PR for a separate implementing agent. Reviewer: independent Development Reviewer after implementation. Target: `develop`.

## Goal and hypothesis

Demonstrate on **one workflow run** that a single Ubuntu job can build `@svitlo/engine` once and pass its **compiled `shared/engine/dist/`** to two independent Ubuntu jobs using official GitHub Actions artifacts. Preserve separate native GitHub job statuses/logs; avoid second Engine `package:build` in either consumer. Measure the actual transfer overhead and compare with a representative existing baseline, without claiming a speedup from different source SHAs.

This is a **bounded proof of concept**, not general production CI migration. Do not install Docker, publish an image, use external storage, share `node_modules`, or implement a custom cache, hash/state database, provenance system, or TypeScript orchestrator.

## Read before implementing

Follow root `AGENTS.md`/`README.md`, applicable Studio rules/personas and package/CI runbooks. In particular read:
- `studio/rules/ci-workflow.md` and `studio/rules/package-scripts.md`;
- `.github/workflows/production-quality.yml`, its contract tests `scripts/ci/productionQuality/production-quality.spec.mjs` and `scripts/ci/productionQuality/README.md`;
- `scripts/ci/packageBuildReuse/{README.md,package-build-reuse.mjs}` and its tests;
- `scripts/runWorkspaceScript/{README.md,run-workspace-script.mjs}`, `shared/engine/package.json`, `shared/ui-kit/package.json`, and relevant test/TypeScript configs;
- [CI architecture audit, 27 Nov 2026](https://github.com/KiT-Maverik/svitlo/blob/develop/scripts/ci/productionQuality/README.md) only for general runbook context; the task evidence is listed below.

**Existing policy conflict:** Studio currently bans cross-runner sharing of compiled `dist` as a blanket rule. This user-authorized, isolated experiment is intended to test that restriction, **not** silently repeal CI policy or alter protected release semantics. Keep the change opt-in and describe the measured outcome; propose a separate owner-reviewed policy update if successful.

## Required experiment

### Three independent, individually visible jobs

1. **Producer: Build Engine** (Ubuntu, pinned Node 26 per current production workflow).
   - Checkout the current run's source; `actions/setup-node` with npm download cache; `npm ci`.
   - Run exactly the normal Engine `package:build` once (`npm run package:build --workspace @svitlo/engine`).
   - Validate Engine's declared compiled exports (at least `./dist/build.js`, `./dist/build.d.ts`, `./dist/runtime.js`, `./dist/runtime.d.ts`) and publish the complete `shared/engine/dist/` preserving relative paths via the official `actions/upload-artifact` action. Fail for missing/empty outputs.
2. **Consumer A: TypeScript** (independent Ubuntu job, `needs: producer`).
   - Own checkout, Node, `npm ci`; download **only the producer's artifact from this same run** into `shared/engine/dist/`.
   - Run a real scoped typecheck **of an Engine consumer**, such as `@svitlo/ui-kit`, which resolves Engine's compiled public exports. Confirm the check does not transitively invoke Engine `package:build`.
3. **Consumer B: Unit tests** (separate independent Ubuntu job, `needs: producer`).
   - Own checkout, Node, `npm ci`; same artifact download and destination.
   - Run a meaningful existing Engine-dependent unit suite **without a second Engine `package:build`**. The current `@svitlo/engine` `pretest` invokes `packageBuildReuse`, which **builds** Engine outside configured local state; therefore a direct naive `npm test --workspace @svitlo/engine` invalidates the experiment. Choose the smallest documented prepared/no-pretest invocation while preserving the test command's real test scope (e.g., check whether `npm --ignore-scripts run test --workspace @svitlo/engine` is safe, and test that explicit `test` still executes while `pretest` does not). Do not suppress tests, hide failures or change canonical local `npm test` semantics.

Both consumers must start after the producer, then be runnable in parallel with each other, retain distinct statuses and independent log output. Consumers must not modify or rebuild the **shared Engine `dist`** they receive. They may compile separate temporary test outputs as necessary. Verify the path and installation order and preserve public npm exports.

### Dispatchability and blast radius

Implement a **genuinely runnable opt-in** branch experiment, ideally using an existing workflow file with `workflow_dispatch` already registered on default `develop`, guarded by an explicit experimental input; or another demonstrably supported method for triggering a branch-only workflow. A **brand-new `workflow_dispatch` workflow existing only on the Draft feature branch may not be dispatchable** until registered on the default branch — do not claim it can run without checking GitHub's actual behavior.

- Do not replace, remove, reroute or weaken existing production `types`, `unit`, `packages`, app, E2E, generator, content, and final `Production Quality / verify` gates.
- Do not change branch protection, main promotion rules, or current required check names.
- Avoid accidental expensive parallel experiment on PR `opened`/`synchronize` events or unrelated branches. Ensure any optional experiment jobs are excluded from required release aggregation, or establish explicit isolation with tests.
- Keep artifact access read-only to consumer jobs and credentials minimal (`contents: read` is sufficient for checkout in a normal run).
- Do not pass mutable `SVITLO_CI_PACKAGE_BUILD_STATE` between runners.
- Do not introduce permanent duplicate workflows or full copies of root check orchestration.

### Instrumentation and evidence

Each job should expose usable GitHub-native timing/log evidence, with a compact `GITHUB_STEP_SUMMARY` (where practical):
- producer `npm ci`, Engine build, export validation, artifact upload duration and artifact size;
- each consumer `npm ci`, artifact download duration, typecheck/test duration;
- number of actual Engine `package:build` invocations across all three jobs: **exactly 1**;
- three separate successful jobs; same-run producer dependency visible in the GitHub UI;
- overall run wall-clock and total job-seconds, **not** an unsupported billed-minutes claim;
- compare to the existing reference run [45900076927](https://github.com/KiT-Maverik/svitlo/actions/runs/45900076927) only as historical context; meaningful performance claims need matching source/runner/cache profile.

Retain failure visibility: an invalid or absent artifact must cause downstream validation to fail, not silently trigger recompilation or return green; an Engine build failure prevents consumers from running. Verify expected failure behavior with safe isolated tests. No high-volume successful logs; preserve meaningful failure context.

## Acceptance criteria for independent review

- [ ] Producer builds `@svitlo/engine` once and uploads a complete same-run compiled artifact.
- [ ] Two independent consumer jobs download this output and execute the expected **real** TypeScript and unit checks with isolated statuses and logs.
- [ ] Neither consumer rebuilds or rewrites Engine `dist/`; all three jobs run the same source and compatible Linux/Node profile.
- [ ] No custom cache or hash/state mechanism added; only standard artifact actions and existing npm download cache used.
- [ ] Existing Production Quality release semantics, Draft/Ready policy, required checks and separate privileged materialization boundaries unchanged.
- [ ] Focused repository CI-contract/regression tests actually executed and documented; actual experiment job links and measurements recorded after an authorized manual run.
- [ ] Documentation explains results and remaining uncertainty; **no performance benefit claimed without measurement**.
- [ ] A rollback/removal path for the PoC is explicit. No migration to all workspaces or change to blanket Studio policy in this PR.

## Handoff and review

Implementation is assigned to **another coding agent** on this existing Draft PR and branch. The originating reviewer will perform independent PR review of the actual diff, job topology, logs, test coverage, regressions, and benchmark evidence. Do not mark this PR Ready until implementation has been completed, tested and the handoff to review is appropriate under repository rules. Do not merge without owner authorization.

After implementing, replace/remove this temporary planning file if the full acceptance checklist is already maintained in the PR description and the file adds no enduring runbook value.
