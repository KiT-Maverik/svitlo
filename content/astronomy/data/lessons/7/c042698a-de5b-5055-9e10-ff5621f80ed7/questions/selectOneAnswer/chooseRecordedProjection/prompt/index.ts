import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "5a99f567-ffe1-5497-a3df-17b2234fa48b",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "На занятті розповіли, що фахівці можуть отримувати проєкцію Сонця. Тобі цікаво побачити результат. Як вчинити безпечно?"
    }
  }
});
