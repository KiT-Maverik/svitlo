import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const differentMoon = defineText<"differentMoon", LessonLanguages>({
  id: "9a6b8d92-991d-466d-8614-1a397b1aaae5",
  slug: "differentMoon",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Удень з’являється інший, денний Місяць.",
      en: "A different, daytime Moon appears during the day.",
      pl: "W dzień pojawia się inny, dzienny Księżyc.",
      qm: "Küntüz başqa, küntüz Ayi peyda ola."
    }
  }
});
