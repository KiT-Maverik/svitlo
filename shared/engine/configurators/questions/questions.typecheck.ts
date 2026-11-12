import { defineText } from '../contentBlocks/defineText';
import {
  defineSelectOneAnswer, defineSelectMultipleAnswers, defineMatchBlocks,
  defineAnswerWithText, defineAnswerWithNumber, defineOrderSequence,
  defineBuildAnswerWithBlocks, defineFillBlanksWithBlocks, defineFillBlanksWithText,
} from './index';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const block = defineText({ id, type: 'text', slug: 'answerBlock', params: {}, locale: { value: 'OK' } });
const params = { assessmentMethod: 'retrieval' as const, restrictions: ['dyslexia' as const] };
const common = {
  id, slug: 'questionOne' as const, params, locale: {},
  content: { question: { items: { answerBlock: block }, order: ['answerBlock'] } },
};
const answers = {
  correct: { items: { answerBlock: block }, order: ['answerBlock'] },
  incorrect: { items: {}, order: [] },
  distractors: { items: {}, order: [] },
};
const one = defineSelectOneAnswer({ ...common, type: 'selectOneAnswer', content: { ...common.content, answers } });
const multiple = defineSelectMultipleAnswers({ ...common, type: 'selectMultipleAnswers', content: { ...common.content, answers } });
const matched = defineMatchBlocks({
  ...common, type: 'matchBlocks',
  content: { ...common.content, pairs: { items: { firstPair: { left: block, right: block } }, order: ['firstPair'] } },
});
const text = defineAnswerWithText({
  ...common, type: 'answerWithText',
  locale: { correctAnswers: { first: 'yes' }, placeholder: 'Answer' },
});
const number = defineAnswerWithNumber({
  ...common, type: 'answerWithNumber', params: { ...params, correctAnswers: [2] }, locale: { placeholder: 'Number' },
});
const order = defineOrderSequence({
  ...common, type: 'orderSequence',
  content: { ...common.content, sequence: { items: { answerBlock: block }, order: ['answerBlock'] } },
});
const build = defineBuildAnswerWithBlocks({
  ...common, type: 'buildAnswerWithBlocks', locale: { placeholder: 'Build' },
  content: {
    ...common.content, correctSequence: { items: { answerBlock: block }, order: ['answerBlock'] },
    distractors: { items: {}, order: [] },
  },
});
const blocks = defineFillBlanksWithBlocks({
  ...common, type: 'fillBlanksWithBlocks', locale: { placeholder: 'Fill' },
  content: {
    ...common.content, slots: { items: { slot: { correctAnswer: block } }, order: ['slot'] },
    distractors: { items: {}, order: [] },
  },
});
const blanks = defineFillBlanksWithText({
  ...common, type: 'fillBlanksWithText',
  locale: { slots: { slot: { correctAnswers: { first: 'yes' } } }, placeholder: 'Fill' },
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
type AnswerBlock = Expect<Equal<typeof one.content.answers.correct.items.answerBlock, typeof block>>;
type PromptBlock = Expect<Equal<typeof order.content.question.items.answerBlock, typeof block>>;

// @ts-expect-error IDs are immutable in sparse overrides.
one.build.overrides({ id });
// @ts-expect-error A nested question patch cannot change a child slug.
one.build.overrides({ content: { question: { items: { answerBlock: { slug: 'another' } } } } });
// @ts-expect-error Number question answers must remain numeric.
number.build.overrides({ params: { correctAnswers: ['2'] } });
// @ts-expect-error Assessment Method slugs are closed.
defineSelectOneAnswer({ ...common, type: 'selectOneAnswer', params: { ...params, assessmentMethod: 'unknown' }, content: { ...common.content, answers } });

const localizedBlock = defineText<'localizedBlock', ['uk', 'en']>({
  id, type: 'text', slug: 'localizedBlock', params: {}, locale: { value: { uk: 'Так', en: 'Yes' } },
});
const localContent = { question: { items: { localizedBlock }, order: ['localizedBlock'] } };
const validLanguageChild = defineAnswerWithNumber<'validLanguageChild', typeof localContent, ['uk']>({
  id, slug: 'validLanguageChild', type: 'answerWithNumber', params: { ...params, correctAnswers: [1] },
  locale: { placeholder: { uk: 'Відповідь' } }, content: localContent,
});
// @ts-expect-error Typed Question cannot require an unsupported child language (pl).
defineAnswerWithNumber<'badLanguageChild', typeof localContent, ['uk', 'en', 'pl']>({
  id, slug: 'badLanguageChild', type: 'answerWithNumber', params: { ...params, correctAnswers: [1] },
  locale: { placeholder: { uk: 'Відповідь', en: 'Answer', pl: 'Odpowiedź' } },
  content: localContent,
});
// @ts-expect-error Config language tuple needs all declared translations.
defineAnswerWithNumber<'badLocale', typeof localContent, ['uk', 'en']>({
  id, slug: 'badLocale', type: 'answerWithNumber', params: { ...params, correctAnswers: [1] },
  locale: { placeholder: { uk: 'Відповідь' } }, content: localContent,
});

void [one, multiple, matched, text, number, order, build, blocks, blanks, validLanguageChild];
