import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "c6567197-0c00-494c-aab8-e6cdc2a8f0c8",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Навчальна схема може відображати правильні зв’язки між тілами, але не гарантує реальних відстаней і розмірів. Колір чи намальована величина не визначають тип небесного тіла."
    }
  }
});
