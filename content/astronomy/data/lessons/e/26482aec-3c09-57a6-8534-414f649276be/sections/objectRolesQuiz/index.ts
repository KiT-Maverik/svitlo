import { defineQuizSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { quizIntroduction } from "./quizIntroduction";

const content = {
  items: {
    quizIntroduction
  },
  order: [
    "quizIntroduction"
  ]
};

// TODO (BLOCKER): TEMPORARY Questions Stage 1 reference scaffold only.
// Replace this synthetic Question UUID with approved Question Bank UUID(s),
// review all provisional Quiz parameters, and verify publication before Ready.
export const objectRolesQuiz = defineQuizSection<"objectRolesQuiz", typeof content.items, LessonLanguages>({
  id: "742ca5c5-d2c1-4cc2-a268-ef50ce3f07e8",
  slug: "objectRolesQuiz",
  type: "quiz",
  params: {
    isBlocker: true,
    // TODO (BLOCKER): Not a real Question! Synthetic UUID used only to build review Markdown.
    selection: {
      mode: "all",
      questionIds: ["ee3b5c97-6ea0-4ca0-a2bd-1a8cf7e72451"]
    },
    // TODO (BLOCKER): Provisional interaction/results choices; Assessment Architect must approve.
    layout: { mode: "stack" },
    feedbackMode: "after-completion",
    interaction: {
      retries: 0,
      showErrors: false,
      showCorrectAnswers: false,
      allowExplanations: false,
      allowDeferring: false,
      allowQuestionNavigation: false,
      skippable: false
    },
    results: {
      visibility: "hidden",
      showScore: false
    }
  },
  locale: {
    title: {
      uk: "Перевір, хто є хто"
    },
    navigationLabel: {
      uk: "Перевір себе"
    }
  },
  content
});
