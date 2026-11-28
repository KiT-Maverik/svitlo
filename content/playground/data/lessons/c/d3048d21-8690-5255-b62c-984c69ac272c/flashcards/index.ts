// Lesson UUID: d3048d21-8690-5255-b62c-984c69ac272c; documentLanguage: en
import { defineFlashcard, defineFlashcardSide } from '@svitlo/engine/build';

import { fastestMedium } from '../questions/fastestMedium';
import { lightTravelsStraight } from '../questions/lightTravelsStraight';
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
      children: ['question'],
      question: lightTravelsStraight.content.question.question
    }),
    back: defineFlashcardSide({
      children: ['straightLine'],
      straightLine: lightTravelsStraight.content.answers.correct.straightLine
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
      children: ['question'],
      question: fastestMedium.content.question.question
    }),
    back: defineFlashcardSide({
      children: ['vacuum'],
      vacuum: fastestMedium.content.answers.correct.vacuum
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
      children: ['question'],
      question: opaqueObjectShadow.content.question.question
    }),
    back: defineFlashcardSide({
      children: ['shadow'],
      shadow: opaqueObjectShadow.content.answers.correct.shadow
    }),
  },
});

export const howLightMovesFlashcards = {
  items: { lightTravelsStraightFlashcard, fastestMediumFlashcard, opaqueObjectShadowFlashcard },
};
