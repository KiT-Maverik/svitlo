import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, cpSync, rmSync, mkdtempSync, realpathSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const id = 'physics';
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
function fixture(t, built = true) {
  const temp = mkdtempSync(join(realpathSync(tmpdir()), 'svitlo-publish-' + id + '-'));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const pkg = join(temp, 'textbook');
  const out = join(temp, 'host/public');
  mkdirSync(join(pkg, 'scripts'), { recursive: true });
  copyFileSync(join(root, 'scripts/publish.mjs'), join(pkg, 'scripts/publish.mjs'));
  if (built) {
    mkdirSync(join(pkg, 'dist'), { recursive: true });
    cpSync(join(root, 'dist/static'), join(pkg, 'dist/static'), { recursive: true });
    copyFileSync(join(root, 'dist/manifest.json'), join(pkg, 'dist/manifest.json'));
  }
  const run = (...args) => spawnSync(process.execPath, [join(pkg, 'scripts/publish.mjs'), ...args], { cwd: temp, encoding: 'utf8' });
  return { temp, pkg, out, run };
}
test('publish exactly real built resources from isolated consumer working directory', t => {
  const { pkg, out, run } = fixture(t);
  const attempt = run('publish', '--output', out);
  assert.equal(attempt.status, 0, attempt.stderr);
  const manifest = JSON.parse(readFileSync(join(pkg, 'dist/manifest.json'), 'utf8'));
  assert.equal(manifest.textbook, id);
  assert(manifest.files.some(path => path.startsWith('data/pages/skillAnalytics/')));
  for (const file of manifest.files) assert.deepEqual(readFileSync(join(out, file)), readFileSync(join(pkg, 'dist/static', file)));
  assert.deepEqual(JSON.parse(readFileSync(join(out, '.svitlo/publish-' + id + '.json'), 'utf8')).files, manifest.files);
});
test('repeat publishing cleans stale owned media without deleting host or other textbook assets', t => {
  const { pkg, out, run } = fixture(t);
  const media = 'textbooks/' + id + '/media/test.svg';
  mkdirSync(join(pkg, 'dist/static/textbooks', id, 'media'), { recursive: true });
  writeFileSync(join(pkg, 'dist/static', media), '<svg/>');
  const manifestPath = join(pkg, 'dist/manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  manifest.files.push(media);
  writeFileSync(manifestPath, JSON.stringify(manifest));
  mkdirSync(join(out, 'flags'), { recursive: true });
  writeFileSync(join(out, 'flags/uk.svg'), 'host flag');
  const other = join(out, 'textbooks/other/media/test.svg');
  mkdirSync(join(out, 'textbooks/other/media'), { recursive: true });
  writeFileSync(other, 'other textbook');
  assert.equal(run('publish', '--output', out).status, 0);
  assert.equal(run('publish', '--output', out).status, 0);
  assert(existsSync(join(out, media)));
  manifest.files = manifest.files.filter(path => path !== media);
  writeFileSync(manifestPath, JSON.stringify(manifest));
  const revised = run('publish', '--output', out);
  assert.equal(revised.status, 0, revised.stderr);
  assert(!existsSync(join(out, media)));
  assert.equal(readFileSync(other, 'utf8'), 'other textbook');
  assert.equal(readFileSync(join(out, 'flags/uk.svg'), 'utf8'), 'host flag');
});
test('reject missing build, CLI misuse, tampered manifest and symlink output', t => {
  const missing = fixture(t, false);
  assert.match(missing.run('publish', '--output', missing.out).stderr, /not built/);
  const valid = fixture(t);
  assert.match(valid.run('publish').stderr, /usage:/);
  assert.match(valid.run('publish', '--output', '.').stderr, /unsafe output directory/);
  const manifestPath = join(valid.pkg, 'dist/manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  manifest.files.push('../host/secrets.txt');
  writeFileSync(manifestPath, JSON.stringify(manifest));
  assert.match(valid.run('publish', '--output', valid.out).stderr, /ownership manifest/);
  manifest.files.pop();
  writeFileSync(manifestPath, JSON.stringify(manifest));
  mkdirSync(join(valid.temp, 'actual'), { recursive: true });
  symlinkSync(join(valid.temp, 'actual'), join(valid.temp, 'linked'), 'dir');
  assert.match(valid.run('publish', '--output', join(valid.temp, 'linked')).stderr, /symlink/);
});
