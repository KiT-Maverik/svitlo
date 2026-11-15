import assert from 'node:assert/strict';
import test from 'node:test';
import { collectAssessmentConfigurators } from './generateAssessmentResources.mjs';

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
