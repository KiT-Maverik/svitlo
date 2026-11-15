import assert from 'node:assert/strict';
import test from 'node:test';

import { renderAssessmentResourceFiles, type AssessmentPublicationEntry } from './renderAssessmentResourceFiles.utils';

const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const questionId = '08c3bae5-081a-5afc-bccf-e44078e137f2';
const cardId = '715383c3-ea22-5043-9213-555180837358';
const question = (source = 'question.ts'): AssessmentPublicationEntry => ({
  source,
  lessonId,
  kind: 'question',
  languages: ['en', 'uk'],
  publication: {
    base: { id: questionId, type: 'selectOneAnswer', params: {}, locale: {} } as never,
    locale: { uk: { locale: { title: 'Питання' } }, en: { locale: { title: 'Question' } } },
  },
});
const card = (): AssessmentPublicationEntry => ({
  source: 'card.ts',
  lessonId,
  kind: 'flashcard',
  languages: ['en'],
  publication: { base: { id: cardId, type: 'flashcard' } },
});

test('renders independent UUID files plus metadata-only manifest in deterministic order', () => {
  const files = renderAssessmentResourceFiles([card(), question()]);
  const prefix = 'c/' + lessonId;
  assert.deepEqual([...files.keys()], [
    prefix + '/questions/' + questionId + '/base.json',
    prefix + '/questions/' + questionId + '/en.json',
    prefix + '/questions/' + questionId + '/uk.json',
    prefix + '/flashcards/' + cardId + '/base.json',
    prefix + '/assessment-manifest.json',
  ]);
  const manifest = JSON.parse(files.get(prefix + '/assessment-manifest.json')!);
  assert.deepEqual(Object.keys(manifest.entries).sort(), [cardId, questionId].sort());
  assert.equal(manifest.entries[questionId].questionType, 'selectOneAnswer');
  assert.equal(manifest.entries[cardId].kind, 'flashcard');
  assert.deepEqual(manifest.entries[questionId].languages, ['en', 'uk']);
  assert.match(manifest.entries[questionId].contentHash, /^[a-f0-9]{64}$/);
  assert.equal(JSON.stringify(manifest).includes('Питання'), false, 'No bank body in manifest');
  assert.deepEqual([...renderAssessmentResourceFiles([question(), card()])], [...files]);
});

test('does not synthesize files for invariant-only or unrequested locales', () => {
  const files = renderAssessmentResourceFiles([card()]);
  assert.equal(files.size, 2);
  assert.equal([...files.keys()].some(path => path.endsWith('/en.json')), false);
});

test('rejects invalid kind, duplicate UUID, non-JSON content and outside language scope', () => {
  assert.throws(() => renderAssessmentResourceFiles([question(), question('duplicate.ts')]), /Duplicate Assessment UUID/);
  assert.throws(
    () => renderAssessmentResourceFiles([{ ...question(), kind: 'flashcard' }]),
    /Expected Flashcard Props/,
  );
  assert.throws(
    () => renderAssessmentResourceFiles([{ ...question(), publication: { base: { id: questionId, type: 'unknown' } } }]),
    /Invalid Question kind/,
  );
  assert.throws(
    () => renderAssessmentResourceFiles([{ ...question(), publication: {
      base: { id: questionId, type: 'selectOneAnswer', object: { lost: undefined } } as never,
    } }]),
    /Non-JSON Assessment Props/,
  );
  assert.throws(
    () => renderAssessmentResourceFiles([{ ...question(), languages: ['uk'] }]),
    /Unexpected Assessment publication language en/,
  );
});
