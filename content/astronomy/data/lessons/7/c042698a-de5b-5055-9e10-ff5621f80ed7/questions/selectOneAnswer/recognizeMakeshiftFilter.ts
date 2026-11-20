import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { correctChoice } from "./recognizeMakeshiftFilter/correct/correctChoice";
import { explanationText } from "./recognizeMakeshiftFilter/explanationText";
import { hintText } from "./recognizeMakeshiftFilter/hintText";
import { otherChoice1 } from "./recognizeMakeshiftFilter/incorrect/otherChoice1";
import { otherChoice2 } from "./recognizeMakeshiftFilter/incorrect/otherChoice2";
import { otherChoice3 } from "./recognizeMakeshiftFilter/incorrect/otherChoice3";
import { prompt } from "./recognizeMakeshiftFilter/prompt";

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

export const recognizeMakeshiftFilter = defineSelectOneAnswer<"recognizeMakeshiftFilter", typeof content, LessonLanguages>({
  id: "2fe79ced-70c0-54b5-b40a-a99145ac0670",
  slug: "recognizeMakeshiftFilter",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
