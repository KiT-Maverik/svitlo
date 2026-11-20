import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const wrong2 = defineText<"wrong2", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000015",
  slug: "wrong2",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Нерухома лампа поступово освітить усі боки кульки.",
      en: "The unmoving lamp will gradually light up every side of the ball.",
      pl: "Nieruchoma lampa stopniowo oświetli wszystkie strony kuli.",
      qm: "Areketsiz lampa vaqt keçkeninen küreniñ er tarafını aydınlatacaq."
    }
  }
});
