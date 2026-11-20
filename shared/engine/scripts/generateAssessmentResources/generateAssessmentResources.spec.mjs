import assert from 'node:assert/strict';
import test from 'node:test';
import { collectAssessmentConfigurators, render } from './generateAssessmentResources.mjs';
import {
  loadLessonData,
  assembleLessonProps,
  selectQuizQuestionIds,
  validateAssessmentReferences,
} from '@svitlo/engine/build';
import { textbook, lessonEntry, lessonId, questionId, flashcardId } from '../../testing/fixtures.mjs';

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
  assert.deepEqual(
    found.map(item => item.id),
    [id(1), id(2)],
  );
  assert.equal(data.bank.selectOneAnswer.one, first);
});

test('Flashcard stage discovers an independent items map', () => {
  const found = collectAssessmentConfigurators(
    { flashcards: { items: { frontBack: card('frontBack', 3) } } },
    'flashcard',
  );
  assert.deepEqual(
    found.map(entry => entry.id),
    [id(3)],
  );
});

test('assessment stages reject wrong kinds, duplicate UUIDs, stale slugs, malformed maps and empty banks', () => {
  assert.throws(
    () =>
      collectAssessmentConfigurators(
        { bank: { selectOneAnswer: { bad: question('bad', 4, 'answerWithText') } } },
        'question',
      ),
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
    () =>
      collectAssessmentConfigurators(
        { cards: { items: { first: card('first', 7), second: card('second', 7) } } },
        'flashcard',
      ),
    /Duplicate authored Assessment UUID/,
  );
  assert.throws(() => collectAssessmentConfigurators({ bank: [] }, 'question'), /Expected slug-keyed/);
  assert.throws(() => collectAssessmentConfigurators({}, 'flashcard'), /Empty authored/);
});

test('Engine fixture independently publishes localized Question and Flashcard bodies with metadata-only manifest', async () => {
  const files = await render(textbook, 'all');
  const manifest = JSON.parse(files.get('assessments/manifest.json'));
  const entries = Object.entries(manifest.entries);
  assert.equal(manifest.entries[questionId].ownerLessonId, lessonId);
  assert.deepEqual(entries.map(([uuid]) => uuid).sort(), [questionId, flashcardId].sort());
  assert.equal(entries.filter(([, value]) => value.kind === 'question').length, 1);
  assert.equal(entries.filter(([, value]) => value.kind === 'flashcard').length, 1);
  assert.deepEqual(Object.keys(manifest), ['entries']);

  for (const [, entry] of entries) {
    assert.equal(Object.hasOwn(entry, 'content'), false, 'manifest must not contain assessment bodies');
    assert.equal(Object.hasOwn(entry, 'answers'), false, 'no answer data in metadata');
  }
  for (const [uuid, entry] of entries) {
    const prefix = (entry.kind === 'question' ? 'questions/' : 'flashcards/') + uuid.at(-1) + '/' + uuid;
    const base = JSON.parse(files.get(prefix + '/base.json'));
    assert.equal(base.id, uuid);
    if (entry.kind === 'flashcard') assert.deepEqual(entry.disabilities, []);
    assert.equal(typeof entry.contentHash, 'string');
    assert.equal(entry.contentHash.length, 64);
    assert.deepEqual(entry.languages, ['en', 'uk']);
    assert.deepEqual(entry.localeFiles, ['en', 'uk']);
    for (const locale of ['en', 'uk']) {
      assert.equal(typeof JSON.parse(files.get(prefix + '/' + locale + '.json')), 'object');
    }
    assert(!('questions' in base), 'individual resource must not embed a whole Lesson bank');
  }
  assert.equal(files.size, 7, 'two assessments each publish base, en, uk plus one manifest');
  const onlyQuestions = await render(textbook, 'question');
  const onlyCards = await render(textbook, 'flashcard');
  assert(onlyQuestions.has('assessments/manifest.json'));
  assert(onlyCards.has('assessments/manifest.json'));
  assert([...onlyQuestions.keys()].every(key => !key.startsWith('flashcards/')));
  assert([...onlyCards.keys()].every(key => !key.startsWith('questions/')));
});

test('Engine fixture Quiz UUID references resolve against its independent Question manifest', async () => {
  const lesson = await loadLessonData(lessonEntry);
  const published = lesson.build.props({ languages: ['uk'] });
  const response = assembleLessonProps(published, 'uk');
  assert.equal(Object.hasOwn(response, 'questions'), false);
  assert.equal(Object.hasOwn(response, 'flashcards'), false);
  const quiz = response.section.find(item => item.type === 'quiz');
  assert(quiz, 'fixture Lesson requires a Quiz Section');
  const candidates = selectQuizQuestionIds(quiz.params.selection, quiz.id);
  assert.deepEqual(quiz.params.selection.questionIds, [questionId]);
  assert.deepEqual(candidates, [questionId]);
  assert(candidates.every(candidate => typeof candidate === 'string'), 'published Quiz contains UUIDs, not Configurators');
  const files = await render(textbook, 'question');
  const manifest = JSON.parse(files.get('assessments/manifest.json'));
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
    'all-mode selection preserves the curated Question order',
  );
  assert.throws(
    () =>
      validateAssessmentReferences(manifest, {
        lessonId,
        sectionId: quiz.id,
        kind: 'flashcard',
        ids: candidates,
        language: 'uk',
      }),
    /wrong resource type/,
  );
});
