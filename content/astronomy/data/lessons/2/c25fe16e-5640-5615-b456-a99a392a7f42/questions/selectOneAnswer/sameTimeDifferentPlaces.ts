import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

import { correctAnswer } from "./sameTimeDifferentPlaces/correct/correctAnswer";
import { explanationText } from "./sameTimeDifferentPlaces/explanationText";
import { hintText } from "./sameTimeDifferentPlaces/hintText";
import { prompt } from "./sameTimeDifferentPlaces/prompt";
import { wrong1 } from "./sameTimeDifferentPlaces/incorrect/wrong1";
import { wrong2 } from "./sameTimeDifferentPlaces/incorrect/wrong2";

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

export const sameTimeDifferentPlaces = defineSelectOneAnswer<"sameTimeDifferentPlaces", typeof content, LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000001",
  slug: "sameTimeDifferentPlaces",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "interpretation",
    restrictions: []
  },
  locale: {},
  content
});
