import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "d7aab809-4c70-46d9-96e0-7562d733db28",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Напрямок світлого серпа залежить від умов і способу спостереження. Він не доводить зміни справжньої кулястої форми Місяця.",
      en: "The crescent's direction depends on how and where it is observed. It does not mean that the Moon's real spherical shape has changed.",
      pl: "Kierunek jasnego sierpa zależy od warunków i sposobu obserwacji. Nie oznacza to, że prawdziwy, kulisty kształt Księżyca się zmienił.",
      qm: "Oraqnıñ yönü közetüv şartlarına ve usulına bağlı. Bu, Ayniñ kerçek şar şekli deñişkenini köstermey."
    }
  }
});
