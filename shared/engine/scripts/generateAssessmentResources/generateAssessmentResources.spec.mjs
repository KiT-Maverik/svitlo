import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { collectAssessmentConfigurators, render } from './generateAssessmentResources.mjs';
import { loadLessonData, assembleLessonProps, selectQuizQuestionIds, validateAssessmentReferences } from '@svitlo/engine/build';

const id = index => '00000000-0000-4000-8000-' + String(index).padStart(12, '0');
const question = (key, number, type = 'selectOneAnswer') => ({
  id: id(number),
  slug: key,
  type,
  build: { props: () => ({ base: { id: id(number), slug: key, type } }) },
});
const card = (key, number) => question(key, number, 'flashcard');

test('independent Question stage discovers typed grouped configurators without sorting or mutating authored maps', () => {
  const first = question('one', 1);
  const second = question('two', 2);
  const data = { bank: { selectOneAnswer: { one: first, two: second } } };
  const found = collectAssessmentConfigurators(data, 'question');
  assert.deepEqual(found.map(item => item.id), [id(1), id(2)]);
  assert.equal(data.bank.selectOneAnswer.one, first);
});

test('Flashcard stage discovers an independent items map', () => {
  const found = collectAssessmentConfigurators(
    { flashcards: { items: { frontBack: card('frontBack', 3) } } }, 'flashcard',
  );
  assert.deepEqual(found.map(entry => entry.id), [id(3)]);
});

test('assessment stages reject wrong kinds, duplicate UUIDs, stale slugs, malformed maps and empty banks', () => {
  assert.throws(
    () => collectAssessmentConfigurators({ bank: { selectOneAnswer: { bad: question('bad', 4, 'answerWithText') } } }, 'question'),
    /Question Bank kind mismatch/,
  );
  assert.throws(
    () => collectAssessmentConfigurators({ bank: { selectOneAnswer: { wrong: card('wrong', 5) } } }, 'question'),
    /Invalid question Configurator type/,
  );
  assert.throws(
    () => collectAssessmentConfigurators({ cards: { items: { wrongSlug: card('actualSlug', 6) } } }, 'flashcard'),
    /Assessment slug\/map mismatch/,
  );
  assert.throws(
    () => collectAssessmentConfigurators({ cards: { items: { first: card('first', 7), second: card('second', 7) } } }, 'flashcard'),
    /Duplicate authored Assessment UUID/,
  );
  assert.throws(() => collectAssessmentConfigurators({ bank: [] }, 'question'), /Expected slug-keyed/);
  assert.throws(() => collectAssessmentConfigurators({}, 'flashcard'), /Empty authored/);
});

test('real Playground independently publishes full locale bodies while manifest contains metadata only', async () => {
  const textbook = path.resolve(import.meta.dirname, '../../../../content/playground');
  const owner = 'c/d3048d21-8690-5255-b62c-984c69ac272c';
  const files = await render(textbook, 'all');
  const manifest = JSON.parse(files.get(owner + '/assessment-manifest.json'));
  const entries = Object.entries(manifest.entries);
  assert.equal(manifest.lessonId, 'd3048d21-8690-5255-b62c-984c69ac272c');
  assert.equal(entries.filter(([, value]) => value.kind === 'question').length, 6);
  assert.equal(entries.filter(([, value]) => value.kind === 'flashcard').length, 3);
  assert.deepEqual(Object.keys(manifest).sort(), ['entries', 'lessonId']);
  for (const [, entry] of entries) {
    assert.equal(Object.hasOwn(entry, 'content'), false, 'the manifest must never contain assessment bodies');
    assert.equal(Object.hasOwn(entry, 'answers'), false, 'no answer data in metadata');
  }
  for (const [uuid, entry] of entries) {
    const prefix = owner + '/' + (entry.kind === 'question' ? 'questions' : 'flashcards') + '/' + uuid;
    const base = JSON.parse(files.get(prefix + '/base.json'));
    assert.equal(base.id, uuid);
    assert.equal(typeof entry.contentHash, 'string');
    assert.equal(entry.contentHash.length, 64);
    assert(entry.languages.includes('uk'));
    assert(entry.localeFiles.includes('uk'));
    assert.equal(typeof JSON.parse(files.get(prefix + '/uk.json')), 'object');
    assert(!('questions' in base), 'independent resource must not embed a whole Lesson bank');
  }
  assert.equal(files.size, 271, 'all six Questions and three Flashcards have complete localized publication');
  const onlyQuestions = await render(textbook, 'question');
  const onlyCards = await render(textbook, 'flashcard');
  assert(onlyQuestions.has(owner + '/assessment-manifest.json'));
  assert(onlyCards.has(owner + '/assessment-manifest.json'));
  assert([...onlyQuestions.keys()].every(key => !key.includes('/flashcards/')));
  assert([...onlyCards.keys()].every(key => !key.includes('/questions/')));
});

test('actual Playground Quiz UUID references resolve against the independent Question manifest', async () => {
  const textbook = path.resolve(import.meta.dirname, '../../../../content/playground');
  const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
  const owner = 'c/' + lessonId;
  const entry = path.join(textbook, 'data/lessons', owner, 'index.ts');
  const lesson = await loadLessonData(entry);
  const published = lesson.build.props({ languages: ['uk'] });
  const response = assembleLessonProps(published, 'uk');
  assert.equal(Object.hasOwn(response, 'questions'), false);
  assert.equal(Object.hasOwn(response, 'flashcards'), false);
  const quiz = response.section.find(item => item.type === 'quiz');
  assert(quiz, 'canonical Lesson requires a Quiz Section');
  const candidates = selectQuizQuestionIds(quiz.params.selection, quiz.id);
  const files = await render(textbook, 'question');
  const manifest = JSON.parse(files.get(owner + '/assessment-manifest.json'));
  const selected = validateAssessmentReferences(manifest, {
    lessonId,
    sectionId: quiz.id,
    kind: 'question',
    ids: candidates,
    language: 'uk',
  });
  assert.equal(selected.length, candidates.length);
  assert.deepEqual(
    candidates,
    Object.values(quiz.params.selection.questionIds).slice(0, candidates.length),
    'all-mode selection should preserve the curated Question order',
  );
  assert.throws(() => validateAssessmentReferences(manifest, {
    lessonId,
    sectionId: quiz.id,
    kind: 'flashcard',
    ids: candidates,
    language: 'uk',
  }), /wrong resource type/);
});
