import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { fixTaxonomyLinks, parseArguments } from './generate-translation-review-artifacts.mjs';

// The generator CI currently selects this file explicitly. Run adjacent suites
// explicitly until discovery is updated in the separate CI workstream; importing
// spec files for their side effects would silently duplicate tests under discovery.
test('selected command and Lesson reference suites remain covered', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const selected = [
    'scripts/generateTranslationReviewArtifacts/agent-reference-command.spec.mjs',
    'shared/engine/scripts/generateLessonReviewArtifacts/generate-lesson-review-artifacts.spec.mjs',
    'shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.spec.mjs',
  ];
  const result = spawnSync(process.execPath, ['--test', ...selected], {
    cwd: root,
    encoding: 'utf8',
    timeout: 180_000,
    maxBuffer: 32 * 1024 * 1024,
  });
  assert.equal(result.status, 0, result.stderr || result.stdout || result.error?.message);
});

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

test('Flashcard references require one Lesson UUID and one explicit target locale', () => {
  const lesson = 'd3048d21-8690-5255-b62c-984c69ac272c';
  assert.deepEqual(
    parseArguments(['--kind', 'flashcards', '--package', 'content/playground', '--lesson', lesson, '--locale', 'uk']),
    { kind: 'flashcards', package: 'content/playground', lesson, locale: 'uk' },
  );
  for (const args of [
    ['--kind', 'flashcards', '--package', 'content/playground', '--lesson', lesson],
    ['--kind', 'flashcards', '--package', 'content/playground', '--locale', 'uk'],
    ['--kind', 'flashcards', '--package', 'content/playground'],
    ['--kind', 'flashcards', '--package', 'content/playground', '--lesson', '../fake', '--locale', 'uk'],
    [
      '--kind',
      'flashcards',
      '--package',
      'content/playground',
      '--lesson',
      lesson,
      '--locale',
      'uk',
      '--course',
      lesson,
    ],
  ]) {
    assert.throws(() => parseArguments(args), 'Unsafe Flashcard scope: ' + args.join(' '));
  }
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
  const temp = path.join(root, 'temp');
  fs.mkdirSync(temp, { recursive: true });
  const workspace = fs.mkdtempSync(path.join(temp, 'agent-reference-test-'));
  const script = 'scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs';
  function generate(args) {
    const result = spawnSync(process.execPath, [script, ...args], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, SVITLO_AGENT_REPORT_OUTPUT: workspace },
      timeout: 180_000,
      maxBuffer: 32 * 1024 * 1024,
    });
    assert.equal(result.status, 0, result.stderr || result.error?.message);
    return JSON.parse(fs.readFileSync(path.join(workspace, 'manifest.json'), 'utf8'));
  }
  try {
    const skills = generate(['--kind', 'skills', '--package', 'content/art', '--locale', 'en']);
    assert.equal(skills.scope.kind, 'skills');
    assert.deepEqual(
      skills.generated.map(entry => entry.path),
      ['taxonomies/art/en.md'],
    );
    assert.equal(skills.failures.length, 0);
    const markdown = fs.readFileSync(path.join(workspace, 'taxonomies/art/en.md'), 'utf8');
    assert.match(
      markdown,
      /https:\/\/github\.com\/KiT-Maverik\/svitlo\/blob\/[0-9a-f]{40}\/content\/art\/data\/skills\//,
    );
    assert.ok(skills.generated[0].bytes > 0);
    assert.match(skills.generated[0].sha256, /^[a-f0-9]{64}$/);
    assert.equal(
      skills.sourceCommit,
      spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout.trim(),
    );
    const ui = generate(['--kind', 'ui-kit', '--component', 'audio', '--locale', 'uk']);
    assert.deepEqual(
      ui.generated.map(entry => entry.path),
      ['ui-kit/audio/uk.md'],
    );
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
  assert.throws(
    () => fixTaxonomyLinks('[index.ts](../../../data/lessons/index.ts)', 'economics', destination),
    /Unsafe canonical taxonomy link/,
  );
});

test('refuses a report output path outside ignored temp/ and does not modify the root', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const result = spawnSync(
    process.execPath,
    [
      'scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs',
      '--kind',
      'skills',
      '--package',
      'content/art',
      '--locale',
      'en',
    ],
    { cwd: root, encoding: 'utf8', env: { ...process.env, SVITLO_AGENT_REPORT_OUTPUT: root } },
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Review output must be in repo temp/);
});

test('trusted Actions report validator rejects stale SHA, wrong scope, wrong run, modified and unlisted documents', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/agent-ci-artifacts.yml'), 'utf8');
  const step = workflow.split('      - name: Validate pinned manifest, scope, checksums and archive inventory\n')[1];
  assert.ok(step, 'Report validation step must be present');
  const match = step.match(/node --input-type=module <<'NODE'\n([\s\S]*?)\n\s+NODE/);
  assert.ok(match, 'Trusted inline validator must be present');
  const validator = match[1]
    .split('\n')
    .map(line => line.replace(/^ {10}/, ''))
    .join('\n');
  assert.doesNotMatch(workflow, /^  (?:publish|cleanup):/m, 'No privileged report jobs');
  assert.doesNotMatch(workflow, /\/agent-artifacts cleanup/, 'No report cleanup command');
  const output = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-report-validation-'));
  const relative = 'questions/playground/c/lesson/en.md';
  const sha = '0123456789abcdef0123456789abcdef01234567';
  const content = '# Question and Quiz source\n';
  const bytes = Buffer.byteLength(content);
  const base = {
    schemaVersion: 3,
    kind: 'pr-scoped-agent-ci-artifacts',
    sourceCommit: sha,
    pr: 766,
    runId: 12345,
    status: 'complete',
    filesBytes: bytes,
    scope: {
      kind: 'questions',
      package: 'content/playground',
      locale: 'en',
      component: null,
      lesson: null,
      course: null,
    },
    generated: [
      {
        kind: 'question',
        path: relative,
        locale: 'en',
        bytes,
        sha256: crypto.createHash('sha256').update(content).digest('hex'),
        reviewReady: true,
      },
    ],
    failures: [],
  };
  const env = {
    ...process.env,
    SVITLO_AGENT_REPORT_OUTPUT: output,
    SVITLO_AGENT_REPORT_PR: '766',
    GITHUB_RUN_ID: '12345',
    SOURCE_HEAD_SHA: sha,
    REQUEST_KIND: 'questions',
    REQUEST_BOOK: 'content/playground',
    REQUEST_LOCALE: 'en',
    REQUEST_COMPONENT: '',
    REQUEST_LESSON: '',
    REQUEST_COURSE: '',
  };
  function verify(mutate, extraFile = false) {
    fs.rmSync(output, { recursive: true, force: true });
    fs.mkdirSync(path.join(output, path.dirname(relative)), { recursive: true });
    fs.writeFileSync(path.join(output, relative), content);
    const manifest = structuredClone(base);
    if (mutate) mutate(manifest);
    fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest));
    if (extraFile) fs.writeFileSync(path.join(output, 'unlisted.txt'), 'unlisted');
    return spawnSync(process.execPath, ['--input-type=module', '--eval', validator], {
      cwd: root,
      encoding: 'utf8',
      env,
    });
  }
  try {
    const good = verify();
    assert.equal(good.status, 0, good.stderr);
    for (const [label, result] of [
      ['stale HEAD', verify(m => (m.sourceCommit = 'f'.repeat(40)))],
      ['wrong scope', verify(m => (m.scope.locale = 'uk'))],
      ['wrong run', verify(m => (m.runId = 54321))],
      ['modified hash', verify(m => (m.generated[0].sha256 = '0'.repeat(64)))],
      ['missing file', verify(m => (m.generated[0].path = 'questions/missing.md'))],
      ['unlisted file', verify(null, true)],
      ['traversal', verify(m => (m.generated[0].path = '../escaped.md'))],
    ]) {
      assert.notEqual(result.status, 0, label + ': validator accepted invalid archive');
    }
  } finally {
    fs.rmSync(output, { recursive: true, force: true });
  }
});

test('Episode artifacts require exact Course, Episode and locale scope', () => {
  const course = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
  const episode = '7f88144d-3c6f-49fd-8e42-b0ab0b9be7bd';
  const args = [
    '--kind',
    'episodes',
    '--package',
    'content/math',
    '--course',
    course,
    '--episode',
    episode,
    '--locale',
    'uk',
  ];
  assert.deepEqual(parseArguments(args), { kind: 'episodes', package: 'content/math', course, episode, locale: 'uk' });
  for (const flag of ['--course', '--episode', '--locale']) {
    const copy = [...args];
    copy.splice(copy.indexOf(flag), 2);
    assert.throws(() => parseArguments(copy));
  }
  assert.throws(() => parseArguments(['--kind', 'courses', '--package', 'content/math', '--episode', episode]));
});
