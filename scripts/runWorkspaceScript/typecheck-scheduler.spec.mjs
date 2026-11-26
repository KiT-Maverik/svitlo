import assert from 'node:assert/strict';
import { test } from 'node:test';
import { partitionBuildMutatingHosts, runParallelTypechecks } from './typecheck-scheduler.mjs';

test('known dist-mutating hosts are excluded from the parallel pool', () => {
  assert.deepEqual(partitionBuildMutatingHosts(['@svitlo/web', 'engine', '@svitlo/mobile', 'desktop']), {
    parallel: ['engine', 'desktop'],
    sequential: ['@svitlo/web', '@svitlo/mobile'],
  });
});

test('worker pool checks all workspaces within the specified limit', async () => {
  const targets = Array.from({ length: 11 }, (_, i) => 'workspace-' + i);
  let inFlight = 0;
  let maxInFlight = 0;
  const completed = [];
  await runParallelTypechecks(targets, async name => {
    inFlight++;
    maxInFlight = Math.max(maxInFlight, inFlight);
    await new Promise(resolve => setTimeout(resolve, 1));
    completed.push(name);
    inFlight--;
  }, { parallelism: 3 });
  assert.deepEqual(completed.slice().sort(), targets.slice().sort());
  assert.equal(maxInFlight, 3);
  assert.equal(inFlight, 0);
});

test('worker pool retains all failures in target order after checking remaining workspaces', async () => {
  const visited = [];
  await assert.rejects(runParallelTypechecks(['first', 'second', 'third', 'fourth'], async name => {
    visited.push(name);
    if (name === 'first' || name === 'third') throw new Error('broken');
  }, { parallelism: 2, context: 'Production TypeScript' }), error => {
    assert.match(error.message, /Production TypeScript failed workspaces:\nfirst: broken\nthird: broken/);
    return true;
  });
  assert.deepEqual(visited.slice().sort(), ['first', 'second', 'third', 'fourth'].sort());
});

test('rejects invalid concurrency before starting checks', async () => {
  let count = 0;
  for (const parallelism of [0, -1, 2.5, 9, NaN, '4']) {
    await assert.rejects(runParallelTypechecks(['a'], () => { count++; }, { parallelism }), /integer from 1 to 8/);
  }
  assert.equal(count, 0);
});
