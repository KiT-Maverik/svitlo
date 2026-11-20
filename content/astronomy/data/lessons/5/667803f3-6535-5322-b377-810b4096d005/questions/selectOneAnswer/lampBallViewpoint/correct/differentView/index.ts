import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const differentView = defineText<"differentView", LessonLanguages>({
  id: "aa286095-4718-4cf9-9416-410f41eacb3c",
  slug: "differentView",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Діти бачать різні частини освітленої половини тієї самої кулі.",
      en: "The children see different parts of the illuminated half of the same ball.",
      pl: "Dzieci widzą różne części oświetlonej połowy tej samej kuli.",
      qm: "Balalar aynı şarnıñ aydınlatılğan yarısınıñ türlü qısımlarını köre."
    }
  }
});
