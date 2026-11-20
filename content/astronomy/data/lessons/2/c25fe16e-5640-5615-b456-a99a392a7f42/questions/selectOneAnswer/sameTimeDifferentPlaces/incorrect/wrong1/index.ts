import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const wrong1 = defineText<"wrong1", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000006",
  slug: "wrong1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Якщо Сонце світить, у всіх місцях Землі має бути день."
    }
  }
});
