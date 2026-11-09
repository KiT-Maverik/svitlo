import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  cpSync,
  rmSync,
  mkdtempSync,
  realpathSync,
  symlinkSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(process.cwd());
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const id = pkg.name?.match(/^@svitlo\/([a-z][a-z-]*)$/)?.[1];
const repo = resolve(fileURLToPath(new URL('../..', import.meta.url)));
if (!id || !/^content\/(?:[a-z][a-z-]*|languages\/[a-z][a-z-]*)$/.test(relative(repo, root).split(sep).join('/'))) {
  throw new Error('Run test:publish from a textbook workspace');
}
const manifestSource = join(root, 'dist/manifest.json');
const manifest = JSON.parse(readFileSync(manifestSource, 'utf8'));
assert.equal(manifest.textbook, id);
const required = id === 'playground';

function fixture(t, built = true) {
  const temp = mkdtempSync(join(realpathSync(tmpdir()), 'svitlo-' + id + '-publish-'));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const target = join(temp, 'textbook');
  const output = join(temp, 'host/public');
  mkdirSync(join(target, 'dist'), { recursive: true });
  copyFileSync(join(root, 'package.json'), join(target, 'package.json'));
  copyFileSync(join(root, 'dist/publish.mjs'), join(target, 'dist/publish.mjs'));
  if (built) {
    cpSync(join(root, 'dist/static'), join(target, 'dist/static'), { recursive: true });
    copyFileSync(manifestSource, join(target, 'dist/manifest.json'));
  }
  const run = (...args) =>
    spawnSync(process.execPath, [join(target, 'dist/publish.mjs'), ...args], { cwd: temp, encoding: 'utf8' });
  return { temp, target, output, run };
}

test('isolated package publishes exactly the manifest resources', t => {
  const { output, run } = fixture(t);
  const result = run('publish', '--output', output);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(
    JSON.parse(readFileSync(join(output, '.svitlo/publish-' + id + '.json'), 'utf8')).files,
    manifest.files,
  );
  const skillFiles = manifest.files.filter(name => name.startsWith('data/skills/'));
  if (skillFiles.length) {
    assert.equal(skillFiles.length, 30, 'Skills must publish one base and 29 locale files');
    assert(skillFiles.includes('data/skills/base.json'));
    assert(skillFiles.includes('data/skills/uk.json'));
    assert(skillFiles.includes('data/skills/en.json'));
    assert(skillFiles.includes('data/skills/qm.json'));
    assert(
      skillFiles.every(
        name => name.startsWith('data/skills/') && name.split('/').length === 3 && /^(?:base|[a-z]{2,8})[.]json$/.test(name.split('/')[2]),
      ),
      'Skills must not publish per-entity directories',
    );
    const base = JSON.parse(readFileSync(join(root, 'dist/static/data/skills/base.json'), 'utf8'));
    const uk = JSON.parse(readFileSync(join(root, 'dist/static/data/skills/uk.json'), 'utf8'));
    assert(Object.keys(base).length > 0, 'Empty published Skill taxonomy');
    assert.deepEqual(Object.keys(uk), Object.keys(base), 'Localized Skill tree must match base domain slugs');
  }
  for (const name of manifest.files) {
    assert.deepEqual(readFileSync(join(output, name)), readFileSync(join(root, 'dist/static', name)));
  }
});

test('repeat publication cleans only owned stale files and preserves foreign assets', t => {
  const { target, output, run } = fixture(t);
  mkdirSync(join(output, 'flags'), { recursive: true });
  writeFileSync(join(output, 'flags/uk.svg'), 'host flag');
  mkdirSync(join(output, 'textbooks/other'), { recursive: true });
  writeFileSync(join(output, 'textbooks/other/keep.txt'), 'other book');
  const extra = 'textbooks/' + id + '/media/one.svg';
  mkdirSync(join(target, 'dist/static/textbooks', id, 'media'), { recursive: true });
  writeFileSync(join(target, 'dist/static', extra), '<svg/>');
  const manifestPath = join(target, 'dist/manifest.json');
  const changed = JSON.parse(readFileSync(manifestPath, 'utf8'));
  changed.files.push(extra);
  writeFileSync(manifestPath, JSON.stringify(changed));
  assert.equal(run('publish', '--output', output).status, 0);
  assert.equal(run('publish', '--output', output).status, 0);
  assert(existsSync(join(output, extra)));
  changed.files = changed.files.filter(name => name !== extra);
  writeFileSync(manifestPath, JSON.stringify(changed));
  const result = run('publish', '--output', output);
  assert.equal(result.status, 0, result.stderr);
  assert(!existsSync(join(output, extra)));
  assert.equal(readFileSync(join(output, 'flags/uk.svg'), 'utf8'), 'host flag');
  assert.equal(readFileSync(join(output, 'textbooks/other/keep.txt'), 'utf8'), 'other book');
});

test('blocks malformed manifests, missing resources, traversal and symlinks', t => {
  const missing = fixture(t, false);
  assert.match(missing.run('publish', '--output', missing.output).stderr, /not built/);
  const f = fixture(t);
  assert.match(f.run('publish').stderr, /usage:/);
  assert.match(f.run('publish', '--output', '.').stderr, /unsafe output directory/);
  const manifestPath = join(f.target, 'dist/manifest.json');
  const doc = JSON.parse(readFileSync(manifestPath, 'utf8'));
  doc.files.push('../host/secrets.txt');
  writeFileSync(manifestPath, JSON.stringify(doc));
  assert.match(f.run('publish', '--output', f.output).stderr, /ownership manifest/);
  doc.files.pop();
  writeFileSync(manifestPath, JSON.stringify(doc));
  if (doc.files.length) {
    rmSync(join(f.target, 'dist/static', doc.files[0]));
    assert.match(f.run('publish', '--output', f.output).stderr, /missing built resource/);
  }
  mkdirSync(join(f.temp, 'actual'), { recursive: true });
  symlinkSync(join(f.temp, 'actual'), join(f.temp, 'linked'), 'dir');
  assert.match(f.run('publish', '--output', join(f.temp, 'linked')).stderr, /symlink/);
});

test('metadata-only packages may safely publish empty ownership', { skip: required }, t => {
  const f = fixture(t);
  writeFileSync(join(f.target, 'dist/manifest.json'), JSON.stringify({ version: 1, textbook: id, files: [] }));
  mkdirSync(join(f.output, 'images'), { recursive: true });
  writeFileSync(join(f.output, 'images/host.svg'), 'untouched');
  assert.equal(f.run('publish', '--output', f.output).status, 0);
  assert.equal(f.run('publish', '--output', f.output).status, 0);
  assert.equal(readFileSync(join(f.output, 'images/host.svg'), 'utf8'), 'untouched');
  assert.deepEqual(JSON.parse(readFileSync(join(f.output, '.svitlo/publish-' + id + '.json'), 'utf8')).files, []);
});
