import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { verifyAssessmentSelections } from './verifyAssessmentSelections.mjs';

const lessonId = '00000000-0000-4000-8000-00000000000c';
const otherLessonId = '00000000-0000-4000-8000-00000000000d';
const questionId = '00000000-0000-4000-8000-000000000001';
const cardId = '00000000-0000-4000-8000-000000000002';
const sectionId = '00000000-0000-4000-8000-000000000003';
const owner = 'data/lessons/c/' + lessonId;
const manifestPath = 'data/assessments/manifest.json';
const questionPath = 'data/questions/1/' + questionId;
const cardPath = 'data/flashcards/2/' + cardId;

function put(root, name, value) {
  const filename = path.join(root, name);
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, typeof value === 'string' ? value : JSON.stringify(value));
}
function fixture(root) {
  const lesson = {
    id: lessonId,
    params: { languages: ['en', 'uk'] },
    section: [
      { id: sectionId, type: 'quiz', params: { selection: { mode: 'all', questionIds: [questionId] } } },
      { id: sectionId, type: 'flashcards', params: { selection: { flashcardIds: [cardId] } } },
    ],
  };
  const manifest = {
    entries: {
      [questionId]: {
        ownerLessonId: lessonId,
        kind: 'question',
        questionType: 'selectOneAnswer',
        languages: ['en', 'uk'],
        localeFiles: ['en', 'uk'],
      },
      [cardId]: {
        ownerLessonId: lessonId,
        kind: 'flashcard',
        languages: ['en', 'uk'],
        localeFiles: ['en', 'uk'],
      },
    },
  };
  put(root, owner + '/base.json', lesson);
  put(root, manifestPath, manifest);
  put(root, questionPath + '/base.json', { id: questionId, type: 'selectOneAnswer' });
  put(root, cardPath + '/base.json', { id: cardId, type: 'flashcard' });
  for (const language of ['en', 'uk']) {
    put(root, questionPath + '/' + language + '.json', { locale: { title: language } });
    put(root, cardPath + '/' + language + '.json', { locale: { title: language } });
  }
  return { lesson, manifest };
}
function withFixture(fn) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-selection-publication-'));
  try {
    fn(root, fixture(root));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('valid Question and Flashcard resources are resolved in every published Lesson locale', () =>
  withFixture(root => assert.equal(verifyAssessmentSelections(root), 2)));

test('global assessment manifest is required for enabled selected Sections', () =>
  withFixture(root => {
    fs.rmSync(path.join(root, manifestPath));
    assert.throws(() => verifyAssessmentSelections(root), /Missing assessment manifest/);
  }));

test('wrong resource kind is rejected, but another authored Lesson may own a selected Question', () =>
  withFixture((root, { manifest }) => {
    manifest.entries[questionId].ownerLessonId = otherLessonId;
    put(root, manifestPath, manifest);
    assert.equal(verifyAssessmentSelections(root), 2, 'Ownership is provenance, not an eligibility restriction');
    manifest.entries[questionId].kind = 'flashcard';
    put(root, manifestPath, manifest);
    assert.throws(() => verifyAssessmentSelections(root), /Missing or wrong-kind question/);
  }));

test('a Quiz may select a deliberate subset from multiple approved Question banks', () =>
  withFixture((root, { lesson, manifest }) => {
    const upstreamQuestion = '00000000-0000-4000-8000-000000000004';
    const upstreamPath = 'data/questions/4/' + upstreamQuestion;
    manifest.entries[upstreamQuestion] = {
      ...manifest.entries[questionId],
      ownerLessonId: otherLessonId,
    };
    put(root, manifestPath, manifest);
    put(root, upstreamPath + '/base.json', { id: upstreamQuestion, type: 'selectOneAnswer' });
    for (const language of ['en', 'uk'])
      put(root, upstreamPath + '/' + language + '.json', { locale: { title: language } });
    lesson.section[0].params.selection = {
      mode: 'all',
      questionIds: [questionId, upstreamQuestion],
    };
    put(root, owner + '/base.json', lesson);
    assert.equal(verifyAssessmentSelections(root), 3, 'both Question candidates and the Flashcard resolve');
    // The independent manifest may also contain Question candidates not selected by any Quiz.
    manifest.entries['00000000-0000-4000-8000-000000000005'] = {
      ...manifest.entries[questionId],
      ownerLessonId: otherLessonId,
    };
    put(root, manifestPath, manifest);
    assert.equal(verifyAssessmentSelections(root), 3, 'unselected bank members impose no dependencies');
  }));

test('independent Question banks remain valid even when no Lesson has a Quiz', () =>
  withFixture((root, { lesson }) => {
    lesson.section = [];
    put(root, owner + '/base.json', lesson);
    assert.equal(verifyAssessmentSelections(root), 0);
  }));

test('duplicate selected UUIDs are rejected by the actual publication gate', () =>
  withFixture((root, { lesson }) => {
    lesson.section[0].params.selection.questionIds = [questionId, questionId];
    put(root, owner + '/base.json', lesson);
    assert.throws(() => verifyAssessmentSelections(root), /Duplicate selected questionIds/);
  }));

test('every selected candidate ID is checked, including Quiz candidates not sampled in play', () =>
  withFixture((root, { lesson }) => {
    const missing = '00000000-0000-4000-8000-000000000009';
    lesson.section[0].params.selection = { mode: 'sample', questionIds: [questionId, missing], count: 1 };
    put(root, owner + '/base.json', lesson);
    assert.throws(() => verifyAssessmentSelections(root), new RegExp(missing));
  }));

test('publication requires real base and advertised localized files', () =>
  withFixture((root, { manifest }) => {
    fs.rmSync(path.join(root, cardPath, 'base.json'));
    assert.throws(() => verifyAssessmentSelections(root), /has no generated base.json/);
    put(root, cardPath + '/base.json', { id: cardId, type: 'flashcard' });
    fs.rmSync(path.join(root, questionPath, 'uk.json'));
    assert.throws(() => verifyAssessmentSelections(root), /missing generated locale uk/);
    put(root, questionPath + '/uk.json', {});
    manifest.entries[cardId].languages = ['en'];
    manifest.entries[cardId].localeFiles = ['en'];
    put(root, manifestPath, manifest);
    assert.throws(() => verifyAssessmentSelections(root), /missing published language uk/);
  }));

test('missing declared locale fails production instead of silently falling back to English', () =>
  withFixture((root, { manifest }) => {
    manifest.entries[questionId].localeFiles = ['en'];
    put(root, manifestPath, manifest);
    assert.throws(() => verifyAssessmentSelections(root), /missing required authored locale uk/);
  }));

test('truly invariant-only bank data can serve a selected locale without translated fragments', () =>
  withFixture((root, { manifest }) => {
    manifest.entries[cardId].localeFiles = [];
    put(root, manifestPath, manifest);
    fs.rmSync(path.join(root, cardPath, 'en.json'));
    fs.rmSync(path.join(root, cardPath, 'uk.json'));
    assert.equal(verifyAssessmentSelections(root), 2);
    put(root, cardPath + '/base.json', { id: cardId, type: 'flashcard', locale: { title: 'Untranslated English' } });
    assert.throws(() => verifyAssessmentSelections(root), /missing required authored locale en/);
  }));

test('disabled Sections and unselected bank items do not impose publication dependencies', () =>
  withFixture((root, { lesson, manifest }) => {
    lesson.section[1].params.disabled = true;
    delete manifest.entries[cardId];
    put(root, owner + '/base.json', lesson);
    put(root, manifestPath, manifest);
    assert.equal(verifyAssessmentSelections(root), 1);
  }));

test('unresolved provisional UUID cannot publish even with a forged manifest entry and files', () =>
  withFixture((root, { lesson, manifest }) => {
    const pending = 'feedc0de-1234-8abc-abcd-0123456789ab';
    lesson.section[0].params.selection.questionIds = [pending];
    put(root, owner + '/base.json', lesson);
    manifest.entries[pending] = {
      ...manifest.entries[questionId],
    };
    put(root, manifestPath, manifest);
    put(root, 'data/questions/b/' + pending + '/base.json', { id: pending, type: 'selectOneAnswer' });
    for (const language of ['en', 'uk'])
      put(root, 'data/questions/b/' + pending + '/' + language + '.json', { locale: { title: language } });
    assert.throws(() => verifyAssessmentSelections(root), /Unresolved placeholder question UUID/);
  }));

test('an unresolved draft Section label cannot reach production despite real bank references', () =>
  withFixture((root, { lesson }) => {
    lesson.section[0].locale = { title: 'PENDING QUIZ', navigationLabel: 'PENDING QUIZ' };
    put(root, owner + '/base.json', lesson);
    assert.throws(() => verifyAssessmentSelections(root), /Unresolved assessment Section draft label/);
  }));

test('reserved generated Section identity cannot pass publication even with real selected resources', () =>
  withFixture((root, { lesson }) => {
    lesson.section[0].id = 'feedc0de-1234-8abc-abcd-0123456789ab';
    put(root, owner + '/base.json', lesson);
    assert.throws(() => verifyAssessmentSelections(root), /Unresolved generated assessment Section UUID/);
  }));

test('sparse source-language Section labels cannot bypass production checks with real UUIDs', () =>
  withFixture(root => {
    put(root, owner + '/uk.json', {
      section: [{ locale: { title: 'PENDING QUIZ', navigationLabel: 'PENDING QUIZ' } }],
    });
    assert.throws(() => verifyAssessmentSelections(root), /Unresolved assessment Section draft label/);
  }));

test('Course publication rejects missing standalone Lessons and unresolved override banks', () =>
  withFixture((root, { lesson }) => {
    const courseId = '00000000-0000-4000-8000-000000000007';
    const filename = 'data/courses/' + courseId + '/base.json';
    const node = { type: 'lesson', id: lessonId };
    const course = {
      id: courseId, type: 'course', params: { languages: ['en', 'uk'] },
      content: { items: { lesson: node }, order: ['lesson'] },
    };
    put(root, filename, course);
    assert.equal(verifyAssessmentSelections(root), 6);
    node.id = otherLessonId;
    put(root, filename, course);
    assert.throws(() => verifyAssessmentSelections(root), /unpublished Lesson/);
    node.id = lessonId;
    node.overrides = { section: [{ ...lesson.section[0], params: { selection: { questionIds: [otherLessonId] } } }] };
    put(root, filename, course);
    assert.throws(() => verifyAssessmentSelections(root), /Missing or wrong-kind question/);
  }));
