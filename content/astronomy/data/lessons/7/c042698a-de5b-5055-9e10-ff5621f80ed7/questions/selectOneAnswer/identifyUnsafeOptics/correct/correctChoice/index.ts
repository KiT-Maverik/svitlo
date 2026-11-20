import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const correctChoice = defineText<"correctChoice", LessonLanguages>({
  id: "ae194194-48af-537c-beba-d9447e8528c6",
  slug: "correctChoice",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подивитися на Сонце крізь бінокль без спеціального сонячного фільтра.",
      en: "Look at the Sun through binoculars without a special solar filter.",
      pl: "Popatrzeć na Słońce przez lornetkę bez specjalnego filtra słonecznego.",
      qm: "Mahsus küneş filtri olmağan dürbinnen Küneşke baqmaq."
    }
  }
});
