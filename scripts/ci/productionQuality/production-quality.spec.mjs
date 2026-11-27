import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { discoverWorkspaces, planWorkspaceOperation } from '../../runWorkspaceScript/run-workspace-script.mjs';
import { planProductionApps } from './plan-app-matrix.mjs';
import { additionalComponentWorkspaces } from './run-selected-components.mjs';

const workflow = readFileSync(new URL('../../../.github/workflows/production-quality.yml', import.meta.url), 'utf8');
const commandWorkflow = readFileSync(
  new URL('../../../.github/workflows/production-quality-command.yml', import.meta.url),
  'utf8',
);

const labelerWorkflow = readFileSync(new URL('../../../.github/workflows/pr-labeler.yml', import.meta.url), 'utf8');
const fastGateWorkflow = readFileSync(new URL('../../../.github/workflows/fast-gate.yml', import.meta.url), 'utf8');
const engineGeneratorsWorkflow = readFileSync(
  new URL('../../../.github/workflows/engine-generators.yml', import.meta.url),
  'utf8',
);

test('editorial-only PR edits do not relabel while required checks keep retarget coverage', () => {
  // Label scope depends on changed paths and target base; integration role
  // depends on the title. Neither can change on a description-only edit.
  assert.match(labelerWorkflow, /types: \[opened, reopened, synchronize, edited, ready_for_review\]/);
  assert.match(labelerWorkflow, /github\.event\.action != 'edited'/);
  assert.match(labelerWorkflow, /github\.event\.changes\.base != null/);
  assert.match(labelerWorkflow, /github\.event\.changes\.title != null/);

  // Do not skip a required job on an edited event: a new skipped conclusion
  // at the same SHA could mask an earlier failing required check.
  assert.match(fastGateWorkflow, /types: \[opened, reopened, synchronize, ready_for_review, edited\]/);
  assert.match(fastGateWorkflow, /name: FastGate \/ verify\s*\n\s*runs-on:/);
  assert.match(workflow, /types: \[opened, reopened, synchronize, edited, ready_for_review\]/);
  assert.match(workflow, /name: Production \/ source policy\s*\n\s*needs: reuse\s*\n\s*if:/);
  assert.match(workflow, /name: Production Quality \/ verify/);
});

test('every manifest-defined app and E2E suite is retained in the production matrix', () => {
  const packages = discoverWorkspaces();
  const expectedApps = packages.filter(pkg => Object.hasOwn(pkg.scripts || {}, 'app:build'));
  const expectedE2E = packages.filter(pkg => Object.hasOwn(pkg.scripts || {}, 'test:e2e'));
  const actual = planProductionApps(packages).include;
  assert.deepEqual(
    actual.map(app => app.workspace),
    expectedApps.map(pkg => pkg.name),
  );
  assert.deepEqual(
    actual.filter(app => app.e2e).map(app => app.workspace),
    expectedE2E.map(pkg => pkg.name),
  );
  assert.ok(actual.length > 1, 'expected real independent application hosts');
  const desktop = actual.find(app => app.workspace === '@svitlo/desktop');
  assert.equal(desktop?.integration, true);
  assert.equal(desktop?.e2e, false);
  assert.equal(new Set(actual.map(app => app.slug)).size, actual.length);
});

test('new E2E workspaces and invalid application matrices fail closed', () => {
  const ws = (name, path, scripts) => ({ name, path, scripts });
  assert.throws(() => planProductionApps([]), /No production applications/);
  assert.throws(
    () =>
      planProductionApps([
        ws('@svitlo/app', 'apps/app', { 'app:build': 'build' }),
        ws('@svitlo/unbuilt', 'content/unbuilt', { 'test:e2e': 'test' }),
      ]),
    /E2E workspace without app:build/,
  );
  assert.throws(
    () => planProductionApps([ws('@svitlo/app', 'apps/invalid path', { 'app:build': 'build' })]),
    /Unsafe production application/,
  );
});

test('extra components use the existing graph without rerunning root-covered suites', () => {
  assert.deepEqual(additionalComponentWorkspaces, ['@svitlo/playground', '@svitlo/web']);
  const plan = planWorkspaceOperation(discoverWorkspaces(), 'test:components', {
    onlyWorkspaces: additionalComponentWorkspaces,
  });
  assert.deepEqual(plan.selected, additionalComponentWorkspaces);
  assert.ok(
    plan.steps.some(step => step.script === 'package:build'),
    'must build prerequisite outputs',
  );
  assert.equal(plan.steps.filter(step => step.script === 'test:components').length, 2);
});

test('parallel production topology preserves every gate and produces one strict protected context', () => {
  assert.match(workflow, /branches: \[main\]/);
  assert.match(workflow, /opened, reopened, synchronize, edited, ready_for_review/);
  assert.match(workflow, /name: Production \/ source policy/);
  assert.match(workflow, /github\.event\.pull_request\.head\.repo\.full_name/);
  assert.match(workflow, /needs: policy/);
  assert.match(workflow, /name: Build all distributable packages/);
  assert.match(workflow, /name: Verify compiled public package artifacts/);
  assert.match(workflow, /name: Build application and all needed workspace dependencies/);
  assert.match(workflow, /name: Validate compiled application resources\n        if: matrix\.integration/);
  assert.match(workflow, /name: Run application E2E suite\n        if: matrix\.e2e/);
  assert.match(workflow, /matrix: \$\{\{ fromJSON\(needs\.policy\.outputs\.apps\) \}\}/);
  assert.match(workflow, /fail-fast: false/);
  assert.match(workflow, /if: matrix.e2e/);
  assert.match(workflow, /if: matrix.integration/);
  assert.ok(workflow.includes('  generators:\n    name: Production / Engine generators\n    needs: policy'));
  assert.ok(workflow.includes('uses: ./.github/workflows/engine-generators.yml'));
  assert.ok(engineGeneratorsWorkflow.includes('  workflow_call:'));
  assert.ok(engineGeneratorsWorkflow.includes('scripts/ci/directMaterialization/trusted-draft.spec.mjs'));
  assert.ok(engineGeneratorsWorkflow.includes('scripts/ci/directMaterialization/course-dependency-isolation.spec.mjs'));
  assert.ok(!engineGeneratorsWorkflow.includes('scripts/ci/directMaterialization/pipeline.spec.mjs'));
  const required = ['policy', 'repository', 'types', 'unit', 'generators', 'components', 'lint', 'packages', 'apps'];
  assert.ok(workflow.includes('needs: [reuse, ' + required.join(', ') + ']'));
  for (const name of required) {
    assert.ok(workflow.includes("'" + name + "'"), 'aggregate must validate ' + name);
  }
  assert.match(workflow, /status !== 'success'/);
  assert.match(workflow, /always\(\)/);
  assert.match(workflow, /!github\.event\.pull_request\.draft/);
  assert.equal(workflow.split('name: Production Quality / verify').length - 1, 1);
  // The source guard and unit test run before any use of npm ci.
  assert.ok(workflow.indexOf('check-release-source.mjs') < workflow.indexOf('npm ci'));
});

test('PR comment command dispatches the unchanged full production workflow', () => {
  assert.match(commandWorkflow, /issue_comment:\s*\n\s*types: \[created\]/);
  assert.match(commandWorkflow, /github\.event\.issue\.pull_request/);
  assert.match(commandWorkflow, /github\.event\.comment\.body == '\/production-quality'/);
  assert.match(commandWorkflow, /collaborators\/\$actor\/permission/);
  assert.match(commandWorkflow, /\.head\.repo\.full_name/);
  assert.match(commandWorkflow, /\.head\.sha/);
  assert.match(commandWorkflow, /actions: write/);
  assert.match(
    commandWorkflow,
    /gh workflow run production-quality\.yml --ref "\$branch" --repo "\$GITHUB_REPOSITORY"/,
  );
  assert.doesNotMatch(commandWorkflow, /actions\/checkout@|npm ci/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /name: Production Quality \/ verify/);
});

test('five-vs-three content benchmark is manual-only, exhaustive and excluded from required release gates', () => {
  const plan = workflow.split('\n  content_shard_ab_plan:\n')[1].split('\n  content_shard_ab:\n')[0];
  const shard = workflow.split('\n  content_shard_ab:\n')[1].split('\n  verify:\n')[0];
  assert.ok(plan, 'missing diagnostic matrix planner');
  assert.ok(shard, 'missing diagnostic shard worker');
  assert.match(plan, /needs: policy/);
  assert.match(plan, /github\.event_name == 'workflow_dispatch' && github\.ref_name == 'ci\/quality-workflow-rearchitecture'/);
  assert.match(plan, /contentWorkspaces\(\)/);
  assert.match(plan, /planContentShards\(selected, shardLimit\)/);
  assert.match(plan, /\[\[5, 'five'\], \[3, 'three'\]\]/);
  assert.match(plan, /validateShardCoverage\(selected, shards\)/);
  assert.match(plan, /scripts\/ci\/buildChangedContent\/content-shards\.spec\.mjs/);
  assert.match(shard, /needs: content_shard_ab_plan/);
  assert.match(shard, /github\.event_name == 'workflow_dispatch' && github\.ref_name == 'ci\/quality-workflow-rearchitecture'/);
  assert.match(shard, /fail-fast: false/);
  assert.match(shard, /matrix: \$\{\{ fromJSON\(needs\.content_shard_ab_plan\.outputs\.matrix\) \}\}/);
  assert.match(shard, /npm ci --no-audit --no-fund/);
  assert.match(shard, /npm run package:build --workspace @svitlo\/engine/);
  assert.match(shard, /CONTENT_BUILD_ALL: 'true'/);
  assert.match(shard, /SVITLO_MEDIA_MODE: production/);
  assert.match(shard, /CONTENT_SHARD_PACKAGES: \$\{\{ toJSON\(matrix\.packages\) \}\}/);
  assert.match(shard, /node scripts\/ci\/buildChangedContent\/content-shards\.mjs/);
  assert.match(shard, /summarize-builds\.mjs/);
  const verify = workflow.split('\n  verify:\n')[1];
  assert.ok(verify.includes(
    'needs: [reuse, policy, repository, types, unit, generators, components, lint, packages, apps]',
  ));
  assert.doesNotMatch(verify, /content_shard_ab/);
  const contentWorkflow = readFileSync(new URL('../../../.github/workflows/content-build.yml', import.meta.url), 'utf8');
  assert.match(contentWorkflow, /max-parallel: 5/);
  assert.match(contentWorkflow, /matrix: \$\{\{ fromJSON\(needs\.prepare\.outputs\.shards\) \}\}/);
});

test('production typecheck retains exhaustive canonical root command', () => {
  assert.match(workflow, /name: Typecheck all eligible workspaces/);
  assert.match(workflow, /npm run code:check:types/);
  const rootRunner = readFileSync(
    new URL('../../runWorkspaceScript/run-workspace-script.mjs', import.meta.url),
    'utf8',
  );
  assert.match(rootRunner, /if \(operation === 'code:check:types'\) return executeTypechecks/);
  assert.match(rootRunner, /runParallelTypechecks\(parallel, runTypecheckAsync/);
  assert.match(rootRunner, /for \(const step of builds\) runStepSync\(step\)/);
});

test('Mobile E2E serves the already-built production bundle and checks offline resources', () => {
  const mobile = JSON.parse(readFileSync(new URL('../../../apps/mobile/package.json', import.meta.url), 'utf8'));
  const playwright = readFileSync(new URL('../../../apps/mobile/playwright.config.ts', import.meta.url), 'utf8');
  assert.equal(mobile.scripts['app:start'], 'node scripts/serveBuilt/serve-built.mjs');
  assert.equal(mobile.scripts['preapp:start'], undefined, 'production preview must not prepare or rebuild');
  assert.match(playwright, /command: 'npm run app:start --workspace @svitlo\/mobile'/);
  assert.doesNotMatch(playwright, /app:start:dev/);
  assert.match(playwright, /reuseExistingServer: false/);
  assert.match(
    workflow,
    /name: Validate compiled Mobile offline bundle\s*\n\s*if: matrix\.workspace == '@svitlo\/mobile'\s*\n\s*run: .*npm run app:check:bundle --workspace/,
  );
  assert.match(mobile.scripts.test, /scripts\/serveBuilt\/\*\.test\.mjs/);
});

test('Turbo migration retains protected verification and bounds scheduling to package/lint', () => {
  const root = JSON.parse(readFileSync(new URL('../../../package.json', import.meta.url), 'utf8'));
  const turbo = JSON.parse(readFileSync(new URL('../../../turbo.json', import.meta.url), 'utf8'));
  assert.match(root.scripts['package:build'], /^turbo run package:build /);
  assert.match(root.scripts['code:lint:check'], /^turbo run code:lint:check /);
  assert.equal(turbo.tasks['package:build'].cache, false);
  assert.equal(turbo.tasks['code:lint:check'].cache, false);
  assert.equal(turbo.envMode, 'loose');
  assert.match(workflow, /scripts\/ci\/turboTaskGraph\/verify-graph\.spec\.mjs/);
  const packageJob = workflow.split('\n  packages:\n')[1].split('\n  apps:\n')[0];
  assert.match(packageJob, /npm run repo:check:turbo/);
  assert.match(packageJob, /node --test scripts\/ci\/turboTaskGraph\/verify-execution\.spec\.mjs/);
  assert.ok(packageJob.indexOf('verify-execution.spec.mjs') < packageJob.indexOf('npm run package:build'));

  assert.match(packageJob, /npm run package:build/);
  assert.match(packageJob, /npm run repo:check:artifacts/);
  assert.doesNotMatch(packageJob, /SVITLO_CI_PACKAGE_BUILD_STATE|package-build-reuse\.mjs --summary/);
  assert.equal(workflow.split('name: Production Quality / verify').length - 1, 1);
});
