import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, cpSync, rmSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { mkdtempSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assembleLessonResponse } = require('@svitlo/engine/lesson');
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const bucket = 'c/' + lessonId;
function fixture(t, built = true) {
  const temp = mkdtempSync(join(realpathSync(tmpdir()), 'svitlo-publish-test-'));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const pkg = join(temp, 'textbook');
  const out = join(temp, 'application/public');
  mkdirSync(join(pkg, 'scripts'), { recursive: true });
  copyFileSync(join(root, 'scripts/publish.mjs'), join(pkg, 'scripts/publish.mjs'));
  if (built) {
    mkdirSync(join(pkg, 'dist'), { recursive: true });
    cpSync(join(root, 'dist/static'), join(pkg, 'dist/static'), { recursive: true });
    copyFileSync(join(root, 'dist/manifest.json'), join(pkg, 'dist/manifest.json'));
  }
  const run = (...args) =>
    spawnSync(process.execPath, [join(pkg, 'scripts/publish.mjs'), ...args], {
      cwd: temp,
      encoding: 'utf8',
    });
  return { temp, pkg, out, run };
}

test('publish real localized JSON and assemble a valid Playground lesson response', t => {
  const { out, run } = fixture(t);
  const attempt = run('publish', '--output', out);
  assert.equal(attempt.status, 0, attempt.stderr);
  const folder = join(out, 'data/pages/lessons', bucket);
  const collections = Object.fromEntries(
    ['config', 'questions', 'flashcards'].map(name => [
      name,
      JSON.parse(readFileSync(join(folder, name, 'uk.json'), 'utf8')),
    ]),
  );
  const lesson = assembleLessonResponse(lessonId, 'uk', collections);
  assert.equal(lesson.id, lessonId);
  assert.ok(lesson.sections.length > 0);
  assert.ok(lesson.sections.every(section => Array.isArray(section.content)));
  assert.ok(existsSync(join(out, 'data/pages/skillAnalytics/uk.json')));
});

test('publishing is repeatable, cleans only stale owned files and preserves unrelated assets', t => {
  const { pkg, out, run } = fixture(t);
  mkdirSync(join(out, 'images'), { recursive: true });
  writeFileSync(join(out, 'images/host.svg'), 'host asset');
  const first = run('publish', '--output', out);
  assert.equal(first.status, 0, first.stderr);
  const again = run('publish', '--output', out);
  assert.equal(again.status, 0, again.stderr);
  const manifest = join(pkg, 'dist/manifest.json');
  const doc = JSON.parse(readFileSync(manifest, 'utf8'));
  const stale = doc.files.find(name => name.startsWith('data/pages/skillAnalytics/'));
  assert.ok(stale);
  doc.files = doc.files.filter(name => name !== stale);
  writeFileSync(manifest, JSON.stringify(doc));
  const changed = run('publish', '--output', out);
  assert.equal(changed.status, 0, changed.stderr);
  assert.ok(!existsSync(join(out, stale)));
  assert.equal(readFileSync(join(out, 'images/host.svg'), 'utf8'), 'host asset');
});

test('reject missing builds, missing artifact and invalid CLI arguments', t => {
  const missing = fixture(t, false);
  assert.match(missing.run('publish', '--output', missing.out).stderr, /not built/);
  const valid = fixture(t);
  assert.match(valid.run('unknown', '--output', valid.out).stderr, /usage:/);
  assert.match(valid.run('publish').stderr, /usage:/);
  assert.match(valid.run('publish', '--output', '.').stderr, /unsafe output directory/);
  const manifest = join(valid.pkg, 'dist/manifest.json');
  const doc = JSON.parse(readFileSync(manifest, 'utf8'));
  const name = doc.files[0];
  rmSync(join(valid.pkg, 'dist/static', name));
  assert.match(valid.run('publish', '--output', valid.out).stderr, /missing built resource/);
});

test('reject an unsafe manifest and output symlink', t => {
  const { pkg, out, run, temp } = fixture(t);
  const manifest = join(pkg, 'dist/manifest.json');
  const doc = JSON.parse(readFileSync(manifest, 'utf8'));
  doc.files.push('../host/secrets.txt');
  writeFileSync(manifest, JSON.stringify(doc));
  assert.match(run('publish', '--output', out).stderr, /ownership manifest/);
  doc.files.pop();
  writeFileSync(manifest, JSON.stringify(doc));
  mkdirSync(join(temp, 'actual'), { recursive: true });
  const symlink = join(temp, 'linked');
  const { symlinkSync } = require('node:fs');
  symlinkSync(join(temp, 'actual'), symlink, 'dir');
  assert.match(run('publish', '--output', symlink).stderr, /symlink/);
});

test('publisher copies textbook-owned media without changing application assets', t => {
  const { pkg, out, run } = fixture(t);
  const relativeAsset = 'textbooks/playground/media/sample.svg';
  const sourceAsset = join(pkg, 'dist/static', relativeAsset);
  mkdirSync(join(pkg, 'dist/static/textbooks/playground/media'), { recursive: true });
  writeFileSync(sourceAsset, '<svg xmlns="http://www.w3.org/2000/svg"></svg>');
  const manifest = join(pkg, 'dist/manifest.json');
  const doc = JSON.parse(readFileSync(manifest, 'utf8'));
  doc.files.push(relativeAsset);
  writeFileSync(manifest, JSON.stringify(doc));
  mkdirSync(join(out, 'flags'), { recursive: true });
  writeFileSync(join(out, 'flags/uk.svg'), 'UI Kit flag');
  const result = run('publish', '--output', out);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(join(out, relativeAsset), 'utf8'), '<svg xmlns="http://www.w3.org/2000/svg"></svg>');
  assert.equal(readFileSync(join(out, 'flags/uk.svg'), 'utf8'), 'UI Kit flag');
});
