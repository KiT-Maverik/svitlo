import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { chooseChecks, requiresWebBuild, shouldBuildDependency } from './run-fast-gate.mjs';

const packages = [
  { path: 'shared/engine', name: '@svitlo/engine' },
  { path: 'shared/indexdb', name: '@svitlo/indexdb' },
  { path: 'content/math', name: '@svitlo/math' },
  { path: 'content/biology', name: '@svitlo/biology' },
];

test('Markdown and KaTeX styles trigger the consuming Web production build', () => {
  const withHosts = [
    ...packages,
    { path: 'shared/ui-kit', name: '@svitlo/ui-kit' },
    { path: 'apps/web', name: '@svitlo/web' },
  ];
  const changes = [
    'shared/ui-kit/src/components/widgets/ContentBlockRenderer/blocks/Markdown/Markdown.tsx',
    'shared/ui-kit/src/components/widgets/ContentBlockRenderer/blocks/Markdown/Markdown.module.css',
  ];
  const plan = chooseChecks(changes, withHosts);
  assert.deepEqual([...plan.affected].sort(), ['@svitlo/ui-kit', '@svitlo/web']);
  assert.equal(requiresWebBuild(changes), true);

  const unrelated = ['shared/ui-kit/src/components/widgets/ContentBlockRenderer/blocks/Text/Text.module.css'];
  assert.deepEqual([...chooseChecks(unrelated, withHosts).affected], ['@svitlo/ui-kit']);
  assert.equal(requiresWebBuild(unrelated), false);
});

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
  const p = chooseChecks(
    ['shared/indexdb/controllers/lessonState/createLessonState/createLessonState.utils.ts'],
    packages,
  );
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

test('FastGate always emits a required status and scopes expensive checks, including Markdown CSS', () => {
  const workflow = readFileSync(
    fileURLToPath(new URL('../../.github/workflows/fast-gate.yml', import.meta.url)),
    'utf8',
  );
  assert.match(workflow, /name: FastGate \/ verify/);
  assert.doesNotMatch(workflow, /\n    paths:/, 'required checks cannot use GitHub PR paths filters');
  assert.match(workflow, /ContentBlockRenderer\/blocks\/Markdown\//);
  assert.match(workflow, /steps\.scope\.outputs\.run == 'true'/);
  assert.match(workflow, /No changed executable source or CI config/);
});

test('content build always reports required status and scopes package builds internally', () => {
  const workflow = readFileSync(
    fileURLToPath(new URL('../../.github/workflows/content-build.yml', import.meta.url)),
    'utf8',
  );
  assert.match(workflow, /name: Content packages build/);
  assert.match(workflow, /on:\n  pull_request:/);
  assert.doesNotMatch(workflow, /\n    paths:/, 'required status cannot use GitHub paths filters');
  assert.match(workflow, /build-changed-content\.mjs/, 'content selection remains scoped in script');
  assert.match(workflow, /verify-production-assets\.mjs/, 'Ready PRs must check missing assets');
  assert.match(workflow, /!github\.event\.pull_request\.draft/, 'Drafts are allowed to be unfinished');
});

test('FastGate builds required content package exports for host typechecks only', () => {
  const desktop = { path: 'apps/desktop', name: '@svitlo/desktop' };
  const playground = { path: 'content/playground', scripts: { 'package:build': 'tsc' } };
  const engine = { path: 'shared/engine', scripts: { 'package:build': 'tsc' } };
  const math = { path: 'content/math', name: '@svitlo/math' };
  assert.equal(shouldBuildDependency(desktop, playground), true);
  assert.equal(shouldBuildDependency(desktop, engine), true);
  assert.equal(shouldBuildDependency(math, playground), false);
  assert.equal(shouldBuildDependency(desktop, { ...playground, scripts: {} }), false);
});
