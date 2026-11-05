import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, cpSync, rmSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
function fixture(t, built = true) {
  const temp = mkdtempSync(join(tmpdir(), 'svitlo-geography-publish-'));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const pkg = join(temp, 'installed-package');
  const out = join(temp, 'host/public');
  mkdirSync(join(pkg, 'scripts'), { recursive: true });
  copyFileSync(join(root, 'scripts/publish.mjs'), join(pkg, 'scripts/publish.mjs'));
  if (built) {
    mkdirSync(join(pkg, 'dist'), { recursive: true });
    cpSync(join(root, 'dist/static'), join(pkg, 'dist/static'), { recursive: true });
    copyFileSync(join(root, 'dist/manifest.json'), join(pkg, 'dist/manifest.json'));
  }
  const run = (...args) => spawnSync(process.execPath, [join(pkg, 'scripts/publish.mjs'), ...args],
    { cwd: temp, encoding: 'utf8' });
  return { pkg, out, run };
}
test('publishes only geography authored Skills JSON and exact manifest ownership', t => {
  const { pkg, out, run } = fixture(t);
  const manifest = JSON.parse(readFileSync(join(pkg, 'dist/manifest.json'), 'utf8'));
  assert.equal(manifest.textbook, 'geography');
  assert.equal(new Set(manifest.files).size, manifest.files.length);
  assert.ok(manifest.files.some(path => path.startsWith('data/pages/skillAnalytics/') && path.endsWith('.json')));
  assert.ok(!manifest.files.some(path => path.startsWith('data/pages/lessons/')));
  const result = run('publish', '--output', out);
  assert.equal(result.status, 0, result.stderr);
  for (const file of manifest.files) {
    assert.equal(readFileSync(join(out, file), 'utf8'), readFileSync(join(pkg, 'dist/static', file), 'utf8'));
  }
  const en = JSON.parse(readFileSync(join(out, 'data/pages/skillAnalytics/en.json'), 'utf8'));
  assert.ok(en.domains.length > 0);
  const ownership = JSON.parse(readFileSync(join(out, '.svitlo/publish-geography.json'), 'utf8'));
  assert.deepEqual(ownership.files, manifest.files);
});
test('repeat publishing removes stale owned JSON but retains host assets', t => {
  const { pkg, out, run } = fixture(t);
  mkdirSync(join(out, 'images'), { recursive: true });
  writeFileSync(join(out, 'images/host.svg'), 'untouched');
  assert.equal(run('publish', '--output', out).status, 0);
  assert.equal(run('publish', '--output', out).status, 0);
  const file = join(pkg, 'dist/manifest.json');
  const manifest = JSON.parse(readFileSync(file, 'utf8'));
  const stale = manifest.files.find(path => path.endsWith('/en.json'));
  assert.ok(stale);
  manifest.files = manifest.files.filter(path => path !== stale);
  writeFileSync(file, JSON.stringify(manifest));
  const after = run('publish', '--output', out);
  assert.equal(after.status, 0, after.stderr);
  assert.equal(existsSync(join(out, stale)), false);
  assert.equal(readFileSync(join(out, 'images/host.svg'), 'utf8'), 'untouched');
});
test('rejects unbuilt package, invalid arguments and path traversal', t => {
  const missing = fixture(t, false);
  assert.notEqual(missing.run('publish', '--output', missing.out).status, 0);
  const { pkg, out, run } = fixture(t);
  assert.notEqual(run('publish', '--output').status, 0);
  const filename = join(pkg, 'dist/manifest.json');
  const manifest = JSON.parse(readFileSync(filename, 'utf8'));
  manifest.files = ['../private-file'];
  writeFileSync(filename, JSON.stringify(manifest));
  assert.notEqual(run('publish', '--output', out).status, 0);
});
