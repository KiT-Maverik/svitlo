import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { operationSpec, parseTrustedDraft, renderTrustedDraft, executeTrustedDraft } from './trusted-draft.mjs';

const uuid = '12345678-1234-4234-8234-123456789001';
const base = 'content/math/data/';
const cases = [
  ['course-stage5', 'course', 'materializeCourse', base + 'courses/1/' + uuid + '/draft.ts'],
  ['lesson-stage6', 'lesson', 'materializeLessonStage6', base + 'lessons/1/' + uuid + '/draft.ts'],
  ['episode-stage5', 'episode', 'materializeEpisodeStage5', base + 'courses/1/' + uuid + '/story/draft.ts'],
  ['questions-stage5', 'questions', 'materializeQuestionBank', base + 'lessons/1/' + uuid + '/questions/draft.ts'],
  ['flashcards-stage5', 'flashcards', 'materializeFlashcardBank', base + 'lessons/1/' + uuid + '/flashcards/draft.ts'],
  ['assessment-stage4', 'assessment', 'materializeAssessment', base + 'courses/1/' + uuid + '/review/draft.ts'],
];
const textSource = 'export default { config: {}, production: {} } satisfies Stage;\n';
const gitBlob = data =>
  createHash('sha1')
    .update('blob ' + Buffer.byteLength(data) + '\0')
    .update(data)
    .digest('hex');
const pinned = filename => ({
  sourcePath: filename,
  sourceBlobSha: gitBlob(textSource),
  sourceCommitSha: 'a'.repeat(40),
});

for (const [operation, kind, method, filename] of cases) {
  test(operation + ' selects the sole trusted schema and renderer', () => {
    const source = pinned(filename);
    assert.deepEqual(operationSpec(operation, source), { kind, method });
    const events = [];
    const reader = (_sourceText, actualKind) => {
      events.push('read:' + actualKind);
      return { config: { id: uuid }, production: {} };
    };
    const renderers = {
      [method]: (data, options) => {
        events.push('render:' + method);
        assert.equal(data.config.id, uuid);
        assert.equal(options.source.sourcePath, filename);
        return { publishable: false, files: [{ path: 'index.ts', kind: 'typescript', content: 'ok\n' }] };
      },
    };
    const result = executeTrustedDraft({
      operation,
      source,
      sourceText: textSource,
      reader,
      renderers,
      options: { source },
    });
    assert.equal(result.plan.publishable, false);
    assert.deepEqual(events, ['read:' + kind, 'render:' + method]);
  });
}

test('malicious source is parsed only and never executed', () => {
  const marker = '__SVITLO_TRUSTED_ANALYSIS_SENTINEL__';
  const source = pinned(cases[1][3]);
  const read = () => {
    throw Error('Executable statement forbidden');
  };
  assert.throws(
    () => parseTrustedDraft({ operation: 'lesson-stage6', source, sourceText: textSource, read }),
    /Executable statement forbidden/,
  );
  assert.equal(Object.hasOwn(globalThis, marker), false);
  const injected = textSource + 'globalThis.' + marker + ' = true;';
  assert.throws(
    () => parseTrustedDraft({ operation: 'lesson-stage6', source, sourceText: injected, read }),
    /exact pinned/,
  );
  assert.equal(Object.hasOwn(globalThis, marker), false);
});

test('invalid operation/path/stale blob and output spoofing fail before publication', () => {
  const original = pinned(cases[1][3]);
  for (const wrong of [
    { ...original, sourcePath: '../draft.ts' },
    { ...original, sourcePath: base + 'lessons/2/' + uuid + '/draft.ts' },
    { ...original, sourceBlobSha: 'z'.repeat(40) },
  ])
    assert.throws(() => operationSpec('lesson-stage6', wrong));
  assert.throws(() => operationSpec('delete-branch', original));
  assert.throws(
    () =>
      parseTrustedDraft({
        operation: 'lesson-stage6',
        source: original,
        sourceText: 'export default evil();',
        read: () => {
          throw Error('reader must never be invoked');
        },
      }),
    /exact pinned/,
  );
  const input = { config: {}, production: {} };
  for (const files of [
    [{ path: '../outside.ts', kind: 'typescript', content: 'x' }],
    [
      { path: 'index.ts', kind: 'typescript', content: 'x' },
      { path: 'index.ts', kind: 'typescript', content: 'x' },
    ],
    [{ path: 'index.ts', kind: 'typescript', content: '' }],
    [{ path: 'index.ts', kind: 'binary', content: 'x' }],
  ])
    assert.throws(() =>
      renderTrustedDraft({
        operation: 'lesson-stage6',
        source: original,
        input,
        options: {},
        renderers: { materializeLessonStage6: () => ({ publishable: false, files }) },
      }),
    );
  assert.throws(() =>
    renderTrustedDraft({
      operation: 'lesson-stage6',
      source: original,
      input,
      options: {},
      renderers: {
        materializeLessonStage6: () => ({
          publishable: true,
          files: [{ path: 'index.ts', kind: 'typescript', content: 'x' }],
        }),
      },
    }),
  );
});

test('credential presence blocks reader and renderer before any side effects', () => {
  const env = process.env.GH_TOKEN;
  process.env.GH_TOKEN = 'synthetic-test-secret';
  try {
    assert.throws(
      () =>
        parseTrustedDraft({
          operation: 'lesson-stage6',
          source: pinned(cases[1][3]),
          sourceText: textSource,
          read: () => {
            throw Error('reader executed');
          },
        }),
      /cannot access GitHub credentials/,
    );
  } finally {
    if (env === undefined) delete process.env.GH_TOKEN;
    else process.env.GH_TOKEN = env;
  }
});
