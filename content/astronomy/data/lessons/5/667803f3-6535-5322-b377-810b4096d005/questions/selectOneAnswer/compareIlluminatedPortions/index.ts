import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { almostWhole } from "./correct/almostWhole";
import { explanationText } from "./explanationText";
import { halfDisk } from "./incorrect/halfDisk";
import { hintText } from "./hintText";
import { prompt } from "./prompt";
import { sameForAll } from "./incorrect/sameForAll";
import { thinCrescent } from "./incorrect/thinCrescent";

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
        almostWhole
      },
      order: [
        "almostWhole"
      ]
    },
    incorrect: {
      items: {
        thinCrescent,
        halfDisk,
        sameForAll
      },
      order: [
        "thinCrescent",
        "halfDisk",
        "sameForAll"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const compareIlluminatedPortions = defineSelectOneAnswer<"compareIlluminatedPortions", typeof content, LessonLanguages>({
  id: "c861263c-30a1-4d91-bf1b-6c2f1df429b8",
  slug: "compareIlluminatedPortions",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
