import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const wrong2 = defineText<"wrong2", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000007",
  slug: "wrong2",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце вимкнулося тільки для місця Л.",
      en: "The Sun has switched off only for place L.",
      pl: "Słońce zgasło tylko dla miejsca L.",
      qm: "Küneş faqat L yeri içün sönip qaldı."
    }
  }
});
