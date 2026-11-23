import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const otherChoice1 = defineText<"otherChoice1", LessonLanguages>({
  id: "37f99454-61f2-5807-84b0-5fa2fa82fac7",
  slug: "otherChoice1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Самостійно зібрати пристрій для проєкції та випробувати його на Сонці.",
      en: "Build a projection device yourself and try it out on the Sun.",
      pl: "Samodzielnie zbudować urządzenie do projekcji i wypróbować je na Słońcu.",
      qm: "Proyeksiya cihazını öz başına yapıp, onı Küneşte sınamaq."
    }
  }
});
