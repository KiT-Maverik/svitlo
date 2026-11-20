import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { differentMoon } from "./incorrect/differentMoon";
import { explanationText } from "./explanationText";
import { hintText } from "./hintText";
import { moonSwitches } from "./incorrect/moonSwitches";
import { prompt } from "./prompt";
import { reflectsInDay } from "./correct/reflectsInDay";
import { sunTurnsOff } from "./incorrect/sunTurnsOff";

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
        reflectsInDay
      },
      order: [
        "reflectsInDay"
      ]
    },
    incorrect: {
      items: {
        sunTurnsOff,
        moonSwitches,
        differentMoon
      },
      order: [
        "sunTurnsOff",
        "moonSwitches",
        "differentMoon"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const daylightMoon = defineSelectOneAnswer<"daylightMoon", typeof content, LessonLanguages>({
  id: "8fb42da9-0601-43e9-9887-b8836fb6fbdb",
  slug: "daylightMoon",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "interpretation",
    restrictions: []
  },
  locale: {},
  content
});
