import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { correctChoice } from "./classifyCloudObservation/correct/correctChoice";
import { explanationText } from "./classifyCloudObservation/explanationText";
import { hintText } from "./classifyCloudObservation/hintText";
import { otherChoice1 } from "./classifyCloudObservation/incorrect/otherChoice1";
import { otherChoice2 } from "./classifyCloudObservation/incorrect/otherChoice2";
import { otherChoice3 } from "./classifyCloudObservation/incorrect/otherChoice3";
import { prompt } from "./classifyCloudObservation/prompt";

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

export const classifyCloudObservation = defineSelectOneAnswer<"classifyCloudObservation", typeof content, LessonLanguages>({
  id: "07e1b3a0-5450-5937-b763-66950c254d34",
  slug: "classifyCloudObservation",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
