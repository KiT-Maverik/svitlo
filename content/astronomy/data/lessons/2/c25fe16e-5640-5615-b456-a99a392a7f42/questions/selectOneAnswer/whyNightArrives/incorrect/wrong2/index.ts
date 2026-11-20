import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const wrong2 = defineText<"wrong2", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000000e",
  slug: "wrong2",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Земля за кілька годин облетіла навколо Сонця.",
      en: "Earth travelled all the way around the Sun in just a few hours.",
      pl: "Ziemia okrążyła Słońce w ciągu kilku godzin.",
      qm: "Yer bir qaç saat içinde Küneş etrafında bir kere aylanıp çıqtı."
    }
  }
});
