import { defineQuizSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { quizIntro } from "./quizIntro";

const content = {
  items: {
    quizIntro
  },
  order: [
    "quizIntro"
  ]
};

// TODO (BLOCKER): This Quiz Section is required by the Methodologist.
// Integrate reviewed Question UUIDs and complete Quiz parameters before merge.
export const safeSkyChoices = defineQuizSection<"safeSkyChoices", typeof content.items, LessonLanguages>({
  id: "2d844bab-f77e-5dc5-adb9-7891d5bb6b59",
  slug: "safeSkyChoices",
  type: "quiz",
  params: {},
  locale: {
    title: {
      uk: "Перевір безпечний вибір"
    },
    navigationLabel: {
      uk: "Перевір знання"
    }
  },
  content
});
