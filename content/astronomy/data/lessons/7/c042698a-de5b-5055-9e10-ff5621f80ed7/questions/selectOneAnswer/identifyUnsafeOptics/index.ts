import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { correctChoice } from "./correct/correctChoice";
import { explanationText } from "./explanationText";
import { hintText } from "./hintText";
import { otherChoice1 } from "./incorrect/otherChoice1";
import { otherChoice2 } from "./incorrect/otherChoice2";
import { otherChoice3 } from "./incorrect/otherChoice3";
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
        correctChoice
      },
      order: [
        "correctChoice"
      ]
    },
    incorrect: {
      items: {
        otherChoice1,
        otherChoice2,
        otherChoice3
      },
      order: [
        "otherChoice1",
        "otherChoice2",
        "otherChoice3"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const identifyUnsafeOptics = defineSelectOneAnswer<"identifyUnsafeOptics", typeof content, LessonLanguages>({
  id: "6ea474dd-2cec-5927-992c-9220b6d2b68f",
  slug: "identifyUnsafeOptics",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
