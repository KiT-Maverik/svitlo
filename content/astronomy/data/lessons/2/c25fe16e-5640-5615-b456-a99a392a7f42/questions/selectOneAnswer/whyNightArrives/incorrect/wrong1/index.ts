import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const wrong1 = defineText<"wrong1", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000000d",
  slug: "wrong1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце перестало світити всій Землі до ранку.",
      en: "The Sun stopped shining on all of Earth until morning.",
      pl: "Słońce przestało świecić na całą Ziemię aż do rana.",
      qm: "Küneş sabağa qadar bütün Yerge ışıq bermege toqtadı."
    }
  }
});
