import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { correct1 } from "./moonLightMisconception/correct/correct1";
import { explanationText } from "./moonLightMisconception/explanationText";
import { hintText } from "./moonLightMisconception/hintText";
import { incorrect1 } from "./moonLightMisconception/incorrect/incorrect1";
import { incorrect2 } from "./moonLightMisconception/incorrect/incorrect2";
import { incorrect3 } from "./moonLightMisconception/incorrect/incorrect3";
import { prompt } from "./moonLightMisconception/prompt";

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
        correct1
      },
      order: [
        "correct1"
      ]
    },
    incorrect: {
      items: {
        incorrect1,
        incorrect2,
        incorrect3
      },
      order: [
        "incorrect1",
        "incorrect2",
        "incorrect3"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const moonLightMisconception = defineSelectOneAnswer<"moonLightMisconception", typeof content, LessonLanguages>({
  id: "ba4b4f37-723d-4336-a1dc-0599f97c081a",
  slug: "moonLightMisconception",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "errorDiagnosis",
    restrictions: []
  },
  locale: {},
  content
});
