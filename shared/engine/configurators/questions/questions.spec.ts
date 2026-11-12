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
  selectOneAnswer_Props_Schema,
} from './index';

const scope = { languages: ['en', 'uk'] as const };
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
  id,
  slug: 'questionOne' as const,
  type,
  params,
  locale: {},
  content: prompt,
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
      ...common('orderSequence'),
      content: { ...prompt, sequence: collection(yes) },
    }),
    defineBuildAnswerWithBlocks({
      ...common('buildAnswerWithBlocks'),
      locale: { placeholder: localized },
      content: { ...prompt, correctSequence: collection(yes), distractors: collection(no) },
    }),
    defineFillBlanksWithBlocks({
      ...common('fillBlanksWithBlocks'),
      locale: { placeholder: localized },
      content: {
        ...prompt,
        slots: { items: { slotOne: { correctAnswer: yes } }, order: ['slotOne'] },
        distractors: collection(no),
      },
    }),
    defineFillBlanksWithText({
      ...common('fillBlanksWithText'),
      locale: { placeholder: localized },
      content: {
        ...prompt,
        slots: { items: { slotOne: { correctAnswers: { first: 'Yes', second: localized } } }, order: ['slotOne'] },
      },
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
    const a = question.build.props(scope);
    const b = question.build.props(scope);
    assert.deepEqual(a, b);
    assert.deepEqual((a.base.content as { question: { slug: string }[] }).question[0].slug, 'promptBlock');
    assert.doesNotThrow(() => JSON.stringify(a));
    const override = question.build.overrides as (patch: never, options: typeof scope) => unknown;
    assert.doesNotThrow(() => JSON.stringify(override({ params: { disabled: true } } as never, scope)));
    assert.throws(() => override({ type: 'modified' } as never, scope), /overrides/);
    assert.throws(() => override({ locale: { unexpected: 'X' } } as never, scope), /overrides/);
  }
  assert.equal(
    (
      instances[0].build.props(scope).base.content as unknown as {
        answers: { correct: { yes: { slug: string } } };
      }
    ).answers.correct.yes.slug,
    'yes',
  );
  assert.equal(
    (
      instances[2].build.props(scope).base.content as unknown as {
        pairs: { pairOne: { left: { slug: string } } };
      }
    ).pairs.pairOne.left.slug,
    'yes',
  );
  assert.equal(
    (instances[5].build.props(scope).base.content as { sequence: { slug: string }[] }).sequence[0].slug,
    'yes',
  );
  assert.equal(
    (
      instances[6].build.props(scope).base.content as {
        correctSequence: { slug: string }[];
      }
    ).correctSequence[0].slug,
    'yes',
  );
  assert.equal(
    (
      instances[7].build.props(scope).base.content as {
        slots: { selector: string }[];
      }
    ).slots[0].selector,
    'slotOne',
  );
});

test('Question prompt collections support additions, disables, ordering, and identity guards', () => {
  const question = defineAnswerWithNumber({
    ...common('answerWithNumber'),
    params: { ...params, correctAnswers: [5] },
    locale: { placeholder: localized },
  });
  const override = question.build.overrides(
    {
      content: {
        question: {
          items: { promptBlock: false },
          additionalItems: { extra },
          order: ['extra'],
        },
      },
    },
    scope,
  );
  assert.deepEqual(
    (override.base.content as { question: { slug: string }[] }).question.map(item => item.slug),
    ['extra'],
  );
  assert.throws(
    () =>
      question.build.overrides(
        {
          content: { question: { items: { promptBlock: false } } },
        },
        scope,
      ),
    /order/,
  );
  assert.throws(
    () =>
      question.build.overrides(
        {
          content: { question: { order: ['notFound'] } },
        },
        scope,
      ),
    /Unknown slug/,
  );
  assert.throws(
    () =>
      question.build.overrides(
        {
          content: { question: { items: { promptBlock: { id: 'changed' } as never } } },
        },
        scope,
      ),
    /overrides/,
  );
  assert.deepEqual(
    (
      question.build.props(scope).base.content as {
        question: { slug: string }[];
      }
    ).question[0].slug,
    'promptBlock',
  );
});

test('Question localized answers and slots publish full Props-shaped arrays and sparse language patches', () => {
  const text = defineAnswerWithText({
    ...common('answerWithText'),
    locale: { correctAnswers: { first: 'Yes', second: localized }, placeholder: localized },
  });
  const props = text.build.props(scope);
  assert.deepEqual((props.locale?.uk as { locale: { correctAnswers: string[] } }).locale.correctAnswers, [
    'Yes',
    'Відповідь',
  ]);
  assert.deepEqual((props.locale?.en as { locale: { correctAnswers: string[] } }).locale.correctAnswers, [
    'Yes',
    'Answer',
  ]);
  assert.equal(JSON.stringify(props).includes('"first"'), false);
  const patch = text.build.overrides({ locale: { correctAnswers: { second: { uk: 'Так' } } } }, scope);
  assert.equal(patch.locale?.en, undefined);
  assert.deepEqual((patch.locale?.uk as { locale: { correctAnswers: string[] } }).locale.correctAnswers, [
    'Yes',
    'Так',
  ]);

  const blanks = defineFillBlanksWithText({
    ...common('fillBlanksWithText'),
    locale: { placeholder: localized },
    content: {
      ...prompt,
      slots: { items: { one: { correctAnswers: { yes: 'Yes', another: localized } } }, order: ['one'] },
    },
  });
  assert.deepEqual((blanks.build.props(scope).locale?.uk as { locale: { slots: unknown[] } }).locale.slots, [
    { selector: 'one', correctAnswers: ['Yes', 'Відповідь'] },
  ]);
  const sparse = blanks.build.overrides(
    { content: { slots: { items: { one: { correctAnswers: { another: { uk: 'Так' } } } } } } },
    scope,
  );
  assert.equal(sparse.locale?.en, undefined);
  assert.deepEqual((sparse.locale?.uk as { locale: { slots: unknown[] } }).locale.slots, [
    { selector: 'one', correctAnswers: ['Yes', 'Так'] },
  ]);
});

test('numeric scoring values remain atomic and Question build results are isolated', () => {
  const input = {
    ...common('answerWithNumber'),
    params: { ...params, correctAnswers: [1, 2] },
    locale: { placeholder: localized },
  };
  const question = defineAnswerWithNumber(input);
  assert.equal(answerWithNumber_Config_Schema.safeParse(input).success, true);
  const first = question.build.props(scope);
  const patch = question.build.overrides({ params: { correctAnswers: [7], restrictions: [] } }, scope);
  assert.deepEqual((patch.base.params as { correctAnswers: number[] }).correctAnswers, [7]);
  (patch.base.params as { correctAnswers: number[] }).correctAnswers.push(8);
  assert.deepEqual((question.build.props(scope).base.params as { correctAnswers: number[] }).correctAnswers, [1, 2]);
  (first.base.params as { correctAnswers: number[] }).correctAnswers.push(3);
  assert.deepEqual((question.build.props(scope).base.params as { correctAnswers: number[] }).correctAnswers, [1, 2]);
  assert.throws(() => question.build.overrides({ params: { correctAnswers: ['two'] } } as never, scope));
});

test('scored answers remain enabled after nested child overrides', () => {
  const one = defineSelectOneAnswer({ ...common('selectOneAnswer'), content: { ...prompt, answers } });
  assert.throws(
    () =>
      one.build.overrides(
        { content: { answers: { correct: { items: { yes: { params: { disabled: true } } } } } } },
        scope,
      ),
    /enabled ContentBlock/,
  );

  const multiple = defineSelectMultipleAnswers({
    ...common('selectMultipleAnswers'),
    content: { ...prompt, answers },
  });
  assert.throws(
    () =>
      multiple.build.overrides(
        { content: { answers: { correct: { items: { yes: { params: { disabled: true } } } } } } },
        scope,
      ),
    /enabled ContentBlock/,
  );

  const match = defineMatchBlocks({
    ...common('matchBlocks'),
    content: { ...prompt, pairs: { items: { pairOne: { left: yes, right: no } }, order: ['pairOne'] } },
  });
  assert.throws(
    () =>
      match.build.overrides(
        { content: { pairs: { items: { pairOne: { left: { params: { disabled: true } } } } } } },
        scope,
      ),
    /enabled ContentBlock/,
  );

  const blanks = defineFillBlanksWithBlocks({
    ...common('fillBlanksWithBlocks'),
    locale: { placeholder: 'Fill' },
    content: {
      ...prompt,
      slots: { items: { slotOne: { correctAnswer: yes } }, order: ['slotOne'] },
      distractors: collection(no),
    },
  });
  assert.throws(
    () =>
      blanks.build.overrides(
        {
          content: { slots: { items: { slotOne: { correctAnswer: { params: { disabled: true } } } } } },
        },
        scope,
      ),
    /enabled ContentBlock/,
  );

  const sequence = defineOrderSequence({
    ...common('orderSequence'),
    content: { ...prompt, sequence: collection(yes) },
  });
  assert.throws(
    () =>
      sequence.build.overrides({ content: { sequence: { items: { yes: { params: { disabled: true } } } } } }, scope),
    /enabled ContentBlock/,
  );

  const built = defineBuildAnswerWithBlocks({
    ...common('buildAnswerWithBlocks'),
    locale: { placeholder: 'Build' },
    content: { ...prompt, correctSequence: collection(yes), distractors: collection(no) },
  });
  assert.throws(
    () =>
      built.build.overrides(
        { content: { correctSequence: { items: { yes: { params: { disabled: true } } } } } },
        scope,
      ),
    /enabled ContentBlock/,
  );
});

test('SelectMultipleAnswers rejects partially disabled correct answer sets', () => {
  const secondCorrect = block('secondCorrect', 'Second correct answer');
  const multi = defineSelectMultipleAnswers({
    ...common('selectMultipleAnswers'),
    content: {
      ...prompt,
      answers: {
        correct: { items: { yes, secondCorrect }, order: ['yes', 'secondCorrect'] },
        incorrect: collection(no),
        distractors: collection(maybe),
      },
    },
  });
  assert.throws(
    () =>
      multi.build.overrides(
        {
          content: { answers: { correct: { items: { yes: { params: { disabled: true } } } } } },
        },
        scope,
      ),
    /enabled ContentBlock/,
  );
});

test('invariant-only Questions publish a required empty locale Props object', () => {
  const question = defineSelectOneAnswer({
    ...common('selectOneAnswer'),
    content: { ...prompt, answers },
  });
  const built = question.build.props(scope);
  assert.deepEqual(built.base.locale, {});
  assert.equal(built.locale, undefined);
  assert.equal(selectOneAnswer_Props_Schema.safeParse(built.base).success, true);
  // A sparse patch must not inject empty locale data.
  const patch = question.build.overrides({ params: { restrictions: [] } }, scope);
  assert.equal(Object.hasOwn(patch.base, 'locale'), false);
});

test('explicit publication languages limit resource and override locale files', () => {
  const question = defineAnswerWithText({
    ...common('answerWithText'),
    locale: {
      placeholder: { en: 'Answer', uk: 'Відповідь', pl: 'Odpowiedź' },
      correctAnswers: {
        first: { en: 'Yes', uk: 'Так', pl: 'Tak' },
        second: 'OK',
      },
    },
  });
  const published = question.build.props({ languages: ['uk'] });
  assert.deepEqual(Object.keys(published.locale ?? {}), ['uk']);
  assert.deepEqual((published.locale?.uk as { locale: { correctAnswers: string[] } }).locale.correctAnswers, [
    'Так',
    'OK',
  ]);
  const patch = question.build.overrides(
    { locale: { correctAnswers: { first: { en: 'Sure', uk: 'Авжеж', pl: 'Pewnie' } } } },
    { languages: ['uk'] },
  );
  assert.deepEqual(Object.keys(patch.locale ?? {}), ['uk']);
  assert.deepEqual((patch.locale?.uk as { locale: { correctAnswers: string[] } }).locale.correctAnswers, [
    'Авжеж',
    'OK',
  ]);
  assert.equal(
    question.build.overrides({ locale: { correctAnswers: { first: { pl: 'Pewnie' } } } }, { languages: ['uk'] }).locale,
    undefined,
  );

  assert.throws(() => question.build.props({ languages: [] }), /nonempty languages/);
  assert.throws(() => question.build.props({ languages: ['uk', 'uk'] }), /unique/);
  assert.throws(() => question.build.props({ languages: ['bad'] as never }));
  assert.throws(() => (question.build.props as (options?: unknown) => unknown)(), /languages/);
});

test('publication validates selected child translations without requiring unselected ones', () => {
  const localizedPrompt = defineText({
    id,
    slug: 'translatedPrompt',
    type: 'text',
    params: {},
    locale: { value: { uk: 'Питання', en: 'Question', pl: 'Pytanie' } },
  });
  const question = defineAnswerWithNumber({
    ...common('answerWithNumber'),
    params: { ...params, correctAnswers: [4] },
    locale: { placeholder: 'Number' },
    content: { question: collection(localizedPrompt) },
  });
  assert.deepEqual(Object.keys(question.build.props({ languages: ['uk'] }).locale ?? {}), ['uk']);

  const missing = defineText({
    id,
    slug: 'missingEnglish',
    type: 'text',
    params: {},
    locale: { value: { uk: 'Лише українською' } },
  });
  const badQuestion = defineAnswerWithNumber({
    ...common('answerWithNumber'),
    params: { ...params, correctAnswers: [4] },
    locale: { placeholder: 'Number' },
    content: { question: collection(missing) },
  });
  assert.doesNotThrow(() => badQuestion.build.props({ languages: ['uk'] }));
  assert.throws(() => badQuestion.build.props({ languages: ['en'] }), /ContentBlock publication|Invalid publication for language en/);
});

test('invariant child collections emit no redundant locale files', () => {
  const question = defineOrderSequence({
    ...common('orderSequence'),
    content: { ...prompt, sequence: collection(yes) },
  });
  assert.equal(question.build.props({ languages: ['uk', 'en'] }).locale, undefined);
});

test('nested child overrides publish only the explicitly requested locale', () => {
  const translated = defineText({
    id,
    slug: 'translatedPrompt',
    type: 'text',
    params: {},
    locale: { value: { uk: 'Запитання', en: 'Question', pl: 'Pytanie' } },
  });
  const question = defineAnswerWithNumber({
    ...common('answerWithNumber'),
    params: { ...params, correctAnswers: [1] },
    locale: { placeholder: 'Number' },
    content: { question: collection(translated) },
  });
  const patch = question.build.overrides(
    {
      content: {
        question: {
          items: {
            translatedPrompt: { locale: { value: { uk: 'Оновлено', en: 'Updated', pl: 'Zmienione' } } },
          },
        },
      },
    },
    { languages: ['uk'] },
  );
  assert.deepEqual(Object.keys(patch.locale ?? {}), ['uk']);
  const blocks = (patch.locale?.uk as { content: { question: { locale: { value: string } }[] } }).content.question;
  assert.equal(blocks[0].locale.value, 'Оновлено');
});

test('localized answer and text-slot projections reject only missing selected translations', () => {
  const answer = defineAnswerWithText({
    ...common('answerWithText'),
    locale: { correctAnswers: { yes: { uk: 'Так' } }, placeholder: 'Answer' },
  });
  assert.doesNotThrow(() => answer.build.props({ languages: ['uk'] }));
  assert.throws(() => answer.build.props({ languages: ['en'] }), /Incomplete accepted-answer set/);

  const slot = defineFillBlanksWithText({
    ...common('fillBlanksWithText'),
    locale: { placeholder: 'Answer' },
    content: {
      ...prompt,
      slots: { items: { firstSlot: { correctAnswers: { yes: { uk: 'Так' } } } }, order: ['firstSlot'] },
    },
  });
  assert.doesNotThrow(() => slot.build.props({ languages: ['uk'] }));
  assert.throws(() => slot.build.props({ languages: ['en'] }), /Incomplete text slot/);
});
