import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { parseArguments } from './generate-translation-review-artifacts.mjs';

test('requires an explicit reference family and never defaults to whole-repository generation', () => {
  assert.throws(() => parseArguments([]), /explicit supported --kind/);
  assert.throws(() => parseArguments(['--kind', 'all']), /explicit supported --kind/);
  assert.throws(() => parseArguments(['--kind', 'skills']), /require --package/);
  assert.throws(() => parseArguments(['--kind', 'lessons']), /require --package/);
});

test('scopes Skills and Lessons to the named textbook and optional locale', () => {
  assert.deepEqual(parseArguments(['--kind', 'skills', '--package', 'content/astronomy', '--locale', 'it']),
    { kind: 'skills', package: 'content/astronomy', locale: 'it' });
  assert.deepEqual(parseArguments(['--kind', 'skills', '--package', 'content/astronomy']),
    { kind: 'skills', package: 'content/astronomy' });
  assert.deepEqual(parseArguments(['--kind', 'lessons', '--package', 'content/math', '--locale', 'uk']),
    { kind: 'lessons', package: 'content/math', locale: 'uk' });
  assert.deepEqual(parseArguments(['--kind', 'lessons', '--package', 'content/math']),
    { kind: 'lessons', package: 'content/math' });
});

test('rejects unsafe paths, invalid combinations and duplicate options before writing anything', () => {
  for (const args of [
    ['--kind', 'skills', '--package', '../outside'],
    ['--kind', 'skills', '--package', 'content/../art'],
    ['--kind', 'skills', '--package', 'content/art', '--component', 'audio'],
    ['--kind', 'lessons', '--package', 'content/art', '--lesson', 'fake'],
    ['--kind', 'ui-kit', '--package', 'content/art'],
    ['--kind', 'geography-home-copy', '--package', 'content/geography'],
    ['--kind', 'assessment-methods', '--locale', 'it', '--locale', 'en'],
    ['--kind', 'ui-kit', '--component', '../audio'],
    ['--kind', 'skills', '--package', 'content/art', '--locale', 'it-IT'],
  ]) {
    assert.throws(() => parseArguments(args), 'Accepted unsafe request: ' + args.join(' '));
  }
});

test('allows only explicitly selected standalone reference families and optional UI Kit component', () => {
  assert.deepEqual(parseArguments(['--kind', 'assessment-methods', '--locale', 'it']),
    { kind: 'assessment-methods', locale: 'it' });
  assert.deepEqual(parseArguments(['--kind', 'ui-kit', '--component', 'audio', '--locale', 'uk']),
    { kind: 'ui-kit', component: 'audio', locale: 'uk' });
  assert.deepEqual(parseArguments(['--kind', 'geography-home-copy']),
    { kind: 'geography-home-copy' });
});

test('real Skills and UI Kit requests generate only their requested Markdown files', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const workspace = path.join(root, '.agent-ci-artifacts');
  assert.equal(fs.existsSync(workspace), false, 'Tests must not overwrite existing PR artifact files');
  function request(args) {
    const response = spawnSync(process.execPath,
      ['scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs', ...args],
      { cwd: root, encoding: 'utf8', timeout: 180_000, maxBuffer: 32 * 1024 * 1024 });
    assert.equal(response.status, 0, response.error?.message || response.stderr);
    const manifest = JSON.parse(fs.readFileSync(path.join(workspace, 'manifest.json'), 'utf8'));
    return manifest;
  }
  try {
    const skills = request(['--kind', 'skills', '--package', 'content/art', '--locale', 'en']);
    assert.equal(skills.scope.kind, 'skills');
    assert.equal(skills.scope.package, 'content/art');
    assert.deepEqual(skills.locales, ['en']);
    assert.deepEqual(skills.generated.map(item => item.path), ['.agent-ci-artifacts/taxonomies/art/en.md']);
    assert.equal(skills.failures.length, 0);
    assert.equal(fs.existsSync(path.join(workspace, 'lessons')), false);

    const ui = request(['--kind', 'ui-kit', '--component', 'audio', '--locale', 'it']);
    assert.equal(ui.scope.kind, 'ui-kit');
    assert.equal(ui.scope.component, 'audio');
    assert.deepEqual(ui.generated.map(item => item.path), ['.agent-ci-artifacts/ui-kit/audio/it.md']);
    assert.equal(ui.failures.length, 0);
    assert.equal(fs.existsSync(path.join(workspace, 'taxonomies')), false);
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
});
