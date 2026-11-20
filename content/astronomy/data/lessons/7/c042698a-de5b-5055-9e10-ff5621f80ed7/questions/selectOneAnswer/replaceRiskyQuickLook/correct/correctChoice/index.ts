import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const correctChoice = defineText<"correctChoice", LessonLanguages>({
  id: "5484d523-7aee-5bd2-94d4-774bcf2aa45f",
  slug: "correctChoice",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Розглянути разом перевірений науковий знімок Сонця.",
      en: "Look at a verified scientific photograph of the Sun together.",
      pl: "Wspólnie obejrzeć sprawdzone naukowe zdjęcie Słońca.",
      qm: "Küneşniñ tekşirilgen ilmiy fotoresmini beraber körmek."
    }
  }
});
