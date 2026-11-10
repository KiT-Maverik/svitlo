import { defineText } from './contentBlocks/defineText/defineText';
import { defineCheckpoint } from './contentBlocks/defineCheckpoint/defineCheckpoint';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

const answer = defineText({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6a',
  type: 'text',
  slug: 'answer',
  params: {},
  locale: { value: 'The answer' },
});

// Inline items retain exact keys for autocomplete. No manual slug union is needed.
const checkpoint = defineCheckpoint({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
  type: 'checkpoint',
  slug: 'review',
  params: {},
  locale: { title: 'Review' },
  content: {
    items: {
      whatIsLight: { question: 'What is light?', answer: [answer] },
      howLightTravels: { question: 'How does light travel?', answer: [answer] },
    },
    order: ['howLightTravels', 'whatIsLight'],
  },
});

type ItemKeys = Expect<Equal<keyof typeof checkpoint.content.items, 'whatIsLight' | 'howLightTravels'>>;
type OrderKeys = Expect<Equal<(typeof checkpoint.content.order)[number], 'whatIsLight' | 'howLightTravels'>>;
void checkpoint.content.items.whatIsLight;
// @ts-expect-error Unknown item keys are not valid.
void checkpoint.content.items.notAnItem;

defineCheckpoint({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6c',
  type: 'checkpoint',
  slug: 'invalidOrder',
  params: {},
  locale: { title: 'Review' },
  content: {
    items: {
      knownItem: { question: 'Question?', answer: [answer] },
    },
    order: [
      // @ts-expect-error Order can only refer to declared item slugs.
      'unknownItem',
    ],
  },
});
