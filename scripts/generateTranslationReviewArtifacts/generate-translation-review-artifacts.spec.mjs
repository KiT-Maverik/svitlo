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


test('Flashcard review accepts exactly one bank and locale while refusing unrelated selectors', () => {
  const lesson = 'd3048d21-8690-5255-b62c-984c69ac272c';
  assert.deepEqual(
    parseArguments(['--kind', 'flashcards', '--package', 'content/playground', '--lesson', lesson, '--locale', 'uk']),
    { kind: 'flashcards', package: 'content/playground', lesson, locale: 'uk' },
  );
  assert.throws(() => parseArguments(['--kind', 'flashcards']), /require --package/);
  assert.throws(
    () => parseArguments(['--kind', 'flashcards', '--package', 'content/playground']),
    /requires exactly one --lesson UUID and --locale/,
  );
  assert.throws(
    () => parseArguments(['--kind', 'flashcards', '--package', 'content/playground', '--locale', 'uk']),
    /requires exactly one --lesson UUID and --locale/,
  );
  assert.throws(
    () => parseArguments(['--kind', 'flashcards', '--package', 'content/playground', '--lesson', lesson]),
    /requires exactly one --lesson UUID and --locale/,
  );
  assert.throws(() => parseArguments(['--kind', 'flashcards', '--package', 'content/playground', '--lesson', '../x']));
  assert.throws(() => parseArguments(['--kind', 'flashcards', '--package', 'content/playground', '--course', lesson]));
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

test('real Skills and UI Kit requests generate only their requested Markdown files', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const workspace = path.join(root, '.agent-ci-artifacts');
  assert.equal(fs.existsSync(workspace), false, 'Tests must not overwrite existing PR artifact files');
  function request(args) {
    const response = spawnSync(
      process.execPath,
      ['scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs', ...args],
      { cwd: root, encoding: 'utf8', timeout: 180_000, maxBuffer: 32 * 1024 * 1024 },
    );
    assert.equal(response.status, 0, response.error?.message || response.stderr);
    const manifest = JSON.parse(fs.readFileSync(path.join(workspace, 'manifest.json'), 'utf8'));
    return manifest;
  }
  try {
    // Independent diagnostics must survive both reference-family refreshes.
    const lookupFile = path.join(workspace, 'lesson-lookup', 'sample.md');
    const coverageFile = path.join(workspace, 'engine-coverage', 'engine-gaps.json');
    fs.mkdirSync(path.dirname(lookupFile), { recursive: true });
    fs.mkdirSync(path.dirname(coverageFile), { recursive: true });
    fs.writeFileSync(lookupFile, 'Lesson lookup fixture\n');
    fs.writeFileSync(coverageFile, '{"scope":"engine"}\n');
    const skills = request(['--kind', 'skills', '--package', 'content/art', '--locale', 'en']);
    assert.equal(skills.scope.kind, 'skills');
    assert.equal(skills.scope.package, 'content/art');
    assert.deepEqual(skills.locales, ['en']);
    assert.deepEqual(
      skills.generated.map(item => item.path),
      ['.agent-ci-artifacts/taxonomies/art/en.md'],
    );
    assert.equal(skills.failures.length, 0);
    const taxonomyDocument = path.join(workspace, 'taxonomies/art/en.md');
    const taxonomyMarkdown = fs.readFileSync(taxonomyDocument, 'utf8');
    const links = [...taxonomyMarkdown.matchAll(/^\[([^\]\n]+\.ts)\]\(([^)\n]+)\)$/gm)];
    const entityCount = skills.generated[0].domains + skills.generated[0].groups + skills.generated[0].skills;
    assert.equal(links.length, entityCount, 'Every Domain, Group and Skill must have a canonical source link');
    const taxonomyRoot = path.join(root, 'content/art/data/skills') + path.sep;
    for (const [, label, target] of links) {
      const resolved = path.resolve(path.dirname(taxonomyDocument), decodeURI(target));
      assert.ok(resolved.startsWith(taxonomyRoot), 'Link escaped the Art Skills source tree: ' + target);
      assert.equal(path.basename(resolved), label);
      assert.ok(fs.existsSync(resolved), 'Generated link does not resolve: ' + target);
    }
    assert.equal(fs.existsSync(path.join(workspace, 'lessons')), false);

    assert.equal(fs.existsSync(path.join(workspace, 'questions')), false);

    const ui = request(['--kind', 'ui-kit', '--component', 'audio', '--locale', 'uk']);
    assert.equal(ui.scope.kind, 'ui-kit');
    assert.equal(ui.scope.component, 'audio');
    assert.deepEqual(
      ui.generated.map(item => item.path),
      ['.agent-ci-artifacts/ui-kit/audio/uk.md'],
    );
    assert.equal(ui.failures.length, 0);
    assert.equal(fs.existsSync(path.join(workspace, 'taxonomies')), false);
    assert.equal(fs.readFileSync(lookupFile, 'utf8'), 'Lesson lookup fixture\n');
    assert.equal(fs.readFileSync(coverageFile, 'utf8'), '{"scope":"engine"}\n');
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
});

test('Skills link rewriting handles modular .ts and legacy .data.ts without escaping the owned textbook', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const output = path.join(root, '.agent-ci-artifacts/taxonomies/economics/kk.md');
  const original = path.join(root, 'content/economics/docs/generated/skills');
  for (const source of [
    'appliedEconomics/index.ts',
    'appliedEconomics/agriculturalEconomics/index.ts',
    'appliedEconomics/agriculturalEconomics/agriculturalMarkets.ts',
    'example/legacy.data.ts',
  ]) {
    const canonical = path.join(root, 'content/economics/data/skills', source);
    const input =
      '[' +
      path.basename(source) +
      '](' +
      encodeURI(path.relative(original, canonical).split(path.sep).join('/')) +
      ')';
    const rendered = fixTaxonomyLinks(input, 'economics', output);
    const link = rendered.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    assert.ok(link, rendered);
    assert.equal(link[1], path.basename(source));
    assert.equal(path.resolve(path.dirname(output), decodeURI(link[2])), canonical);
  }
  assert.throws(
    () => fixTaxonomyLinks('[index.ts](../../../data/lessons/index.ts)', 'economics', output),
    /Unsafe canonical taxonomy link/,
  );
  assert.throws(
    () => fixTaxonomyLinks('[incorrect.ts](../../../data/skills/appliedEconomics/index.ts)', 'economics', output),
    /Unsafe canonical taxonomy link/,
  );
});

test('trusted publisher accepts pre-Course Skills manifests but rejects scope mismatches', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/agent-ci-artifacts.yml'), 'utf8');
  const marker = '      - name: Validate downloaded files and commit only agent artifacts';
  const offset = workflow.indexOf(marker);
  assert.ok(offset > 0, 'Publisher validation step must be present');
  const match = workflow.slice(offset).match(/node --input-type=module <<'NODE'\n([\s\S]*?)\n\s+NODE/);
  assert.ok(match, 'Publisher must contain its inline trusted manifest validation');
  // Run the actual publisher's inline validator without privileged GitHub credentials.
  const validator = match[1]
    .split('\n')
    .map(line => line.replace(/^ {10}/, ''))
    .join('\n');
  function validate(scope, overrides = {}) {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-artifact-publisher-'));
    const document = path.join(temp, '.agent-ci-artifacts/taxonomies/economics/kk.md');
    fs.mkdirSync(path.dirname(document), { recursive: true });
    fs.writeFileSync(document, '# Economics reference\n');
    fs.writeFileSync(
      path.join(temp, '.agent-ci-artifacts/manifest.json'),
      JSON.stringify({
        kind: 'pr-scoped-agent-ci-artifacts',
        schemaVersion: 3,
        scope,
        generated: [
          {
            kind: 'taxonomy',
            textbook: 'content/economics',
            locale: 'kk',
            path: '.agent-ci-artifacts/taxonomies/economics/kk.md',
            missing: 0,
            reviewReady: true,
          },
        ],
        failures: [],
      }),
    );
    try {
      return spawnSync(process.execPath, ['--input-type=module', '--eval', validator], {
        cwd: temp,
        encoding: 'utf8',
        env: {
          ...process.env,
          REQUEST_KIND: 'skills',
          REQUEST_BOOK: 'content/economics',
          REQUEST_LOCALE: 'kk',
          REQUEST_COMPONENT: '',
          REQUEST_LESSON: '',
          REQUEST_COURSE: '',
          ...overrides,
        },
      });
    } finally {
      fs.rmSync(temp, { recursive: true, force: true });
    }
  }
  const legacy = {
    kind: 'skills',
    package: 'content/economics',
    locale: 'kk',
    component: null,
    lesson: null,
  };
  const older = validate(legacy);
  assert.equal(older.status, 0, older.stderr);
  const current = validate({ ...legacy, course: null });
  assert.equal(current.status, 0, current.stderr);
  const unrelatedCourse = validate({ ...legacy, course: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee' });
  assert.notEqual(unrelatedCourse.status, 0);
  assert.match(unrelatedCourse.stderr, /Manifest scope disagrees with authorized request: course/);
  const requestedCourse = validate({ ...legacy, kind: 'courses' }, { REQUEST_KIND: 'courses' });
  assert.notEqual(requestedCourse.status, 0);
  assert.match(requestedCourse.stderr, /Manifest scope disagrees with authorized request: course/);
  const wrongPackage = validate({ ...legacy, package: 'content/art' });
  assert.notEqual(wrongPackage.status, 0);
  assert.match(wrongPackage.stderr, /Manifest scope disagrees with authorized request: package/);
});


test('trusted Agent CI publisher accepts only a correctly scoped Flashcard bank reference document', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/agent-ci-artifacts.yml'), 'utf8');
  const marker = '      - name: Validate downloaded files and commit only agent artifacts';
  const offset = workflow.indexOf(marker);
  assert.ok(offset >= 0, 'trusted publisher validation must remain present');
  const match = workflow.slice(offset).match(/node --input-type=module <<'NODE'\n([\s\S]*?)\n\s+NODE/);
  assert.ok(match);
  const validator = match[1].split('\n').map(line => line.replace(/^ {10}/, '')).join('\n');
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-flashcard-manifest-'));
  const lesson = 'bb75647f-203d-481a-a1c7-4d331c779d34';
  const relative = 'flashcards/playground/' + lesson.at(-1) + '/' + lesson + '/uk.md';
  const dest = path.join(temp, '.agent-ci-artifacts', relative);
  try {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, '# Flashcard Bank\n');
    const manifest = {
      kind: 'pr-scoped-agent-ci-artifacts',
      schemaVersion: 3,
      scope: {
        kind: 'flashcards', package: 'content/playground', locale: 'uk',
        component: null, lesson, course: null,
      },
      generated: [{
        kind: 'flashcard', textbook: 'content/playground',
        lesson: lesson.at(-1) + '/' + lesson, locale: 'uk',
        path: '.agent-ci-artifacts/' + relative, missing: 0, reviewReady: true,
      }],
      failures: [],
    };
    const manifestPath = path.join(temp, '.agent-ci-artifacts/manifest.json');
    function verify() {
      fs.writeFileSync(manifestPath, JSON.stringify(manifest));
      return spawnSync(process.execPath, ['--input-type=module', '--eval', validator], {
        cwd: temp, encoding: 'utf8', env: {
          ...process.env,
          REQUEST_KIND: 'flashcards', REQUEST_BOOK: 'content/playground', REQUEST_LOCALE: 'uk',
          REQUEST_COMPONENT: '', REQUEST_LESSON: lesson, REQUEST_COURSE: '',
        },
      });
    }
    const correct = verify();
    assert.equal(correct.status, 0, correct.stderr);
    manifest.generated[0].lesson = 'e/' + lesson;
    const wrong = verify();
    assert.notEqual(wrong.status, 0);
    assert.match(wrong.stderr, /Invalid generated artifact entry|outside requested Lesson UUID/);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});

test('trusted Question publisher rejects stale source SHA and failed references', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/agent-ci-artifacts.yml'), 'utf8');
  const marker = '      - name: Validate downloaded files and commit only agent artifacts';
  const offset = workflow.indexOf(marker);
  assert.ok(offset > 0);
  const match = workflow.slice(offset).match(/node --input-type=module <<'NODE'\n([\s\S]*?)\n\s+NODE/);
  assert.ok(match, 'Trusted publisher validator exists');
  const validator = match[1].split('\n').map(line => line.replace(/^ {10}/, '')).join('\n');
  const sha = '0123456789abcdef0123456789abcdef01234567';
  const lesson = 'd3048d21-8690-5255-b62c-984c69ac272c';
  const relative = '.agent-ci-artifacts/questions/playground/c/' + lesson + '/kk.md';
  function run({ sourceCommit = sha, failures = [], pinned = sha } = {}) {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-question-publisher-'));
    try {
      fs.mkdirSync(path.dirname(path.join(temp, relative)), { recursive: true });
      fs.writeFileSync(path.join(temp, relative), '# Question review\n');
      fs.writeFileSync(path.join(temp, '.agent-ci-artifacts/manifest.json'), JSON.stringify({
        kind: 'pr-scoped-agent-ci-artifacts', schemaVersion: 3, sourceCommit,
        scope: { kind: 'questions', package: 'content/playground', locale: 'kk',
          component: null, lesson, course: null },
        generated: [{ kind: 'question', textbook: 'content/playground', lesson: 'c/' + lesson,
          locale: 'kk', path: relative, questions: 6, missing: 0, reviewReady: true }],
        failures,
      }));
      return spawnSync(process.execPath, ['--input-type=module', '--eval', validator], {
        cwd: temp, encoding: 'utf8',
        env: { ...process.env, REQUEST_KIND: 'questions', REQUEST_BOOK: 'content/playground',
          REQUEST_LOCALE: 'kk', REQUEST_COMPONENT: '', REQUEST_LESSON: lesson,
          REQUEST_COURSE: '', SOURCE_HEAD_SHA: pinned },
      });
    } finally {
      fs.rmSync(temp, { recursive: true, force: true });
    }
  }
  const valid = run();
  assert.equal(valid.status, 0, valid.stderr);
  const stale = run({ sourceCommit: 'abcdef0123456789abcdef0123456789abcdef01' });
  assert.notEqual(stale.status, 0);
  assert.match(stale.stderr, /source SHA/);
  const failed = run({ failures: [{ kind: 'question', error: 'Missing Text module' }] });
  assert.notEqual(failed.status, 0);
  assert.match(failed.stderr, /source SHA/);
});
