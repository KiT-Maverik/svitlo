import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectContentBuilds, resolveAgentScope } from './build-changed-content.mjs';

const packages = [
  { path: 'content/math', name: '@svitlo/math' },
  { path: 'content/history', name: '@svitlo/history' },
  { path: 'content/playground', name: '@svitlo/playground' },
  { path: 'content/art', name: '@svitlo/art' },
  { path: 'content/astronomy', name: '@svitlo/astronomy' },
  { path: 'content/languages/ukrainian', name: '@svitlo/ukrainian' },
];
test('builds only changed content, not other subjects or shared packages', () => {
  assert.deepEqual(selectContentBuilds(['content/history/data/skills/index.ts'], packages), ['content/history']);
  assert.deepEqual(selectContentBuilds(['shared/engine/src/index.ts'], packages), []);
  assert.deepEqual(selectContentBuilds(['apps/web/src/page.tsx'], packages), []);
});
test('recognizes nested language workspaces', () => {
  assert.deepEqual(selectContentBuilds(['content/languages/ukrainian/textbook.ts'], packages), [
    'content/languages/ukrainian',
  ]);
});
test('shared textbook tooling runs representative smoke builds', () => {
  assert.deepEqual(selectContentBuilds(['scripts/textbook-tooling/buildTextbook/build.mjs'], packages), [
    'content/math',
    'content/playground',
    'content/art',
    'content/astronomy',
  ]);
});
test('manual dispatch builds all textbooks', () => {
  assert.deepEqual(
    selectContentBuilds([], packages, true),
    packages.map(w => w.path),
  );
});
test('agent PR checks all assigned domains without triggering unrelated packages', () => {
  const owners = { history: { 2: ['ancientAfrica', 'southAndSoutheastAsia'] } };
  assert.deepEqual(
    resolveAgentScope(
      'feat/history-skills-integration',
      'feat/history-skills-agent-2',
      ['content/history/data/skills/ancientAfrica/a.data.ts'],
      packages,
      owners,
    ),
    { workspace: packages[1], domains: owners.history['2'] },
  );
  assert.equal(
    resolveAgentScope(
      'main',
      'feat/history-skills-agent-2',
      ['content/history/data/skills/ancientAfrica/a.data.ts'],
      packages,
      owners,
    ),
    null,
  );
});
