import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "115105b2-14e4-48fa-a089-f7df0bd99468",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Обидва зв’язки правильні одночасно: Місяць обертається навколо Землі, а система Земля—Місяць рухається навколо Сонця."
    }
  }
});
