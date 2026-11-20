import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { differentMoon } from "./daylightMoon/incorrect/differentMoon";
import { explanationText } from "./daylightMoon/explanationText";
import { hintText } from "./daylightMoon/hintText";
import { moonSwitches } from "./daylightMoon/incorrect/moonSwitches";
import { prompt } from "./daylightMoon/prompt";
import { reflectsInDay } from "./daylightMoon/correct/reflectsInDay";
import { sunTurnsOff } from "./daylightMoon/incorrect/sunTurnsOff";

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
