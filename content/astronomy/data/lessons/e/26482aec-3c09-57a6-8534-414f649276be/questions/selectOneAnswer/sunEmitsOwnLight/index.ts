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

export const sunEmitsOwnLight = defineSelectOneAnswer<"sunEmitsOwnLight", typeof content, LessonLanguages>({
  id: "2cac0cd9-d965-4aab-af33-2506aa0f8619",
  slug: "sunEmitsOwnLight",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
