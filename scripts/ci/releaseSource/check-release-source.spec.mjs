import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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
    fileURLToPath(new URL('../../../.github/workflows/questions.yml', import.meta.url)),
    'utf8',
  );
  assert.match(workflow, /opened, reopened, synchronize, edited, ready_for_review/);
  assert.match(workflow, /name: Production Quality \/ verify/);
  const gate = workflow.indexOf('check-release-source.mjs');
  assert.ok(gate > 0 && gate < workflow.indexOf('npm ci'));
  assert.match(workflow, /github\.event\.pull_request\.head\.repo\.full_name/);
});
