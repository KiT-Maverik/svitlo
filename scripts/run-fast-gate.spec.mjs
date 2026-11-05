import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chooseChecks } from './run-fast-gate.mjs';

const packages = [
  { path: 'shared/contracts', name: '@svitlo/contracts' },
  { path: 'shared/engine', name: '@svitlo/engine' },
  { path: 'content/math', name: '@svitlo/math' },
  { path: 'content/biology', name: '@svitlo/biology' },
];
test('Math Data changes run structure validation, not component tests', () => {
  const p = chooseChecks(['content/math/data/skills/algebra/algebra.data.ts'], packages);
  assert.deepEqual([...p.affected], ['@svitlo/math']);
  assert.equal(p.taxonomy, true);
  assert.equal(p.mathComponents, false);
});
test('shared Contracts change checks its workspace and Math consumer', () => {
  const p = chooseChecks(['shared/contracts/src/taxonomy.ts'], packages);
  assert.deepEqual([...p.affected].sort(), ['@svitlo/contracts', '@svitlo/math']);
  assert.equal(p.taxonomy, true);
});
test('selects each changed app and Math UI tests only for source', () => {
  const p = chooseChecks(['content/biology/src/app/page.tsx', 'content/math/src/app/page.tsx'], packages);
  assert.deepEqual([...p.affected].sort(), ['@svitlo/biology', '@svitlo/math']);
  assert.equal(p.mathComponents, true);
});
test('root package-lock changes select core workspaces and Math, not every textbook', () => {
  const p = chooseChecks(['package-lock.json'], packages);
  assert.deepEqual([...p.affected].sort(), ['@svitlo/contracts', '@svitlo/engine', '@svitlo/math']);
  assert.equal(p.taxonomy, true);
});
test('root package.json changes select all workspaces', () => {
  const p = chooseChecks(['package.json'], packages);
  assert.equal(p.affected.size, packages.length);
});
