import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "64f78553-7f2d-47f9-8ba0-df60d81e18c0",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Дитина каже: «Місяць яскравий уночі, отже він зоря». Яка відповідь найточніше виправляє помилку?"
    }
  }
});
