import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../contentBlocks/defineText';
import {
  defineSelectOneAnswer,
  defineSelectMultipleAnswers,
  defineMatchBlocks,
  defineAnswerWithText,
  defineAnswerWithNumber,
  defineOrderSequence,
  defineBuildAnswerWithBlocks,
  defineFillBlanksWithBlocks,
  defineFillBlanksWithText,
  selectOneAnswer_Config_Schema,
  answerWithText_Config_Schema,
  answerWithText_Props_Schema,
} from './index';

const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const block = defineText({
  id,
  slug: 'promptBlock',
  type: 'text',
  params: {},
  locale: { value: { en: 'Hello', uk: 'Привіт' } },
});
const params = { assessmentMethod: 'retrieval' as const, restrictions: ['dyslexia' as const] };
const prompt = { question: [block] as [typeof block] };
const localized = { en: 'Answer', uk: 'Відповідь' } as const;
const common = <const Type extends string>(type: Type) => ({
  id,
  slug: 'questionOne',
  type,
  params,
  locale: {},
  content: prompt,
});

test('all nine Question configurators expose the same small lifecycle surface', () => {
  const answers = { correct: { yes: block }, incorrect: { no: block }, distractors: { maybe: block } };
  const questions = [
    defineSelectOneAnswer({ ...common('selectOneAnswer'), content: { ...prompt, answers } }),
    defineSelectMultipleAnswers({ ...common('selectMultipleAnswers'), content: { ...prompt, answers } }),
    defineMatchBlocks({ ...common('matchBlocks'), content: { ...prompt, pairs: { pair: { left: block, right: block } } } }),
    defineAnswerWithText({
      ...common('answerWithText'),
      locale: { correctAnswers: [localized], placeholder: localized },
    }),
    defineAnswerWithNumber({
      ...common('answerWithNumber'),
      params: { ...params, correctAnswers: [42] },
      locale: { placeholder: localized },
    }),
    defineOrderSequence({ ...common('orderSequence'), content: { ...prompt, sequence: [block] as [typeof block] } }),
    defineBuildAnswerWithBlocks({
      ...common('buildAnswerWithBlocks'),
      locale: { placeholder: localized },
      content: { ...prompt, correctSequence: [block] as [typeof block], distractors: [block] },
    }),
    defineFillBlanksWithBlocks({
      ...common('fillBlanksWithBlocks'),
      locale: { placeholder: localized },
      content: { ...prompt, slots: [{ selector: 'slot', correctAnswer: block }], distractors: [block] },
    }),
    defineFillBlanksWithText({
      ...common('fillBlanksWithText'),
      locale: { slots: [{ selector: 'slot', correctAnswers: [localized] }], placeholder: localized },
    }),
  ];

  for (const item of questions) {
    assert.equal(item.id, id);
    assert.equal(item.slug, 'questionOne');
    assert.equal(item.type, item.config.base.type);
    assert.strictEqual(item.content.question[0], block);
    assert.equal(item.config.base.params.assessmentMethod, 'retrieval');
    assert.equal(typeof item.config.validate, 'function');
    assert.equal(typeof item.config.locales, 'function');
    item.override.params({ restrictions: [] });
    assert.deepEqual(item.config.overrides.params, { restrictions: [] });
    item.disable();
    assert.deepEqual(item.config.overrides.params, { disabled: true });
  }
  assert.strictEqual(questions[0].content.answers.correct.yes, block);
  assert.strictEqual(questions[2].content.pairs.pair.left, block);
  assert.strictEqual(questions[5].content.sequence[0], block);
  assert.strictEqual(questions[6].content.correctSequence[0], block);
  assert.strictEqual(questions[7].content.slots[0].correctAnswer, block);
});

test('Question metadata validation does not recursively parse ContentBlocks', () => {
  const content = { ...prompt, answers: { correct: { yes: block }, incorrect: {}, distractors: {} } };
  const input = { ...common('selectOneAnswer'), content };
  const question = defineSelectOneAnswer(input);
  assert.equal(selectOneAnswer_Config_Schema.safeParse(input).success, true);
  assert.doesNotThrow(() => question.config.validate(input));
  assert.throws(() => question.config.validate({ ...input, content: { ...content, question: [] as never } }));
  assert.throws(() => defineSelectOneAnswer({ ...input, params: { assessmentMethod: 'invalid' as never, restrictions: [] } }));
  assert.strictEqual(question.content, input.content);
  question.content.answers.correct.yes.override.locale({ value: 'Updated' });
  assert.deepEqual(block.config.overrides.locale, { value: 'Updated' });
});

test('text answer locale data and invariant numeric answers stay separated', () => {
  const text = defineAnswerWithText({
    ...common('answerWithText'),
    locale: { correctAnswers: ['Fixed', localized], placeholder: localized },
  });
  assert.deepEqual(text.config.base.locale.correctAnswers, ['Fixed', {}]);
  assert.deepEqual(text.config.locales(), {
    locale: { correctAnswers: [{}, localized], placeholder: localized },
  });
  assert.equal(answerWithText_Config_Schema.safeParse({
    ...common('answerWithText'),
    locale: { correctAnswers: [localized], placeholder: localized },
  }).success, true);
  assert.equal(answerWithText_Props_Schema.safeParse({
    ...common('answerWithText'),
    locale: { correctAnswers: ['Answer'], placeholder: 'Answer' },
  }).success, true);
  text.override.locale({ placeholder: 'Updated' });
  assert.deepEqual(text.config.overrides.locale, { placeholder: 'Updated' });

  const number = defineAnswerWithNumber({
    ...common('answerWithNumber'),
    params: { ...params, correctAnswers: [1, 2] },
    locale: { placeholder: localized },
  });
  assert.deepEqual(number.config.base.params.correctAnswers, [1, 2]);
  assert.deepEqual(number.config.locales(), { locale: { placeholder: localized } });
});

test('FillBlanksWithText retains selectors in invariant projection and localized answer choices separately', () => {
  const question = defineFillBlanksWithText({
    ...common('fillBlanksWithText'),
    locale: { slots: [{ selector: 'slot', correctAnswers: ['OK', localized] }], placeholder: localized },
  });
  assert.deepEqual(question.config.base.locale.slots, [{ selector: 'slot', correctAnswers: ['OK', {}] }]);
  assert.deepEqual(question.config.locales(), {
    locale: { slots: [{ correctAnswers: [{}, localized] }], placeholder: localized },
  });
});
