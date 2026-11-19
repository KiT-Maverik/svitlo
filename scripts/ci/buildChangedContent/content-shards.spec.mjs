import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planContentShards, runContentShard, validateShardCoverage } from './content-shards.mjs';

const pkg = (path, kind = 'content') => ({ path, kind });
const selected = [
  'content/art', 'content/astronomy', 'content/biology', 'content/chemistry',
  'content/economics', 'content/engineering', 'content/geography', 'content/health-safety',
  'content/history', 'content/informatics', 'content/language-literature',
  'content/languages/ukrainian', 'content/math', 'content/philosophy', 'content/physics',
  'content/playground', 'content/psychology',
].map(path => pkg(path));

test('zero selected does not start any shards or installs', () => {
  assert.deepEqual(planContentShards([]), { include: [] });
});

test('one selected textbook remains one independently verified shard', () => {
  assert.deepEqual(planContentShards([pkg('content/math')]), {
    include: [{ id: 'shard-1', packages: [pkg('content/math')] }],
  });
});

test('full production scope maps all 17 distinct packages into five stable balanced shards', () => {
  const first = planContentShards(selected);
  assert.equal(first.include.length, 5);
  assert.deepEqual(first, planContentShards([...selected].reverse()));
  validateShardCoverage(selected, first.include);
  assert.deepEqual(
    first.include.flatMap(shard => shard.packages).map(item => item.path).sort(),
    selected.map(item => item.path).sort(),
  );
});

test('legacy assigned-domain agent scope remains agent, not a full content build', () => {
  assert.deepEqual(planContentShards([pkg('content/history', 'agent')]), {
    include: [{ id: 'shard-1', packages: [pkg('content/history', 'agent')] }],
  });
});

test('missing, duplicated, unexpected and invalid packages fail closed', () => {
  const initial = planContentShards(selected);
  assert.throws(
    () => validateShardCoverage(selected, initial.include.slice(1)),
    /Missing shard content package/,
  );
  assert.throws(
    () => validateShardCoverage(selected, [...initial.include, initial.include[0]]),
    /Duplicate shard content package/,
  );
  assert.throws(
    () => validateShardCoverage(selected, [{ packages: [pkg('content/missing')] }]),
    /Unexpected shard content package/,
  );
  assert.throws(() => planContentShards([pkg('content/math'), pkg('content/math')]), /Duplicate selected/);
  assert.throws(() => planContentShards([pkg('../other')]), /Invalid content matrix package/);
  assert.throws(() => planContentShards([pkg('content/math', 'unknown')]), /Invalid content matrix package/);
});

test('a failed package is identified but does not prevent other packages in that shard', () => {
  const calls = [];
  const launch = (_command, args, options) => {
    const path = args[args.indexOf('--package') + 1];
    calls.push({ path, kind: args.at(-1), label: options.env.SVITLO_CI_LABEL });
    return { status: path === 'content/history' ? 1 : 0 };
  };
  const failed = runContentShard(
    [pkg('content/art'), pkg('content/history'), pkg('content/math')],
    launch,
  );
  assert.deepEqual(failed, ['content/history']);
  assert.deepEqual(calls.map(item => item.path), ['content/art', 'content/history', 'content/math']);
  assert.deepEqual(calls.map(item => item.kind), ['content', 'content', 'content']);
  assert.ok(calls.every(item => item.label.startsWith('Build and verify content/')));
});

test('missing subprocess status is a failure, never a silent success', () => {
  assert.deepEqual(runContentShard([pkg('content/missing')], () => ({ error: new Error('spawn failed') })), [
    'content/missing',
  ]);
  assert.throws(() => runContentShard([], () => ({ status: 0 })), /empty content shard/);
});
