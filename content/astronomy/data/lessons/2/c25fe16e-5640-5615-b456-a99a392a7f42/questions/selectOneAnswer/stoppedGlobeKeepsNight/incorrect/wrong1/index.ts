import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const wrong1 = defineText<"wrong1", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000014",
  slug: "wrong1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "У місці Г з часом настане день, навіть якщо нічого не рухати.",
      en: "Day will come to «Г» after some time, even if nothing moves.",
      pl: "Po pewnym czasie w miejscu «Г» nastanie dzień, nawet jeśli nic się nie poruszy.",
      qm: "Biraz vaqt keçkenden soñ «Г» yerinde kündüz olacaq, iç bir şey areket etmese bile."
    }
  }
});
