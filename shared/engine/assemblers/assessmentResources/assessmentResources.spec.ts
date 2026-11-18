import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assessmentResourcePath,
  selectQuizQuestionIds,
  selectAccessibleFlashcardIds,
  validateAssessmentReferences,
  type AssessmentResourceManifest,
} from './assessmentResources';

const lessonId = '92177be3-97a1-5ca4-b21a-07f0dac27f50';
const sectionId = '1e125b21-9af0-4000-8000-000000000001';
const firstId = '1e125b21-9af0-4000-8000-000000000002';
const secondId = '1e125b21-9af0-4000-8000-000000000003';
const cardId = '1e125b21-9af0-4000-8000-000000000004';
const hash = 'a'.repeat(64);
const manifest: AssessmentResourceManifest = {
  entries: {
    [firstId]: {
      ownerLessonId: lessonId,
      kind: 'question',
      questionType: 'selectOneAnswer',
      languages: ['en', 'uk'],
      localeFiles: ['en', 'uk'],
      contentHash: hash,
    },
    [secondId]: {
      ownerLessonId: lessonId,
      kind: 'question',
      questionType: 'answerWithText',
      languages: ['en'],
      localeFiles: ['en'],
      contentHash: hash,
    },
    [cardId]: { ownerLessonId: lessonId, kind: 'flashcard', languages: ['en'], localeFiles: ['en'], contentHash: hash },
  },
};

test('assessment paths are portable, UUID-addressed and reject invalid IDs', () => {
  assert.equal(assessmentResourcePath('question', firstId, 'uk'), 'data/questions/2/' + firstId + '/uk.json');
  assert.equal(assessmentResourcePath('flashcard', cardId), 'data/flashcards/4/' + cardId + '/base.json');
  assert.throws(() => assessmentResourcePath('question', '../escape'), /uuid|UUID|Invalid/);
});

test('reference validation requires explicit selected, correctly owned, localized entries', () => {
  const valid = { lessonId, sectionId, kind: 'question' as const, ids: [firstId], language: 'uk' as const };
  assert.deepEqual(validateAssessmentReferences(manifest, valid), [manifest.entries[firstId]]);
  assert.throws(() => validateAssessmentReferences(manifest, { ...valid, ids: [] }), /Empty assessment/);
  assert.throws(() => validateAssessmentReferences(manifest, { ...valid, ids: [firstId, firstId] }), /Duplicate/);
  assert.throws(() => validateAssessmentReferences(manifest, { ...valid, ids: [cardId] }), /wrong resource type/);
  assert.deepEqual(validateAssessmentReferences(manifest, { ...valid, ids: [secondId] }), [manifest.entries[secondId]]);
  assert.deepEqual(
    validateAssessmentReferences(manifest, { ...valid, lessonId: secondId }),
    [manifest.entries[firstId]],
    'Cross-Lesson selection is allowed',
  );
  assert.throws(
    () => validateAssessmentReferences(manifest, { ...valid, ids: ['1e125b21-9af0-4000-8000-000000000005'] }),
    /Missing assessment/,
  );
  assert.throws(
    () =>
      validateAssessmentReferences(
        {
          ...manifest,
          entries: { ...manifest.entries, [firstId]: { ...manifest.entries[firstId], ownerLessonId: 'invalid' } },
        },
        valid,
      ),
    /uuid|UUID|Invalid/,
  );
});

test('Quiz selects only explicit UUID candidates with stable sampling and never defaults to the whole bank', () => {
  const base = { mode: 'all' as const, questionIds: [firstId, secondId] };
  assert.deepEqual(selectQuizQuestionIds(base, sectionId), [firstId, secondId]);
  assert.deepEqual(selectQuizQuestionIds({ ...base, mode: 'sample', count: 1 }, sectionId), [firstId]);
  const shuffled = { ...base, mode: 'sample' as const, count: 1, shuffle: true, seed: 12 };
  assert.deepEqual(selectQuizQuestionIds(shuffled, sectionId), selectQuizQuestionIds(shuffled, sectionId));
  assert.equal(selectQuizQuestionIds(shuffled, sectionId).length, 1);
  assert.throws(() => selectQuizQuestionIds({ mode: 'all', questionIds: [] }, sectionId), /explicit questionIds/);
  assert.throws(() => selectQuizQuestionIds({ ...base, questionIds: [firstId, firstId] }, sectionId), /Duplicate/);
  assert.throws(() => selectQuizQuestionIds({ ...base, mode: 'sample', count: 3 }, sectionId), /sample count/);
  assert.throws(() => selectQuizQuestionIds({ ...base, count: 1 }, sectionId), /sample mode/);
});

test('Flashcard selection keeps candidate order and excludes incompatible cards before body loading', () => {
  const audio = {
    ownerLessonId: lessonId,
    kind: 'flashcard' as const,
    languages: ['en' as const],
    localeFiles: ['en' as const],
    contentHash: hash,
    disabilities: ['deafness' as const],
  };
  const accessible = {
    ownerLessonId: lessonId,
    kind: 'flashcard' as const,
    languages: ['en' as const],
    localeFiles: ['en' as const],
    contentHash: hash,
    disabilities: [],
  };
  const image = {
    ownerLessonId: lessonId,
    kind: 'flashcard' as const,
    languages: ['en' as const],
    localeFiles: ['en' as const],
    contentHash: hash,
    disabilities: ['blindness' as const],
  };
  const ids = [firstId, secondId, cardId];
  const entries = [audio, accessible, image];
  assert.deepEqual(selectAccessibleFlashcardIds(entries, ids, ['deafness']), [secondId, cardId]);
  assert.deepEqual(selectAccessibleFlashcardIds(entries, ids, ['blindness']), [firstId, secondId]);
  assert.deepEqual(selectAccessibleFlashcardIds(entries, ids, ['deafness', 'blindness']), [secondId]);
  assert.deepEqual(selectAccessibleFlashcardIds(entries, ids, []), ids);
  assert.deepEqual(selectAccessibleFlashcardIds([audio], [firstId], ['deafness']), []);
  assert.throws(
    () => selectAccessibleFlashcardIds([{ ...audio, disabilities: undefined }], [firstId], ['deafness']),
    /Missing accessibility metadata/,
  );
  assert.throws(
    () => selectAccessibleFlashcardIds(entries, ids, ['deafness', 'deafness']),
    /Duplicate voluntarily selected/,
  );
});
