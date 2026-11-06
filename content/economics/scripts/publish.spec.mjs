import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, cpSync, rmSync, mkdtempSync, realpathSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const id = 'economics';
const sourceRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
function fixture(t, built = true) {
  const tmp = mkdtempSync(join(realpathSync(tmpdir()), 'svitlo-' + id + '-publish-'));
  t.after(() => rmSync(tmp, { recursive: true, force: true }));
  const pkg = join(tmp, 'package'), output = join(tmp, 'consumer/public');
  mkdirSync(join(pkg, 'scripts'), { recursive: true });
  copyFileSync(join(sourceRoot, 'scripts/publish.mjs'), join(pkg, 'scripts/publish.mjs'));
  if (built) {
    mkdirSync(join(pkg, 'dist'), { recursive: true });
    cpSync(join(sourceRoot, 'dist/static'), join(pkg, 'dist/static'), { recursive: true });
    copyFileSync(join(sourceRoot, 'dist/manifest.json'), join(pkg, 'dist/manifest.json'));
  }
  const run = (...args) => spawnSync(process.execPath, [join(pkg, 'scripts/publish.mjs'), ...args],
    { cwd: tmp, encoding: 'utf8' });
  return { tmp, pkg, output, run };
}
test('publishes real localized Skills JSON with no fabricated lesson data', t => {
  const { pkg, output, run } = fixture(t);
  const doc = JSON.parse(readFileSync(join(pkg, 'dist/manifest.json'), 'utf8'));
  assert.equal(doc.textbook, id);
  const skills = doc.files.filter(name => name.startsWith('data/pages/skillAnalytics/'));
  assert.ok(skills.length > 0);
  assert.ok(skills.includes('data/pages/skillAnalytics/uk.json'));
  assert.ok(skills.includes('data/pages/skillAnalytics/qm.json'));
  assert.ok(!doc.files.some(name => name.startsWith('data/pages/lessons/')));
  const result = run('publish', '--output', output);
  assert.equal(result.status, 0, result.stderr);
  for (const name of doc.files) {
    assert.equal(readFileSync(join(output, name), 'utf8'),
      readFileSync(join(pkg, 'dist/static', name), 'utf8'));
  }
  const json = JSON.parse(readFileSync(join(output, skills[0]), 'utf8'));
  assert.ok(Array.isArray(json.domains) && json.domains.length > 0);
  assert.ok(json.domains.every(domain => typeof domain.id === 'string'));
});
test('repeated publish and empty manifest cleanup preserve host and other books', t => {
  const { pkg, output, run } = fixture(t);
  mkdirSync(join(output, 'flags'), { recursive: true });
  writeFileSync(join(output, 'flags/uk.svg'), 'host-owned');
  mkdirSync(join(output, 'textbooks/other'), { recursive: true });
  writeFileSync(join(output, 'textbooks/other/keep.txt'), 'other-book');
  assert.equal(run('publish', '--output', output).status, 0);
  assert.equal(run('publish', '--output', output).status, 0);
  const manifestPath = join(pkg, 'dist/manifest.json');
  const doc = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const stale = doc.files[0];
  doc.files = [];
  writeFileSync(manifestPath, JSON.stringify(doc));
  const cleared = run('publish', '--output', output);
  assert.equal(cleared.status, 0, cleared.stderr);
  assert.ok(!existsSync(join(output, stale)));
  assert.equal(readFileSync(join(output, 'flags/uk.svg'), 'utf8'), 'host-owned');
  assert.equal(readFileSync(join(output, 'textbooks/other/keep.txt'), 'utf8'), 'other-book');
  assert.deepEqual(JSON.parse(readFileSync(join(output, '.svitlo/publish-' + id + '.json'), 'utf8')).files, []);
});
test('rejects missing builds, invalid arguments, unsafe manifests and symlinks', t => {
  const missing = fixture(t, false);
  assert.match(missing.run('publish', '--output', missing.output).stderr, /not built/);
  const f = fixture(t);
  assert.match(f.run('publish').stderr, /usage:/);
  assert.match(f.run('publish', '--output', '.').stderr, /unsafe output directory/);
  const manifestPath = join(f.pkg, 'dist/manifest.json');
  const doc = JSON.parse(readFileSync(manifestPath, 'utf8'));
  doc.files.push('../other/private.txt');
  writeFileSync(manifestPath, JSON.stringify(doc));
  assert.match(f.run('publish', '--output', f.output).stderr, /ownership manifest/);
  doc.files.pop();
  writeFileSync(manifestPath, JSON.stringify(doc));
  rmSync(join(f.pkg, 'dist/static', doc.files[0]));
  assert.match(f.run('publish', '--output', f.output).stderr, /missing built resource/);
  mkdirSync(join(f.tmp, 'actual'), { recursive: true });
  symlinkSync(join(f.tmp, 'actual'), join(f.tmp, 'linked'), 'dir');
  assert.match(f.run('publish', '--output', join(f.tmp, 'linked')).stderr, /symlink/);
});
