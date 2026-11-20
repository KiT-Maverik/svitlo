import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { explanationText } from "./arrowDirectionBodies/explanationText";
import { hintText } from "./arrowDirectionBodies/hintText";
import { prompt } from "./arrowDirectionBodies/prompt";
import { responseAlpha } from "./arrowDirectionBodies/correct/responseAlpha";
import { responseBeta } from "./arrowDirectionBodies/incorrect/responseBeta";
import { responseDelta } from "./arrowDirectionBodies/incorrect/responseDelta";
import { responseGamma } from "./arrowDirectionBodies/incorrect/responseGamma";

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

export const arrowDirectionBodies = defineSelectOneAnswer<"arrowDirectionBodies", typeof content, LessonLanguages>({
  id: "a2e493f2-e579-4baa-8f85-2171d78afb10",
  slug: "arrowDirectionBodies",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "relationshipMapping",
    restrictions: []
  },
  locale: {},
  content
});
