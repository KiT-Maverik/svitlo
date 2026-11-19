import { defineQuizSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

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
export const rotationAndIlluminationQuiz = defineQuizSection<"rotationAndIlluminationQuiz", typeof content.items, LessonLanguages>({
  id: "622e900a-4f7e-47dc-9c3e-4946444cea9f",
  slug: "rotationAndIlluminationQuiz",
  type: "quiz",
  params: {},
  locale: {
    title: {
      uk: "Чому змінюються день і ніч: перевірка"
    },
    navigationLabel: {
      uk: "Перевір знання"
    }
  },
  content
});
