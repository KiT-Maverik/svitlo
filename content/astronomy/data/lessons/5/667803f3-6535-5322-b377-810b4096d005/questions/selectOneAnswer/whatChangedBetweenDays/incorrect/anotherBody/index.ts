import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const anotherBody = defineText<"anotherBody", LessonLanguages>({
  id: "1fa623cd-98da-42df-bbc9-597b2585837d",
  slug: "anotherBody",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Замість першого Місяця з’явився інший Місяць.",
      en: "A different Moon appeared in place of the first one.",
      pl: "Zamiast pierwszego Księżyca pojawił się inny.",
      qm: "Birinci Ayniñ yerine başqa Ay peyda oldı."
    }
  }
});
