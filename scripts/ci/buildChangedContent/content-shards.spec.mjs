import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planContentShards, runContentShard, validateShardCoverage } from './content-shards.mjs';

const pkg = (path, kind = 'content') => ({ path, kind });
const selected = [
  'content/art',
  'content/astronomy',
  'content/biology',
  'content/chemistry',
  'content/economics',
  'content/engineering',
  'content/geography',
  'content/health-safety',
  'content/history',
  'content/informatics',
  'content/language-literature',
  'content/languages/ukrainian',
  'content/math',
  'content/philosophy',
  'content/physics',
  'content/playground',
  'content/psychology',
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
    first.include
      .flatMap(shard => shard.packages)
      .map(item => item.path)
      .sort(),
    selected.map(item => item.path).sort(),
  );
});

test('three-shard diagnostic preserves full scope and failures without changing the five-shard default', () => {
  const control = planContentShards(selected);
  const candidate = planContentShards(selected, 3);
  assert.equal(control.include.length, 5);
  assert.equal(candidate.include.length, 3);
  assert.deepEqual(candidate, planContentShards([...selected].reverse(), 3));
  assert.deepEqual(planContentShards(selected), control, 'the production default must remain five shards');

  for (const scope of [
    selected,
    [pkg('content/math')],
    [pkg('content/math'), pkg('content/playground')],
    [pkg('content/history', 'agent')],
  ]) {
    const shards = planContentShards(scope, 3).include;
    validateShardCoverage(scope, shards);
    assert.deepEqual(
      shards.flatMap(shard => shard.packages.map(item => item.path + '#' + item.kind)).sort(),
      scope.map(item => item.path + '#' + item.kind).sort(),
    );
  }

  // Exercise the real shard runner for every diagnostic assignment. The one
  // simulated package failure must survive grouping without skipping peers.
  const invoked = [];
  const failures = [];
  const reporter = { log() {}, error() {} };
  for (const shard of candidate.include) {
    failures.push(...runContentShard(shard.packages, (_command, args) => {
      const path = args[args.indexOf('--package') + 1];
      invoked.push(path);
      return { status: path === 'content/history' ? 1 : 0 };
    }, reporter));
  }
  assert.deepEqual(invoked.sort(), selected.map(item => item.path).sort());
  assert.deepEqual(failures, ['content/history']);
});

test('legacy assigned-domain agent scope remains agent, not a full content build', () => {
  assert.deepEqual(planContentShards([pkg('content/history', 'agent')]), {
    include: [{ id: 'shard-1', packages: [pkg('content/history', 'agent')] }],
  });
});

test('missing, duplicated, unexpected and invalid packages fail closed', () => {
  const initial = planContentShards(selected);
  assert.throws(() => validateShardCoverage(selected, initial.include.slice(1)), /Missing shard content package/);
  assert.throws(
    () => validateShardCoverage(selected, [...initial.include, initial.include[0]]),
    /Duplicate shard content package/,
  );
  assert.throws(
    () => validateShardCoverage(selected, [{ packages: [pkg('content/missing')] }]),
    /Unexpected shard content package/,
  );
  assert.throws(() => planContentShards([pkg('content/math'), pkg('content/math')]), /Duplicate selected/);
  assert.throws(() => planContentShards([pkg('content/math'), pkg('content/math', 'agent')]), /Duplicate selected/);
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
  const errors = [];
  const reporter = {
    log() {},
    error(message) {
      errors.push(message);
    },
  };
  const failed = runContentShard([pkg('content/art'), pkg('content/history'), pkg('content/math')], launch, reporter);
  assert.ok(errors.some(message => message.includes('::error title=content/history::')));
  assert.deepEqual(failed, ['content/history']);
  assert.deepEqual(
    calls.map(item => item.path),
    ['content/art', 'content/history', 'content/math'],
  );
  assert.deepEqual(
    calls.map(item => item.kind),
    ['content', 'content', 'content'],
  );
  assert.ok(calls.every(item => item.label.startsWith('Build and verify content/')));
});

test('a missing or throwing subprocess is a failure, never a silent success', () => {
  const reporter = { log() {}, error() {} };
  assert.deepEqual(
    runContentShard([pkg('content/missing')], () => ({ error: new Error('spawn failed') }), reporter),
    ['content/missing'],
  );
  assert.deepEqual(
    runContentShard(
      [pkg('content/missing')],
      () => {
        throw new Error('launch failed');
      },
      reporter,
    ),
    ['content/missing'],
  );
  assert.throws(() => runContentShard([], () => ({ status: 0 }), reporter), /empty content shard/);
});
