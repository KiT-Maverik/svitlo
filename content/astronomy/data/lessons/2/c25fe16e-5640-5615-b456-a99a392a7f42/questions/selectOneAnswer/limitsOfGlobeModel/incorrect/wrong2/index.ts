import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const wrong2 = defineText<"wrong2", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000023",
  slug: "wrong2",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце щоночі вимикається, так само як можна вимкнути ліхтарик.",
      en: "The Sun switches off every night, just like a flashlight can be switched off.",
      pl: "Słońce gaśnie każdej nocy, tak jak można wyłączyć latarkę.",
      qm: "Küneş er gece fener kibi söne."
    }
  }
});
