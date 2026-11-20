import { defineSelectOneAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { explanationText } from "./darkPartStillExists/explanationText";
import { flattened } from "./darkPartStillExists/incorrect/flattened";
import { hintText } from "./darkPartStillExists/hintText";
import { prompt } from "./darkPartStillExists/prompt";
import { shrank } from "./darkPartStillExists/incorrect/shrank";
import { stillThere } from "./darkPartStillExists/correct/stillThere";
import { vanished } from "./darkPartStillExists/incorrect/vanished";

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
        stillThere
      },
      order: [
        "stillThere"
      ]
    },
    incorrect: {
      items: {
        vanished,
        shrank,
        flattened
      },
      order: [
        "vanished",
        "shrank",
        "flattened"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const darkPartStillExists = defineSelectOneAnswer<"darkPartStillExists", typeof content, LessonLanguages>({
  id: "8d7a8f8c-99c1-457d-a6fe-15c7a44b7e30",
  slug: "darkPartStillExists",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
