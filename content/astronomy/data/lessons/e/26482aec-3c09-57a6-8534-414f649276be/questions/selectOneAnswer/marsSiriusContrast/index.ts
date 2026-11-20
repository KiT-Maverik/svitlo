import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { explanationText } from "./explanationText";
import { hintText } from "./hintText";
import { prompt } from "./prompt";
import { responseAlpha } from "./correct/responseAlpha";
import { responseBeta } from "./incorrect/responseBeta";
import { responseDelta } from "./incorrect/responseDelta";
import { responseGamma } from "./incorrect/responseGamma";

const content = {
  question: {
    items: {
      prompt
    },
    order: [
      "prompt"
    ]
  },
  hint: {
    items: {
      hintText
    },
    order: [
      "hintText"
    ]
  },
  explanation: {
    items: {
      explanationText
    },
    order: [
      "explanationText"
    ]
  },
  answers: {
    correct: {
      items: {
        responseAlpha
      },
      order: [
        "responseAlpha"
      ]
    },
    incorrect: {
      items: {
        responseBeta,
        responseGamma,
        responseDelta
      },
      order: [
        "responseBeta",
        "responseGamma",
        "responseDelta"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const marsSiriusContrast = defineSelectOneAnswer<"marsSiriusContrast", typeof content, LessonLanguages>({
  id: "53b10c2c-1120-42c2-a62a-1d63ed539d3b",
  slug: "marsSiriusContrast",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
