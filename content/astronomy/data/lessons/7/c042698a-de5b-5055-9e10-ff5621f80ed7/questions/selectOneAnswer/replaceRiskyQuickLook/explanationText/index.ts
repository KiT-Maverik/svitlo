import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "61403fea-6a9a-5d06-97d3-419ac4a98bfb",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Ні скло звичайного вікна, ні сонцезахисні окуляри, ні короткий погляд не роблять пряме спостереження Сонця безпечним. Підготовлений знімок дає потрібні відомості без ризику для чиїхось очей."
    }
  }
});
