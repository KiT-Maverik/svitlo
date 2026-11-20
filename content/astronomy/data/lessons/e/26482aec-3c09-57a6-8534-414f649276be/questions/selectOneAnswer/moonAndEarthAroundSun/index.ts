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

export const moonAndEarthAroundSun = defineSelectOneAnswer<"moonAndEarthAroundSun", typeof content, LessonLanguages>({
  id: "2165dc36-c878-48e8-b589-d20ac332b86d",
  slug: "moonAndEarthAroundSun",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "relationshipMapping",
    restrictions: []
  },
  locale: {},
  content
});
