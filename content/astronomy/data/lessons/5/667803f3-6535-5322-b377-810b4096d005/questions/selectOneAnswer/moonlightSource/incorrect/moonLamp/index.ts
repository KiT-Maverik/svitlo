import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const moonLamp = defineText<"moonLamp", LessonLanguages>({
  id: "ffd9dd71-233f-422d-9459-00964c317954",
  slug: "moonLamp",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць світиться, бо його каміння дуже гаряче.",
      en: "The Moon glows because its rocks are very hot.",
      pl: "Księżyc świeci, ponieważ jego skały są bardzo gorące.",
      qm: "Ay taşları pek sıcaq olğanı içün yarqıray."
    }
  }
});
