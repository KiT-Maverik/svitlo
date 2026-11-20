import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { explanationText } from "./explanationText";
import { hintText } from "./hintText";
import { newBody } from "./incorrect/newBody";
import { orientationNotShape } from "./correct/orientationNotShape";
import { prompt } from "./prompt";
import { sphereBecameFlat } from "./incorrect/sphereBecameFlat";
import { sunAbsent } from "./incorrect/sunAbsent";

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
        orientationNotShape
      },
      order: [
        "orientationNotShape"
      ]
    },
    incorrect: {
      items: {
        newBody,
        sphereBecameFlat,
        sunAbsent
      },
      order: [
        "newBody",
        "sphereBecameFlat",
        "sunAbsent"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const crescentDirectionNotShape = defineSelectOneAnswer<"crescentDirectionNotShape", typeof content, LessonLanguages>({
  id: "d2e34417-4c9e-4005-a818-a24f9b424245",
  slug: "crescentDirectionNotShape",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
