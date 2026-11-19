import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const onlyNightQuestion = defineText<"onlyNightQuestion", LessonLanguages>({
  id: "e3d0a9c0-4439-57dc-89c0-c5e387f1d7e8",
  slug: "onlyNightQuestion",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Друг каже: «Досліджувати небо можна лише вночі». Поясни, чи має він рацію."
    }
  }
});
