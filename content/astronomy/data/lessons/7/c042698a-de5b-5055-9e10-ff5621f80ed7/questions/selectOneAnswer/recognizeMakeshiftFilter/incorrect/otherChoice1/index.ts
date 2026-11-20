import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const otherChoice1 = defineText<"otherChoice1", LessonLanguages>({
  id: "60d68e48-db41-5ed1-97aa-8a864429ef90",
  slug: "otherChoice1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Якщо плівка дуже темна, вона обов'язково захищає очі.",
      en: "If the film is very dark, it must protect your eyes.",
      pl: "Jeśli folia jest bardzo ciemna, na pewno chroni oczy.",
      qm: "Plönka pek qoyu olsa, közlerni mutlaqa qorçalay."
    }
  }
});
