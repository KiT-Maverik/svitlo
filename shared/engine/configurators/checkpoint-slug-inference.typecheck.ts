import { defineText } from './contentBlocks/defineText';
import { defineCheckpoint } from './contentBlocks/defineCheckpoint';
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

const checkpoint = defineCheckpoint({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6c',
  type: 'checkpoint',
  slug: 'review',
  params: {},
  locale: { title: 'Review' },
  content: {
    items: {
      whatIsLight: {
        question,
        answer: { items: answers, order: ['answer'] },
      },
    },
    order: ['whatIsLight'],
  },
});

type CheckpointSlug = Expect<Equal<typeof checkpoint.slug, 'review'>>;
checkpoint.content.items.whatIsLight.question.override.locale({ value: 'Updated question' });
checkpoint.content.items.whatIsLight.answer.items.answer.override.locale({ value: 'Updated answer' });
checkpoint.content.items.anotherQuestion = {
  question,
  answer: { items: answers, order: ['answer'] },
};
checkpoint.content.order.push('anotherQuestion');

const notQuestion: import('./contentBlocks/defineCheckpoint').Checkpoint_Config_Item = {
  // @ts-expect-error A bare config is not a Text configurator.
  question: question.config.base,
  answer: { items: answers, order: ['answer'] },
};
void notQuestion;
