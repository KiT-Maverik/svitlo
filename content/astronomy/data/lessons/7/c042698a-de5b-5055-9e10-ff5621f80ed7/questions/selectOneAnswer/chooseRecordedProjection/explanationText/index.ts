import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "e69b3bb6-2732-56c1-a195-07aa1fbf9ba5",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Готовий запис проєкції можна безпечно розглядати без прямого погляду на Сонце. Самостійно виготовляти чи налаштовувати сонячні пристрої дітям не потрібно. Через отвір проєктора на Сонце дивитися не можна."
    }
  }
});
