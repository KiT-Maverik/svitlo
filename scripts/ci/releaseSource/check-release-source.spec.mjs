import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { assertProductionSource } from './check-release-source.mjs';

const valid = {
  baseRef: 'main',
  headRef: 'develop',
  headRepo: 'KiT-Maverik/svitlo',
  repository: 'KiT-Maverik/svitlo',
};

test('only same-repository develop → main is an authorized release', () => {
  assert.doesNotThrow(() => assertProductionSource(valid));
  for (const override of [
    { headRef: 'feature/example' },
    { headRef: 'main' },
    { baseRef: 'develop' },
    { headRepo: 'attacker/svitlo' },
    { headRepo: '' },
    { repository: '' },
    { headRef: undefined },
    { baseRef: undefined },
  ]) {
    assert.throws(() => assertProductionSource({ ...valid, ...override }), /Production promotion requires/);
  }
});

test('Ready production check is rerun on edited PRs and checks source before installation', () => {
  const workflow = readFileSync(
    fileURLToPath(new URL('../../../.github/workflows/production-quality.yml', import.meta.url)),
    'utf8',
  );
  assert.match(workflow, /opened, reopened, synchronize, edited, ready_for_review/);
  assert.match(workflow, /name: Production Quality \/ verify/);
  const gate = workflow.indexOf('check-release-source.mjs');
  assert.ok(gate > 0 && gate < workflow.indexOf('npm ci'));
  assert.match(workflow, /github\.event\.pull_request\.head\.repo\.full_name/);
});

test('production gate CLI propagates authorized and unauthorized exit statuses', () => {
  const script = fileURLToPath(new URL('./check-release-source.mjs', import.meta.url));
  const env = {
    ...process.env,
    PR_BASE_REF: valid.baseRef,
    PR_HEAD_REF: valid.headRef,
    PR_HEAD_REPO: valid.headRepo,
    GITHUB_REPOSITORY: valid.repository,
  };
  assert.equal(spawnSync(process.execPath, [script], { env }).status, 0);
  const denied = spawnSync(process.execPath, [script], {
    env: { ...env, PR_HEAD_REF: 'feature/not-release' },
    encoding: 'utf8',
  });
  assert.equal(denied.status, 1);
  assert.match(denied.stderr, /Production promotion requires/);
});

test('production builds packages and apps independently, verifying each in its own runner', () => {
  const workflow = readFileSync(
    fileURLToPath(new URL('../../../.github/workflows/production-quality.yml', import.meta.url)),
    'utf8',
  );
  assert.match(workflow, /name: Build all distributable packages/);
  assert.match(workflow, /name: Verify compiled public package artifacts/);
  assert.match(workflow, /name: Build application and all needed workspace dependencies/);
  assert.match(workflow, /name: Validate compiled application resources\n        if: matrix.integration/);
  assert.match(workflow, /name: Run application E2E suite\n        if: matrix.e2e/);
  assert.match(workflow, /strategy:\n      fail-fast: false/);
  assert.match(workflow, /name: Production Quality \/ verify/);
  // The packages job and every app runner use clean local workspaces rather
  // than illegally sharing dist/ across GitHub-hosted runners.
  assert.match(workflow, /needs: \[policy, repository, types, unit, components, lint, packages, apps\]/);
});
