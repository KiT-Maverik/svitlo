import { defineSelectMultipleAnswers } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { correct1 } from "./correct/correct1";
import { correct2 } from "./correct/correct2";
import { correct3 } from "./correct/correct3";
import { correct4 } from "./correct/correct4";
import { explanationText } from "./explanationText";
import { hintText } from "./hintText";
import { incorrect1 } from "./incorrect/incorrect1";
import { incorrect2 } from "./incorrect/incorrect2";
import { prompt } from "./prompt";

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
        correct1,
        correct2,
        correct3,
        correct4
      },
      order: [
        "correct1",
        "correct2",
        "correct3",
        "correct4"
      ]
    },
    incorrect: {
      items: {
        incorrect1,
        incorrect2
      },
      order: [
        "incorrect1",
        "incorrect2"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const whichBodiesReflectSunlight = defineSelectMultipleAnswers<"whichBodiesReflectSunlight", typeof content, LessonLanguages>({
  id: "d83a3db5-4abb-4718-876e-25a0b1685975",
  slug: "whichBodiesReflectSunlight",
  type: "selectMultipleAnswers",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
