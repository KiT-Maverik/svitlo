import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { verifyAssessmentSelections } from './verifyAssessmentSelections.mjs';

const lessonId = '00000000-0000-4000-8000-00000000000c';
const questionId = '00000000-0000-4000-8000-000000000001';
const cardId = '00000000-0000-4000-8000-000000000002';
const sectionId = '00000000-0000-4000-8000-000000000003';
const owner = 'data/lessons/c/' + lessonId;
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
    lessonId,
    entries: {
      [questionId]: { lessonId, kind: 'question', languages: ['en', 'uk'], localeFiles: ['uk'] },
      [cardId]: { lessonId, kind: 'flashcard', languages: ['en', 'uk'], localeFiles: ['uk'] },
    },
  };
  put(root, owner + '/base.json', lesson);
  put(root, owner + '/assessment-manifest.json', manifest);
  put(root, owner + '/questions/' + questionId + '/base.json', {});
  put(root, owner + '/questions/' + questionId + '/uk.json', {});
  put(root, owner + '/flashcards/' + cardId + '/base.json', {});
  put(root, owner + '/flashcards/' + cardId + '/uk.json', {});
  return { lesson, manifest };
}
function withFixture(fn) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-selection-publication-'));
  try { fn(root, fixture(root)); } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test('complete Quiz and Flashcards resource publication is accepted in every locale', () =>
  withFixture(root => assert.equal(verifyAssessmentSelections(root), 2)));

test('missing assessment manifest never passes a Section with selected UUIDs', () => withFixture(root => {
  fs.rmSync(path.join(root, owner, 'assessment-manifest.json'));
  assert.throws(() => verifyAssessmentSelections(root), /Missing assessment manifest/);
}));

test('manifest must point to the actual owning Lesson and correct bank kind', () => withFixture((root, { manifest }) => {
  manifest.entries[questionId].kind = 'flashcard';
  put(root, owner + '/assessment-manifest.json', manifest);
  assert.throws(() => verifyAssessmentSelections(root), /Missing or wrong-kind question/);
}));

test('every candidate ID is required, not merely a default Quiz sample', () => withFixture((root, { lesson }) => {
  const missing = '00000000-0000-4000-8000-000000000009';
  lesson.section[0].params.selection = { mode: 'sample', questionIds: [questionId, missing], count: 1 };
  put(root, owner + '/base.json', lesson);
  assert.throws(() => verifyAssessmentSelections(root), new RegExp(missing));
}));

test('publication requires actual body and declared localized resource files', () => withFixture((root, { manifest }) => {
  const file = path.join(root, owner, 'flashcards', cardId, 'base.json');
  fs.rmSync(file);
  assert.throws(() => verifyAssessmentSelections(root), /has no generated base.json/);
  put(root, owner + '/flashcards/' + cardId + '/base.json', {});
  fs.rmSync(path.join(root, owner, 'questions', questionId, 'uk.json'));
  assert.throws(() => verifyAssessmentSelections(root), /missing generated locale uk/);
  put(root, owner + '/questions/' + questionId + '/uk.json', {});
  manifest.entries[cardId].languages = ['en'];
  put(root, owner + '/assessment-manifest.json', manifest);
  assert.throws(() => verifyAssessmentSelections(root), /missing published language uk/);
}));

test('disabled Sections and unselected bank items do not demand extra resources', () => withFixture((root, { lesson, manifest }) => {
  lesson.section[1].params.disabled = true;
  delete manifest.entries[cardId];
  put(root, owner + '/base.json', lesson);
  put(root, owner + '/assessment-manifest.json', manifest);
  assert.equal(verifyAssessmentSelections(root), 1);
}));
