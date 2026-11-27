# CI log production inventory — 2026-11-27

Source-level job/step audit on PR #915 at initial snapshot `260803f2a4902db858a40c3d6e3e8718deb0e0cd`. This is a **one-time structural inventory**, not evidence all jobs were actually executed. Jobs with dynamic matrix expansions are evaluated from their runtime planners and are not hardcoded here. See the [decision and run evidence](./ci-log-output-optimization.md).

Every listed job's YAML steps are enumerated in declaration order. Provider output is owned by GitHub or third-party actions; existing quiet-run and native Node dot identify source-level output policies. Raw commands must remain visible when output is consumed by a machine or needed for authorization, source pinning, materialization, security and forensic failure diagnosis. For multi-line shell steps, references below are source indicators, not exhaustive executed commands. Refer to the workflow and adjacent scripts for full transitive behavior.

### `agent-ci-artifacts.yml`

**Job `resolve`** — needs: `—`; if: `>-`.

1. Resolve trusted PR context without checking out code — **protocol/diagnostics (raw)**

**Job `generate`** — needs: `resolve`; if: `needs.resolve.result == 'success'`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install dependencies for the requested generator — **direct CLI/shell**
4. Detect complete EducationStandard authoring matrix — **protocol/diagnostics (raw)**; code: `shared/engine/scripts/readSupportedLanguages/read-supported-languages.mjs`, `scripts/generateTranslationReviewArtifacts/education-standards-reference.mjs`; if: `needs.resolve.outputs.kind == 'education-standards'`
5. Build Engine for typed Lesson/Course or complete EducationStandard generation — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`; if: `needs.resolve.outputs.kind == 'lessons' // needs.resolve.outputs.kind == 'course`
6. Generate only the selected reference scope — **direct CLI/shell**; code: `scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs`
7. Validate pinned manifest, scope, checksums and archive inventory — **direct CLI/shell**
8. Upload run-scoped reference corpus — **provider**


### `assessment-materialization.yml`

**Job `verify`** — needs: `—`; if: `github.event_name == 'pull_request' && github.event.pull_request.draft == false`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/quietRun/quiet-run.mjs -- npm ci --ignore-scripts --no-audit --no-fund — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. node scripts/ci/quietRun/quiet-run.mjs -- npm run package:build --workspace @svitlo/engine — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. node --test --test-reporter=dot scripts/ci/assessmentMaterialization/*.spec.mjs scripts/ci/directMaterialization/reserve — **native Node dot**; code: `scripts/ci/directMaterialization/reserved-parent-slot.spec.mjs`
6. node scripts/ci/quietRun/quiet-run.mjs -- npm run code:check:types --workspace @svitlo/engine — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`

**Job `resolve`** — needs: `—`; if: `>-`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/assessmentMaterialization/assessment-gate.mjs resolve — **direct CLI/shell**; code: `scripts/ci/assessmentMaterialization/assessment-gate.mjs`

**Job `analyze`** — needs: `resolve`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/checkout@v5 — **provider**
3. actions/setup-node@v5 — **provider**
4. npm ci --ignore-scripts --no-audit --no-fund — **direct CLI/shell**
5. npm run package:build --workspace @svitlo/engine — **direct CLI/shell**
6. node trusted/scripts/ci/assessmentMaterialization/assessment-transaction.mjs analyze — **direct CLI/shell**; code: `scripts/ci/assessmentMaterialization/assessment-transaction.mjs`
7. assessment-stage4-${{ github.run_id }} — **provider**

**Job `publish`** — needs: `[resolve, analyze]`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/checkout@v5 — **provider**
3. actions/setup-node@v5 — **provider**
4. Install pinned TypeScript parser for trusted source verification — **direct CLI/shell**
5. assessment-stage4-${{ github.run_id }} — **provider**
6. node trusted/scripts/ci/assessmentMaterialization/assessment-transaction.mjs publish — **direct CLI/shell**; code: `scripts/ci/assessmentMaterialization/assessment-transaction.mjs`


### `backfill-labels.yml`

**Job `backfill`** — needs: `—`; if: `>-`; matrix: `shard: [0, 1, 2, 3]`.

1. actions/checkout@v5 — **provider**
2. Apply historical labels (all Issue and PR states) — **provider**


### `bank-materialization.yml`

**Job `typed_resolve`** — needs: `—`; if: `>-`.

1. Checkout trusted Bank Stage 3 authorization — **provider**
2. actions/setup-node@v5 — **provider**
3. Require exact pinned Bank source and owning Lesson revision — **direct CLI/shell**; code: `scripts/ci/bankMaterialization/bank-typed-gate.mjs`

**Job `typed_analyze`** — needs: `typed_resolve`; if: `—`.

1. Checkout trusted Engine and CLI — **provider**
2. Checkout pinned Bank PR for isolated execution, without credentials — **provider**
3. Bind exact candidate SHA to its local non-remote branch — **direct CLI/shell**
4. actions/setup-node@v5 — **provider**
5. Install and build trusted Engine — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. Execute one reviewed Bank entrypoint in isolated worker — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/bankMaterialization/bank-typed-materialization.mjs`
7. Upload SHA-pinned verified typed source manifest — **provider**

**Job `typed_publish`** — needs: `[typed_resolve, typed_analyze]`; if: `needs.typed_analyze.result == 'success'`.

1. Checkout default-branch trusted publisher only — **provider**
2. actions/setup-node@v5 — **provider**
3. Download isolated checksummed typed source manifest — **provider**
4. Reauthorize, verify bounded files and CAS publish — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/bankMaterialization/bank-typed-materialization.mjs`


### `blocker-todos.yml`

**Job `clean`** — needs: `—`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Test blocker TODO guard — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/checkBlockerTodos/check-blocker-todos.spec.mjs`
4. Enforce blocking TODO guard — **direct CLI/shell**; code: `scripts/ci/checkBlockerTodos/check-blocker-todos.mjs`


### `content-build.yml`

**Job `prepare`** — needs: `—`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Plan content builds — **direct CLI/shell**; code: `scripts/ci/buildChangedContent/plan-content-builds.mjs`
4. Test content build selection — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. Install dependencies only for selected builds — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`; if: `steps.plan.outputs.has_builds == 'true'`
6. Test skills structure invariants — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `shared/engine/scripts/checkSkillsTaxonomyStructure/check-skills-taxonomy-structure.spec.mjs`; if: `steps.plan.outputs.has_builds == 'true'`
7. Test final resource readiness gate — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/verifyProductionAssets/verify-production-assets.spec.mjs`; if: `steps.plan.outputs.has_builds == 'true'`
8. Build Engine runtime for assessment reference tests — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`; if: `steps.plan.outputs.has_builds == 'true'`
9. Test published assessment resource references — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/textbook-tooling/verifyAssessmentSelections/verifyAssessmentSelections.spec.mjs`; if: `steps.plan.outputs.has_builds == 'true'`
10. Refuse unfinished Lesson, bank and Episode resources on review-ready production PRs — **direct CLI/shell**; code: `scripts/ci/verifyProductionAssets/verify-production-assets.mjs`; if: `github.event_name == 'pull_request' && github.base_ref == 'main' && !github.even`
11. Validate selected package graph and package-artifact guard — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/checkBuiltPackageExports/check-built-package-exports.spec.mjs`; if: `steps.plan.outputs.has_builds == 'true' && steps.plan.outputs.agent_mode != 'tru`

**Job `build`** — needs: `prepare`; if: `needs.prepare.outputs.has_builds == 'true'`; matrix: `${{ fromJSON(needs.prepare.outputs.shards) }}`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install dependencies once per content shard — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Build Engine for content shard — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. Verify each selected textbook or agent scope — **direct CLI/shell**; code: `scripts/ci/buildChangedContent/content-shards.mjs`

**Job `verify`** — needs: `[prepare, build]`; if: `always()`.

1. Require successful preparation and every selected content shard — **direct CLI/shell**


### `contentblock-build-api.yml`

**Job `verify`** — needs: `—`; if: `github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/quietRun/quiet-run.mjs -- npm ci --no-audit --no-fund — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Typecheck Engine and execute ContentBlock regression tests — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`


### `course-navigation-web.yml`

**Job `verify`** — needs: `—`; if: `github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned dependencies — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Run Web Vitest unit and component suites — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. Check published Web content integration — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. Build Web application with the controlled fixture — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
7. Install Chromium — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
8. Exercise Course browser routes in desktop and mobile projects — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
9. course-navigation-web-test-results — **provider**; if: `always()`


### `course-typed-materialization.yml`

**Job `verify-implementation`** — needs: `—`; if: `github.event_name == 'pull_request' && github.event.pull_request.draft == false`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned dependencies without lifecycle scripts — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Assert clean trusted Engine preparation — **direct CLI/shell**
5. Build ordinary Engine package — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. Test trusted typed Course Stage 5 boundary — **native Node dot**; code: `scripts/ci/courseMaterialization/typed-course-direct.spec.mjs`, `scripts/ci/courseMaterialization/course-handoff-tables.spec.mjs`, `scripts/ci/courseMaterialization/course-handoff-publish.spec.mjs`, `scripts/ci/reviewEvidence/review-evidence.spec.mjs`, `scripts/ci/directMaterialization/reserved-parent-slot.spec.mjs`
7. Test Course source generator and atomic writer — **native Node dot**; code: `shared/engine/generators/materializers/course/materializeStage5.spec.mjs`, `shared/engine/generators/materializers/course/materializeStage5.build.spec.mjs`, `shared/engine/generators/materializers/course/sourceCommit.spec.mjs`
8. Verify focused source formatting — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
9. Verify Engine build-time type contracts — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
10. Verify canonical Engine package build and public declarations — **direct CLI/shell**; code: `shared/engine/dist/build.d.ts`, `shared/engine/dist/runtime.d.ts`

**Job `resolve`** — needs: `—`; if: `>-`.

1. Check out trusted default-branch authorization gate — **provider**
2. actions/setup-node@v5 — **provider**
3. Verify exact source and authorized actor — **direct CLI/shell**; code: `scripts/ci/courseMaterialization/typed-course-gate.mjs`

**Job `analyze`** — needs: `resolve`; if: `—`.

1. Check out trusted materializers and immutable default-branch Lesson history — **provider**
2. Check out pinned PR as inert data, never a workflow or script source — **provider**
3. actions/setup-node@v5 — **provider**
4. Install only trusted dependencies without lifecycle scripts — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. Build the ordinary Engine package — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. Pull the pinned, credential-free worker image — **direct CLI/shell**
7. Execute direct Course entrypoint in an isolated worker and seal manifest — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/courseMaterialization/typed-course-direct.mjs`
8. Upload read-only job result — **provider**

**Job `publish`** — needs: `[resolve, analyze]`; if: `needs.analyze.result == 'success'`.

1. Check out trusted default-branch publisher only — **provider**
2. Check out pinned PR data; never execute PR source — **provider**
3. actions/setup-node@v5 — **provider**
4. Install trusted TypeScript parser for static Course handoff verification — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. Download exact read-only job manifest — **provider**
6. Recheck source hashes and branch lease; commit attested files — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/courseMaterialization/typed-course-publish.mjs`

**Job `reconcile-pr-tables`** — needs: `[resolve, analyze, publish]`; if: `needs.publish.result == 'success'`.

1. Check out trusted metadata reconciliation (never candidate code) — **provider**
2. actions/setup-node@v5 — **provider**
3. typed-course-stage5-${{ needs.resolve.outputs.pr }}-${{ github.run_id }} — **provider**
4. Verify committed file bytes and reconcile Lessons/Episodes tables only — **direct CLI/shell**; code: `scripts/ci/courseMaterialization/course-handoff-publish.mjs`


### `db-controllers-e2e.yml`

**Job `browser-controllers`** — needs: `—`; if: `github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/quietRun/quiet-run.mjs -- npm ci --no-audit --no-fund — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. node scripts/ci/quietRun/quiet-run.mjs -- npm run package:build --workspace @svitlo/engine — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. node scripts/ci/quietRun/quiet-run.mjs -- npm run package:build --workspace @svitlo/indexdb — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. node scripts/ci/quietRun/quiet-run.mjs -- npx playwright install chromium — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
7. Native IndexedDB Chromium — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
8. indexdb-browser-test-results — **provider**; if: `always()`


### `desktop-ci.yml`

**Job `desktop`** — needs: `—`; if: `github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install workspaces — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Record production and full npm audit without masking advisory findings — **protocol/diagnostics (raw)**
5. Report resolved packaging graph — **direct CLI/shell**
6. svitlo-forge-npm-audits — **provider**
7. Build and package Desktop using Forge Vite — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
8. Typecheck adapter and Desktop — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
9. Validate Electron adapter resource confinement — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
10. Lint Desktop — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
11. Validate Electron source import boundaries and Forge hooks — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
12. Validate published resources — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
13. Run Electron smoke under virtual display — **direct CLI/shell**
14. Verify unpacked executable — **direct CLI/shell**; code: `apps/desktop/scripts/verifyPackageArtifacts/verify-package-artifacts.mjs`
15. Start packaged Linux executable offline — **direct CLI/shell**
16. Install Debian maker requirements — **direct CLI/shell**
17. Make Debian distribution from existing package — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
18. Verify Debian artifact — **direct CLI/shell**; code: `apps/desktop/scripts/verifyPackageArtifacts/verify-package-artifacts.mjs`
19. svitlo-forge-linux-deb — **provider**

**Job `native-installers`** — needs: `—`; if: `github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft`; matrix: `include:`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Clean install — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Build Desktop from published content — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. Check Desktop types — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. Forge make from existing package — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
7. Verify native maker artifacts — **direct CLI/shell**; code: `apps/desktop/scripts/verifyPackageArtifacts/verify-package-artifacts.mjs`
8. svitlo-forge-${{ matrix.platform }} — **provider**


### `engine-coverage.yml`

**Job `analyze`** — needs: `—`; if: `>-`.

1. Resolve the open PR's exact commits — **protocol/diagnostics (raw)**
2. Check out the immutable PR head — **provider**
3. actions/setup-node@v5 — **provider**
4. Install pinned workspace dependencies — **direct CLI/shell**
5. Build Engine — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. Validate the coverage filter and gap reporter — **native Node dot**; code: `shared/engine/scripts/coverage/report.spec.mjs`
7. Discover files changed by the PR — **direct CLI/shell**
8. Run the Engine test suite and publish only gaps — **direct CLI/shell**
9. Stage only the sanitized gap diagnostics — **direct CLI/shell**; code: `shared/engine/.coverage-engine/engine-gaps.js`
10. Validate and bind the gap report to this run — **direct CLI/shell**
11. Upload gap-only diagnostics — **provider**


### `engine-generators.yml`

**Job `publisher-isolation`** — needs: `—`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Prove typed Lesson and bank publishers load without installed packages — **native Node dot**; code: `scripts/ci/lessonMaterialization/lesson-typed-publish.spec.mjs`, `scripts/ci/bankMaterialization/bank-typed-materialization.spec.mjs`
4. Verify static six-command dispatch, trust boundaries and Course dependency inventory — **native Node dot**; code: `scripts/ci/directMaterialization/materialization-workflow-security.spec.mjs`, `scripts/ci/directMaterialization/trusted-draft.spec.mjs`, `scripts/ci/directMaterialization/course-dependency-isolation.spec.mjs`

**Job `ci-policy`** — needs: `—`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node --test --test-reporter=dot scripts/ci/requiredCheckReuse/*.spec.mjs scripts/ci/draftCiPolicy/*.spec.mjs scripts/ci/ — **native Node dot**; code: `scripts/ci/productionQuality/production-quality.spec.mjs`, `scripts/ci/releaseSource/check-release-source.spec.mjs`, `scripts/ci/quietRun/quiet-run.spec.mjs`

**Job `generator-tests`** — needs: `—`; if: `github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/quietRun/quiet-run.mjs -- npm ci --no-audit --no-fund — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Build Engine — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. Verify pinned Prettier import ordering without rewriting sources — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. Typecheck Engine and compile generator tests — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `shared/engine/tsconfig.test.js`
7. Run targeted generator and CLI regression tests — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `shared/engine/generators/courses/publishCourseData.spec.mjs`, `shared/engine/generators/skills/publishSkillTree.spec.mjs`, `shared/engine/scripts/generateSkills/prepareSkillsPublication.spec.mjs`, `shared/engine/scripts/generateLessonProps/generateLessonProps.spec.mjs`
8. Test typed Bank source and PR-command security — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/bankMaterialization/bank-typed-materialization.spec.mjs`, `scripts/ci/bankMaterialization/bank-typed-block-evidence.spec.mjs`
9. Test typed Lesson Stage 6 source and PR-command security — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/lessonMaterialization/lesson-typed-materialization.spec.mjs`, `scripts/ci/lessonMaterialization/lesson-typed-publish.spec.mjs`
10. Verify reserved Course parent ownership and AST handoff checks — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/directMaterialization/reserved-parent-slot.spec.mjs`
11. Check formatting of typed Course Flow sources — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `shared/engine/configurators/courses/defineCourse/defineCourse.schemas.ts`, `shared/engine/configurators/courses/defineCourse/courseHierarchy.spec.ts`, `shared/engine/package.js`


### `episode-materialization.yml`

**Job `verify`** — needs: `—`; if: `github.event_name == 'pull_request' && github.event.pull_request.draft == false`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/quietRun/quiet-run.mjs -- npm ci --ignore-scripts --no-audit --no-fund — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. node scripts/ci/quietRun/quiet-run.mjs -- npm run package:build --workspace @svitlo/engine — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. node --test --test-reporter=dot scripts/ci/episodeMaterialization/episode-direct.spec.mjs shared/engine/generators/mater — **native Node dot**; code: `scripts/ci/episodeMaterialization/episode-direct.spec.mjs`, `shared/engine/generators/materializers/episode/materialize.spec.mjs`, `scripts/ci/directMaterialization/reserved-parent-slot.spec.mjs`
6. node scripts/ci/quietRun/quiet-run.mjs -- npm run code:check:types --workspace @svitlo/engine — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`

**Job `resolve`** — needs: `—`; if: `>-`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/episodeMaterialization/episode-gate.mjs resolve — **direct CLI/shell**; code: `scripts/ci/episodeMaterialization/episode-gate.mjs`

**Job `analyze`** — needs: `resolve`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/checkout@v5 — **provider**
3. actions/setup-node@v5 — **provider**
4. npm ci --ignore-scripts --no-audit --no-fund — **direct CLI/shell**
5. npm run package:build --workspace @svitlo/engine — **direct CLI/shell**
6. node trusted/scripts/ci/episodeMaterialization/episode-transaction.mjs analyze — **direct CLI/shell**; code: `scripts/ci/episodeMaterialization/episode-transaction.mjs`
7. episode-stage5-${{ github.run_id }} — **provider**

**Job `publish`** — needs: `[resolve, analyze]`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/checkout@v5 — **provider**
3. actions/setup-node@v5 — **provider**
4. Install pinned TypeScript parser for trusted source verification — **direct CLI/shell**
5. episode-stage5-${{ github.run_id }} — **provider**
6. node trusted/scripts/ci/episodeMaterialization/episode-transaction.mjs publish — **direct CLI/shell**; code: `scripts/ci/episodeMaterialization/episode-transaction.mjs`

### `fast-gate.yml`

**Job `verify`** — needs: `—`; if: `—`.

1. actions/checkout@v5 — **provider**
2. Reuse successful required result on description edits — **direct CLI/shell**; code: `scripts/ci/requiredCheckReuse/required-check-reuse.mjs`
3. Detect whether this PR needs typechecks — **protocol/diagnostics (raw)**; if: `steps.reuse.outputs.reuse != 'true'`
4. Explain lightweight Draft validation — **direct CLI/shell**; if: `github.event_name == 'pull_request' && github.event.pull_request.draft`
5. actions/setup-node@v5 — **provider**; if: `steps.reuse.outputs.reuse != 'true' && steps.scope.outputs.run == 'true' && (git`
6. Install pinned dependencies for typechecking — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`; if: `steps.reuse.outputs.reuse != 'true' && steps.scope.outputs.run == 'true' && (git`
7. Verify symbol-aware Course stub guard — **native Node dot**; code: `scripts/ci/checkStubImports/check-stub-imports.spec.mjs`; if: `steps.reuse.outputs.reuse != 'true' && steps.scope.outputs.run == 'true' && (git`
8. Reject newly introduced Course stub imports and uses — **direct CLI/shell**; code: `scripts/ci/checkStubImports/check-stub-imports.mjs`; if: `steps.reuse.outputs.reuse != 'true' && steps.scope.outputs.run == 'true' && gith`
9. Typecheck changed workspaces and public API consumers — **direct CLI/shell**; code: `scripts/runFastGate/run-fast-gate.mjs`; if: `steps.reuse.outputs.reuse != 'true' && github.event_name == 'pull_request' && !g`
10. Manually requested typechecks — **direct CLI/shell**; code: `scripts/runFastGate/run-fast-gate.mjs`; if: `github.event_name == 'workflow_dispatch' && steps.scope.outputs.run == 'true'`
11. 'Validated Ready scope v1 / ${{ github.event.pull_request.number }} / ${{ github.event.pull_request.head.ref }} / ${{ gi — **direct CLI/shell**; if: `success() && github.event_name == 'pull_request' && !github.event.pull_request.d`


### `frontend-components.yml`

**Job `verify`** — needs: `—`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/quietRun/quiet-run.mjs -- npm ci --no-audit --no-fund — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. node scripts/ci/quietRun/quiet-run.mjs -- npm run test:components:coverage — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. node scripts/ci/quietRun/quiet-run.mjs -- npm test — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. node scripts/ci/quietRun/quiet-run.mjs -- npm run code:check:types — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
7. node scripts/ci/quietRun/quiet-run.mjs -- npm run code:lint:check — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
8. node scripts/ci/quietRun/quiet-run.mjs -- npm run app:build — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`


### `get-lesson.yml`

**Job `resolve`** — needs: `—`; if: `>-`.

1. Authorize actor and pin same-repo PR before any checkout — **protocol/diagnostics (raw)**

**Job `analyze`** — needs: `resolve`; if: `needs.resolve.outputs.valid == 'true'`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned parser dependencies safely — **direct CLI/shell**
4. Run immutable-source static scan — **direct CLI/shell**; code: `shared/engine/scripts/queryLessons/query-lessons.mjs`
5. Upload report only as Actions artifact — **provider**


### `lesson-materialization.yml`

**Job `typed-resolve`** — needs: `—`; if: `>-`.

1. Check out immutable trusted command gate from default branch — **provider**
2. actions/setup-node@v5 — **provider**
3. Authorize actor and locate pinned Lesson source — **direct CLI/shell**; code: `scripts/ci/lessonMaterialization/lesson-typed-gate.mjs`

**Job `typed-analyze`** — needs: `typed-resolve`; if: `—`.

1. Check out pinned trusted Engine and worker — **provider**
2. Check out pinned Lesson commit for isolated execution — **provider**
3. actions/setup-node@v5 — **provider**
4. Install and build only trusted Engine code — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. Execute pinned Lesson entrypoint in isolated worker without GitHub credentials — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/lessonMaterialization/lesson-typed-materialization.mjs`
6. Retain source-pinned and SHA256-attested analysis evidence — **provider**

**Job `typed-publish`** — needs: `[typed-resolve, typed-analyze]`; if: `needs.typed-analyze.result == 'success'`.

1. Check out pinned trusted publisher with no dependencies — **provider**
2. Check out pinned Lesson HEAD as data, never execute it — **provider**
3. actions/setup-node@v5 — **provider**
4. Download the exact read-only analyzer artifact — **provider**
5. Verify source HEAD, blob and manifest before atomic commit — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/lessonMaterialization/lesson-typed-materialization.mjs`


### `mobile.yml`

**Job `web`** — needs: `—`; if: `github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/quietRun/quiet-run.mjs -- npm ci --no-audit --no-fund — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. node scripts/ci/quietRun/quiet-run.mjs -- npm run app:build --workspace @svitlo/mobile — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. node scripts/ci/quietRun/quiet-run.mjs -- npm run app:check:bundle --workspace @svitlo/mobile — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. node scripts/ci/quietRun/quiet-run.mjs -- npm run code:check:types:prepared --workspace @svitlo/mobile — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
7. node scripts/ci/quietRun/quiet-run.mjs -- npm run code:lint:check --workspace @svitlo/adapter-capacitor — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
8. node scripts/ci/quietRun/quiet-run.mjs -- npm run test --workspace @svitlo/mobile — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
9. node scripts/ci/quietRun/quiet-run.mjs -- npm exec --workspace @svitlo/mobile -- playwright install chromium --with-deps — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
10. node scripts/ci/quietRun/quiet-run.mjs -- npm run test:e2e --workspace @svitlo/mobile — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`

**Job `android`** — needs: `—`; if: `github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. actions/setup-java@v5 — **provider**
4. gradle/actions/setup-gradle@v5 — **provider**
5. node scripts/ci/quietRun/quiet-run.mjs -- npm ci --no-audit --no-fund — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. node scripts/ci/quietRun/quiet-run.mjs -- npm run app:build --workspace @svitlo/mobile — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
7. node scripts/ci/quietRun/quiet-run.mjs -- npm exec --workspace @svitlo/mobile -- cap sync android — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
8. Compile debug APK without signing — **direct CLI/shell**

**Job `ios`** — needs: `—`; if: `github.event_name == 'workflow_dispatch'`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/quietRun/quiet-run.mjs -- npm ci --no-audit --no-fund — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. node scripts/ci/quietRun/quiet-run.mjs -- npm run app:build --workspace @svitlo/mobile — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. node scripts/ci/quietRun/quiet-run.mjs -- npm exec --workspace @svitlo/mobile -- cap sync ios — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. Build simulator application without code signing — **direct CLI/shell**


### `pr-auto-format.yml`

**Job `format`** — needs: `—`; if: `—`.

1. Check out PR head or explicitly dispatched branch — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned Prettier without running package scripts — **direct CLI/shell**
4. Auto-fix changed PR files — **direct CLI/shell**; if: `>-`
5. Independently check formatting on the latest commit — **direct CLI/shell**; if: `github.event_name == 'workflow_dispatch'`
6. Stage formatting fixes — **protocol/diagnostics (raw)**; if: `>-`
7. Require fork contributors to format their own PRs — **direct CLI/shell**; if: `github.event_name == 'pull_request' && steps.changes.outputs.changed == 'true' &`
8. Create formatter GitHub App token — **provider**; if: `github.event_name == 'pull_request' && steps.changes.outputs.changed == 'true' &`
9. Commit formatting fixes to PR source branch — **direct CLI/shell**; if: `github.event_name == 'pull_request' && steps.changes.outputs.changed == 'true' &`
10. Re-run required checks on formatted commit — **direct CLI/shell**; if: `github.event_name == 'pull_request' && steps.changes.outputs.changed == 'true' &`


### `pr-clear-blocked-on-merge.yml`

**Job `cleanup`** — needs: `—`; if: `github.event.pull_request.merged == true`.

1. Remove obsolete blocker label — **provider**


### `pr-labeler.yml`

**Job `apply`** — needs: `—`; if: `github.event.action != 'edited' || github.event.changes.base != null || github.event.changes.title != null`.

1. actions/labeler@v7 — **provider**
2. Fallback repository scope and integration role — **provider**


### `production-quality-command.yml`

**Job `dispatch`** — needs: `—`; if: `>-`.

1. Resolve PR and dispatch full Production Quality — **protocol/diagnostics (raw)**


### `production-quality.yml`

**Job `reuse`** — needs: `—`; if: `—`.

1. actions/checkout@v5 — **provider**
2. Check prior required result — **direct CLI/shell**; code: `scripts/ci/requiredCheckReuse/required-check-reuse.mjs`

**Job `policy`** — needs: `reuse`; if: `(github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft) && needs.reuse.outputs.reuse != 'tru`.

1. actions/checkout@v5 — **provider**
2. Test production source and parallel workflow contracts — **native Node dot**; code: `scripts/ci/releaseSource/check-release-source.spec.mjs`, `scripts/ci/productionQuality/production-quality.spec.mjs`, `scripts/ci/turboTaskGraph/verify-graph.spec.mjs`
3. Reject non-develop production source — **direct CLI/shell**; code: `scripts/ci/releaseSource/check-release-source.mjs`; if: `github.event_name == 'pull_request'`
4. Discover all applications and their E2E contracts — **direct CLI/shell**; code: `scripts/ci/productionQuality/plan-app-matrix.mjs`

**Job `repository`** — needs: `policy`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned dependencies — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Verify workspace integrity and build reuse regressions — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`

**Job `types`** — needs: `policy`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned dependencies — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Initialize job-local package build reuse — **protocol/diagnostics (raw)**
5. Typecheck all eligible workspaces — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. Report package build reuse — **direct CLI/shell**; code: `scripts/ci/packageBuildReuse/package-build-reuse.mjs`; if: `always()`

**Job `unit`** — needs: `policy`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned dependencies — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Initialize job-local package build reuse — **protocol/diagnostics (raw)**
5. Test every eligible workspace — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. Report package build reuse — **direct CLI/shell**; code: `scripts/ci/packageBuildReuse/package-build-reuse.mjs`; if: `always()`

**Job `generators`** — needs: `policy`; if: `—`; reusable: `./.github/workflows/engine-generators.yml`.

No direct steps (reusable/orchestrator job).

**Job `components`** — needs: `policy`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned dependencies — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Initialize job-local package build reuse — **protocol/diagnostics (raw)**
5. Test Playground and Web without rerunning UI Kit or Math suites — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/productionQuality/run-selected-components.mjs`
6. Report package build reuse — **direct CLI/shell**; code: `scripts/ci/packageBuildReuse/package-build-reuse.mjs`; if: `always()`

**Job `lint`** — needs: `policy`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned dependencies — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Lint all eligible workspaces — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`

**Job `packages`** — needs: `policy`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned dependencies — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Verify Turborepo task DAG against eligible workspaces — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. Verify failed Turbo prerequisite blocks downstream builds — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/ci/turboTaskGraph/verify-execution.spec.mjs`
6. Build all distributable packages — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
7. Verify compiled public package artifacts — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`

**Job `apps`** — needs: `policy`; if: `—`; matrix: `${{ fromJSON(needs.policy.outputs.apps) }}`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. Install pinned dependencies — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. Initialize job-local package build reuse — **protocol/diagnostics (raw)**
5. Select explicit controlled content for the universal Web host — **protocol/diagnostics (raw)**; if: `matrix.workspace == '@svitlo/web'`
6. Build application and all needed workspace dependencies — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
7. Validate compiled Mobile offline bundle — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`; if: `matrix.workspace == '@svitlo/mobile'`
8. Validate compiled application resources — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`; if: `matrix.integration`
9. Install Chromium only for applications with E2E suites — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`; if: `matrix.e2e`
10. Run application E2E suite — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`; if: `matrix.e2e`
11. Report package build reuse — **direct CLI/shell**; code: `scripts/ci/packageBuildReuse/package-build-reuse.mjs`; if: `always()`
12. production-quality-${{ matrix.slug }}-test-results — **provider**; if: `always()`

**Job `verify`** — needs: `[reuse, policy, repository, types, unit, generators, components, lint, packages, apps]`; if: `>-`.

1. Require every production validation suite to succeed — **direct CLI/shell**
2. 'Validated Ready scope v1 / ${{ github.event.pull_request.number }} / ${{ github.event.pull_request.head.ref }} / ${{ gi — **direct CLI/shell**; if: `success() && github.event_name == 'pull_request' && !github.event.pull_request.d`


### `repository-git-audit.yml`

**Job `audit`** — needs: `—`; if: `>-`.

1. Check out full default-branch history and refs — **provider**
2. actions/setup-node@v5 — **provider**
3. Verify the read-only audit collector — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`, `scripts/gitAudit/git-audit.spec.mjs`
4. Analyze reachable objects and snapshot history — **direct CLI/shell**; code: `scripts/gitAudit/git-audit.mjs`
5. Publish human-readable run summary — **protocol/diagnostics (raw)**
6. Upload full JSON and Markdown reports — **provider**


### `sync-labels.yml`

**Job `synchronize`** — needs: `—`; if: `—`.

1. actions/checkout@v5 — **provider**
2. Rename legacy labels and synchronize the canonical catalogue — **provider**


### `ui-kit-storybook.yml`

**Job `storybook`** — needs: `—`; if: `—`.

1. actions/checkout@v5 — **provider**
2. actions/setup-node@v5 — **provider**
3. node scripts/ci/quietRun/quiet-run.mjs -- npm ci --no-audit --no-fund — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
4. node scripts/ci/quietRun/quiet-run.mjs -- npm run package:build --workspace @svitlo/engine — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
5. node scripts/ci/quietRun/quiet-run.mjs -- npm run package:build --workspace @svitlo/ui-kit — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
6. node scripts/ci/quietRun/quiet-run.mjs -- npm run storybook:build --workspace @svitlo/ui-kit — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
7. Verify story inventory, generated docs and shared flags — **direct CLI/shell**; code: `shared/ui-kit/storybook-static/index.js`
8. Install Chromium for browser preview smoke — **existing quiet-run**; code: `scripts/ci/quietRun/quiet-run.mjs`
9. Verify actual stories, Docs, Controls and shared flags in Chromium — **direct CLI/shell**

