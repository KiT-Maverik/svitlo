import { configuratorArrayToSlugMap } from './_shared__configurators';
import {
  defineCheckpoint,
  defineCheckpointAnswer,
  defineCheckpointItem,
} from './contentBlocks/composite/defineCheckpoint';
import { defineText } from './contentBlocks/primitive/defineText';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

const question = defineText<'question', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6a',
  type: 'text', slug: 'question', params: {},
  locale: { value: { en: 'What is light?', uk: 'Що таке світло?' } },
});
const answer = defineText<'answer', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
  type: 'text', slug: 'answer', params: {},
  locale: { value: { en: 'Electromagnetic radiation', uk: 'Електромагнітне випромінювання' } },
});

const answers = configuratorArrayToSlugMap([answer]);
type AnswerKeys = Expect<Equal<keyof typeof answers, 'answer'>>;
type AnswerSlug = Expect<Equal<typeof answers.answer.slug, 'answer'>>;
// @ts-expect-error The helper must not accept an unknown literal key.
void answers.unknown;

const answerComposite = defineCheckpointAnswer<
  'answerContent', { answer: typeof answer }, ['en', 'uk']
>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d70',
  type: 'checkpointAnswer', slug: 'answerContent',
  children: ['answer'], answer,
});
const item = defineCheckpointItem<'whatIsLight', typeof answerComposite, typeof question, ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6d',
  type: 'checkpointItem', slug: 'whatIsLight', question, answer: answerComposite,
});
type ItemSlug = Expect<Equal<typeof item.slug, 'whatIsLight'>>;
type ItemAnswerKeys = Expect<Equal<keyof typeof item.answer & 'answer', 'answer'>>;
// @ts-expect-error Answer direct child keys must be inferred literally.
void item.answer.unknown;

const checkpoint = defineCheckpoint<
  'review', { whatIsLight: typeof item }, ['en', 'uk']
>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6c',
  type: 'checkpoint', slug: 'review', params: {},
  locale: { title: 'Review' },
  children: ['whatIsLight'], whatIsLight: item,
});

type CheckpointSlug = Expect<Equal<typeof checkpoint.slug, 'review'>>;
type CheckpointItemKeys = Expect<Equal<keyof Pick<typeof checkpoint, 'whatIsLight'>, 'whatIsLight'>>;
checkpoint.whatIsLight.question.build.overrides(
  { locale: { value: { uk: 'Оновлене питання' } } },
  { languages: ['en', 'uk'] },
);
checkpoint.whatIsLight.answer.answer.build.overrides(
  { locale: { value: { uk: 'Оновлена відповідь' } } },
  { languages: ['en', 'uk'] },
);
// @ts-expect-error Checkpoint item slugs are literal properties.
void checkpoint.unknown;

const later = defineText<'later', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6e',
  type: 'text', slug: 'later', params: {},
  locale: { value: { en: 'Later answer', uk: 'Інша відповідь' } },
});
item.build.overrides(
  {
    question: { locale: { value: { uk: 'Оновлене питання' } } },
    answer: {
      answer: { locale: { value: { uk: 'Оновлена відповідь' } } },
      later,
      children: ['answer', 'later'],
    },
  },
  { languages: ['en', 'uk'] },
);
item.build.overrides(
  // @ts-expect-error An unknown direct Answer child cannot be modified.
  { answer: { unknown: { locale: { value: 'Unknown' } } } },
  { languages: ['en', 'uk'] },
);
// @ts-expect-error Mandatory Text question cannot be disabled.
item.build.overrides({ question: { params: { disabled: true } } }, { languages: ['en', 'uk'] });
// @ts-expect-error Unknown final-order keys are rejected.
item.build.overrides({ answer: { children: ['unknown'] } }, { languages: ['en', 'uk'] });
// @ts-expect-error Identity is immutable.
item.build.overrides({ slug: 'renamed' }, { languages: ['en', 'uk'] });

const notQuestion: import('./contentBlocks/composite/defineCheckpoint').ContentBlock_CheckpointItem_Config = {
  id: 'b775647f-203d-481a-a1c7-4d331c779d6d',
  type: 'checkpointItem', slug: 'invalid',
  // @ts-expect-error A bare config is not a Text Configurator.
  question: question.config.base,
  answer: answerComposite,
};
void notQuestion;

const publishedCheckpoint = checkpoint.build.data({ languages: ['en', 'uk'] });
void publishedCheckpoint.base.children;
void publishedCheckpoint.locale?.uk;
// @ts-expect-error Completed Checkpoint Data has no legacy content.items envelope.
void publishedCheckpoint.base.content.items;
// @ts-expect-error Legacy mutable override API is retired.
checkpoint.override.content.disable(['whatIsLight']);
// @ts-expect-error Identity cannot be overridden.
checkpoint.build.overrides({ slug: 'other' }, { languages: ['en', 'uk'] });
// @ts-expect-error Only known authored CheckpointItems can be patched.
checkpoint.build.overrides({ unknown: { check: true } }, { languages: ['en', 'uk'] });
// @ts-expect-error Unknown final-order slug cannot be accepted.
checkpoint.build.overrides({ children: ['unknown'] }, { languages: ['en', 'uk'] });

const laterItem = defineCheckpointItem<'laterItem', typeof answerComposite, typeof question, ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6f',
  type: 'checkpointItem', slug: 'laterItem', question,
  answer: defineCheckpointAnswer<'answerContent', { later: typeof later }, ['en', 'uk']>({
    id: 'b775647f-203d-481a-a1c7-4d331c779d71',
    type: 'checkpointAnswer', slug: 'answerContent', children: ['later'], later,
  }),
});
checkpoint.build.overrides({
  whatIsLight: { question: { locale: { value: { uk: 'Оновлене?' } } } },
  laterItem, children: ['whatIsLight', 'laterItem'],
}, { languages: ['en', 'uk'] });
// @ts-expect-error Existing CheckpointItem slugs cannot be added as new identities.
checkpoint.build.overrides({ children: ['whatIsLight'], whatIsLight: item }, { languages: ['en', 'uk'] });

void answerComposite;
void checkpoint;
void laterItem;
