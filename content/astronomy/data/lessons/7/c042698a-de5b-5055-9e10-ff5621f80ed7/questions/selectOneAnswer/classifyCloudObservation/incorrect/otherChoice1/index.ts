import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const otherChoice1 = defineText<"otherChoice1", LessonLanguages>({
  id: "61aa6684-08b7-5266-ab8a-5a855c1a78a5",
  slug: "otherChoice1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подивитися на Сонце крізь звичайні сонцезахисні окуляри.",
      en: "Look at the Sun through ordinary sunglasses.",
      pl: "Popatrzeć na Słońce przez zwykłe okulary przeciwsłoneczne."
    }
  }
});
