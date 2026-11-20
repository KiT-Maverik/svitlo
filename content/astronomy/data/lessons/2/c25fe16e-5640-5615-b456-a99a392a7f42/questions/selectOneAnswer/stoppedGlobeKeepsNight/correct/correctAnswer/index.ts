import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const correctAnswer = defineText<"correctAnswer", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000013",
  slug: "correctAnswer",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "У місці Г залишатиметься ніч, доки кульку не повернуть.",
      en: "It will remain nighttime at «Г» until the ball is turned.",
      pl: "W miejscu «Г» nadal będzie noc, dopóki kula nie zostanie obrócona.",
      qm: "Küre aylantırılmağance «Г» yerinde gece devam etecek."
    }
  }
});
