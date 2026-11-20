import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "5d6244bc-7067-5734-8bb9-b10741412c81",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Перевір кожен варіант: чи стосується він денного неба і чи потребує погляду на Сонце?"
    }
  }
});
