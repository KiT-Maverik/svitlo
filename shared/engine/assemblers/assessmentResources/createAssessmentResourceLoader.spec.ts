import assert from 'node:assert/strict';
import test from 'node:test';

import { createAssessmentResourceLoader, type ReadAssessmentFiles } from './createAssessmentResourceLoader';

const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const questionId = '08c3bae5-081a-5afc-bccf-e44078e137f2';
const prefix = 'data/lessons/c/' + lessonId;
const manifest = {
  lessonId,
  entries: {
    [questionId]: {
      lessonId,
      kind: 'question',
      questionType: 'selectOneAnswer',
      languages: ['en', 'uk'],
      localeFiles: ['uk'],
      contentHash: 'a'.repeat(64),
    },
  },
};
const source = new Map<string, unknown>([
  [prefix + '/assessment-manifest.json', manifest],
  [prefix + '/questions/' + questionId + '/base.json', { id: questionId, type: 'selectOneAnswer', slug: 'question', params: { assessmentMethod: 'retrieval', restrictions: [] }, locale: {}, content: { question: [] } }],
  [prefix + '/questions/' + questionId + '/uk.json', { locale: { title: 'Питання' } }],
]);

test('loader never reads an unrelated bank entry, batches selected paths and caches metadata', async () => {
  const batches: string[][] = [];
  const reader: ReadAssessmentFiles = async paths => {
    batches.push([...paths]);
    return new Map(paths.filter(path => source.has(path)).map(path => [path, source.get(path)]));
  };
  const loader = createAssessmentResourceLoader(reader);
  await assert.rejects(
    () => loader.loadQuestions({ lessonId, language: 'uk', ids: [questionId] }),
    /invalid|Invalid|too_small|Question/i,
    'Incomplete Question Props fail actual Question validation',
  );
  assert.deepEqual(batches[0], [prefix + '/assessment-manifest.json']);
  assert.deepEqual(batches[1], [
    prefix + '/questions/' + questionId + '/base.json',
    prefix + '/questions/' + questionId + '/uk.json',
  ]);
  await assert.rejects(
    () => loader.loadQuestions({ lessonId, language: 'uk', ids: [questionId] }),
    /invalid|Invalid|too_small|Question/i,
  );
  assert.equal(batches.filter(paths => paths.includes(prefix + '/assessment-manifest.json')).length, 1);
});

test('loader rejects missing files, wrong IDs and cancelled navigation without caching failures', async () => {
  const reader: ReadAssessmentFiles = async paths => new Map(paths.filter(path => path.endsWith('manifest.json')).map(path => [path, manifest]));
  const loader = createAssessmentResourceLoader(reader);
  await assert.rejects(
    () => loader.loadQuestions({ lessonId, language: 'en', ids: [questionId] }),
    /Missing assessment published file/,
  );
  await assert.rejects(
    () => loader.loadQuestions({ lessonId, language: 'en', ids: [questionId], signal: AbortSignal.abort() }),
    /aborted/,
  );
});
