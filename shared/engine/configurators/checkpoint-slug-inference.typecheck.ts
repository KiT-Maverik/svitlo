import { defineText } from './contentBlocks/defineText';
import { defineCheckpoint, defineCheckpointItem } from './contentBlocks/defineCheckpoint';
import { configuratorArrayToSlugMap } from './_shared__configurators';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

const question = defineText({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6a',
  type: 'text',
  slug: 'question',
  params: {},
  locale: { value: 'What is light?' },
});
const answer = defineText({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
  type: 'text',
  slug: 'answer',
  params: {},
  locale: { value: 'Electromagnetic radiation' },
});

const answers = configuratorArrayToSlugMap([answer]);
type AnswerKeys = Expect<Equal<keyof typeof answers, 'answer'>>;
type AnswerSlug = Expect<Equal<typeof answers.answer.slug, 'answer'>>;
// @ts-expect-error The helper must not accept an unknown literal key.
void answers.unknown;

const item = defineCheckpointItem({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6d',
  type: 'checkpointItem',
  slug: 'whatIsLight',
  question,
  answer: { items: answers, order: ['answer'] },
});
type ItemSlug = Expect<Equal<typeof item.slug, 'whatIsLight'>>;
type ItemAnswerKeys = Expect<Equal<keyof typeof item.answer.items, 'answer'>>;
// @ts-expect-error Answer keys must be inferred literally.
void item.answer.items.unknown;

const checkpoint = defineCheckpoint({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6c',
  type: 'checkpoint',
  slug: 'review',
  params: {},
  locale: { title: 'Review' },
  content: {
    items: configuratorArrayToSlugMap([item]),
    order: ['whatIsLight'],
  },
});

type CheckpointSlug = Expect<Equal<typeof checkpoint.slug, 'review'>>;
type CheckpointItemKeys = Expect<Equal<keyof typeof checkpoint.content.items, 'whatIsLight'>>;
checkpoint.content.items.whatIsLight.question.assemble.overrides({ locale: { value: 'Updated question' } });
checkpoint.content.items.whatIsLight.answer.items.answer.assemble.overrides({ locale: { value: 'Updated answer' } });
// @ts-expect-error Checkpoint item keys must be inferred literally.
void checkpoint.content.items.unknown;

const notQuestion: import('./contentBlocks/defineCheckpoint').ContentBlock_CheckpointItem_Config = {
  id: 'b775647f-203d-481a-a1c7-4d331c779d6d',
  type: 'checkpointItem',
  slug: 'invalid',
  // @ts-expect-error A bare config is not a Text configurator.
  question: question.config.base,
  answer: { items: answers, order: ['answer'] },
};
void notQuestion;
