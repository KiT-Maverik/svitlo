import { defineFlashcard, defineFlashcardSide } from '@svitlo/engine/build';
import { lightTravelsStraight } from '../questions/lightTravelsStraight';
import { fastestMedium } from '../questions/fastestMedium';
import { opaqueObjectShadow } from '../questions/opaqueObjectShadow';

const lightTravelsStraightFlashcard = defineFlashcard({
  id: '860102db-5184-5249-88dd-7acea86ff5b4',
  slug: 'lightTravelsStraightFlashcard',
  parameters: {
    tags: ['lightPropagation'],
    flags: [],
  },
  content: {
    front: defineFlashcardSide({
      items: { question: lightTravelsStraight.content.question.items.question },
      order: ['question'],
    }),
    back: defineFlashcardSide({
      items: { straightLine: lightTravelsStraight.content.answers.correct.items.straightLine },
      order: ['straightLine'],
    }),
  },
});

const fastestMediumFlashcard = defineFlashcard({
  id: 'a7a04904-ed6b-515e-bdd7-040458b53fad',
  slug: 'fastestMediumFlashcard',
  parameters: {
    tags: ['lightSpeed'],
    flags: [],
  },
  content: {
    front: defineFlashcardSide({
      items: { question: fastestMedium.content.question.items.question },
      order: ['question'],
    }),
    back: defineFlashcardSide({
      items: { vacuum: fastestMedium.content.answers.correct.items.vacuum },
      order: ['vacuum'],
    }),
  },
});

const opaqueObjectShadowFlashcard = defineFlashcard({
  id: '715383c3-ea22-5043-9213-555180837358',
  slug: 'opaqueObjectShadowFlashcard',
  parameters: {
    tags: ['shadow'],
    flags: [],
  },
  content: {
    front: defineFlashcardSide({
      items: { question: opaqueObjectShadow.content.question.items.question },
      order: ['question'],
    }),
    back: defineFlashcardSide({
      items: { shadow: opaqueObjectShadow.content.answers.correct.items.shadow },
      order: ['shadow'],
    }),
  },
});

export const howLightMovesFlashcards = {
  items: { lightTravelsStraightFlashcard, fastestMediumFlashcard, opaqueObjectShadowFlashcard },
};
