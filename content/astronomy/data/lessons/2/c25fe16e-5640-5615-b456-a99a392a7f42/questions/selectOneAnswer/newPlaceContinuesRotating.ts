import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

import { correctAnswer } from "./newPlaceContinuesRotating/correct/correctAnswer";
import { explanationText } from "./newPlaceContinuesRotating/explanationText";
import { hintText } from "./newPlaceContinuesRotating/hintText";
import { prompt } from "./newPlaceContinuesRotating/prompt";
import { wrong1 } from "./newPlaceContinuesRotating/incorrect/wrong1";
import { wrong2 } from "./newPlaceContinuesRotating/incorrect/wrong2";

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

export const newPlaceContinuesRotating = defineSelectOneAnswer<"newPlaceContinuesRotating", typeof content, LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000016",
  slug: "newPlaceContinuesRotating",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "prediction",
    restrictions: []
  },
  locale: {},
  content
});
