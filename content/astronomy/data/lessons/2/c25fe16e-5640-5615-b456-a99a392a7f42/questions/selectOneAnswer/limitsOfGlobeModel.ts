import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

import { correctAnswer } from "./limitsOfGlobeModel/correct/correctAnswer";
import { explanationText } from "./limitsOfGlobeModel/explanationText";
import { hintText } from "./limitsOfGlobeModel/hintText";
import { prompt } from "./limitsOfGlobeModel/prompt";
import { wrong1 } from "./limitsOfGlobeModel/incorrect/wrong1";
import { wrong2 } from "./limitsOfGlobeModel/incorrect/wrong2";

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
        correctAnswer
      },
      order: [
        "correctAnswer"
      ]
    },
    incorrect: {
      items: {
        wrong1,
        wrong2
      },
      order: [
        "wrong1",
        "wrong2"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const limitsOfGlobeModel = defineSelectOneAnswer<"limitsOfGlobeModel", typeof content, LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000001d",
  slug: "limitsOfGlobeModel",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "interpretation",
    restrictions: []
  },
  locale: {},
  content
});
