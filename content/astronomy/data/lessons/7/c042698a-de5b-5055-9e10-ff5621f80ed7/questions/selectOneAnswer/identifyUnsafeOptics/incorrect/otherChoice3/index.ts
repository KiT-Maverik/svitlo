import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const otherChoice3 = defineText<"otherChoice3", LessonLanguages>({
  id: "9cb355c3-3b69-589b-8d8b-c1b8b5fa6060",
  slug: "otherChoice3",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Прочитати науковий опис Сонця з дорослим.",
      en: "Read a scientific description of the Sun with an adult.",
      pl: "Przeczytać z dorosłym naukowy opis Słońca.",
      qm: "Büyüklerden birinen beraber Küneş aqqında ilmiy tarifni oqumaq."
    }
  }
});
