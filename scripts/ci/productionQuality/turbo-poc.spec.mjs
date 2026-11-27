import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { capture, inspect } from './turbo-poc-artifact.mjs';
import { checkGraph, focus, operations } from './turbo-poc-graph.mjs';
import { discoverWorkspaces, planWorkspaceOperation } from '../../runWorkspaceScript/run-workspace-script.mjs';

const root = fileURLToPath(new URL('../../..', import.meta.url));
const source = name => readFileSync(new URL(name, import.meta.url), 'utf8');
const workflow = readFileSync(new URL('../../../.github/workflows/engine-generators.yml', import.meta.url), 'utf8');
const taskWorkflow = readFileSync(new URL('../../../.github/workflows/turbo-poc-task.yml', import.meta.url), 'utf8');
const groupWorkflow = readFileSync(new URL('../../../.github/workflows/turbo-poc-group.yml', import.meta.url), 'utf8');
const turbo = JSON.parse(readFileSync(new URL('../../../turbo.json', import.meta.url), 'utf8'));

const workspaces = [
  { name: '@svitlo/engine', scripts: Object.fromEntries(operations.map(x => [x, 'run'])) },
  { name: '@svitlo/ui-kit', scripts: Object.fromEntries(operations.map(x => [x, 'run'])), dependencies: { '@svitlo/engine': '0.0.0' } },
  { name: '@svitlo/math', scripts: Object.fromEntries(operations.map(x => [x, 'run'])), dependencies: { '@svitlo/engine': '0.0.0' }, devDependencies: { '@svitlo/ui-kit': '0.0.0' } },
];

function graph() {
  return {
    tasks: workspaces.flatMap(pkg => operations.map(operation => {
      const deps = [];
      if (operation === 'test') deps.push(pkg.name + '#code:check:types');
      if (operation === 'code:check:types') deps.push(pkg.name + '#package:build');
      if (operation !== 'test') {
        for (const name of Object.keys({ ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) })) {
          deps.push(name + '#package:build');
        }
      }
      return { taskId: pkg.name + '#' + operation, dependencies: deps };
    })),
  };
}

test('Turbo tasks match current canonical npm scripts, with explicit task prerequisites', () => {
  assert.deepEqual(Object.keys(turbo.tasks).sort(), [...operations].sort());
  assert.deepEqual(turbo.tasks['package:build'].dependsOn, ['^package:build']);
  assert.ok(turbo.tasks['package:build'].outputs.includes('dist/**'));
  assert.deepEqual(turbo.tasks['code:check:types'].dependsOn, ['package:build', '^package:build']);
  assert.deepEqual(turbo.tasks.test.dependsOn, ['code:check:types']);
  assert.equal(turbo.tasks.test.cache, false);
  assert.equal(turbo.tasks['code:check:types'].cache, false);
  assert.deepEqual(focus, workspaces.map(x => x.name));
});

test('dry-run graph includes nine real tasks and both runtime + development dependency edges', () => {
  assert.deepEqual(checkGraph(graph(), workspaces), { taskCount: 9, workspaces: 3 });
});

test('representative graph uses the actual npm manifests and reports old-planner semantic differences', () => {
  const actual = discoverWorkspaces();
  assert.deepEqual(checkGraph(graph(), actual), { taskCount: 9, workspaces: 3 });
  const previous = planWorkspaceOperation(actual, 'test', { onlyWorkspaces: focus });
  const earlierBuilds = previous.steps.filter(step => step.script === 'package:build').map(step => step.name);
  assert.ok(earlierBuilds.includes('@svitlo/engine'));
  assert.ok(earlierBuilds.includes('@svitlo/ui-kit'));
  // The old root test planner does not build content/math itself; this PoC
  // explicitly does so for every variant before Math typechecking/tests.
  assert.ok(!earlierBuilds.includes('@svitlo/math'));
});

test('dry-run graph rejects missing tasks, missing build/type edges and absent canonical scripts', () => {
  const missingTask = graph();
  missingTask.tasks.pop();
  assert.throws(() => checkGraph(missingTask, workspaces), /Missing Turbo task/);

  const missingDependency = graph();
  missingDependency.tasks.find(t => t.taskId === '@svitlo/math#package:build').dependencies = [];
  assert.throws(() => checkGraph(missingDependency, workspaces), /Missing dependency edge/);

  const missingType = graph();
  missingType.tasks.find(t => t.taskId === '@svitlo/engine#test').dependencies = [];
  assert.throws(() => checkGraph(missingType, workspaces), /not gated by types/);

  const badScripts = structuredClone(workspaces);
  delete badScripts[1].scripts['package:build'];
  assert.throws(() => checkGraph(graph(), badScripts), /Missing workspace script/);

  const duplicated = graph();
  duplicated.tasks.push(duplicated.tasks[0]);
  assert.throws(() => checkGraph(duplicated, workspaces), /Duplicate Turbo task/);
});

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'turbo-poc-artifact-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  for (const [folder, names] of [
    ['shared/engine/dist', ['build.js', 'build.d.ts', 'runtime.js', 'runtime.d.ts']],
    ['shared/ui-kit/dist/src', ['index.js', 'index.d.ts']],
    ['content/math/dist/textbook', ['index.js', 'index.d.ts']],
  ]) {
    mkdirSync(join(dir, folder), { recursive: true });
    for (const name of names) writeFileSync(join(dir, folder, name), 'compiled-' + name);
  }
  return dir;
}

test('artifact guard checks all public exports, file hashes and detects mutations', t => {
  const dir = fixture(t);
  assert.equal(inspect('engine', dir).length, 4);
  assert.equal(inspect('ui-kit', dir).length, 2);
  assert.equal(inspect('math', dir).length, 2);
  const a = capture('engine,ui-kit,math', dir);
  const b = capture('engine,ui-kit,math', dir);
  assert.deepEqual(a, b);
  assert.ok(a.engine.every(file => /^[a-f0-9]{64}$/.test(file.sha256)));
  writeFileSync(join(dir, 'shared/engine/dist/build.js'), 'changed');
  assert.notDeepEqual(a, capture('engine,ui-kit,math', dir));
});

test('artifact guard fails closed for absent exports, missing packages and symlinks', t => {
  const dir = fixture(t);
  rmSync(join(dir, 'content/math/dist/textbook/index.js'));
  assert.throws(() => inspect('math', dir), /Missing or empty public export/);
  assert.throws(() => inspect('not-a-package', dir), /Unknown benchmark artifact/);
  assert.throws(() => capture('engine,engine', dir), /Duplicate artifact requirement/);
  symlinkSync(join(dir, 'shared/ui-kit/dist/src/index.js'), join(dir, 'shared/ui-kit/dist/src/symlink.js'));
  assert.throws(() => inspect('ui-kit', dir), /Unexpected artifact entry/);
});

test('workflow preserves existing CI and exposes opt-in modes on distinct concurrency groups', () => {
  const modes = ['turbo-single', 'turbo-distributed', 'turbo-hybrid'];
  for (const mode of modes) {
    assert.match(workflow, new RegExp('          - ' + mode));
    assert.match(workflow, new RegExp("inputs\\.ci_mode == '" + mode + "'"));
    assert.match(workflow, new RegExp("inputs\\.ci_mode != '" + mode + "'"));
  }
  assert.match(workflow, /default: standard/);
  assert.match(workflow, /workflow_call:/);
  assert.match(workflow, /inputs\.ci_mode \|\| 'standard'/);
  assert.match(workflow, /name: Required check reuse and Draft policy/);
  assert.match(workflow, /name: Publisher isolation \/ no npm dependencies/);
  assert.match(workflow, /name: Turbo PoC A \/ single runner/);
  assert.match(workflow, /--filter=@svitlo\/math/);
  const production = readFileSync(new URL('../../../.github/workflows/production-quality.yml', import.meta.url), 'utf8');
  assert.doesNotMatch(production, /turbo-poc|turbo-single|turbo-distributed|turbo-hybrid/);
  assert.equal(production.split('name: Production Quality / verify').length - 1, 1);
});

test('distributed variant defines nine native jobs, dependencies and immutable artifact handoff', () => {
  const names = [
    'engine-build', 'engine-types', 'engine-tests',
    'ui-kit-build', 'ui-kit-types', 'ui-kit-tests',
    'math-build', 'math-types', 'math-tests',
  ];
  for (const name of names) {
    const marker = '\n  turbo-b-' + name + ':\n';
    assert.ok(workflow.includes(marker), 'missing native job: ' + name);
  }
  assert.equal(workflow.split('uses: ./.github/workflows/turbo-poc-task.yml').length - 1, 9);
  for (const edge of [
    'needs: [turbo-b-engine-build]', 'needs: [turbo-b-engine-types]',
    'needs: [turbo-b-ui-kit-build]', 'needs: [turbo-b-ui-kit-types]',
    'needs: [turbo-b-math-build]', 'needs: [turbo-b-math-types]',
  ]) assert.ok(workflow.includes(edge), 'missing prerequisite: ' + edge);
  assert.match(taskWorkflow, /npm --ignore-scripts run "\$OPERATION" --workspace "\$WORKSPACE"/);
  assert.match(taskWorkflow, /github\.run_id.*github\.run_attempt/);
  assert.match(taskWorkflow, /turbo-poc-artifact\.mjs verify/);
  assert.match(taskWorkflow, /if-no-files-found: error/);
  assert.doesNotMatch(taskWorkflow, /contents: write|SVITLO_CI_PACKAGE_BUILD_STATE/);
});

test('hybrid has three native group statuses and passes Turbo cache between groups', () => {
  for (const name of ['engine', 'ui-kit', 'math']) {
    assert.ok(workflow.includes('\n  turbo-c-' + name + ':\n'));
  }
  assert.equal(workflow.split('uses: ./.github/workflows/turbo-poc-group.yml').length - 1, 3);
  assert.ok(workflow.includes('needs: [turbo-c-engine]'));
  assert.ok(workflow.includes('needs: [turbo-c-ui-kit]'));
  assert.match(groupWorkflow, /turbo@2\.11\.13/);
  assert.match(groupWorkflow, /\.turbo\/cache\//);
  assert.match(groupWorkflow, /turbo run test --filter="\$WORKSPACE"/);
  assert.match(groupWorkflow, /verify-content/);
  assert.doesNotMatch(groupWorkflow, /contents: write|SVITLO_CI_PACKAGE_BUILD_STATE/);
});
