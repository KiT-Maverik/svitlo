import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const correctAnswer = defineText<"correctAnswer", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000000c",
  slug: "correctAnswer",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Будинок разом із Землею повернувся від сонячного світла."
    }
  }
});
