import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { discoverWorkspaces } from '../../runWorkspaceScript/run-workspace-script.mjs';
import { verifyTurboConfiguration, verifyTurboGraph } from './verify-graph.mjs';

const manifest = JSON.parse(readFileSync(new URL('../../../package.json', import.meta.url), 'utf8'));
const lock = JSON.parse(readFileSync(new URL('../../../package-lock.json', import.meta.url), 'utf8'));
const config = JSON.parse(readFileSync(new URL('../../../turbo.json', import.meta.url), 'utf8'));
const pkg = (name, scripts, dependencies = {}, devDependencies = {}, exports = {}) => ({
  name,
  scripts,
  dependencies,
  devDependencies,
  exports,
});

const fixtures = [
  pkg('@svitlo/engine', { 'package:build': 'compile' }),
  pkg('@svitlo/ui-kit', { 'package:build': 'compile', 'code:lint:check': 'lint' }, { '@svitlo/engine': '*' }),
  pkg('@svitlo/math', { 'package:build': 'compile' }, { '@svitlo/engine': '*' }, { '@svitlo/ui-kit': '*' }),
  pkg('@svitlo/host', { 'code:lint:check': 'lint' }, { '@svitlo/ui-kit': '*' }),
  pkg('@svitlo/disabled', {}),
];
const graph = () => ({
  tasks: [
    { taskId: '@svitlo/engine#package:build', dependencies: [] },
    { taskId: '@svitlo/ui-kit#package:build', dependencies: ['@svitlo/engine#package:build'] },
    { taskId: '@svitlo/math#package:build', dependencies: ['@svitlo/engine#package:build', '@svitlo/ui-kit#package:build'] },
    { taskId: '@svitlo/ui-kit#code:lint:check', dependencies: ['@svitlo/engine#package:build'] },
    { taskId: '@svitlo/host#code:lint:check', dependencies: ['@svitlo/ui-kit#package:build'] },
  ],
});

test('pinned CLI, local-only disabled cache and dependency ordering are explicit contracts', () => {
  assert.equal(verifyTurboConfiguration(manifest, lock, config), true);
  assert.equal(manifest.scripts['package:build'].includes('--concurrency=2'), true);
  assert.equal(manifest.scripts['code:lint:check'].includes('--concurrency=2'), true);
  assert.equal(config.tasks['package:build'].outputs.includes('dist/**'), true);
  assert.equal(config.tasks['code:lint:check'].cache, false);
  assert.equal(config.remoteCache.enabled, false);
});

test('graph includes every eligible operation exactly once and honors devDependency builds', () => {
  assert.deepEqual(verifyTurboGraph(graph(), fixtures), { tasks: 5, builds: 3, lint: 2 });
});

test('missing and disabled workspaces cannot silently participate', () => {
  const omitted = graph();
  omitted.tasks.pop();
  assert.throws(() => verifyTurboGraph(omitted, fixtures), /silently omitted/);
  const added = graph();
  added.tasks.push({ taskId: '@svitlo/disabled#package:build', command: 'unexpected build', dependencies: [] });
  assert.throws(() => verifyTurboGraph(added, fixtures), /Unexpected executable Turbo task/);
  assert.throws(() => verifyTurboGraph({ tasks: [] }, []), /No npm workspaces/);
});

test('Turbo phantom dependency nodes are permitted only for truly absent scripts', () => {
  const placeholder = graph();
  placeholder.tasks.push({
    taskId: '@svitlo/disabled#package:build',
    command: '<NONEXISTENT>',
    dependencies: [],
  });
  assert.deepEqual(verifyTurboGraph(placeholder, fixtures), { tasks: 5, builds: 3, lint: 2 });
  const conflicting = graph();
  conflicting.tasks[0].command = '<NONEXISTENT>';
  assert.throws(() => verifyTurboGraph(conflicting, fixtures), /lost executable Turbo command/);
  placeholder.tasks.at(-1).command = 'npm run package:build';
  assert.throws(() => verifyTurboGraph(placeholder, fixtures), /Unexpected executable Turbo task/);
});

test('failed, lost, cyclic or dangling prerequisite edges fail closed', () => {
  const edge = graph();
  edge.tasks[2].dependencies = ['@svitlo/engine#package:build'];
  assert.throws(() => verifyTurboGraph(edge, fixtures), /Missing Turbo dependency edge/);
  const dangling = graph();
  dangling.tasks[1].dependencies.push('@svitlo/lost#package:build');
  assert.throws(() => verifyTurboGraph(dangling, fixtures), /Dangling Turbo prerequisite/);
  const cyclic = graph();
  cyclic.tasks[0].dependencies.push('@svitlo/ui-kit#package:build');
  assert.throws(() => verifyTurboGraph(cyclic, fixtures), /Cyclic Turbo task graph/);
  const duplicate = graph();
  duplicate.tasks.push(duplicate.tasks[0]);
  assert.throws(() => verifyTurboGraph(duplicate, fixtures), /Duplicate Turbo task/);
});

test('root operations remain exhaustive and guard the real workspace inventory', () => {
  const actual = discoverWorkspaces();
  assert.ok(actual.length >= 30);
  for (const operation of ['package:build', 'code:lint:check']) {
    const eligible = actual.filter(pkg => Object.hasOwn(pkg.scripts || {}, operation));
    assert.ok(eligible.length > 0, 'No eligible package for ' + operation);
    assert.equal(new Set(eligible.map(pkg => pkg.name)).size, eligible.length);
  }
});

test('stale configuration, remote cache or an unlocked Turbo CLI fail closed', () => {
  const remote = structuredClone(config);
  remote.remoteCache.enabled = true;
  assert.throws(() => verifyTurboConfiguration(manifest, lock, remote), /Remote Turbo cache/);
  const cached = structuredClone(config);
  cached.tasks['package:build'].cache = true;
  assert.throws(() => verifyTurboConfiguration(manifest, lock, cached), /caching is forbidden/);
  const missing = structuredClone(lock);
  delete missing.packages['node_modules/@turbo/linux-64'];
  assert.throws(() => verifyTurboConfiguration(manifest, missing, config), /Missing verified Turbo lock entry/);
  const root = structuredClone(manifest);
  root.scripts['package:build'] = 'node scripts/runWorkspaceScript/run-workspace-script.mjs package:build';
  assert.throws(() => verifyTurboConfiguration(root, lock, config), /must use uncached Turbo/);
});

// A textbook may reference Engine only through its build-time generator.
// The manifest edge is still mandatory for Turbo's parallel build order.
test('textbook builder must declare a real build-time Engine dependency', () => {
  const textbook = pkg('@svitlo/lesson', {
    'package:build': 'node ../../scripts/textbook-tooling/buildTextbook/build.mjs',
  });
  const synthetic = { tasks: [{ taskId: '@svitlo/lesson#package:build', dependencies: [] }] };
  assert.throws(() => verifyTurboGraph(synthetic, [textbook]), /declared Engine build dependency/);
  const corrected = pkg(textbook.name, textbook.scripts, {}, { '@svitlo/engine': '0.0.0' });
  const engine = pkg('@svitlo/engine', { 'package:build': 'compile' });
  synthetic.tasks.push({ taskId: '@svitlo/engine#package:build', dependencies: [] });
  synthetic.tasks[0].dependencies.push('@svitlo/engine#package:build');
  assert.deepEqual(verifyTurboGraph(synthetic, [engine, corrected]), { tasks: 2, builds: 2, lint: 0 });
});

// The shared textbook builder checks Scene/style exports *before* building;
// a missing UI Kit manifest edge can race another Turbo task writing dist/.
test('Scene/style textbooks must declare UI Kit and Turbo must order its build', () => {
  const build = 'node ../../scripts/textbook-tooling/buildTextbook/build.mjs';
  const engine = pkg('@svitlo/engine', { 'package:build': 'compile' });
  const uiKit = pkg('@svitlo/ui-kit', { 'package:build': 'compile' }, { '@svitlo/engine': '0.0.0' });
  const sceneBook = pkg('@svitlo/scene-book', { 'package:build': build },
    { '@svitlo/engine': '0.0.0' }, {}, { './scenes': { default: './dist/scenes/index.js' } });
  const dry = {
    tasks: [
      { taskId: '@svitlo/engine#package:build', dependencies: [] },
      { taskId: '@svitlo/ui-kit#package:build', dependencies: ['@svitlo/engine#package:build'] },
      { taskId: '@svitlo/scene-book#package:build', dependencies: ['@svitlo/engine#package:build'] },
    ],
  };
  assert.throws(
    () => verifyTurboGraph(dry, [engine, uiKit, sceneBook]),
    /Scenes\/styles requires a declared UI Kit build dependency/,
  );

  const declared = { ...sceneBook, devDependencies: { '@svitlo/ui-kit': '0.0.0' } };
  assert.throws(
    () => verifyTurboGraph(dry, [engine, uiKit, declared]),
    /Missing Turbo dependency edge: @svitlo\/scene-book#package:build -> @svitlo\/ui-kit#package:build/,
  );
  dry.tasks[2].dependencies.push('@svitlo/ui-kit#package:build');
  assert.deepEqual(verifyTurboGraph(dry, [engine, uiKit, declared]), { tasks: 3, builds: 3, lint: 0 });

  const stylesOnly = { ...sceneBook, exports: { './styles': './dist/styles.css' } };
  assert.throws(() => verifyTurboGraph(dry, [engine, uiKit, stylesOnly]), /UI Kit build dependency/);
});

test('every real Scene/style textbook declares both builder prerequisites', () => {
  const workspaces = discoverWorkspaces();
  const builder = workspaces.filter(w => w.scripts?.['package:build']?.includes('scripts/textbook-tooling/buildTextbook/build.mjs'));
  const scenes = builder.filter(w => w.exports?.['./scenes'] || w.exports?.['./styles']);
  assert.ok(scenes.length >= 5, 'Fixture must exercise actual Scene-bearing textbooks');
  for (const book of scenes) {
    for (const dep of ['@svitlo/engine', '@svitlo/ui-kit']) {
      assert.ok(book.dependencies?.[dep] || book.devDependencies?.[dep], book.name + ' missing ' + dep);
    }
  }
});
