import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const otherChoice1 = defineText<"otherChoice1", LessonLanguages>({
  id: "f74eb31d-17e7-5670-82cf-f1624f500566",
  slug: "otherChoice1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подивитися на Сонце крізь вікно лише на мить.",
      en: "Look at the Sun through a window for just a moment.",
      pl: "Spojrzeć na Słońce przez okno tylko na chwilę.",
      qm: "Küneşke pencere camından tek bir an baqmaq."
    }
  }
});
