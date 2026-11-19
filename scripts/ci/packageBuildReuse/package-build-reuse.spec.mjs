import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createPackageBuildReuse, readBuildState, snapshotDist } from './package-build-reuse.mjs';

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
  const stateFile = join(temporary, 'build-state.json');
  const calls = [];
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
  });
  return {
    root,
    stateFile,
    calls,
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
  f.setSource('commit-2');
  f.runner.ensure('b');
  assert.deepEqual(f.calls.slice(-2), ['a', 'b']);
  assert.equal(readBuildState(f.stateFile, f.root).stats.built, 7);
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
