import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Locale_Languages, Quiz_Parameters } from '+@svitlo/contracts/content';
import { prepareQuizQuestions } from './prepareQuizQuestions';

const config = (
  selection: Quiz_Parameters<'response', Locale_Languages>['selection'],
): Quiz_Parameters<'response', Locale_Languages> => ({
  selection,
  layout: { mode: 'stack' },
  feedbackMode: 'immediate',
  interaction: {
    retries: 0,
    showErrors: true,
    showCorrectAnswers: true,
    allowExplanations: true,
    allowDeferring: false,
    allowQuestionNavigation: true,
    skippable: false,
  },
  results: { visibility: 'immediate', showScore: true },
  screen: {},
});
const block = (value: string) => ({ type: 'text', id: value, value });
const question = (slug: string) => ({
  id: slug,
  slug,
  type: 'selectOneAnswer',
  assessmentMethod: 'retrieval',
  restrictions: [],
  question: [block('Prompt')],
  answers: {
    correct: { one: block('one'), two: block('two') },
    incorrect: { a: block('a'), b: block('b') },
    distractors: { c: block('c') },
  },
});
const catalog = {
  selectOneAnswer: {
    first: question('first'),
    second: question('second'),
    third: question('third'),
  },
};

describe('prepareQuizQuestions', () => {
  it('samples deterministically without changing the authored catalog', () => {
    const settings = config({ mode: 'sample', count: 2, shuffle: true, seed: 7 });
    const a = prepareQuizQuestions(catalog, settings);
    assert.deepEqual(a, prepareQuizQuestions(catalog, settings));
    assert.equal(a.length, 2);
    assert.equal(Object.keys(catalog.selectOneAnswer.first.answers.correct).length, 2);
  });

  it('honours selected Question order and per-type answer overrides', () => {
    const settings = {
      ...config({ mode: 'all', questionSlugs: ['second'], seed: 8 }),
      questionOptions: {
        selectOneAnswer: {
          incorrectCount: 1,
          includeDistractors: false,
          shuffleAnswers: true,
          correctVariant: 'random' as const,
        },
      },
    };
    const selected = prepareQuizQuestions(catalog, settings);
    assert.deepEqual(
      selected.map(item => item.id),
      ['second'],
    );
    const item = selected[0];
    assert.equal(item.type, 'selectOneAnswer');
    if (item.type === 'selectOneAnswer') {
      assert.equal(Object.keys(item.answers.correct).length, 1);
      assert.equal(Object.keys(item.answers.incorrect).length, 1);
      assert.equal(Object.keys(item.answers.distractors).length, 0);
      assert.equal(item.answerOrder?.length, 2);
    }
  });

  it('rejects missing Questions and impossible sampling limits', () => {
    assert.throws(
      () => prepareQuizQuestions(catalog, config({ mode: 'all', questionSlugs: ['missing'] })),
      /Unknown Quiz Question/,
    );
    assert.throws(() => prepareQuizQuestions(catalog, config({ mode: 'sample', count: 9 })), /sample count/);
  });
});
