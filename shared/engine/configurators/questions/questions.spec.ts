import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../contentBlocks/defineText/defineText';
import { allDisabilities, disability_Schema } from '../../schemas';
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
  assessmentMethodSlugs,
  assessmentMethodSlug_Schema,
  selectOneAnswer_Config_Schema,
  selectOneAnswer_Props_Schema,
  selectMultipleAnswers_Config_Schema,
  selectMultipleAnswers_Props_Schema,
  matchBlocks_Config_Schema,
  matchBlocks_Props_Schema,
  answerWithText_Config_Schema,
  answerWithText_Props_Schema,
  answerWithNumber_Config_Schema,
  answerWithNumber_Props_Schema,
  orderSequence_Config_Schema,
  orderSequence_Props_Schema,
  buildAnswerWithBlocks_Config_Schema,
  buildAnswerWithBlocks_Props_Schema,
  fillBlanksWithBlocks_Config_Schema,
  fillBlanksWithBlocks_Props_Schema,
  fillBlanksWithText_Config_Schema,
  fillBlanksWithText_Props_Schema,
} from './index';

const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const block = defineText({ id, slug: 'prompt-block', type: 'text', params: {}, value: { en: 'Hello', uk: 'Привіт' } });
const resolvedBlock = { id, slug: 'prompt-block', type: 'text' as const, params: {}, value: 'Hello' };
const locale = { en: 'Answer', uk: 'Відповідь' } as const;

function common<const Kind extends string>(type: Kind) {
  return { id, slug: 'test-question', type, assessmentMethod: 'retrieval' as const, restrictions: ['dyslexia' as const], question: [block] as [typeof block] };
}

const answers = {
  correct: { one: block },
  incorrect: { two: block },
  distractors: { three: block },
};
const resolvedAnswers = {
  correct: { one: resolvedBlock },
  incorrect: { two: resolvedBlock },
  distractors: { three: resolvedBlock },
};

test('all nine Question Config and Props schemas validate authored definitions and resolved blocks', () => {
  const cases = [
    {
      config: { ...common('selectOneAnswer'), answers },
      props: { ...common('selectOneAnswer'), question: [resolvedBlock], answers: resolvedAnswers },
      configSchema: selectOneAnswer_Config_Schema,
      propsSchema: selectOneAnswer_Props_Schema,
      define: defineSelectOneAnswer,
    },
    {
      config: { ...common('selectMultipleAnswers'), answers },
      props: { ...common('selectMultipleAnswers'), question: [resolvedBlock], answers: resolvedAnswers },
      configSchema: selectMultipleAnswers_Config_Schema,
      propsSchema: selectMultipleAnswers_Props_Schema,
      define: defineSelectMultipleAnswers,
    },
    {
      config: { ...common('matchBlocks'), pairs: { one: { left: block, right: block } } },
      props: { ...common('matchBlocks'), question: [resolvedBlock], pairs: { one: { left: resolvedBlock, right: resolvedBlock } } },
      configSchema: matchBlocks_Config_Schema,
      propsSchema: matchBlocks_Props_Schema,
      define: defineMatchBlocks,
    },
    {
      config: { ...common('answerWithText'), correctAnswers: [locale], placeholder: locale },
      props: { ...common('answerWithText'), question: [resolvedBlock], correctAnswers: ['Answer'], placeholder: 'Answer' },
      configSchema: answerWithText_Config_Schema,
      propsSchema: answerWithText_Props_Schema,
      define: defineAnswerWithText,
    },
    {
      config: { ...common('answerWithNumber'), correctAnswers: [42], placeholder: locale },
      props: { ...common('answerWithNumber'), question: [resolvedBlock], correctAnswers: [42], placeholder: 'Answer' },
      configSchema: answerWithNumber_Config_Schema,
      propsSchema: answerWithNumber_Props_Schema,
      define: defineAnswerWithNumber,
    },
    {
      config: { ...common('orderSequence'), sequence: [block] as [typeof block] },
      props: { ...common('orderSequence'), question: [resolvedBlock], sequence: [resolvedBlock] },
      configSchema: orderSequence_Config_Schema,
      propsSchema: orderSequence_Props_Schema,
      define: defineOrderSequence,
    },
    {
      config: { ...common('buildAnswerWithBlocks'), correctSequence: [block] as [typeof block], distractors: [block], placeholder: locale },
      props: { ...common('buildAnswerWithBlocks'), question: [resolvedBlock], correctSequence: [resolvedBlock], distractors: [resolvedBlock], placeholder: 'Answer' },
      configSchema: buildAnswerWithBlocks_Config_Schema,
      propsSchema: buildAnswerWithBlocks_Props_Schema,
      define: defineBuildAnswerWithBlocks,
    },
    {
      config: { ...common('fillBlanksWithBlocks'), slots: [{ selector: '{{x}}', correctAnswer: block }], distractors: [block], placeholder: locale },
      props: { ...common('fillBlanksWithBlocks'), question: [resolvedBlock], slots: [{ selector: '{{x}}', correctAnswer: resolvedBlock }], distractors: [resolvedBlock], placeholder: 'Answer' },
      configSchema: fillBlanksWithBlocks_Config_Schema,
      propsSchema: fillBlanksWithBlocks_Props_Schema,
      define: defineFillBlanksWithBlocks,
    },
    {
      config: { ...common('fillBlanksWithText'), slots: [{ selector: '{{x}}', correctAnswers: [locale] }], placeholder: locale },
      props: { ...common('fillBlanksWithText'), question: [resolvedBlock], slots: [{ selector: '{{x}}', correctAnswers: ['Answer'] }], placeholder: 'Answer' },
      configSchema: fillBlanksWithText_Config_Schema,
      propsSchema: fillBlanksWithText_Props_Schema,
      define: defineFillBlanksWithText,
    },
  ] as const;
  for (const entry of cases) {
    assert.equal(entry.configSchema.safeParse(entry.config).success, true, entry.config.type);
    assert.equal(entry.propsSchema.safeParse(entry.props).success, true, entry.config.type);
    assert.equal(entry.configSchema.safeParse(entry.props).success, false, entry.config.type);
    assert.equal(entry.propsSchema.safeParse(entry.config).success, false, entry.config.type);
    assert.equal(entry.configSchema.safeParse({ ...entry.config, question: [resolvedBlock] }).success, false, entry.config.type);
    assert.equal(entry.configSchema.safeParse({ ...entry.config, id: 'invalid' }).success, false, entry.config.type);
    assert.equal(entry.configSchema.safeParse({ ...entry.config, assessmentMethod: 'unregistered' }).success, false, entry.config.type);
    assert.equal(entry.configSchema.safeParse({ ...entry.config, restrictions: [12] }).success, false, entry.config.type);
    assert.equal(entry.configSchema.safeParse({ ...entry.config, restrictions: ['unknown-restriction'] }).success, false, entry.config.type);
  }
});

test('Question definitions preserve nested ContentBlock identity and avoid authoring functions in base/locales', () => {
  const select = defineSelectOneAnswer({ ...common('selectOneAnswer'), hint: [block], explanation: [block], answers });
  assert.equal(select.kind, 'selectOneAnswer');
  assert.strictEqual(select.question[0], block);
  assert.strictEqual(select.hint?.[0], block);
  assert.strictEqual(select.explanation?.[0], block);
  assert.strictEqual(select.answers.correct.one, block);
  assert.deepEqual(select.config.base, {
    id,
    slug: 'test-question',
    type: 'selectOneAnswer',
    assessmentMethod: 'retrieval',
    restrictions: ['dyslexia'],
  });
  assert.deepEqual(select.config.locales(), {});
  assert.equal(JSON.stringify(select.config.base).includes('locales'), false);

  const matched = defineMatchBlocks({ ...common('matchBlocks'), pairs: { term: { left: block, right: block } } });
  assert.strictEqual(matched.pairs.term.left, block);
  const ordered = defineOrderSequence({ ...common('orderSequence'), sequence: [block] });
  assert.strictEqual(ordered.sequence[0], block);
  const built = defineBuildAnswerWithBlocks({
    ...common('buildAnswerWithBlocks'),
    correctSequence: [block],
    distractors: [block],
    placeholder: 'Drop blocks',
  });
  assert.strictEqual(built.correctSequence[0], block);
  assert.strictEqual(built.distractors[0], block);
  const filled = defineFillBlanksWithBlocks({
    ...common('fillBlanksWithBlocks'),
    slots: [{ selector: 'slot-1', correctAnswer: block }],
    distractors: [block],
    placeholder: 'Choose',
  });
  assert.strictEqual(filled.slots[0].correctAnswer, block);
  assert.strictEqual(filled.distractors[0], block);
  assert.deepEqual(filled.config.base.slots, [{ selector: 'slot-1' }]);
});

test('Text answer and slot localization is projected without duplicating locale dictionaries in base', () => {
  const answer = defineAnswerWithText({
    ...common('answerWithText'),
    correctAnswers: ['Constant', locale],
    placeholder: locale,
  });
  assert.deepEqual(answer.config.base.correctAnswers, ['Constant', {}]);
  assert.deepEqual(answer.config.locales(), { correctAnswers: [{}, locale], placeholder: locale });
  assert.equal(answer.config.base.placeholder, undefined);

  const number = defineAnswerWithNumber({ ...common('answerWithNumber'), correctAnswers: [1, 2], placeholder: locale });
  assert.deepEqual(number.config.base.correctAnswers, [1, 2]);
  assert.deepEqual(number.config.locales(), { placeholder: locale });

  const text = defineFillBlanksWithText({
    ...common('fillBlanksWithText'),
    slots: [{ selector: 'slot-1', correctAnswers: ['OK', locale] }],
    placeholder: locale,
  });
  assert.deepEqual(text.config.base.slots, [{ selector: 'slot-1', correctAnswers: ['OK', {}] }]);
  assert.deepEqual(text.config.locales(), {
    slots: [{ correctAnswers: [{}, locale] }],
    placeholder: locale,
  });
  // #436 owns the array merge contract; these are projection checks, not merged-data assertions.
});

test('Nested child and answer constraints reject malformed inputs at runtime', () => {
  const raw = { id, slug: 'raw', type: 'text', params: {}, value: 'Raw' };
  assert.equal(selectOneAnswer_Config_Schema.safeParse({ ...common('selectOneAnswer'), answers: { ...answers, correct: { one: raw } } }).success, false);
  assert.equal(matchBlocks_Config_Schema.safeParse({ ...common('matchBlocks'), pairs: { a: { left: raw, right: block } } }).success, false);
  assert.equal(orderSequence_Config_Schema.safeParse({ ...common('orderSequence'), sequence: [] }).success, false);
  assert.equal(fillBlanksWithBlocks_Config_Schema.safeParse({ ...common('fillBlanksWithBlocks'), slots: [{ selector: 'a', correctAnswer: raw }], distractors: [], placeholder: 'A' }).success, false);
  assert.equal(answerWithText_Config_Schema.safeParse({ ...common('answerWithText'), correctAnswers: [17], placeholder: 'A' }).success, false);
  assert.equal(answerWithNumber_Config_Schema.safeParse({ ...common('answerWithNumber'), correctAnswers: ['17'], placeholder: 'A' }).success, false);
  assert.equal(fillBlanksWithText_Config_Schema.safeParse({ ...common('fillBlanksWithText'), slots: [{ selector: 'a', correctAnswers: [17] }], placeholder: 'A' }).success, false);
  assert.equal(buildAnswerWithBlocks_Config_Schema.safeParse({ ...common('buildAnswerWithBlocks'), correctSequence: [raw], distractors: [], placeholder: 'A' }).success, false);
  assert.equal(selectMultipleAnswers_Config_Schema.safeParse({ ...common('selectMultipleAnswers'), answers: { ...answers, incorrect: { bad: raw } } }).success, false);
});

test('Assessment Method slugs and perception restrictions have finite schema-backed values', () => {
  assert.equal(assessmentMethodSlugs.length, 16);
  assert.equal(allDisabilities.length, 19);
  for (const slug of assessmentMethodSlugs) {
    assert.equal(assessmentMethodSlug_Schema.safeParse(slug).success, true, slug);
  }
  for (const disability of allDisabilities) {
    assert.equal(disability_Schema.safeParse(disability).success, true, disability);
  }
  assert.equal(assessmentMethodSlug_Schema.safeParse('legacy-method-id').success, false);
  assert.equal(disability_Schema.safeParse('text').success, false);
  assert.equal(disability_Schema.safeParse('none').success, false);
});
