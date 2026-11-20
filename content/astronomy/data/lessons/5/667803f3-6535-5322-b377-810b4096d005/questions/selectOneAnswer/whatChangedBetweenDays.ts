import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { anotherBody } from "./whatChangedBetweenDays/incorrect/anotherBody";
import { explanationText } from "./whatChangedBetweenDays/explanationText";
import { hintText } from "./whatChangedBetweenDays/hintText";
import { physicalShape } from "./whatChangedBetweenDays/incorrect/physicalShape";
import { physicalSize } from "./whatChangedBetweenDays/incorrect/physicalSize";
import { prompt } from "./whatChangedBetweenDays/prompt";
import { visibleLitSurface } from "./whatChangedBetweenDays/correct/visibleLitSurface";

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
        visibleLitSurface
      },
      order: [
        "visibleLitSurface"
      ]
    },
    incorrect: {
      items: {
        physicalSize,
        physicalShape,
        anotherBody
      },
      order: [
        "physicalSize",
        "physicalShape",
        "anotherBody"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const whatChangedBetweenDays = defineSelectOneAnswer<"whatChangedBetweenDays", typeof content, LessonLanguages>({
  id: "2b37e984-7602-44c2-b7f3-cacad6bc252f",
  slug: "whatChangedBetweenDays",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
