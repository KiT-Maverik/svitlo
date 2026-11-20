import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "5aa6ca06-b91e-54e8-8a3f-ef9c6ff20818",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Обери спосіб, який не потребує, щоб хтось дивився безпосередньо на Сонце.",
      en: "Choose a way that does not require anyone to look directly at the Sun.",
      pl: "Wybierz sposób, który nie wymaga od nikogo bezpośredniego patrzenia na Słońce.",
      qm: "Kimseniñ Küneşke doğrudan-doğru baqmasını talap etmegen usulnı seç."
    }
  }
});
