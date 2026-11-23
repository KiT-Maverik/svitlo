import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "4b35625d-5d35-4684-9590-caf3d4819dc1",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "На третьому описі видно найбільшу частку освітленої поверхні. Сам Місяць у всіх трьох випадках залишається тим самим.",
      en: "In the third description, the largest portion of the lit surface is visible. It is the same Moon in all three cases.",
      pl: "W trzecim opisie widać największą część oświetlonej powierzchni. We wszystkich trzech przypadkach jest to ten sam Księżyc.",
      qm: "Üçünci tarifte aydınlatılğan yüzniñ eñ büyük payı körüne. Üçünde de Ay aynı şar olaraq qala."
    }
  }
});
