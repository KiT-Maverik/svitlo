import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import yaml from 'yaml';
import { buildLessonIndex, searchLessons } from '../generateLessonsBySkill/lesson-index.mjs';
import { parseComment, parseCli, renderMarkdown, sourceLink } from './query-lessons.mjs';

const S1 = '00b48cb0-13c2-4531-84ac-1b8d44f11055';
const S2 = '00b48cb0-13c2-4531-84ac-1b8d44f11056';
const A = 'd3048d21-8690-5255-b62c-984c69ac272c';
const B = 'f760e7b7-9f77-5027-89ce-4e40d9d031a1';
const SHA = 'a'.repeat(40);

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-query-lessons-'));
  const put = (name, value) => {
    const file = path.join(root, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, value, 'utf8');
    return file;
  };
  try {
    put(
      'content/math/data/skills/one.ts',
      "export const one = defineSkill({ id: '" + S1 + "', slug: 'one', name: { en: 'One' } });",
    );
    put(
      'content/math/data/skills/two.data.ts',
      "export const two = defineSkill({ id: '" + S2 + "', slug: 'two', name: { en: 'Two' } });",
    );
    put(
      'content/math/data/lessons/c/' + A + '/index.ts',
      "import { one as ref } from '../../../skills/one';\n" +
        "export const title = { en: 'Implemented' };\n" +
        "export const lesson = defineLesson({ id: '" +
        A +
        "', slug: 'implemented', " +
        "skills: [ref.id, '" +
        S2 +
        "'], locale: { title }, params: { languages: ['en', 'uk'] } });",
    );
    put('content/math/data/lessons/c/' + A + '/methodology.md', '# Methodology');
    put(
      'content/math/data/lessons/1/' + B + '/lesson.yaml',
      'config:\n  id: ' +
        B +
        '\n  slug: editorial\n  skills: [' +
        S1 +
        ']\n' +
        '  locale:\n    title:\n      en: Editorial draft\n  params:\n    languages: [en]\n',
    );
    return run({ root, put });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}
const q = comment => parseComment(comment);
const one = { by: 'skill', skills: [S1], match: 'any', package: null };

test('finds modern Skill modules, implemented Lessons and editorial YAML drafts without executing source', () =>
  fixture(({ root }) => {
    const index = buildLessonIndex(root);
    assert.equal(index.complete, true, JSON.stringify(index.diagnostics));
    assert.equal(index.candidates.length, 2);
    assert.deepEqual(
      index.candidates.map(x => x.status),
      ['implemented', 'editorial-draft'],
    );
    assert.equal(index.candidates[0].title, 'Implemented');
    assert.deepEqual(index.candidates[0].languages, ['en', 'uk']);
    assert.equal(index.candidates[0].methodology?.endsWith('methodology.md'), true);
    assert.deepEqual(index.candidates[1].skills, [S1]);
    assert.equal(index.candidates[1].draftSource?.endsWith('lesson.yaml'), true);
  }));

test('multi-Skill any/all exact coverage, deduplication and stable sorting', () =>
  fixture(({ root }) => {
    const any = searchLessons(root, { by: 'skill', skills: [S1, S2], match: 'any', package: null }, SHA);
    assert.deepEqual(
      any.matches.map(x => x.lessonId),
      [A, B],
    );
    assert.deepEqual(
      any.matches.map(x => x.coverage),
      [2, 1],
    );
    assert.deepEqual(any.matches[0].matchedSkills, [S1, S2]);
    const all = searchLessons(root, { by: 'skill', skills: [S1, S2], match: 'all', package: null });
    assert.deepEqual(
      all.matches.map(x => x.lessonId),
      [A],
    );
    assert.equal(
      searchLessons(root, { by: 'id', lessonId: B, package: 'content/math' }).matches[0].status,
      'editorial-draft',
    );
  }));

test('unknown languages remain unknown; overlapping typed and draft files emit one candidate with divergence diagnostics', () =>
  fixture(({ root, put }) => {
    put('content/math/data/lessons/c/' + A + '/lesson.yaml', 'config:\n  id: ' + A + '\n  skills: [' + S1 + ']\n');
    put(
      'content/math/data/lessons/c/' + A + '/index.ts',
      "import { one } from '../../../skills/one';\n" +
        "export const lesson = defineLesson({ id: '" +
        A +
        "', skills: [one.id, '" +
        S2 +
        "'], params: { languages: externalLanguages } });",
    );
    const result = searchLessons(root, one);
    assert.equal(result.matches.length, 2);
    assert.equal(result.matches[0].languageStatus, 'unknown');
    assert.ok(result.matches[0].draftSource);
    assert.equal(result.complete, false);
    assert.match(result.diagnostics[0].reason, /disagree/);
  }));

test('does not assert exhaustive no-match when unsupported source makes index incomplete', () =>
  fixture(({ root, put }) => {
    put(
      'content/math/data/lessons/c/' + A + '/index.ts',
      "export const lesson = defineLesson({ id: '" + A + "', skills: dynamicSkills() });",
    );
    const result = searchLessons(root, { by: 'skill', skills: [S2], match: 'all', package: null }, SHA);
    assert.equal(result.complete, false);
    assert.equal(result.matches.length, 0);
    assert.match(renderMarkdown(result), /No verified matches; index incomplete/);
    assert.match(result.diagnostics[0].file, /index.ts$/);
  }));

test('detects source UUID mismatch and cross-package duplicate Lesson UUID', () =>
  fixture(({ root, put }) => {
    put(
      'content/physics/data/skills/one.ts',
      "export const one = defineSkill({ id: '" + S1 + "', name: { en: 'One' } });",
    );
    put(
      'content/physics/data/lessons/c/' + A + '/index.ts',
      "export const lesson = defineLesson({ id: '" + A + "', skills: ['" + S1 + "'] });",
    );
    assert.throws(() => searchLessons(root, { by: 'id', lessonId: A, package: null }), /multiple packages/);
    assert.equal(searchLessons(root, { by: 'id', lessonId: A, package: 'content/math' }).matches.length, 1);
    put(
      'content/physics/data/lessons/c/' + A + '/index.ts',
      "export const lesson = defineLesson({ id: '" + B + "', skills: ['" + S1 + "'] });",
    );
    const result = buildLessonIndex(root);
    assert.equal(result.complete, false);
    assert.match(result.diagnostics[0].reason, /mismatch/);
  }));

test('validates exact one-line PR command grammar and normalizes UUIDs', () => {
  assert.deepEqual(q('/get lesson by skill ' + S1.toUpperCase()), one);
  assert.deepEqual(q('/get lesson by skill ' + S1 + ' ' + S2 + ' --match all --package content/math'), {
    by: 'skill',
    skills: [S1, S2],
    match: 'all',
    package: 'content/math',
  });
  assert.deepEqual(q('/get lesson by id ' + A + ' --package content/math'), {
    by: 'id',
    lessonId: A,
    package: 'content/math',
  });
  assert.deepEqual(parseCli(['--by', 'id', '--lesson', A, '--stdout']), {
    query: { by: 'id', lessonId: A, package: null },
    format: 'json',
    stdout: true,
    output: null,
    sourceSha: null,
  });
  for (const invalid of [
    '/get lesson by age 8',
    '/get lesson by title flowers',
    '/get lesson by id',
    '/get lesson by id ' + A + ' ' + B,
    '/get lesson by skill ' + S1 + ' ' + S1.toUpperCase(),
    '/get lesson by skill ' + Array(26).fill(S1).join(' '),
    '/get lesson by skill ' + S1 + ' --match something',
    '/get lesson by id ' + A + ' --match all',
    '/get lesson by skill ' + S1 + ' --package content/../secrets',
    '/get lesson by skill ' + S1 + ' --package /etc/passwd',
    '/get lesson by skill ' + S1 + ' --match all --match any',
    '/get lesson by skill ' + S1 + ';rm',
    '/get lesson by skill ' + S1 + '\necho hello',
    'prefix /get lesson by id ' + A,
  ])
    assert.throws(() => q(invalid), /Usage:/, invalid);
});

test('sha-pinned links and Markdown escaping do not expose raw repository text', () => {
  const report = fixture(({ root }) => searchLessons(root, one, SHA));
  report.matches[0].title = '<script>alert(1)</script>';
  const markdown = renderMarkdown(report);
  assert.doesNotMatch(markdown, /<script>/);
  assert.match(markdown, /blob\/aaaaaaaa/);
  assert.equal(sourceLink(SHA, 'content/math/../private/file.ts'), null);
});

test('rejects an imported Skill name missing from the referenced module', () =>
  fixture(({ root, put }) => {
    put(
      'content/math/data/skills/other.ts',
      "export const unrelated = defineSkill({ id: '" + S1 + "', name: { en: 'Unrelated' } });",
    );
    put(
      'content/math/data/lessons/c/' + A + '/index.ts',
      "import { one } from '../../../skills/other';\n" +
        "export const lesson = defineLesson({ id: '" +
        A +
        "', skills: [one.id] });",
    );
    const result = buildLessonIndex(root);
    assert.equal(result.complete, false);
    assert.match(
      result.diagnostics.map(x => x.reason).join('; '),
      /Imported module does not export the requested Skill/,
    );
  }));

test('discovers the checked-in Playground Lesson using modern Skill.id imports', () => {
  const repository = path.resolve(import.meta.dirname, '../../../..');
  const result = searchLessons(repository, { by: 'id', lessonId: A, package: 'content/playground' }, SHA);
  const lesson = result.matches.find(x => x.lessonId === A);
  assert.ok(lesson, JSON.stringify(result.diagnostics.slice(0, 10)));
  assert.equal(lesson.status, 'implemented');
  assert.equal(lesson.title, 'How Light Travels');
  assert.ok(lesson.skills.includes('00000000-0000-4000-8000-000000000015'));
});

test('GitHub Lesson lookup workflow delivers one-day, SHA-pinned JSON and never writes reports to a PR', () => {
  const file = path.resolve(import.meta.dirname, '../../../../.github/workflows/get-lesson.yml');
  assert.ok(fs.existsSync(file));
  const doc = yaml.parse(fs.readFileSync(file, 'utf8'));
  assert.deepEqual(doc.on.issue_comment.types, ['created']);
  assert.ok(doc.jobs.resolve);
  assert.ok(doc.jobs.analyze);
  assert.equal(Object.hasOwn(doc.jobs, 'publish'), false);
  assert.equal(doc.jobs.analyze.permissions.contents, 'read');
  const analysis = JSON.stringify(doc.jobs.analyze);
  assert.match(analysis, /persist-credentials/);
  assert.match(analysis, /ignore-scripts/);
  assert.match(analysis, /HEAD_SHA/);
  assert.match(analysis, /GITHUB_RUN_ID/);
  assert.match(analysis, /schemaVersion: 1/);
  assert.doesNotMatch(analysis, /git push|\.agent-ci-artifacts|contents: write/);
  const upload = doc.jobs.analyze.steps.find(step => step.uses?.startsWith('actions/upload-artifact@'));
  assert.ok(upload);
  assert.equal(upload.with['retention-days'], 1);
  assert.match(upload.with.name, /run_id/);
  assert.match(upload.with.path, /result\.json$/);
});
