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

// TODO (BLOCKER): This Quiz Section is required by the Methodologist.
// Integrate reviewed Question UUIDs and complete Quiz parameters before merge.
export const objectRolesQuiz = defineQuizSection<"objectRolesQuiz", typeof content.items, LessonLanguages>({
  id: "742ca5c5-d2c1-4cc2-a268-ef50ce3f07e8",
  slug: "objectRolesQuiz",
  type: "quiz",
  params: {},
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
