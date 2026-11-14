import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { chooseChecks } from './run-fast-gate.mjs';

const packages = [
  { path: 'shared/engine', name: '@svitlo/engine' },
  { path: 'shared/indexdb', name: '@svitlo/indexdb' },
  { path: 'content/math', name: '@svitlo/math' },
  { path: 'content/biology', name: '@svitlo/biology' },
];

test('Math authored data gets ordinary workspace checks, not taxonomy checks in FastGate', () => {
  const p = chooseChecks(['content/math/data/skills/algebra/algebra.data.ts'], packages);
  assert.deepEqual([...p.affected], ['@svitlo/math']);
  assert.equal('taxonomy' in p, false);
  assert.equal('mathComponents' in p, false);
});

test('shared Engine changes do not automatically select Math', () => {
  const p = chooseChecks(['shared/engine/schemas/languages.schemas.ts'], packages);
  assert.deepEqual([...p.affected].sort(), ['@svitlo/engine', '@svitlo/indexdb']);
});

test('IndexDB changes select only IndexDB for fast typecheck and unit/integration tests', () => {
  const p = chooseChecks(['shared/indexdb/controllers/lessonState/createLessonState/createLessonState.utils.ts'], packages);
  assert.deepEqual([...p.affected], ['@svitlo/indexdb']);
});

test('unrelated Engine tooling does not select IndexDB browser or unit checks', () => {
  const p = chooseChecks(['shared/engine/scripts/generateSkills/generateSkills.mjs'], packages);
  assert.deepEqual([...p.affected], ['@svitlo/engine']);
});

test('Engine question contract changes select IndexDB dependent checks', () => {
  const p = chooseChecks(['shared/engine/configurators/questions/question.schemas.ts'], packages);
  assert.deepEqual([...p.affected].sort(), ['@svitlo/engine', '@svitlo/indexdb']);
});

test('selects only changed subject workspaces', () => {
  const p = chooseChecks(['content/biology/src/app/page.tsx', 'content/math/src/app/page.tsx'], packages);
  assert.deepEqual([...p.affected].sort(), ['@svitlo/biology', '@svitlo/math']);
});

test('root package-lock changes select core workspaces without forcing Math', () => {
  const p = chooseChecks(['package-lock.json'], packages);
  assert.deepEqual([...p.affected].sort(), ['@svitlo/engine', '@svitlo/indexdb']);
});

test('shared textbook tooling changes do not automatically select Math', () => {
  const p = chooseChecks(['scripts/textbook-tooling/publishTextbook/test-publish.mjs'], packages);
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
    fileURLToPath(new URL('../../.github/workflows/content-build.yml', import.meta.url)),
    'utf8',
  );
  assert.match(workflow, /name: Content packages build/);
  assert.match(workflow, /- 'content\/\*\*'/);
  assert.doesNotMatch(workflow, /- 'shared\/\*\*'/);
});
