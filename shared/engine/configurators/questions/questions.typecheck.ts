import { defineText } from '../contentBlocks/primitive/defineText';
import {
  defineAnswerWithNumber,
  defineAnswerWithText,
  defineBuildAnswerWithBlocks,
  defineFillBlanksWithBlocks,
  defineFillBlanksWithText,
  defineMatchBlocks,
  defineOrderSequence,
  defineSelectMultipleAnswers,
  defineSelectOneAnswer,
} from './index';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

const scope = { languages: ['en', 'uk'] as const };
const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const block = defineText({ id, type: 'text', slug: 'answerBlock', params: {}, locale: { value: 'OK' } });
const params = { assessmentMethod: 'retrieval' as const, restrictions: ['dyslexia' as const] };
const common = {
  id,
  slug: 'questionOne' as const,
  params,
  locale: {},
  content: { question: { answerBlock: block, children: ['answerBlock'] } },
};
const answers = {
  correct: { answerBlock: block, children: ['answerBlock'] },
  incorrect: { children: [] },
  distractors: { children: [] },
};
const one = defineSelectOneAnswer({ ...common, type: 'selectOneAnswer', content: { ...common.content, answers } });
const multiple = defineSelectMultipleAnswers({
  ...common,
  type: 'selectMultipleAnswers',
  content: { ...common.content, answers },
});
const matched = defineMatchBlocks({
  ...common,
  type: 'matchBlocks',
  content: { ...common.content, pairs: { firstPair: { left: block, right: block }, children: ['firstPair'] } },
});
const text = defineAnswerWithText({
  ...common,
  type: 'answerWithText',
  locale: { correctAnswers: { first: 'yes' }, placeholder: 'Answer' },
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
  content: { ...common.content, sequence: { answerBlock: block, children: ['answerBlock'] } },
});
const build = defineBuildAnswerWithBlocks({
  ...common,
  type: 'buildAnswerWithBlocks',
  locale: { placeholder: 'Build' },
  content: {
    ...common.content,
    correctSequence: { answerBlock: block, children: ['answerBlock'] },
    distractors: { children: [] },
  },
});
const blocks = defineFillBlanksWithBlocks({
  ...common,
  type: 'fillBlanksWithBlocks',
  locale: { placeholder: 'Fill' },
  content: {
    ...common.content,
    slots: { slot: { correctAnswer: block }, children: ['slot'] },
    distractors: { children: [] },
  },
});
const blanks = defineFillBlanksWithText({
  ...common,
  type: 'fillBlanksWithText',
  locale: { placeholder: 'Fill' },
  content: { ...common.content, slots: { slot: { correctAnswers: { first: 'yes' } }, children: ['slot'] } },
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
type AnswerBlock = Expect<Equal<typeof one.content.answers.correct.answerBlock, typeof block>>;
type PromptBlock = Expect<Equal<typeof order.content.question.answerBlock, typeof block>>;

// @ts-expect-error IDs are immutable in sparse overrides.
one.build.overrides({ id }, scope);
// @ts-expect-error A nested question patch cannot change a child slug.
one.build.overrides({ content: { question: { answerBlock: { slug: 'another' } } } }, scope);
// @ts-expect-error Number question answers must remain numeric.
number.build.overrides({ params: { correctAnswers: ['2'] } }, scope);
// @ts-expect-error A Question cannot accept arbitrary content role names.
number.build.overrides({ content: { otherRole: { children: [] } } }, scope);
// @ts-expect-error A reserved slug is never an authored prompt child.
number.build.overrides({ content: { question: { children: ['answerBlock', 'items'], items: block } } }, scope);
// @ts-expect-error An unrecognized role is not part of text-slot Config patches.
blanks.build.overrides({ content: { otherRole: { children: [] } } }, scope);
// @ts-expect-error Reserved slot keys cannot be authored as additional named gaps.
blanks.build.overrides(
  { content: { slots: { children: ['slot', 'items'], items: { correctAnswers: { first: 'yes' } } } } },
  scope,
);
defineSelectOneAnswer({
  ...common,
  type: 'selectOneAnswer',
  // @ts-expect-error Assessment Method slugs are closed.
  params: { ...params, assessmentMethod: 'unknown' },
  content: { ...common.content, answers },
});

const localizedBlock = defineText<'localizedBlock', ['uk', 'en']>({
  id,
  type: 'text',
  slug: 'localizedBlock',
  params: {},
  locale: { value: { uk: 'Так', en: 'Yes' } },
});
const localContent = { question: { localizedBlock, children: ['localizedBlock'] } };
const validLanguageChild = defineAnswerWithNumber<'validLanguageChild', typeof localContent, ['uk']>({
  id,
  slug: 'validLanguageChild',
  type: 'answerWithNumber',
  params: { ...params, correctAnswers: [1] },
  locale: { placeholder: { uk: 'Відповідь' } },
  content: localContent,
});
defineAnswerWithNumber<'badLanguageChild', typeof localContent, ['uk', 'en', 'pl']>({
  id,
  slug: 'badLanguageChild',
  type: 'answerWithNumber',
  params: { ...params, correctAnswers: [1] },
  locale: { placeholder: { uk: 'Відповідь', en: 'Answer', pl: 'Odpowiedź' } },
  // @ts-expect-error A child lacking pl cannot satisfy a trilingual Question.
  content: localContent,
});
defineAnswerWithNumber<'badLocale', typeof localContent, ['uk', 'en']>({
  id,
  slug: 'badLocale',
  type: 'answerWithNumber',
  params: { ...params, correctAnswers: [1] },
  // @ts-expect-error A bilingual Question must provide both translations.
  locale: { placeholder: { uk: 'Відповідь' } },
  content: localContent,
});

void [one, multiple, matched, text, number, order, build, blocks, blanks, validLanguageChild];

const anotherLocalizedBlock = defineText<'anotherLocalizedBlock', ['uk', 'en']>({
  id,
  type: 'text',
  slug: 'anotherLocalizedBlock',
  params: {},
  locale: { value: { uk: 'Ні', en: 'No' } },
});
const onlyUkrainianBlock = defineText<'onlyUkrainianBlock', ['uk']>({
  id,
  type: 'text',
  slug: 'onlyUkrainianBlock',
  params: {},
  locale: { value: { uk: 'Тільки українською' } },
});

const scopedPairContent = {
  ...localContent,
  pairs: {
    firstPair: { left: localizedBlock, right: anotherLocalizedBlock },
    children: ['firstPair'],
  },
};
const scopedMatch = defineMatchBlocks<'scopedMatch', typeof scopedPairContent, ['uk', 'en']>({
  id,
  slug: 'scopedMatch',
  type: 'matchBlocks',
  params,
  locale: {},
  content: scopedPairContent,
});
scopedMatch.build.overrides(
  {
    content: {
      pairs: {
        secondPair: { left: anotherLocalizedBlock, right: localizedBlock },
        children: ['firstPair', 'secondPair'],
      },
    },
  },
  scope,
);
// @ts-expect-error A bilingual Question cannot add a Ukrainian-only child.
scopedMatch.build.overrides(
  {
    content: {
      pairs: {
        secondPair: { left: onlyUkrainianBlock, right: localizedBlock },
        children: ['firstPair', 'secondPair'],
      },
    },
  },
  scope,
);
// @ts-expect-error MatchBlocks order keys must refer to authored or added pairs.
scopedMatch.build.overrides({ content: { pairs: { children: ['missingPair'] } } }, scope);

const scopedSlotContent = {
  ...localContent,
  slots: { originalSlot: { correctAnswer: localizedBlock }, children: ['originalSlot'] },
  distractors: { anotherLocalizedBlock, children: ['anotherLocalizedBlock'] },
};
const scopedBlocks = defineFillBlanksWithBlocks<'scopedBlocks', typeof scopedSlotContent, ['uk', 'en']>({
  id,
  slug: 'scopedBlocks',
  type: 'fillBlanksWithBlocks',
  params,
  locale: { placeholder: { uk: 'Вставте', en: 'Fill' } },
  content: scopedSlotContent,
});
scopedBlocks.build.overrides(
  {
    content: {
      slots: {
        secondSlot: { correctAnswer: anotherLocalizedBlock },
        children: ['originalSlot', 'secondSlot'],
      },
    },
  },
  scope,
);
// @ts-expect-error Bilingual Question slots require bilingual ContentBlocks.
scopedBlocks.build.overrides(
  {
    content: {
      slots: {
        secondSlot: { correctAnswer: onlyUkrainianBlock },
        children: ['originalSlot', 'secondSlot'],
      },
    },
  },
  scope,
);
// @ts-expect-error Block slot order cannot refer to arbitrary selectors.
scopedBlocks.build.overrides({ content: { slots: { children: ['unknownSlot'] } } }, scope);

const scopedTextSlotContent = {
  ...localContent,
  slots: { originalSlot: { correctAnswers: { first: { uk: 'Так', en: 'Yes' } } }, children: ['originalSlot'] },
};
const scopedTextSlots = defineFillBlanksWithText<'scopedTextSlots', typeof scopedTextSlotContent, ['uk', 'en']>({
  id,
  slug: 'scopedTextSlots',
  type: 'fillBlanksWithText',
  params,
  locale: { placeholder: { uk: 'Вставте', en: 'Fill' } },
  content: scopedTextSlotContent,
});
scopedTextSlots.build.overrides(
  {
    content: {
      slots: {
        secondSlot: { correctAnswers: { first: { uk: 'Так', en: 'Yes' } } },
        children: ['originalSlot', 'secondSlot'],
      },
    },
  },
  scope,
);
// @ts-expect-error The added slot needs the declared English translation.
scopedTextSlots.build.overrides(
  {
    content: {
      slots: {
        secondSlot: { correctAnswers: { first: { uk: 'Так' } } },
        children: ['originalSlot', 'secondSlot'],
      },
    },
  },
  scope,
);
// @ts-expect-error Text slot order must use known or added keys.
scopedTextSlots.build.overrides({ content: { slots: { children: ['unknownSlot'] } } }, scope);

void [scopedMatch, scopedBlocks, scopedTextSlots];

const numberResource = number.build.data(scope);
const typedAnswers: number[] = numberResource.base.params.correctAnswers;
const numberPrompt = numberResource.base.content.question.answerBlock;
if (!numberPrompt || typeof numberPrompt !== 'object' || Array.isArray(numberPrompt) || !('slug' in numberPrompt)) {
  throw new Error('Published Question answerBlock must have a slug');
}
const typedPromptSlug: string = numberPrompt.slug;
const typedNumberLocale: string | undefined = numberResource.locale?.uk?.locale?.placeholder;
const numericOverride = number.build.overrides({ params: { correctAnswers: [3] } }, scope);
const typedSparseAnswers: number[] | undefined = numericOverride.base.params?.correctAnswers;
// @ts-expect-error Concrete Build props retain the numeric answer type.
const invalidNumericAnswers: string[] = numberResource.base.params.correctAnswers;
// @ts-expect-error Resource content exposes the Question's actual published shape.
numberResource.base.content.unknownMember;
// @ts-expect-error Sparse publication cannot change the Question identity.
numericOverride.base.slug;
void [typedAnswers, typedPromptSlug, typedNumberLocale, typedSparseAnswers, invalidNumericAnswers];

validLanguageChild.build.data({ languages: ['uk'] });
validLanguageChild.build.overrides({}, { languages: ['uk'] });
// @ts-expect-error The typed Question only supports its declared publication languages.
validLanguageChild.build.data({ languages: ['en'] });
// @ts-expect-error Explicit language selection is required.
validLanguageChild.build.data();
// @ts-expect-error An override publication also requires language options.
validLanguageChild.build.overrides({});
