import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "c5c7f415-1363-5dd7-8ec9-3f4d70c37c8c",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подумай, чи можна визначити захисні властивості матеріалу лише за тим, наскільки темним він здається."
    }
  }
});
