import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import {
  appendBuildTelemetry,
  cleanSourceRevision,
  inspectTrackedSourceChanges,
  createPackageBuildReuse,
  readBuildState,
  snapshotDist,
} from './package-build-reuse.mjs';

const ws = (name, path, dependencies = []) => ({
  name,
  path,
  scripts: { 'package:build': 'fixture' },
  dependencies: Object.fromEntries(dependencies.map(dep => [dep, '0.0.0'])),
});

function fixture(t, { packages = [ws('a', 'shared/a'), ws('b', 'shared/b', ['a'])] } = {}) {
  const temporary = mkdtempSync(join(tmpdir(), 'svitlo-package-reuse-'));
  t.after(() => rmSync(temporary, { recursive: true, force: true }));
  const root = join(temporary, 'checkout');
  mkdirSync(root);
  for (const pkg of packages) {
    const directory = join(root, pkg.path);
    mkdirSync(directory, { recursive: true });
    writeFileSync(
      join(directory, 'package.json'),
      JSON.stringify({ name: pkg.name, exports: { '.': { default: './dist/index.js' } } }),
    );
  }
  const stateFile = join(temporary, 'build-state.json');
  const calls = [];
  const events = [];
  let source = 'commit-1';
  let failure = null;
  const build = name => {
    calls.push(name);
    if (failure === name) throw new Error('compilation failed for ' + name);
    const pkg = packages.find(item => item.name === name);
    const dist = join(root, pkg.path, 'dist');
    mkdirSync(dist, { recursive: true });
    writeFileSync(join(dist, 'index.js'), 'compiled ' + name + ' # ' + calls.length);
  };
  const runner = createPackageBuildReuse({
    root,
    packages,
    stateFile,
    runBuild: build,
    sourceRevision: () => source,
    onBuildEvent: event => events.push(event),
  });
  return {
    root,
    stateFile,
    calls,
    events,
    runner,
    setSource: value => (source = value),
    setFailure: value => (failure = value),
  };
}

test('builds dependencies topologically once, then reuses verified artifacts', t => {
  const f = fixture(t);
  assert.equal(f.runner.ensure('b'), 'built');
  assert.deepEqual(f.calls, ['a', 'b']);
  assert.equal(f.runner.ensure('b'), 'reused');
  assert.deepEqual(f.calls, ['a', 'b']);
  const stats = readBuildState(f.stateFile, f.root).stats;
  assert.equal(stats.built, 2);
  assert.equal(stats.reused, 2);
  assert.equal(stats.requested, 4);
});

test('changed and missing outputs rebuild dependents; new source invalidates all', t => {
  const f = fixture(t);
  f.runner.ensure('b');
  writeFileSync(join(f.root, 'shared/a/dist/index.js'), 'stale artifact');
  f.runner.ensure('b');
  assert.deepEqual(f.calls, ['a', 'b', 'a', 'b']);
  rmSync(join(f.root, 'shared/b/dist/index.js'));
  f.runner.ensure('b');
  assert.deepEqual(f.calls, ['a', 'b', 'a', 'b', 'b']);
  assert.deepEqual(
    f.events.filter(event => event.outcome === 'built').map(({ workspace, rebuildReason }) => [
      workspace,
      rebuildReason,
    ]),
    [
      ['a', 'missing-state-record'],
      ['b', 'missing-state-record'],
      ['a', 'dist-digest-changed'],
      ['b', 'dependency-versions-changed'],
      ['b', 'missing-or-invalid-dist'],
    ],
  );
  f.setSource('commit-2');
  f.runner.ensure('b');
  assert.deepEqual(f.calls.slice(-2), ['a', 'b']);
  assert.equal(readBuildState(f.stateFile, f.root).stats.built, 7);
  assert.deepEqual(
    f.events.slice(-2).map(({ workspace, rebuildReason }) => [workspace, rebuildReason]),
    [['a', 'source-revision-changed'], ['b', 'source-revision-changed']],
  );
});

test('failed compiler cannot stamp success and a missing dist fails closed', t => {
  const f = fixture(t, { packages: [ws('a', 'shared/a')] });
  f.setFailure('a');
  assert.throws(() => f.runner.ensure('a'), /compilation failed/);
  assert.equal(Object.keys(readBuildState(f.stateFile, f.root).records).length, 0);
  f.setFailure(null);
  assert.equal(f.runner.ensure('a'), 'built');
  rmSync(join(f.root, 'shared/a/dist'), { recursive: true, force: true });
  f.setFailure('a');
  assert.throws(() => f.runner.ensure('a'), /compilation failed/);
  assert.equal(readBuildState(f.stateFile, f.root).stats.failed, 2);
});

test('missing output after a successful command is an error, not a successful reuse', t => {
  const f = fixture(t, { packages: [ws('a', 'shared/a')] });
  const runner = createPackageBuildReuse({
    root: f.root,
    packages: [ws('a', 'shared/a')],
    stateFile: f.stateFile,
    runBuild: () => {},
    sourceRevision: () => 'commit-1',
  });
  assert.throws(() => runner.ensure('a'), /Missing compiled dist/);
  assert.equal(Object.keys(readBuildState(f.stateFile, f.root).records).length, 0);
});

test('dirty or unknown source prevents reuse even with intact artifacts', t => {
  const f = fixture(t, { packages: [ws('a', 'shared/a')] });
  f.setSource(null);
  f.runner.ensure('a');
  f.runner.ensure('a');
  assert.deepEqual(f.calls, ['a', 'a']);
  assert.equal(readBuildState(f.stateFile, f.root).stats.reused, 0);
  assert.deepEqual(f.events.map(event => event.rebuildReason), ['unverified-source', 'unverified-source']);
  assert.equal(f.events[0].sourceAfterBuildRevision, null);
});


test('a build which dirties tracked source explains later fail-closed recompilations', t => {
  const packages = [ws('a', 'shared/a')];
  const f = fixture(t, { packages });
  let source = 'commit-1';
  const events = [];
  const runner = createPackageBuildReuse({
    root: f.root,
    packages,
    stateFile: f.stateFile,
    runBuild: name => {
      const dist = join(f.root, 'shared/a/dist');
      mkdirSync(dist, { recursive: true });
      writeFileSync(join(dist, 'index.js'), 'compiled ' + name);
      source = null; // Simulate an npm prehook mutating a tracked source file.
    },
    sourceRevision: () => source,
    onBuildEvent: event => events.push(event),
  });
  runner.ensure('a');
  runner.ensure('a');
  assert.deepEqual(
    events.map(({ rebuildReason, sourceRevision, sourceAfterBuildRevision }) => [
      rebuildReason, sourceRevision, sourceAfterBuildRevision,
    ]),
    [
      ['missing-state-record', 'commit-1', null],
      ['unverified-source', null, null],
    ],
  );
  assert.equal(readBuildState(f.stateFile, f.root).stats.reused, 0);
  assert.equal(readBuildState(f.stateFile, f.root).stats.built, 2);
});

test('unverified source cannot become a cache hit even if dist matches', t => {
  const f = fixture(t, { packages: [ws('a', 'shared/a')] });
  f.runner.ensure('a');
  f.setSource(null);
  assert.equal(f.runner.ensure('a'), 'built');
  assert.equal(f.events.at(-1).rebuildReason, 'unverified-source');
  assert.equal(f.events.at(-1).sourceRevision, null);
  assert.equal(readBuildState(f.stateFile, f.root).stats.reused, 0);
});

test('symlink outputs and a foreign state path are rejected', t => {
  const f = fixture(t, { packages: [ws('a', 'shared/a')] });
  mkdirSync(join(f.root, 'shared/a/dist'), { recursive: true });
  writeFileSync(join(f.root, 'file.txt'), 'data');
  symlinkSync(join(f.root, 'file.txt'), join(f.root, 'shared/a/dist/symlink.txt'));
  assert.throws(() => snapshotDist(f.root, 'shared/a'), /Symlink/);
  assert.throws(
    () =>
      createPackageBuildReuse({
        root: f.root,
        packages: [ws('a', 'shared/a')],
        stateFile: join(f.root, 'state.json'),
        runBuild: () => {},
        sourceRevision: () => 'commit-1',
      }),
    /outside the repository/,
  );
});

test('a corrupted state is never trusted', t => {
  const f = fixture(t, { packages: [ws('a', 'shared/a')] });
  writeFileSync(f.stateFile, '{not-json');
  assert.throws(() => f.runner.ensure('a'), /JSON/);
  writeFileSync(f.stateFile, JSON.stringify({ version: 1, root: '/another-checkout', records: {}, stats: {} }));
  assert.throws(() => f.runner.ensure('a'), /foreign/);
});

test('a failed dependency build stops consumers and cannot be reused', t => {
  const f = fixture(t);
  f.setFailure('a');
  assert.throws(() => f.runner.ensure('b'), /compilation failed/);
  assert.deepEqual(f.calls, ['a']);
  assert.deepEqual(readBuildState(f.stateFile, f.root).records, {});
});

test('source revision requires an unchanged tracked worktree', t => {
  const temporary = mkdtempSync(join(tmpdir(), 'svitlo-reuse-git-'));
  t.after(() => rmSync(temporary, { recursive: true, force: true }));
  const git = args => {
    const result = spawnSync('git', args, { cwd: temporary, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  git(['init', '--quiet']);
  git(['config', 'user.name', 'Build Reuse Test']);
  git(['config', 'user.email', 'build-reuse@example.invalid']);
  writeFileSync(join(temporary, 'source.txt'), 'original');
  git(['add', 'source.txt']);
  git(['commit', '--quiet', '-m', 'fixture']);
  assert.equal(cleanSourceRevision(temporary), git(['rev-parse', 'HEAD']));
  writeFileSync(join(temporary, 'source.txt'), 'modified');
  assert.equal(cleanSourceRevision(temporary), null);
});

test('bounded Git diagnostics reveal tracked edits but never source contents', t => {
  const temp = mkdtempSync(join(tmpdir(), 'svitlo-source-diagnostics-'));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const root = join(temp, 'checkout');
  mkdirSync(root);
  const git = args => {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  git(['init', '--quiet']);
  git(['config', 'user.name', 'CI diagnostics test']);
  git(['config', 'user.email', 'ci-diagnostics@example.invalid']);
  writeFileSync(join(root, 'source.ts'), 'original content');
  git(['add', 'source.ts']);
  git(['commit', '--quiet', '-m', 'fixture']);
  assert.deepEqual(inspectTrackedSourceChanges(root), {
    sourceCheck: 'no-tracked-differences',
    dirtyTrackedFileCount: 0,
    dirtyTrackedFiles: [],
  });

  writeFileSync(join(root, 'source.ts'), 'SECRET_NOT_FOR_LOGS');
  assert.equal(cleanSourceRevision(root), null);
  const trace = join(temp, 'events.jsonl');
  appendBuildTelemetry({
    root,
    file: trace,
    event: {
      workspace: '@svitlo/engine',
      outcome: 'built',
      durationMs: 12,
      rebuildReason: 'missing-state-record',
      sourceRevision: git(['rev-parse', 'HEAD']),
      sourceAfterBuildRevision: null,
    },
  });
  const entry = JSON.parse(readFileSync(trace, 'utf8'));
  assert.equal(entry.sourceCheck, 'modified-tracked-files');
  assert.equal(entry.dirtyTrackedFileCount, 1);
  assert.deepEqual(entry.dirtyTrackedFiles, ['source.ts']);
  assert.doesNotMatch(JSON.stringify(entry), /SECRET_NOT_FOR_LOGS/);

  appendBuildTelemetry({
    root,
    file: trace,
    event: {
      workspace: '@svitlo/engine',
      outcome: 'built',
      durationMs: 14,
      sourceRevision: null,
      rebuildReason: 'unverified-source',
      sourceAfterBuildRevision: null,
    },
  });
  const entries = readFileSync(trace, 'utf8').trim().split('\n').map(JSON.parse);
  assert.equal(entries[1].sourceCheck, 'modified-tracked-files');
  assert.deepEqual(entries[1].dirtyTrackedFiles, ['source.ts']);
});

test('Git diagnostic failures remain an observation and cannot enable reuse', () => {
  const result = inspectTrackedSourceChanges('/nonexistent-checkout', () => ({
    status: 128,
    stdout: '',
  }));
  assert.deepEqual(result, {
    sourceCheck: 'git-diff-unavailable',
    dirtyTrackedFileCount: null,
    dirtyTrackedFiles: [],
  });
});

test('a nonempty distribution missing its declared public export is rejected', t => {
  const f = fixture(t, { packages: [ws('a', 'shared/a')] });
  const runner = createPackageBuildReuse({
    root: f.root,
    packages: [ws('a', 'shared/a')],
    stateFile: f.stateFile,
    runBuild: () => {
      const directory = join(f.root, 'shared/a/dist');
      mkdirSync(directory, { recursive: true });
      writeFileSync(join(directory, 'other.js'), 'not the public entrypoint');
    },
    sourceRevision: () => 'commit-1',
  });
  assert.throws(() => runner.ensure('a'), /Missing compiled public export/);
  assert.deepEqual(readBuildState(f.stateFile, f.root).records, {});
});

test('telemetry records actual compiler, verified reuse and failure per workspace', t => {
  const f = fixture(t);
  f.runner.ensure('b');
  f.runner.ensure('b');
  assert.deepEqual(
    f.events.map(({ workspace, outcome }) => [workspace, outcome]),
    [['a', 'built'], ['b', 'built'], ['a', 'reused'], ['b', 'reused']],
  );
  for (const event of f.events) {
    assert.equal(event.sourceRevision, 'commit-1');
    assert.ok(Number.isInteger(event.durationMs) && event.durationMs >= 0);
    assert.match(event.outputDigest, /^[a-f0-9]{64}$/);
    assert.equal(event.rebuildReason, event.outcome === 'built' ? 'missing-state-record' : null);
    assert.equal(event.sourceAfterBuildRevision, event.outcome === 'built' ? 'commit-1' : null);
  }
  f.setFailure('a');
  rmSync(join(f.root, 'shared/a/dist'), { recursive: true, force: true });
  assert.throws(() => f.runner.ensure('b'), /compilation failed/);
  assert.deepEqual(f.events.at(-1).outcome, 'failed');
  assert.equal(f.events.at(-1).workspace, 'a');
  assert.equal(f.events.at(-1).outputDigest, null);
  assert.equal(f.events.at(-1).rebuildReason, 'missing-or-invalid-dist');
  assert.equal(readBuildState(f.stateFile, f.root).stats.failed, 1);
});

test('telemetry JSONL is job-local, source-labeled and never written into checkout', t => {
  const f = fixture(t, { packages: [ws('a', 'shared/a')] });
  const trace = join(dirname(f.stateFile), 'compilation-telemetry.jsonl');
  const event = { workspace: 'a', outcome: 'built', durationMs: 42, sourceRevision: 'commit-1' };
  appendBuildTelemetry({
    root: f.root,
    file: trace,
    event,
    env: { GITHUB_RUN_ID: '123', GITHUB_RUN_ATTEMPT: '2', GITHUB_JOB: 'types', GITHUB_SHA: 'abc' },
  });
  const [line] = readFileSync(trace, 'utf8').trim().split('\n');
  const record = JSON.parse(line);
  assert.equal(record.schemaVersion, 1);
  assert.equal(record.operation, 'package:build');
  assert.equal(record.runId, '123');
  assert.equal(record.runAttempt, '2');
  assert.equal(record.job, 'types');
  assert.equal(record.checkoutSha, 'abc');
  assert.equal(record.sourceRevision, 'commit-1');
  assert.equal(record.workspace, 'a');
  assert.equal(record.outcome, 'built');
  assert.equal(record.durationMs, 42);
  assert.ok(!Number.isNaN(Date.parse(record.timestamp)));
  assert.throws(
    () => appendBuildTelemetry({ root: f.root, file: join(f.root, 'unsafe.jsonl'), event }),
    /outside the repository/,
  );
  assert.throws(
    () => appendBuildTelemetry({ root: f.root, file: 'relative.jsonl', event }),
    /absolute/,
  );
  const linkedFile = join(dirname(f.stateFile), 'linked-telemetry.jsonl');
  symlinkSync(join(f.root, 'inside-repo.jsonl'), linkedFile);
  assert.throws(
    () => appendBuildTelemetry({ root: f.root, file: linkedFile, event }),
    /symlink/,
  );
  const linkedFolder = join(dirname(f.stateFile), 'linked-checkout');
  symlinkSync(f.root, linkedFolder, 'dir');
  assert.throws(
    () => appendBuildTelemetry({ root: f.root, file: join(linkedFolder, 'inside-repo.jsonl'), event }),
    /outside the repository/,
  );
});

test('unavailable optional telemetry cannot convert a valid build or failed compiler into success', t => {
  const f = fixture(t, { packages: [ws('a', 'shared/a')] });
  const reporter = () => { throw new Error('trace sink unavailable'); };
  const runner = createPackageBuildReuse({
    root: f.root,
    packages: [ws('a', 'shared/a')],
    stateFile: f.stateFile,
    runBuild: name => {
      if (name === 'a') {
        const dist = join(f.root, 'shared/a/dist');
        mkdirSync(dist, { recursive: true });
        writeFileSync(join(dist, 'index.js'), 'compiled a');
      }
    },
    sourceRevision: () => 'commit-1',
    onBuildEvent: reporter,
  });
  const warn = console.warn;
  const warnings = [];
  console.warn = (...args) => warnings.push(args.join(' '));
  try {
    assert.equal(runner.ensure('a'), 'built');
    assert.equal(runner.ensure('a'), 'reused');
    rmSync(join(f.root, 'shared/a/dist'), { recursive: true, force: true });
    const failing = createPackageBuildReuse({
      root: f.root,
      packages: [ws('a', 'shared/a')],
      stateFile: f.stateFile,
      runBuild: () => { throw new Error('real compiler failed'); },
      sourceRevision: () => 'commit-1',
      onBuildEvent: reporter,
    });
    assert.throws(() => failing.ensure('a'), /real compiler failed/);
  } finally {
    console.warn = warn;
  }
  assert.equal(warnings.length, 3);
  assert.ok(warnings.every(message => message.includes('trace sink unavailable')));
  assert.equal(readBuildState(f.stateFile, f.root).stats.reused, 1);
  assert.equal(readBuildState(f.stateFile, f.root).stats.failed, 1);
});
