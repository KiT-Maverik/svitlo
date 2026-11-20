import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "1cd74c89-d19b-49e1-9b7d-570d7c4ef2fc",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Не всі небесні тіла такого типу рухаються навколо Землі. Подумай, яку роль це тіло має біля іншої планети."
    }
  }
});
