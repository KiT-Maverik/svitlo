import assert from 'node:assert/strict';
import { test } from 'node:test';
import { discoverWorkspaces, planWorkspaceOperation, environmentForWorkspace } from './run-workspace-script.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ws = (name, path, scripts, deps = []) => ({
  name,
  path,
  scripts,
  dependencies: Object.fromEntries(deps.map(dep => [dep, '*'])),
});

test('builds dependencies in order and never builds an eligible package twice', () => {
  const items = [
    ws('@svitlo/app', 'apps/web', { 'app:build': 'next build' }, ['@svitlo/content', '@svitlo/indexdb']),
    ws('@svitlo/content', 'content/playground', { 'package:build': 'content-build' }, ['@svitlo/engine']),
    ws('@svitlo/engine', 'shared/engine', { 'package:build': 'tsc' }),
    ws('@svitlo/indexdb', 'shared/indexdb', { 'package:build': 'tsc' }, ['@svitlo/engine']),
  ];
  assert.deepEqual(
    planWorkspaceOperation(items, 'app:build').steps.map(step => step.name + '/' + step.script),
    [
      '@svitlo/engine/package:build',
      '@svitlo/content/package:build',
      '@svitlo/indexdb/package:build',
      '@svitlo/app/app:build',
    ],
  );
  const builds = planWorkspaceOperation(items, 'package:build').steps;
  assert.deepEqual(
    builds.map(step => step.name),
    ['@svitlo/engine', '@svitlo/content', '@svitlo/indexdb'],
  );
});

test('root script runs all eligible workspaces and skips unsupported ones', () => {
  const items = [
    ws('a', 'apps/a', { 'code:lint:check': 'eslint' }),
    ws('b', 'apps/b', { 'code:lint:check': 'eslint' }),
    ws('c', 'apps/c', { 'test:e2e': 'playwright' }),
  ];
  const plan = planWorkspaceOperation(items, 'code:lint:check');
  assert.deepEqual(plan.selected, ['a', 'b']);
  assert.deepEqual(
    plan.steps.map(step => step.name),
    ['a', 'b'],
  );
});

test('workspace cycles and missing capabilities fail loudly', () => {
  const items = [
    ws('a', 'shared/a', { 'package:build': 'tsc' }, ['b']),
    ws('b', 'shared/b', { 'package:build': 'tsc' }, ['a']),
  ];
  assert.throws(() => planWorkspaceOperation(items, 'package:build'), /cycle/);
  assert.throws(() => planWorkspaceOperation([ws('x', 'apps/x', {})], 'app:build'), /No workspaces/);
});

test('internal CI selection preserves dependency builds but leaves root operations exhaustive', () => {
  const packages = [
    ws('@svitlo/engine', 'shared/engine', { 'package:build': 'tsc' }),
    ws('@svitlo/ui-kit', 'shared/ui-kit', { 'package:build': 'tsc', 'test:components': 'vitest' }, ['@svitlo/engine']),
    ws('@svitlo/math', 'content/math', { 'test:components': 'vitest' }, ['@svitlo/engine']),
    ws('@svitlo/playground', 'content/playground', { 'package:build': 'build', 'test:components': 'vitest' }, [
      '@svitlo/ui-kit',
    ]),
    ws('@svitlo/web', 'apps/web', { 'test:components': 'vitest' }, ['@svitlo/ui-kit']),
  ];
  const all = planWorkspaceOperation(packages, 'test:components');
  assert.equal(all.selected.length, 4);
  const selected = planWorkspaceOperation(packages, 'test:components', {
    onlyWorkspaces: ['@svitlo/playground', '@svitlo/web'],
  });
  assert.deepEqual(selected.selected, ['@svitlo/playground', '@svitlo/web']);
  assert.deepEqual(
    selected.steps.map(step => step.name + '/' + step.script),
    [
      '@svitlo/engine/package:build',
      '@svitlo/ui-kit/package:build',
      '@svitlo/playground/test:components',
      '@svitlo/web/test:components',
    ],
  );
  assert.throws(
    () =>
      planWorkspaceOperation(packages, 'test:components', {
        onlyWorkspaces: ['@svitlo/engine'],
      }),
    /does not implement/,
  );
  assert.throws(
    () =>
      planWorkspaceOperation(packages, 'test:components', {
        onlyWorkspaces: ['@svitlo/web', '@svitlo/web'],
      }),
    /unique/,
  );
  assert.throws(
    () =>
      planWorkspaceOperation(packages, 'test:components', {
        onlyWorkspaces: ['@svitlo/nonexistent'],
      }),
    /does not implement/,
  );
});

const packageMetadataFields = new Set([
  'name',
  'version',
  'description',
  'private',
  'type',
  'license',
  'author',
  'contributors',
  'homepage',
  'repository',
  'bugs',
  'keywords',
  'funding',
  'packageManager',
  'engines',
]);

test('root and workspace package manifests group metadata, scripts, dependencies, devDependencies and other fields', () => {
  const rootPath = fileURLToPath(new URL('../../package.json', import.meta.url));
  const packages = discoverWorkspaces();
  const rootDir = fileURLToPath(new URL('../../', import.meta.url));
  const manifestFiles = [rootPath, ...packages.map(pkg => rootDir + pkg.path + '/package.json')];
  for (const path of manifestFiles) {
    const keys = Object.keys(JSON.parse(readFileSync(path, 'utf8')));
    let previousCategory = -1;
    for (const key of keys) {
      const category = packageMetadataFields.has(key)
        ? 0
        : key === 'scripts'
          ? 1
          : key === 'dependencies'
            ? 2
            : key === 'devDependencies'
              ? 3
              : 4;
      assert(
        category >= previousCategory,
        path + ': field ' + key + ' is out of order (metadata → scripts → dependencies → devDependencies → other)',
      );
      previousCategory = category;
    }
  }
});

test('real manifests use canonical operation names and preserve npm pre-hooks', () => {
  const root = JSON.parse(readFileSync(fileURLToPath(new URL('../../package.json', import.meta.url)), 'utf8'));
  const packages = discoverWorkspaces();
  assert.equal(packages.length, 30);
  for (const fixture of ['@svitlo/web-fixture-alpha', '@svitlo/web-fixture-beta']) {
    assert(packages.some(pkg => pkg.name === fixture), 'Missing independent Web contract fixture ' + fixture);
  }
  assert.equal(Object.hasOwn(root.scripts, 'storybook:start'), false);
  assert.equal(Object.hasOwn(root.scripts, 'app:start:dev'), false);
  assert.equal(Object.hasOwn(root.scripts, 'app:start'), false);
  for (const script of ['package:build', 'app:build', 'code:check:types', 'test', 'storybook:build']) {
    assert(Object.hasOwn(root.scripts, script), 'root missing ' + script);
    const eligible = packages.filter(pkg => Object.hasOwn(pkg.scripts || {}, script));
    assert(eligible.length > 0, 'no workspace implements ' + script);
    const plan = planWorkspaceOperation(packages, script);
    assert.equal(plan.selected.length, eligible.length);
  }
  for (const pkg of packages) {
    const scripts = pkg.scripts || {};
    for (const old of ['build', 'typecheck', 'lint', 'dev', 'start', 'storybook', 'build-storybook']) {
      assert(!Object.hasOwn(scripts, old), pkg.name + ' still uses ' + old);
    }
    if (!Object.keys(scripts).length) continue;
    assert(scripts['code:format:check'] && scripts['code:format:fix'], pkg.name + ' lacks format commands');
    for (const key of Object.keys(scripts)) {
      if (!key.startsWith('pre') || key === 'prepack') continue;
      assert(Object.hasOwn(scripts, key.slice(3)), pkg.name + ' orphaned npm hook ' + key);
    }
  }
});

test('only Web receives the explicitly selected test content; no hidden release default', () => {
  const configured = { SVITLO_WEB_TEST_SELECTION: 'web-fixture-alpha', NODE_ENV: 'test' };
  const selected = environmentForWorkspace('@svitlo/web', configured);
  assert.equal(selected.SVITLO_TEXTBOOK, 'web-fixture-alpha');
  assert.equal(environmentForWorkspace('@svitlo/mobile', configured), configured);
  assert.equal(environmentForWorkspace('@svitlo/desktop', configured), configured);
  assert.equal(environmentForWorkspace('@svitlo/playground', configured), configured);
  assert.equal(environmentForWorkspace('@svitlo/web', { NODE_ENV: 'production' }).SVITLO_TEXTBOOK, undefined);
  assert.equal(
    environmentForWorkspace('@svitlo/web', { SVITLO_TEXTBOOK: 'math', SVITLO_WEB_TEST_SELECTION: 'web-fixture-alpha' }).SVITLO_TEXTBOOK,
    'math',
  );
});
