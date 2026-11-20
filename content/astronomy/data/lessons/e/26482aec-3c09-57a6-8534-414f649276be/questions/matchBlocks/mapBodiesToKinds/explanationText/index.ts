import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "41b12332-eb94-44d9-a348-a662527b51ee",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце — зоря; Земля — планета; Місяць — природний супутник Землі. Природу небесного тіла не визначають його колір чи вигляд на малюнку."
    }
  }
});
