import { defineSelectMultipleAnswers } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { explanationText } from "./explanationText";
import { hintText } from "./hintText";
import { moonProducesLight } from "./incorrect/moonProducesLight";
import { physicalMoonGrows } from "./incorrect/physicalMoonGrows";
import { prompt } from "./prompt";
import { sameSphere } from "./correct/sameSphere";
import { visibleFraction } from "./correct/visibleFraction";

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
        sameSphere,
        visibleFraction
      },
      order: [
        "sameSphere",
        "visibleFraction"
      ]
    },
    incorrect: {
      items: {
        moonProducesLight,
        physicalMoonGrows
      },
      order: [
        "moonProducesLight",
        "physicalMoonGrows"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const twoCorrectMoonExplanations = defineSelectMultipleAnswers<"twoCorrectMoonExplanations", typeof content, LessonLanguages>({
  id: "3b0ccb4e-49e2-4acc-8304-b758016a1571",
  slug: "twoCorrectMoonExplanations",
  type: "selectMultipleAnswers",
  params: {
    assessmentMethod: "interpretation",
    restrictions: []
  },
  locale: {},
  content
});
