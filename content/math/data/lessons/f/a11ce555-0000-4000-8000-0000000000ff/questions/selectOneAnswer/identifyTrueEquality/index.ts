// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 189d247d11635ee1024d9d7f4bb162820a1407dd9c589f1499e17c643a24eeda
import { defineSelectOneAnswer } from '@svitlo/engine/build';
import { choiceExplanation } from "./choiceExplanation";
import { choiceHint } from "./choiceHint";
import { choicePrompt } from "./choicePrompt";
import { correctChoice } from "./correct/correctChoice";
import { wrongChoice } from "./incorrect/wrongChoice";
import type { LessonLanguages } from "../../../constants";

const content = {
  question: {
    items: {
      choicePrompt
    },
    order: [
      "choicePrompt"
    ]
  },
  hint: {
    items: {
      choiceHint
    },
    order: [
      "choiceHint"
    ]
  },
  explanation: {
    items: {
      choiceExplanation
    },
    order: [
      "choiceExplanation"
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
        wrongChoice
      },
      order: [
        "wrongChoice"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const selectOneAnswer_identifyTrueEquality = defineSelectOneAnswer<"identifyTrueEquality", typeof content, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-00000000001f",
  slug: "identifyTrueEquality",
  type: "selectOneAnswer",
  params: {
    assessmentMethod: "verification",
    restrictions: []
  },
  locale: {},
  content
});
