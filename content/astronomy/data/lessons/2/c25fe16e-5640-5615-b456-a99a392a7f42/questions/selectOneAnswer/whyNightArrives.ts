import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

import { correctAnswer } from "./whyNightArrives/correct/correctAnswer";
import { explanationText } from "./whyNightArrives/explanationText";
import { hintText } from "./whyNightArrives/hintText";
import { prompt } from "./whyNightArrives/prompt";
import { wrong1 } from "./whyNightArrives/incorrect/wrong1";
import { wrong2 } from "./whyNightArrives/incorrect/wrong2";

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

export const whyNightArrives = defineSelectOneAnswer<"whyNightArrives", typeof content, LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000008",
  slug: "whyNightArrives",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "interpretation",
    restrictions: []
  },
  locale: {},
  content
});
