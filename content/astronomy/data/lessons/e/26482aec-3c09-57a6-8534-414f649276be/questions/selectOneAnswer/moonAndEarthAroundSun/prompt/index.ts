import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "eb02241b-29f6-4477-9a45-82c61da792fa",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць рухається навколо Землі, а Земля — навколо Сонця. Яке твердження правильно поєднує ці рухи?"
    }
  }
});
