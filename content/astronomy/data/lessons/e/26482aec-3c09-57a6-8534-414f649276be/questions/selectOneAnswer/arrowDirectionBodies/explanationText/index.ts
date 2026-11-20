import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "a8518513-c747-45ed-a97b-4cfc9478877c",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Основні спрямовані зв’язки: Земля → Сонце та Місяць → Земля. Обернені стрілки хибно міняють місцями тіло й центр орбіти."
    }
  }
});
