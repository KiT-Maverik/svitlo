import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { ballReshaped } from "./lampBallViewpoint/incorrect/ballReshaped";
import { differentView } from "./lampBallViewpoint/correct/differentView";
import { explanationText } from "./lampBallViewpoint/explanationText";
import { hintText } from "./lampBallViewpoint/hintText";
import { lampStopped } from "./lampBallViewpoint/incorrect/lampStopped";
import { prompt } from "./lampBallViewpoint/prompt";
import { twoBalls } from "./lampBallViewpoint/incorrect/twoBalls";

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
        differentView
      },
      order: [
        "differentView"
      ]
    },
    incorrect: {
      items: {
        ballReshaped,
        twoBalls,
        lampStopped
      },
      order: [
        "ballReshaped",
        "twoBalls",
        "lampStopped"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const lampBallViewpoint = defineSelectOneAnswer<"lampBallViewpoint", typeof content, LessonLanguages>({
  id: "e5a42ad5-d117-420f-89f4-ec5ab4b7d1ea",
  slug: "lampBallViewpoint",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "interpretation",
    restrictions: []
  },
  locale: {},
  content
});
