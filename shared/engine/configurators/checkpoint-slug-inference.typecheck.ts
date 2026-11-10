import { defineText } from './contentBlocks/defineText/defineText';
import { defineCheckpoint } from './contentBlocks/defineCheckpoint/defineCheckpoint';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

const question = defineText({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6a', type: 'text', slug: 'question',
  params: {}, locale: { value: 'What is light?' },
});
const answer = defineText({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b', type: 'text', slug: 'answer',
  params: {}, locale: { value: 'Electromagnetic radiation' },
});

const checkpoint = defineCheckpoint({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6c', type: 'checkpoint', slug: 'review',
  params: {}, locale: { title: 'Review' },
  content: {
    items: {
      whatIsLight: { question, answer: { items: { answer }, order: ['answer'] } },
      howLightTravels: { question, answer: { items: { answer }, order: ['answer'] } },
    },
    order: ['howLightTravels', 'whatIsLight'],
  },
});

type ItemKeys = Expect<Equal<keyof typeof checkpoint.content.items, 'whatIsLight' | 'howLightTravels'>>;
type OrderKeys = Expect<Equal<(typeof checkpoint.content.order)[number], 'whatIsLight' | 'howLightTravels'>>;
void checkpoint.content.items.whatIsLight.answer.items.answer;
// @ts-expect-error Unknown question keys are not present.
void checkpoint.content.items.unknown;
// @ts-expect-error Unknown slugs cannot be ordered.
checkpoint.override.content.setOrder(['notAnItem']);
checkpoint.override.content.setOrder(['howLightTravels', 'whatIsLight']);
// @ts-expect-error Unknown question keys cannot be removed.
checkpoint.override.content.remove('unknown');
// @ts-expect-error Unknown question keys cannot select answers.
checkpoint.override.content.answers('unknown');

const extended = checkpoint.override.content.add('anotherQuestion', {
  question, answer: { items: { answer }, order: ['answer'] },
});
type AddedKeys = Expect<Equal<keyof typeof extended.content.items, 'whatIsLight' | 'howLightTravels' | 'anotherQuestion'>>;
extended.override.content.setOrder(['whatIsLight', 'anotherQuestion', 'howLightTravels']);
const reduced = extended.override.content.remove('whatIsLight');
reduced.override.content.setOrder(['howLightTravels', 'anotherQuestion']);
// @ts-expect-error Removed slugs are rejected on the narrowed handle.
reduced.override.content.setOrder(['whatIsLight']);
// @ts-expect-error Existing keys cannot be added again.
checkpoint.override.content.add('whatIsLight', checkpoint.content.items.whatIsLight);
// @ts-expect-error Question must be a real Text configurator.
const badItem: import('./contentBlocks/defineCheckpoint/defineCheckpoint.schemas').Checkpoint_Item = {
  question: question.config.base,
  answer: { items: { answer }, order: ['answer'] },
};

void badItem;
