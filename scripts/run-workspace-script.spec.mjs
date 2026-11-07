import assert from 'node:assert/strict';
import { test } from 'node:test';
import { discoverWorkspaces, planWorkspaceOperation } from './run-workspace-script.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ws = (name, path, scripts, deps = []) => ({
  name, path, scripts,
  dependencies: Object.fromEntries(deps.map(dep => [dep, '*'])),
});

test('builds dependencies in order and never builds an eligible package twice', () => {
  const items = [
    ws('@svitlo/app', 'apps/web', { 'app:build': 'next build' }, ['@svitlo/content']),
    ws('@svitlo/content', 'content/playground', { 'package:build': 'content-build' }, ['@svitlo/engine']),
    ws('@svitlo/engine', 'shared/engine', { 'package:build': 'tsc' }, ['@svitlo/contracts']),
    ws('@svitlo/contracts', 'shared/contracts', { 'package:build': 'tsc' }),
  ];
  assert.deepEqual(
    planWorkspaceOperation(items, 'app:build').steps.map(step => step.name + '/' + step.script),
    [
      '@svitlo/contracts/package:build',
      '@svitlo/engine/package:build',
      '@svitlo/content/package:build',
      '@svitlo/app/app:build',
    ],
  );
  const builds = planWorkspaceOperation(items, 'package:build').steps;
  assert.deepEqual(builds.map(step => step.name), [
    '@svitlo/contracts', '@svitlo/engine', '@svitlo/content',
  ]);
});

test('root script runs all eligible workspaces and skips unsupported ones', () => {
  const items = [
    ws('a', 'apps/a', { 'code:lint:check': 'eslint' }),
    ws('b', 'apps/b', { 'code:lint:check': 'eslint' }),
    ws('c', 'apps/c', { 'test:e2e': 'playwright' }),
  ];
  const plan = planWorkspaceOperation(items, 'code:lint:check');
  assert.deepEqual(plan.selected, ['a', 'b']);
  assert.deepEqual(plan.steps.map(step => step.name), ['a', 'b']);
});

test('workspace cycles and missing capabilities fail loudly', () => {
  const items = [
    ws('a', 'shared/a', { 'package:build': 'tsc' }, ['b']),
    ws('b', 'shared/b', { 'package:build': 'tsc' }, ['a']),
  ];
  assert.throws(() => planWorkspaceOperation(items, 'package:build'), /cycle/);
  assert.throws(() => planWorkspaceOperation([ws('x', 'apps/x', {})], 'app:build'), /No workspaces/);
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
  const rootPath = fileURLToPath(new URL('../package.json', import.meta.url));
  const packages = discoverWorkspaces();
  const rootDir = fileURLToPath(new URL('../', import.meta.url));
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
  const root = JSON.parse(readFileSync(fileURLToPath(new URL('../package.json', import.meta.url)), 'utf8'));
  const packages = discoverWorkspaces();
  assert.equal(packages.length, 29);
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
