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

const scope = { languages: ['en', 'uk'] as const };
const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const block = defineText({ id, type: 'text', slug: 'answerBlock', params: {}, locale: { value: 'OK' } });
const params = { assessmentMethod: 'retrieval' as const, restrictions: ['dyslexia' as const] };
const common = {
  id,
  slug: 'questionOne' as const,
  params,
  locale: {},
  content: { question: { items: { answerBlock: block }, order: ['answerBlock'] } },
};
const answers = {
  correct: { items: { answerBlock: block }, order: ['answerBlock'] },
  incorrect: { items: {}, order: [] },
  distractors: { items: {}, order: [] },
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
  content: { ...common.content, pairs: { items: { firstPair: { left: block, right: block } }, order: ['firstPair'] } },
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
  content: { ...common.content, sequence: { items: { answerBlock: block }, order: ['answerBlock'] } },
});
const build = defineBuildAnswerWithBlocks({
  ...common,
  type: 'buildAnswerWithBlocks',
  locale: { placeholder: 'Build' },
  content: {
    ...common.content,
    correctSequence: { items: { answerBlock: block }, order: ['answerBlock'] },
    distractors: { items: {}, order: [] },
  },
});
const blocks = defineFillBlanksWithBlocks({
  ...common,
  type: 'fillBlanksWithBlocks',
  locale: { placeholder: 'Fill' },
  content: {
    ...common.content,
    slots: { items: { slot: { correctAnswer: block } }, order: ['slot'] },
    distractors: { items: {}, order: [] },
  },
});
const blanks = defineFillBlanksWithText({
  ...common,
  type: 'fillBlanksWithText',
  locale: { placeholder: 'Fill' },
  content: { ...common.content, slots: { items: { slot: { correctAnswers: { first: 'yes' } } }, order: ['slot'] } },
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
one.build.overrides({ id }, scope);
// @ts-expect-error A nested question patch cannot change a child slug.
one.build.overrides({ content: { question: { items: { answerBlock: { slug: 'another' } } } } }, scope);
// @ts-expect-error Number question answers must remain numeric.
number.build.overrides({ params: { correctAnswers: ['2'] } }, scope);
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
const localContent = { question: { items: { localizedBlock }, order: ['localizedBlock'] } };
const validLanguageChild = defineAnswerWithNumber<'validLanguageChild', typeof localContent, ['uk']>({
  id,
  slug: 'validLanguageChild',
  type: 'answerWithNumber',
  params: { ...params, correctAnswers: [1] },
  // @ts-expect-error Declared English support requires an English translation.
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
    items: { firstPair: { left: localizedBlock, right: anotherLocalizedBlock } },
    order: ['firstPair'],
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
        additionalItems: { secondPair: { left: anotherLocalizedBlock, right: localizedBlock } },
        order: ['firstPair', 'secondPair'],
      },
    },
  },
  scope,
);
scopedMatch.build.overrides(
  {
    content: {
      pairs: {
        // @ts-expect-error A bilingual Question cannot add a Ukrainian-only child.
        additionalItems: { secondPair: { left: onlyUkrainianBlock, right: localizedBlock } },
        order: ['firstPair', 'secondPair'],
      },
    },
  },
  scope,
);
// @ts-expect-error MatchBlocks order keys must refer to authored or added pairs.
scopedMatch.build.overrides({ content: { pairs: { order: ['missingPair'] } } }, scope);

const scopedSlotContent = {
  ...localContent,
  slots: { items: { originalSlot: { correctAnswer: localizedBlock } }, order: ['originalSlot'] },
  distractors: { items: { anotherLocalizedBlock }, order: ['anotherLocalizedBlock'] },
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
        additionalItems: { secondSlot: { correctAnswer: anotherLocalizedBlock } },
        order: ['originalSlot', 'secondSlot'],
      },
    },
  },
  scope,
);
scopedBlocks.build.overrides(
  {
    content: {
      slots: {
        // @ts-expect-error Bilingual Question slots require bilingual ContentBlocks.
        additionalItems: { secondSlot: { correctAnswer: onlyUkrainianBlock } },
        order: ['originalSlot', 'secondSlot'],
      },
    },
  },
  scope,
);
// @ts-expect-error Block slot order cannot refer to arbitrary selectors.
scopedBlocks.build.overrides({ content: { slots: { order: ['unknownSlot'] } } }, scope);

const scopedTextSlotContent = {
  ...localContent,
  slots: { items: { originalSlot: { correctAnswers: { first: { uk: 'Так', en: 'Yes' } } } }, order: ['originalSlot'] },
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
        additionalItems: { secondSlot: { correctAnswers: { first: { uk: 'Так', en: 'Yes' } } } },
        order: ['originalSlot', 'secondSlot'],
      },
    },
  },
  scope,
);
scopedTextSlots.build.overrides(
  {
    content: {
      slots: {
        // @ts-expect-error The added slot needs the declared English translation.
        additionalItems: { secondSlot: { correctAnswers: { first: { uk: 'Так' } } } },
        order: ['originalSlot', 'secondSlot'],
      },
    },
  },
  scope,
);
// @ts-expect-error Text slot order must use known or added keys.
scopedTextSlots.build.overrides({ content: { slots: { order: ['unknownSlot'] } } }, scope);

void [scopedMatch, scopedBlocks, scopedTextSlots];

const numberResource = number.build.props(scope);
const typedAnswers: number[] = numberResource.base.params.correctAnswers;
const typedPromptSlug: string = numberResource.base.content.question[0].slug;
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

validLanguageChild.build.props({ languages: ['uk'] });
validLanguageChild.build.overrides({}, { languages: ['uk'] });
// @ts-expect-error The typed Question only supports its declared publication languages.
validLanguageChild.build.props({ languages: ['en'] });
// @ts-expect-error Explicit language selection is required.
validLanguageChild.build.props();
// @ts-expect-error An override publication also requires language options.
validLanguageChild.build.overrides({});
