import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { assertEngineDistUnchanged, inspectEngineDist } from './engine-artifact-guard.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-engine-artifact-'));
  t.after(() => rmSync(root, { force: true, recursive: true }));
  const dist = join(root, 'dist');
  mkdirSync(join(dist, 'nested'), { recursive: true });
  for (const name of ['build.js', 'build.d.ts', 'runtime.js', 'runtime.d.ts']) {
    writeFileSync(join(dist, name), 'compiled: ' + name);
  }
  writeFileSync(join(dist, 'nested', 'other.js'), 'compiled nested module');
  return dist;
}

test('snapshot records every file, compiled exports, content hashes and mtimes', t => {
  const dist = fixture(t);
  const before = inspectEngineDist(dist);
  assert.equal(before.fileCount, 5);
  assert.ok(before.totalBytes > 0);
  assert.equal(before.files.length, 5);
  assert.ok(before.files.every(file => /^[a-f0-9]{64}$/.test(file.sha256)));
  assertEngineDistUnchanged(before, inspectEngineDist(dist));
});

test('missing or empty compiled exports fail closed', t => {
  const dist = fixture(t);
  rmSync(join(dist, 'runtime.d.ts'));
  assert.throws(() => inspectEngineDist(dist), /Missing or empty Engine compiled export: runtime.d.ts/);
  writeFileSync(join(dist, 'runtime.d.ts'), '');
  assert.throws(() => inspectEngineDist(dist), /Missing or empty Engine compiled export: runtime.d.ts/);
});

test('missing artifact root fails instead of rebuilding', t => {
  const dist = fixture(t);
  rmSync(dist, { recursive: true });
  assert.throws(() => inspectEngineDist(dist), /ENOENT/);
});

test('content changes, additions and rewritten identical bytes are all detected', t => {
  const dist = fixture(t);
  const before = inspectEngineDist(dist);
  const target = join(dist, 'build.js');
  writeFileSync(target, 'mutated');
  assert.throws(() => assertEngineDistUnchanged(before, inspectEngineDist(dist)), /dist changed/);
  writeFileSync(target, 'compiled: build.js');
  utimesSync(target, new Date(0), new Date(0));
  assert.throws(() => assertEngineDistUnchanged(before, inspectEngineDist(dist)), /dist changed/);
  writeFileSync(join(dist, 'added.js'), 'additional output');
  assert.throws(() => assertEngineDistUnchanged(before, inspectEngineDist(dist)), /dist changed/);
});

test('symlinks and other unexpected filesystem entries are rejected', t => {
  const dist = fixture(t);
  symlinkSync(join(dist, 'runtime.js'), join(dist, 'unexpected-link.js'));
  assert.throws(() => inspectEngineDist(dist), /Unexpected non-regular Engine artifact entry/);
});
