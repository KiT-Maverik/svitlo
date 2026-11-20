import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000011",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Уяви, що час іде, але положення кульки та лампи не змінюється.",
      en: "Imagine that time passes, but the positions of the ball and the lamp do not change.",
      pl: "Wyobraź sobie, że czas płynie, ale położenie kuli i lampy się nie zmienia.",
      qm: "Vaqıt keçe, amma küre ve lampanıñ vaziyeti deñişmey dep tasavur et."
    }
  }
});
