import assert from 'node:assert/strict';
import { test } from 'node:test';
import { planWorkspaceOperation } from './run-workspace-script.mjs';

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
