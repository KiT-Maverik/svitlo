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

