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
checkpoint.content.items.whatIsLight.question.build.overrides({ locale: { value: 'Updated question' } });
checkpoint.content.items.whatIsLight.answer.items.answer.build.overrides({ locale: { value: 'Updated answer' } });
// @ts-expect-error Checkpoint item keys must be inferred literally.
void checkpoint.content.items.unknown;

const later = defineText({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6e',
  type: 'text',
  slug: 'later',
  params: {},
  locale: { value: 'Later answer' },
});
item.build.overrides({
  question: { locale: { value: { uk: 'Оновлене питання' } } },
  answer: {
    items: { answer: { locale: { value: 'Updated' } } },
    additionalItems: configuratorArrayToSlugMap([later]),
    order: ['answer', 'later'],
  },
});
// @ts-expect-error Only existing answer keys can be patched.
item.build.overrides({ answer: { items: { unknown: { locale: { value: 'Unknown' } } } } });
// @ts-expect-error The mandatory question cannot be disabled.
item.build.overrides({ question: { params: { disabled: true } } });
// @ts-expect-error Unknown slugs are forbidden in the final order.
item.build.overrides({ answer: { order: ['unknown'] } });
// @ts-expect-error Identity cannot be changed.
item.build.overrides({ slug: 'renamed' });
// @ts-expect-error A new child must not reuse an authored slug.
item.build.overrides({ answer: { additionalItems: configuratorArrayToSlugMap([answer]) } });

const notQuestion: import('./contentBlocks/defineCheckpoint').ContentBlock_CheckpointItem_Config = {
  id: 'b775647f-203d-481a-a1c7-4d331c779d6d',
  type: 'checkpointItem',
  slug: 'invalid',
  // @ts-expect-error A bare config is not a Text configurator.
  question: question.config.base,
  answer: { items: answers, order: ['answer'] },
};
void notQuestion;

const publishedCheckpoint = checkpoint.build.props();
void publishedCheckpoint.base.content[0]?.question;
void publishedCheckpoint.locale?.uk?.content?.[0]?.question.locale.value;
// @ts-expect-error Published Props use sorted arrays instead of authored maps.
void publishedCheckpoint.base.content.items;
// @ts-expect-error The old mutable Checkpoint API is not available.
checkpoint.override.content.disable(['whatIsLight']);
// @ts-expect-error Checkpoint identity is immutable under overrides.
checkpoint.build.overrides({ slug: 'other' });
// @ts-expect-error Only known authored CheckpointItems may receive sparse patches.
checkpoint.build.overrides({ content: { items: { unknown: { check: true } } } });
// @ts-expect-error An unknown final-order slug is rejected statically.
checkpoint.build.overrides({ content: { order: ['unknown'] } });

const laterItem = defineCheckpointItem({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6f',
  type: 'checkpointItem',
  slug: 'laterItem',
  question,
  answer: { items: configuratorArrayToSlugMap([later]), order: ['later'] },
});
checkpoint.build.overrides({
  content: {
    items: { whatIsLight: { question: { locale: { value: { uk: 'Оновлене?' } } } } },
    additionalItems: configuratorArrayToSlugMap([laterItem]),
    order: ['whatIsLight', 'laterItem'],
  },
});
// @ts-expect-error Existing CheckpointItem slugs cannot be added again.
checkpoint.build.overrides({ content: { additionalItems: configuratorArrayToSlugMap([item]) } });
