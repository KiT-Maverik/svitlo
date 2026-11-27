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
  assert.match(workflow, /needs: policy/);
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

function generatorJob(id) {
  const pieces = engineGeneratorsWorkflow.split('\n  ' + id + ':\n');
  assert.equal(pieces.length, 2, 'expected exactly one generator job: ' + id);
  return pieces[1].split(/\n  [a-z][a-z0-9-]*:\n/)[0];
}

test('manual build-once experiment is opt-in without changing reusable production generator gates', () => {
  assert.match(engineGeneratorsWorkflow, /workflow_dispatch:\s*\n\s*inputs:\s*\n\s*ci_mode:/);
  assert.match(engineGeneratorsWorkflow, /ci_mode:[\s\S]*?type: choice[\s\S]*?default: standard/);
  assert.match(engineGeneratorsWorkflow, /workflow_call:/);
  assert.match(engineGeneratorsWorkflow, /inputs\.ci_mode == 'build-once-engine' && '-experiment'/);
  assert.match(engineGeneratorsWorkflow, /inputs\.ci_mode == 'build-each-engine' && '-baseline'/);
  assert.match(engineGeneratorsWorkflow, /          - build-each-engine/);

  for (const id of ['publisher-isolation', 'ci-policy', 'generator-tests']) {
    assert.match(generatorJob(id), /inputs\.ci_mode != 'build-once-engine' && inputs\.ci_mode != 'build-each-engine'/);
  }
  for (const id of ['experiment-engine-producer', 'experiment-consumer-types', 'experiment-consumer-tests']) {
    assert.match(generatorJob(id), /github\.event_name == 'workflow_dispatch' && inputs\.ci_mode == 'build-once-engine'/);
    assert.match(generatorJob(id), /actions\/checkout@v5/);
    assert.match(generatorJob(id), /persist-credentials: false/);
    assert.match(generatorJob(id), /node-version: '26'/);
    assert.match(generatorJob(id), /cache: npm/);
    assert.match(generatorJob(id), /npm ci --no-audit --no-fund/);
  }
  assert.doesNotMatch(workflow, /experiment-engine-|ci_mode/);
  assert.equal(workflow.split('name: Production Quality / verify').length - 1, 1);
});

test('one producer and two independent consumers exchange a same-run artifact without rebuilding Engine', () => {
  const producer = generatorJob('experiment-engine-producer');
  const types = generatorJob('experiment-consumer-types');
  const unit = generatorJob('experiment-consumer-tests');
  const artifactName = 'experiment-engine-dist-${{ github.run_id }}-${{ github.run_attempt }}';

  assert.equal((producer.match(/npm run package:build --workspace @svitlo\/engine/g) || []).length, 1);
  assert.match(producer, /engine-artifact-guard\.mjs inspect/);
  assert.match(producer, /actions\/upload-artifact@v6/);
  assert.match(producer, /if-no-files-found: error/);
  assert.match(producer, /include-hidden-files: true/);
  assert.ok(producer.includes(artifactName));

  for (const consumer of [types, unit]) {
    assert.match(consumer, /needs: experiment-engine-producer/);
    assert.match(consumer, /test ! -e shared\/engine\/dist/);
    assert.match(consumer, /actions\/download-artifact@v6/);
    assert.match(consumer, /path: shared\/engine\/dist\//);
    assert.ok(consumer.includes(artifactName));
    assert.match(consumer, /engine-artifact-guard\.mjs snapshot/);
    assert.match(consumer, /engine-artifact-guard\.mjs verify/);
    assert.match(consumer, /steps\.artifact\.outcome == 'success'/);
    assert.doesNotMatch(consumer, /npm run package:build --workspace @svitlo\/engine/);
    assert.doesNotMatch(consumer, /SVITLO_CI_PACKAGE_BUILD_STATE/);
  }

  assert.match(types, /npm run code:check:types --workspace @svitlo\/ui-kit/);
  assert.match(unit, /npm --ignore-scripts run test --workspace @svitlo\/engine/);
  const engine = JSON.parse(readFileSync(new URL('../../../shared/engine/package.json', import.meta.url), 'utf8'));
  const uiKit = JSON.parse(readFileSync(new URL('../../../shared/ui-kit/package.json', import.meta.url), 'utf8'));
  assert.match(engine.scripts.pretest, /package-build-reuse\.mjs/);
  assert.match(engine.scripts.test, /tsc -p tsconfig\.test\.json && node --test/);
  assert.equal(uiKit.scripts['precode:check:types'], undefined);
  assert.match(uiKit.scripts['code:check:types'], /tsc -p tsconfig\.json --noEmit/);
});

test('baseline has two isolated parallel Engine builders and runs identical consumer checks', () => {
  const types = generatorJob('experiment-baseline-types');
  const unit = generatorJob('experiment-baseline-tests');
  for (const baseline of [types, unit]) {
    assert.match(baseline, /github\.event_name == 'workflow_dispatch' && inputs\.ci_mode == 'build-each-engine'/);
    assert.match(baseline, /actions\/checkout@v5/);
    assert.match(baseline, /persist-credentials: false/);
    assert.match(baseline, /node-version: '26'/);
    assert.match(baseline, /cache: npm/);
    assert.match(baseline, /npm ci --no-audit --no-fund/);
    assert.match(baseline, /test ! -e shared\/engine\/dist/);
    assert.equal((baseline.match(/npm run package:build --workspace @svitlo\/engine/g) || []).length, 1);
    assert.match(baseline, /engine-artifact-guard\.mjs snapshot/);
    assert.match(baseline, /engine-artifact-guard\.mjs verify/);
    assert.match(baseline, /steps\.artifact\.outcome == 'success'/);
    assert.doesNotMatch(baseline, /needs:|upload-artifact|download-artifact|SVITLO_CI_PACKAGE_BUILD_STATE/);
  }
  for (const id of ['experiment-baseline-types', 'experiment-consumer-types']) {
    assert.match(generatorJob(id), /npm run code:check:types --workspace @svitlo\/ui-kit/);
  }
  for (const id of ['experiment-baseline-tests', 'experiment-consumer-tests']) {
    assert.match(generatorJob(id), /npm --ignore-scripts run test --workspace @svitlo\/engine/);
  }
  assert.doesNotMatch(workflow, /experiment-baseline-|build-each-engine/);
  assert.equal(workflow.split('name: Production Quality / verify').length - 1, 1);
});
