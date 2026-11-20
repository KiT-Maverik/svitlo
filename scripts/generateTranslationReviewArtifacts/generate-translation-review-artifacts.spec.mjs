import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { fixTaxonomyLinks, parseArguments } from './generate-translation-review-artifacts.mjs';

test('requires an explicit reference family and never defaults to whole-repository generation', () => {
  assert.throws(() => parseArguments([]), /explicit supported --kind/);
  assert.throws(() => parseArguments(['--kind', 'all']), /explicit supported --kind/);
  assert.throws(() => parseArguments(['--kind', 'skills']), /require --package/);
  assert.throws(() => parseArguments(['--kind', 'lessons']), /require --package/);
  assert.throws(() => parseArguments(['--kind', 'courses']), /require --package/);
});

test('scopes Skills and Lessons to the named textbook and optional locale', () => {
  assert.deepEqual(parseArguments(['--kind', 'skills', '--package', 'content/astronomy', '--locale', 'it']), {
    kind: 'skills',
    package: 'content/astronomy',
    locale: 'it',
  });
  assert.deepEqual(parseArguments(['--kind', 'skills', '--package', 'content/astronomy']), {
    kind: 'skills',
    package: 'content/astronomy',
  });
  assert.deepEqual(parseArguments(['--kind', 'lessons', '--package', 'content/math', '--locale', 'uk']), {
    kind: 'lessons',
    package: 'content/math',
    locale: 'uk',
  });
  assert.deepEqual(parseArguments(['--kind', 'lessons', '--package', 'content/math']), {
    kind: 'lessons',
    package: 'content/math',
  });
});

test('selects only the requested Course UUID and optional locale', () => {
  const course = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
  assert.deepEqual(
    parseArguments(['--kind', 'courses', '--package', 'content/astronomy', '--course', course, '--locale', 'uk']),
    {
      kind: 'courses',
      package: 'content/astronomy',
      course,
      locale: 'uk',
    },
  );
  assert.deepEqual(parseArguments(['--kind', 'courses', '--package', 'content/astronomy']), {
    kind: 'courses',
    package: 'content/astronomy',
  });
});

test('requires explicitly scoped Question reference generation', () => {
  const lesson = 'd3048d21-8690-5255-b62c-984c69ac272c';
  assert.deepEqual(
    parseArguments(['--kind', 'questions', '--package', 'content/playground', '--lesson', lesson, '--locale', 'kk']),
    { kind: 'questions', package: 'content/playground', lesson, locale: 'kk' },
  );
  assert.throws(() => parseArguments(['--kind', 'questions']), /require --package/);
  assert.throws(() => parseArguments(['--kind', 'questions', '--package', 'content/playground', '--lesson', '../x']));
  assert.throws(() => parseArguments(['--kind', 'questions', '--package', 'content/playground', '--course', lesson]));
});

test('rejects unsafe paths, invalid combinations and duplicate options before writing anything', () => {
  for (const args of [
    ['--kind', 'skills', '--package', '../outside'],
    ['--kind', 'skills', '--package', 'content/../art'],
    ['--kind', 'skills', '--package', 'content/art', '--component', 'audio'],
    ['--kind', 'lessons', '--package', 'content/art', '--lesson', 'fake'],
    ['--kind', 'ui-kit', '--package', 'content/art'],
    ['--kind', 'courses', '--package', 'content/math', '--course', 'fake'],
    ['--kind', 'lessons', '--package', 'content/math', '--course', '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67'],
    ['--kind', 'geography-home-copy', '--package', 'content/geography'],
    ['--kind', 'assessment-methods', '--locale', 'it', '--locale', 'en'],
    ['--kind', 'ui-kit', '--component', '../audio'],
    ['--kind', 'skills', '--package', 'content/art', '--locale', 'it-IT'],
  ]) {
    assert.throws(() => parseArguments(args), 'Accepted unsafe request: ' + args.join(' '));
  }
});

test('allows only explicitly selected standalone reference families and optional UI Kit component', () => {
  assert.deepEqual(parseArguments(['--kind', 'assessment-methods', '--locale', 'it']), {
    kind: 'assessment-methods',
    locale: 'it',
  });
  assert.deepEqual(parseArguments(['--kind', 'ui-kit', '--component', 'audio', '--locale', 'uk']), {
    kind: 'ui-kit',
    component: 'audio',
    locale: 'uk',
  });
  assert.deepEqual(parseArguments(['--kind', 'geography-home-copy']), { kind: 'geography-home-copy' });
});

test('Skills and UI Kit requests replace only an ignored, run-scoped corpus', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const workspace = path.join(root, 'temp/agent-reference-library');
  assert.equal(fs.existsSync(workspace), false, 'Test must not overwrite another report');
  const script = 'scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs';
  function generate(args) {
    const result = spawnSync(process.execPath, [script, ...args], {
      cwd: root, encoding: 'utf8', timeout: 180_000, maxBuffer: 32 * 1024 * 1024,
    });
    assert.equal(result.status, 0, result.stderr || result.error?.message);
    return JSON.parse(fs.readFileSync(path.join(workspace, 'manifest.json'), 'utf8'));
  }
  try {
    const skills = generate(['--kind', 'skills', '--package', 'content/art', '--locale', 'en']);
    assert.equal(skills.scope.kind, 'skills');
    assert.deepEqual(skills.generated.map(entry => entry.path), ['taxonomies/art/en.md']);
    assert.equal(skills.failures.length, 0);
    const markdown = fs.readFileSync(path.join(workspace, 'taxonomies/art/en.md'), 'utf8');
    assert.match(markdown, /https:\/\/github\.com\/KiT-Maverik\/svitlo\/blob\/[0-9a-f]{40}\/content\/art\/data\/skills\//);
    assert.ok(skills.generated[0].bytes > 0);
    assert.match(skills.generated[0].sha256, /^[a-f0-9]{64}$/);
    assert.equal(skills.sourceCommit, spawnSync('git', ['rev-parse', 'HEAD'], {cwd:root,encoding:'utf8'}).stdout.trim());
    const ui = generate(['--kind', 'ui-kit', '--component', 'audio', '--locale', 'uk']);
    assert.deepEqual(ui.generated.map(entry => entry.path), ['ui-kit/audio/uk.md']);
    assert.equal(ui.failures.length, 0);
    assert.equal(fs.existsSync(path.join(workspace, 'taxonomies')), false);
    assert.equal(ui.generated[0].bytes, Buffer.byteLength(fs.readFileSync(path.join(workspace, ui.generated[0].path))));
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
});

test('Skills URL rewriting rejects paths outside the owned taxonomy', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const destination = path.join(root, 'temp/agent-reference-library/taxonomies/economics/kk.md');
  const source = path.join(root, 'content/economics/data/skills/appliedEconomics/index.ts');
  const original = path.join(root, 'content/economics/docs/generated/skills');
  const href = encodeURI(path.relative(original, source).split(path.sep).join('/'));
  const rewritten = fixTaxonomyLinks('[index.ts](' + href + ')', 'economics', destination);
  assert.match(rewritten, /^\[index\.ts\]\(\.\.\/.*\)$/);
  assert.throws(() => fixTaxonomyLinks('[index.ts](../../../data/lessons/index.ts)', 'economics', destination),
    /Unsafe canonical taxonomy link/);
});

test('refuses a report output path outside ignored temp/ and does not modify the root', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const result = spawnSync(process.execPath,
    ['scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs', '--kind', 'skills', '--package', 'content/art', '--locale', 'en'],
    { cwd: root, encoding: 'utf8', env: { ...process.env, SVITLO_AGENT_REPORT_OUTPUT: root } });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Review output must be in repo temp/);
});
