import assert from 'node:assert/strict';
import test from 'node:test';

import {
  mergeAssessmentResourceFiles,
  renderAssessmentResourceFiles,
  type AssessmentPublicationEntry,
} from './renderAssessmentResourceFiles.utils';

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

test('renders globally UUID-addressed files and one metadata-only manifest deterministically', () => {
  const files = renderAssessmentResourceFiles([card(), question()]);
  const questionPrefix = 'questions/2/' + questionId;
  const cardPrefix = 'flashcards/8/' + cardId;
  const manifestPath = 'assessments/manifest.json';
  assert.deepEqual(
    [...files.keys()],
    [
      manifestPath,
      cardPrefix + '/base.json',
      questionPrefix + '/base.json',
      questionPrefix + '/en.json',
      questionPrefix + '/uk.json',
    ],
  );
  const manifest = JSON.parse(files.get(manifestPath)!);
  assert.deepEqual(Object.keys(manifest.entries).sort(), [cardId, questionId].sort());
  assert.deepEqual(Object.keys(manifest), ['entries']);
  assert.equal(manifest.entries[questionId].ownerLessonId, lessonId);
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
  assert.equal(
    [...files.keys()].some(path => path.endsWith('/en.json')),
    false,
  );
});

test('rejects invalid kind, duplicate UUID, non-JSON content and outside language scope', () => {
  assert.throws(
    () => renderAssessmentResourceFiles([question(), question('duplicate.ts')]),
    /Duplicate Assessment UUID/,
  );
  assert.throws(
    () => renderAssessmentResourceFiles([{ ...question(), kind: 'flashcard' }]),
    /Expected Flashcard Props/,
  );
  assert.throws(
    () =>
      renderAssessmentResourceFiles([{ ...question(), publication: { base: { id: questionId, type: 'unknown' } } }]),
    /Invalid Question kind/,
  );
  assert.throws(
    () =>
      renderAssessmentResourceFiles([
        {
          ...question(),
          publication: {
            base: { id: questionId, type: 'selectOneAnswer', object: { lost: undefined } } as never,
          },
        },
      ]),
    /Non-JSON Assessment Props/,
  );
  assert.throws(
    () => renderAssessmentResourceFiles([{ ...question(), languages: ['uk'] }]),
    /Unexpected Assessment publication language en/,
  );
});

test('rejects a repeated Question UUID under a different owning Lesson', () => {
  const duplicate = { ...question('other-textbook/question.ts'), lessonId: '00000000-0000-4000-8000-000000000010' };
  assert.throws(() => renderAssessmentResourceFiles([question(), duplicate]), /Duplicate Assessment UUID/);
});

test('serialized bytes are independent of authored object insertion order', () => {
  const first = question();
  const reordered = question();
  reordered.publication = {
    ...reordered.publication,
    base: {
      locale: {},
      params: {},
      type: 'selectOneAnswer',
      id: questionId,
    } as never,
  };
  assert.deepEqual([...renderAssessmentResourceFiles([first])], [...renderAssessmentResourceFiles([reordered])]);
});

test('merges independently produced Question/Flashcard stages into one non-duplicated manifest', () => {
  const questionStage = renderAssessmentResourceFiles([question()]);
  const flashcardStage = renderAssessmentResourceFiles([card()]);
  const combined = mergeAssessmentResourceFiles([questionStage, flashcardStage]);
  const manifestPath = 'assessments/manifest.json';
  const combinedManifest = JSON.parse(combined.get(manifestPath)!);
  assert.deepEqual(Object.keys(combinedManifest.entries).sort(), [cardId, questionId].sort());
  assert.equal(combinedManifest.entries[questionId].kind, 'question');
  assert.equal(combinedManifest.entries[cardId].kind, 'flashcard');
  assert.equal(combined.size, questionStage.size + flashcardStage.size - 1);
  assert.deepEqual([...combined], [...mergeAssessmentResourceFiles([flashcardStage, questionStage])]);
  assert.throws(
    () => mergeAssessmentResourceFiles([questionStage, questionStage]),
    /Duplicate Assessment UUID across stages/,
  );
  const otherLesson = renderAssessmentResourceFiles([
    { ...question(), lessonId: '00000000-0000-4000-8000-000000000010' },
  ]);
  assert.throws(
    () => mergeAssessmentResourceFiles([questionStage, otherLesson]),
    /Duplicate Assessment UUID across stages/,
  );
  const noManifest = new Map(questionStage);
  noManifest.delete(manifestPath);
  assert.throws(() => mergeAssessmentResourceFiles([noManifest]), /Unindexed Assessment resource/);
});

test('merged publication rejects tampered resource content, unindexed locale and missing base', () => {
  const stage = renderAssessmentResourceFiles([question()]);
  const folder = 'questions/2/' + questionId;
  const corrupted = new Map(stage);
  corrupted.set(folder + '/uk.json', JSON.stringify({ locale: { title: 'Altered' } }));
  assert.throws(() => mergeAssessmentResourceFiles([corrupted]), /content hash mismatch/);
  const unknown = new Map(stage);
  unknown.set(folder + '/fr.json', '{"locale":{}}');
  assert.throws(() => mergeAssessmentResourceFiles([unknown]), /not declared/);
  const missing = new Map(stage);
  missing.delete(folder + '/base.json');
  assert.throws(() => mergeAssessmentResourceFiles([missing]), /base is missing/);
});
