import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { discoverWorkspaces, planWorkspaceOperation } from '../../runWorkspaceScript/run-workspace-script.mjs';
import { planProductionApps } from './plan-app-matrix.mjs';
import { additionalComponentWorkspaces } from './run-selected-components.mjs';

const workflow = readFileSync(new URL('../../../.github/workflows/questions.yml', import.meta.url), 'utf8');

test('every manifest-defined app and E2E suite is retained in the production matrix', () => {
  const packages = discoverWorkspaces();
  const expectedApps = packages.filter(pkg => Object.hasOwn(pkg.scripts || {}, 'app:build'));
  const expectedE2E = packages.filter(pkg => Object.hasOwn(pkg.scripts || {}, 'test:e2e'));
  const actual = planProductionApps(packages).include;
  assert.deepEqual(actual.map(app => app.workspace), expectedApps.map(pkg => pkg.name));
  assert.deepEqual(actual.filter(app => app.e2e).map(app => app.workspace), expectedE2E.map(pkg => pkg.name));
  assert.ok(actual.length > 1, 'expected real independent application hosts');
  const desktop = actual.find(app => app.workspace === '@svitlo/desktop');
  assert.equal(desktop?.integration, true);
  assert.equal(desktop?.e2e, false);
  assert.equal(new Set(actual.map(app => app.slug)).size, actual.length);
});

test('new E2E workspaces and invalid application matrices fail closed', () => {
  const ws = (name, path, scripts) => ({ name, path, scripts });
  assert.throws(() => planProductionApps([]), /No production applications/);
  assert.throws(() => planProductionApps([
    ws('@svitlo/app', 'apps/app', { 'app:build': 'build' }),
    ws('@svitlo/unbuilt', 'content/unbuilt', { 'test:e2e': 'test' }),
  ]), /E2E workspace without app:build/);
  assert.throws(() => planProductionApps([
    ws('@svitlo/app', 'apps/invalid path', { 'app:build': 'build' }),
  ]), /Unsafe production application/);
});

test('extra components use the existing graph without rerunning root-covered suites', () => {
  assert.deepEqual(additionalComponentWorkspaces, ['@svitlo/playground', '@svitlo/web']);
  const plan = planWorkspaceOperation(discoverWorkspaces(), 'test:components', {
    onlyWorkspaces: additionalComponentWorkspaces,
  });
  assert.deepEqual(plan.selected, additionalComponentWorkspaces);
  assert.ok(plan.steps.some(step => step.script === 'package:build'), 'must build prerequisite outputs');
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
  const required = ['policy', 'repository', 'types', 'unit', 'components', 'lint', 'packages', 'apps'];
  assert.ok(workflow.includes('needs: [' + required.join(', ') + ']'));
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
