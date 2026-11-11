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
} from './index';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const block = defineText({ id, type: 'text', slug: 'answerBlock', params: {}, locale: { value: 'OK' } });
const params = { assessmentMethod: 'retrieval' as const, restrictions: ['dyslexia' as const] };
const common = { id, slug: 'questionOne', params, locale: {}, content: { question: [block] as [typeof block] } };
const answers = { correct: { yes: block }, incorrect: { no: block }, distractors: { maybe: block } };

const one = defineSelectOneAnswer({ ...common, type: 'selectOneAnswer', content: { ...common.content, answers } });
const multiple = defineSelectMultipleAnswers({
  ...common,
  type: 'selectMultipleAnswers',
  content: { ...common.content, answers },
});
const matched = defineMatchBlocks({
  ...common,
  type: 'matchBlocks',
  content: { ...common.content, pairs: { one: { left: block, right: block } } },
});
const text = defineAnswerWithText({
  ...common,
  type: 'answerWithText',
  locale: { correctAnswers: ['yes'], placeholder: 'Answer' },
});
const number = defineAnswerWithNumber({
  ...common,
  type: 'answerWithNumber',
  params: { ...params, correctAnswers: [2] },
  locale: { placeholder: 'Number' },
});
const order = defineOrderSequence({
  ...common,
  type: 'orderSequence',
  content: { ...common.content, sequence: [block] as [typeof block] },
});
const build = defineBuildAnswerWithBlocks({
  ...common,
  type: 'buildAnswerWithBlocks',
  locale: { placeholder: 'Build' },
  content: { ...common.content, correctSequence: [block] as [typeof block], distractors: [block] },
});
const blocks = defineFillBlanksWithBlocks({
  ...common,
  type: 'fillBlanksWithBlocks',
  locale: { placeholder: 'Fill' },
  content: { ...common.content, slots: [{ selector: 'x', correctAnswer: block }], distractors: [block] },
});
const blanks = defineFillBlanksWithText({
  ...common,
  type: 'fillBlanksWithText',
  locale: { slots: [{ selector: 'x', correctAnswers: ['yes'] }], placeholder: 'Fill' },
});

type OneSlug = Expect<Equal<typeof one.slug, 'questionOne'>>;
type MultipleSlug = Expect<Equal<typeof multiple.slug, 'questionOne'>>;
type MatchSlug = Expect<Equal<typeof matched.slug, 'questionOne'>>;
type TextSlug = Expect<Equal<typeof text.slug, 'questionOne'>>;
type NumberSlug = Expect<Equal<typeof number.slug, 'questionOne'>>;
type OrderSlug = Expect<Equal<typeof order.slug, 'questionOne'>>;
type BuildSlug = Expect<Equal<typeof build.slug, 'questionOne'>>;
type BlocksSlug = Expect<Equal<typeof blocks.slug, 'questionOne'>>;
type BlanksSlug = Expect<Equal<typeof blanks.slug, 'questionOne'>>;
type OneType = Expect<Equal<typeof one.type, 'selectOneAnswer'>>;
type AnswerBlock = Expect<Equal<typeof one.content.answers.correct.yes, typeof block>>;
type PromptBlock = Expect<Equal<(typeof order.content.question)[0], typeof block>>;

defineSelectOneAnswer({
  ...common,
  type: 'selectOneAnswer',
  // @ts-expect-error A raw authored ContentBlock is not a nested configurator.
  content: { question: [{ id, type: 'text', slug: 'raw', params: {}, locale: { value: 'raw' } }], answers },
});
defineAnswerWithNumber({
  ...common,
  type: 'answerWithNumber',
  // @ts-expect-error Number question answers must be numeric.
  params: { ...params, correctAnswers: ['2'] },
  locale: { placeholder: 'Number' },
});
defineSelectOneAnswer({
  ...common,
  type: 'selectOneAnswer',
  // @ts-expect-error Assessment Methods are known slugs.
  params: { ...params, assessmentMethod: 'unknown' },
  content: { ...common.content, answers },
});

void [one, multiple, matched, text, number, order, build, blocks, blanks];
