import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "73a0bec3-6c82-4a83-a19f-026c9ec704b0",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Згадай відмінність між світлом, яке тіло випромінює саме, і світлом, яке воно відбиває.",
      en: "Recall the difference between light a body produces itself and light it reflects.",
      pl: "Przypomnij sobie różnicę między światłem, które ciało samo wysyła, a światłem, które odbija.",
      qm: "Cisimniñ özü saçqan yarıq ile qaytarğan yarıq arasındaki farqnı hatırla."
    }
  }
});
