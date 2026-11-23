import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planContentBuilds, shouldBuildAllContent, shouldDeferContentBuilds } from './plan-content-builds.mjs';

const workspaces = [
  { path: 'content/math', name: '@svitlo/math' },
  { path: 'content/history', name: '@svitlo/history' },
  { path: 'content/playground', name: '@svitlo/playground' },
  { path: 'content/art', name: '@svitlo/art' },
  { path: 'content/astronomy', name: '@svitlo/astronomy' },
  { path: 'content/languages/ukrainian', name: '@svitlo/ukrainian' },
];

test('main-ready PRs and manual dispatch check every textbook, including nested languages', () => {
  assert.equal(shouldBuildAllContent('pull_request', 'main', false), true);
  assert.equal(shouldBuildAllContent('workflow_dispatch', '', false), true);
  assert.equal(shouldBuildAllContent('pull_request', 'main', true), false);
  assert.equal(shouldBuildAllContent('pull_request', 'integration/skills', false), false);
  assert.equal(shouldBuildAllContent('pull_request', 'develop', false), false);
  assert.equal(shouldBuildAllContent('push', 'main', false), false);
  assert.deepEqual(planContentBuilds({ changed: [], workspaces, all: true }), {
    include: workspaces.map(({ path }) => ({ path, kind: 'content' })),
  });
});

test('other PRs build only modified textbooks independently', () => {
  assert.deepEqual(
    planContentBuilds({
      changed: ['content/history/data/skills/index.ts', 'content/languages/ukrainian/textbook.ts'],
      workspaces,
    }),
    {
      include: [
        { path: 'content/history', kind: 'content' },
        { path: 'content/languages/ukrainian', kind: 'content' },
      ],
    },
  );
  assert.deepEqual(planContentBuilds({ changed: ['apps/web/page.tsx', 'shared/engine/index.ts'], workspaces }), {
    include: [],
  });
});

test('shared textbook build tooling keeps representative smoke distributions', () => {
  assert.deepEqual(planContentBuilds({ changed: ['scripts/textbook-tooling/buildTextbook/build.mjs'], workspaces }), {
    include: [
      { path: 'content/math', kind: 'content' },
      { path: 'content/playground', kind: 'content' },
      { path: 'content/art', kind: 'content' },
      { path: 'content/astronomy', kind: 'content' },
    ],
  });
});

test('skills agent subtasks retain their narrow domain validation instead of a package build', () => {
  const owners = { history: { 2: ['ancientAfrica'] } };
  assert.deepEqual(
    planContentBuilds({
      changed: ['content/history/data/skills/ancientAfrica/index.ts'],
      workspaces,
      baseRef: 'feat/history-skills-integration',
      headRef: 'feat/history-skills-agent-2',
      owners,
    }),
    { include: [{ path: 'content/history', kind: 'agent' }] },
  );
  assert.deepEqual(
    planContentBuilds({
      changed: ['content/history/data/skills/ancientAfrica/index.ts'],
      workspaces,
      baseRef: 'main',
      headRef: 'feat/history-skills-agent-2',
      owners,
    }),
    { include: [{ path: 'content/history', kind: 'content' }] },
  );
});

test('a missing agent ownership mapping is an error rather than a skipped build', () => {
  assert.throws(
    () =>
      planContentBuilds({
        changed: ['content/history/data/skills/ancientAfrica/index.ts'],
        workspaces,
        baseRef: 'feat/history-skills-integration',
        headRef: 'feat/history-skills-agent-2',
      }),
    /No mapping for agent branch/,
  );
});

test('Draft PRs defer all content matrix builds; Ready and manual runs retain coverage', () => {
  assert.equal(shouldDeferContentBuilds('pull_request', true), true);
  assert.equal(shouldDeferContentBuilds('pull_request', false), false);
  assert.equal(shouldDeferContentBuilds('workflow_dispatch', true), false);
  assert.equal(shouldDeferContentBuilds('merge_group', true), false);
  assert.equal(shouldDeferContentBuilds('push', true), false);
  assert.equal(shouldBuildAllContent('pull_request', 'main', true), false);
  assert.equal(shouldBuildAllContent('pull_request', 'main', false), true);
  assert.equal(shouldBuildAllContent('workflow_dispatch', 'develop', true), true);
});
