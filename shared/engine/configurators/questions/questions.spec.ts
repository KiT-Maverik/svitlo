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
  answerWithNumber_Config_Schema,
} from './index';

const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const block = <const Slug extends string>(slug: Slug, text: string) =>
  defineText({ id, slug, type: 'text', params: {}, locale: { value: text } });
const promptBlock = block('promptBlock', 'Question?');
const yes = block('yes', 'Yes');
const no = block('no', 'No');
const maybe = block('maybe', 'Maybe');
const extra = block('extra', 'Extra');
const collection = <const Slug extends string, T extends { slug: Slug }>(value: T) => ({
  items: { [value.slug]: value } as Record<Slug, T>,
  order: [value.slug] as Slug[],
});
const prompt = { question: collection(promptBlock) };
const params = { assessmentMethod: 'retrieval' as const, restrictions: ['dyslexia' as const] };
const localized = { en: 'Answer', uk: 'Відповідь' } as const;
const common = <const Type extends string>(type: Type) => ({
  id, slug: 'questionOne' as const, type, params, locale: {}, content: prompt,
});
const answers = {
  correct: collection(yes),
  incorrect: collection(no),
  distractors: collection(maybe),
};

test('all nine Questions expose immutable stateless Build instead of mutable overrides', () => {
  const instances = [
    defineSelectOneAnswer({ ...common('selectOneAnswer'), content: { ...prompt, answers } }),
    defineSelectMultipleAnswers({ ...common('selectMultipleAnswers'), content: { ...prompt, answers } }),
    defineMatchBlocks({
      ...common('matchBlocks'),
      content: { ...prompt, pairs: { items: { pairOne: { left: yes, right: no } }, order: ['pairOne'] } },
    }),
    defineAnswerWithText({
      ...common('answerWithText'),
      locale: { correctAnswers: { first: 'Yes', second: localized }, placeholder: localized },
    }),
    defineAnswerWithNumber({
      ...common('answerWithNumber'),
      params: { ...params, correctAnswers: [42] },
      locale: { placeholder: localized },
    }),
    defineOrderSequence({
      ...common('orderSequence'), content: { ...prompt, sequence: collection(yes) },
    }),
    defineBuildAnswerWithBlocks({
      ...common('buildAnswerWithBlocks'), locale: { placeholder: localized },
      content: { ...prompt, correctSequence: collection(yes), distractors: collection(no) },
    }),
    defineFillBlanksWithBlocks({
      ...common('fillBlanksWithBlocks'), locale: { placeholder: localized },
      content: {
        ...prompt,
        slots: { items: { slotOne: { correctAnswer: yes } }, order: ['slotOne'] },
        distractors: collection(no),
      },
    }),
    defineFillBlanksWithText({
      ...common('fillBlanksWithText'),
      locale: { placeholder: localized },
      content: { ...prompt, slots: { items: { slotOne: { correctAnswers: { first: 'Yes', second: localized } } }, order: ['slotOne'] } },
    }),
  ];

  for (const question of instances) {
    assert.equal(question.id, id);
    assert.equal(question.slug, 'questionOne');
    assert.equal(question.config.base.type, question.type);
    assert.equal(typeof question.build.props, 'function');
    assert.equal(typeof question.build.overrides, 'function');
    assert.equal('override' in question, false);
    assert.equal('disable' in question, false);
    assert.equal('overrides' in question.config, false);
    const a = question.build.props();
    const b = question.build.props();
    assert.deepEqual(a, b);
    assert.deepEqual((a.base.content as { question: { slug: string }[] }).question[0].slug, 'promptBlock');
    assert.doesNotThrow(() => JSON.stringify(a));
    assert.doesNotThrow(() => JSON.stringify(question.build.overrides({ params: { disabled: true } })));
    assert.throws(() => question.build.overrides({ type: 'modified' } as never), /overrides/);
    assert.throws(() => question.build.overrides({ locale: { unexpected: 'X' } } as never), /overrides/);
  }
  assert.equal((instances[0].build.props().base.content as {
    answers: { correct: { yes: { slug: string } } };
  }).answers.correct.yes.slug, 'yes');
  assert.equal((instances[2].build.props().base.content as {
    pairs: { pairOne: { left: { slug: string } } };
  }).pairs.pairOne.left.slug, 'yes');
  assert.equal((instances[5].build.props().base.content as { sequence: { slug: string }[] }).sequence[0].slug, 'yes');
  assert.equal((instances[6].build.props().base.content as {
    correctSequence: { slug: string }[];
  }).correctSequence[0].slug, 'yes');
  assert.equal((instances[7].build.props().base.content as {
    slots: { selector: string }[];
  }).slots[0].selector, 'slotOne');
});

test('Question prompt collections support additions, disables, ordering, and identity guards', () => {
  const question = defineAnswerWithNumber({
    ...common('answerWithNumber'), params: { ...params, correctAnswers: [5] },
    locale: { placeholder: localized },
  });
  const override = question.build.overrides({
    content: {
      question: {
        items: { promptBlock: false },
        additionalItems: { extra },
        order: ['extra'],
      },
    },
  });
  assert.deepEqual((override.base.content as {question:{slug:string}[]}).question.map(item => item.slug), ['extra']);
  assert.throws(() => question.build.overrides({
    content: { question: { items: { promptBlock: false } } },
  }), /order/);
  assert.throws(() => question.build.overrides({
    content: { question: { order: ['notFound'] } },
  }), /Unknown slug/);
  assert.throws(() => question.build.overrides({
    content: { question: { items: { promptBlock: { id: 'changed' } as never } } },
  }), /overrides/);
  assert.deepEqual((question.build.props().base.content as {
    question: { slug: string }[];
  }).question[0].slug, 'promptBlock');
});

test('Question localized answers and slots publish full Props-shaped arrays and sparse language patches', () => {
  const text = defineAnswerWithText({
    ...common('answerWithText'),
    locale: { correctAnswers: { first: 'Yes', second: localized }, placeholder: localized },
  });
  const props = text.build.props();
  assert.deepEqual((props.locale?.uk as {locale:{correctAnswers:string[]}}).locale.correctAnswers, ['Yes', 'Відповідь']);
  assert.deepEqual((props.locale?.en as {locale:{correctAnswers:string[]}}).locale.correctAnswers, ['Yes', 'Answer']);
  assert.equal(JSON.stringify(props).includes('"first"'), false);
  const patch = text.build.overrides({ locale: { correctAnswers: { second: { uk: 'Так' } } } });
  assert.equal(patch.locale?.en, undefined);
  assert.deepEqual((patch.locale?.uk as {locale:{correctAnswers:string[]}}).locale.correctAnswers, ['Yes', 'Так']);

  const blanks = defineFillBlanksWithText({
    ...common('fillBlanksWithText'),
    locale: { placeholder: localized },
    content: { ...prompt, slots: { items: { one: { correctAnswers: { yes: 'Yes', another: localized } } }, order: ['one'] } },
  });
  assert.deepEqual(
    (blanks.build.props().locale?.uk as { locale: { slots: unknown[] } }).locale.slots,
    [{ selector: 'one', correctAnswers: ['Yes', 'Відповідь'] }],
  );
  const sparse = blanks.build.overrides({ content: { slots: { items: { one: { correctAnswers: { another: { uk: 'Так' } } } } } } });
  assert.equal(sparse.locale?.en, undefined);
  assert.deepEqual(
    (sparse.locale?.uk as { locale: { slots: unknown[] } }).locale.slots,
    [{ selector: 'one', correctAnswers: ['Yes', 'Так'] }],
  );
});

test('numeric scoring values remain atomic and Question build results are isolated', () => {
  const input = {
    ...common('answerWithNumber'),
    params: { ...params, correctAnswers: [1, 2] },
    locale: { placeholder: localized },
  };
  const question = defineAnswerWithNumber(input);
  assert.equal(answerWithNumber_Config_Schema.safeParse(input).success, true);
  const first = question.build.props();
  const patch = question.build.overrides({ params: { correctAnswers: [7], restrictions: [] } });
  assert.deepEqual((patch.base.params as { correctAnswers: number[] }).correctAnswers, [7]);
  (patch.base.params as { correctAnswers: number[] }).correctAnswers.push(8);
  assert.deepEqual((question.build.props().base.params as { correctAnswers: number[] }).correctAnswers, [1, 2]);
  (first.base.params as { correctAnswers: number[] }).correctAnswers.push(3);
  assert.deepEqual((question.build.props().base.params as { correctAnswers: number[] }).correctAnswers, [1, 2]);
  assert.throws(() => question.build.overrides({ params: { correctAnswers: ['two'] } } as never));
});
