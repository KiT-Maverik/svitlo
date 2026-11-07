import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { chooseChecks } from './run-fast-gate.mjs';

const packages = [
  { path: 'shared/contracts', name: '@svitlo/contracts' },
  { path: 'shared/engine', name: '@svitlo/engine' },
  { path: 'content/math', name: '@svitlo/math' },
  { path: 'content/biology', name: '@svitlo/biology' },
];

test('Math authored data gets ordinary workspace checks, not taxonomy checks in FastGate', () => {
  const p = chooseChecks(['content/math/data/skills/algebra/algebra.data.ts'], packages);
  assert.deepEqual([...p.affected], ['@svitlo/math']);
  assert.equal('taxonomy' in p, false);
  assert.equal('mathComponents' in p, false);
});

test('shared Contracts changes do not automatically select Math', () => {
  const p = chooseChecks(['shared/contracts/src/taxonomy.ts'], packages);
  assert.deepEqual([...p.affected], ['@svitlo/contracts']);
});

test('selects only changed subject workspaces', () => {
  const p = chooseChecks(['content/biology/src/app/page.tsx', 'content/math/src/app/page.tsx'], packages);
  assert.deepEqual([...p.affected].sort(), ['@svitlo/biology', '@svitlo/math']);
});

test('root package-lock changes select core workspaces without forcing Math', () => {
  const p = chooseChecks(['package-lock.json'], packages);
  assert.deepEqual([...p.affected].sort(), ['@svitlo/contracts', '@svitlo/engine']);
});

test('shared textbook tooling changes do not automatically select Math', () => {
  const p = chooseChecks(['scripts/textbook-tooling/test-publish.mjs'], packages);
  assert.deepEqual([...p.affected], []);
});

test('root package.json changes select all workspaces', () => {
  const p = chooseChecks(['package.json'], packages);
  assert.equal(p.affected.size, packages.length);
});

test('unrelated workflow changes do not select subject workspaces', () => {
  const p = chooseChecks(['.github/workflows/fast-gate.yml'], packages);
  assert.deepEqual([...p.affected], []);
});

test('content builds have one dedicated workflow with scoped triggers', () => {
  const workflow = readFileSync(
    fileURLToPath(new URL('../.github/workflows/content-build.yml', import.meta.url)),
    'utf8',
  );
  assert.match(workflow, /name: Content packages build/);
  assert.match(workflow, /- 'content\/\*\*'/);
  assert.doesNotMatch(workflow, /- 'shared\/\*\*'/);
});
