import { defineFlashcard } from '@svitlo/engine/build';
import { lightTravelsStraight } from '../questions/lightTravelsStraight';
import { fastestMedium } from '../questions/fastestMedium';
import { opaqueObjectShadow } from '../questions/opaqueObjectShadow';

const lightTravelsStraightFlashcard = defineFlashcard({
  id: '860102db-5184-5249-88dd-7acea86ff5b4',
  slug: 'lightTravelsStraightFlashcard',
  type: 'flashcard',
  parameters: {
    tags: ['lightPropagation'],
    flags: { items: {}, order: [] },
  },
  content: {
    front: {
      items: { question: lightTravelsStraight.content.question[0] },
      order: ['question'],
    },
    back: {
      items: { straightLine: lightTravelsStraight.content.answers.correct.straightLine },
      order: ['straightLine'],
    },
  },
});

const fastestMediumFlashcard = defineFlashcard({
  id: 'a7a04904-ed6b-515e-bdd7-040458b53fad',
  slug: 'fastestMediumFlashcard',
  type: 'flashcard',
  parameters: {
    tags: ['lightSpeed'],
    flags: { items: {}, order: [] },
  },
  content: {
    front: {
      items: { question: fastestMedium.content.question[0] },
      order: ['question'],
    },
    back: {
      items: { vacuum: fastestMedium.content.answers.correct.vacuum },
      order: ['vacuum'],
    },
  },
});

const opaqueObjectShadowFlashcard = defineFlashcard({
  id: '715383c3-ea22-5043-9213-555180837358',
  slug: 'opaqueObjectShadowFlashcard',
  type: 'flashcard',
  parameters: {
    tags: ['shadow'],
    flags: { items: {}, order: [] },
  },
  content: {
    front: {
      items: { question: opaqueObjectShadow.content.question[0] },
      order: ['question'],
    },
    back: {
      items: { shadow: opaqueObjectShadow.content.answers.correct.shadow },
      order: ['shadow'],
    },
  },
});

export const howLightMovesFlashcards = [
  lightTravelsStraightFlashcard,
  fastestMediumFlashcard,
  opaqueObjectShadowFlashcard,
];
