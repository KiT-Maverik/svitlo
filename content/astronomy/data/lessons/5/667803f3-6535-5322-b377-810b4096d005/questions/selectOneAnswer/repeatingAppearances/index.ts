import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { cycleRepeats } from "./correct/cycleRepeats";
import { explanationText } from "./explanationText";
import { hintText } from "./hintText";
import { moonAlwaysCrescent } from "./incorrect/moonAlwaysCrescent";
import { moonCutApart } from "./incorrect/moonCutApart";
import { newMoonBorn } from "./incorrect/newMoonBorn";
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
        cycleRepeats
      },
      order: [
        "cycleRepeats"
      ]
    },
    incorrect: {
      items: {
        newMoonBorn,
        moonAlwaysCrescent,
        moonCutApart
      },
      order: [
        "newMoonBorn",
        "moonAlwaysCrescent",
        "moonCutApart"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const repeatingAppearances = defineSelectOneAnswer<"repeatingAppearances", typeof content, LessonLanguages>({
  id: "1aeda0cb-e76f-416b-b68a-c55ba489ad30",
  slug: "repeatingAppearances",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "interpretation",
    restrictions: []
  },
  locale: {},
  content
});
