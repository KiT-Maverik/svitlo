import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const earthProduces = defineText<"earthProduces", LessonLanguages>({
  id: "54db9869-60e7-44cd-892d-ff24ff22a030",
  slug: "earthProduces",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць відбиває світло лише далеких зір, а не Сонця.",
      en: "The Moon reflects light only from distant stars, not the Sun.",
      pl: "Księżyc odbija światło tylko od odległych gwiazd, a nie od Słońca.",
      qm: "Ay Küneşniñ degil, yalnız uzaq yıldızlarnıñ yarığını aks ettire."
    }
  }
});
