import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { explanationText } from "./marsSiriusContrast/explanationText";
import { hintText } from "./marsSiriusContrast/hintText";
import { prompt } from "./marsSiriusContrast/prompt";
import { responseAlpha } from "./marsSiriusContrast/correct/responseAlpha";
import { responseBeta } from "./marsSiriusContrast/incorrect/responseBeta";
import { responseDelta } from "./marsSiriusContrast/incorrect/responseDelta";
import { responseGamma } from "./marsSiriusContrast/incorrect/responseGamma";

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
