import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "1b3c037e-1ee2-5f95-ad62-aa7d70fa3f5d",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Саморобна темна плівка не є перевіреним сонячним фільтром. Темний вигляд матеріалу, короткий час і перебування за вікном не доводять безпеки прямого погляду на Сонце. Замість цього можна розглянути готовий науковий знімок."
    }
  }
});
