import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "90233a6b-8a75-48d5-8616-a1a08ad38dd6",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Земля рухається навколо Сонця; Місяць рухається навколо Землі. Водночас Місяць разом із Землею подорожує навколо Сонця — це не скасовує його руху навколо Землі."
    }
  }
});
