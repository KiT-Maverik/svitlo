import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { earthProduces } from "./incorrect/earthProduces";
import { explanationText } from "./explanationText";
import { hintText } from "./hintText";
import { moonLamp } from "./incorrect/moonLamp";
import { ownStarLight } from "./incorrect/ownStarLight";
import { prompt } from "./prompt";
import { sunReflected } from "./correct/sunReflected";

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
        sunReflected
      },
      order: [
        "sunReflected"
      ]
    },
    incorrect: {
      items: {
        ownStarLight,
        earthProduces,
        moonLamp
      },
      order: [
        "ownStarLight",
        "earthProduces",
        "moonLamp"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const moonlightSource = defineSelectOneAnswer<"moonlightSource", typeof content, LessonLanguages>({
  id: "cfae194e-1692-42c6-8d57-53ccda07054e",
  slug: "moonlightSource",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "interpretation",
    restrictions: []
  },
  locale: {},
  content
});
