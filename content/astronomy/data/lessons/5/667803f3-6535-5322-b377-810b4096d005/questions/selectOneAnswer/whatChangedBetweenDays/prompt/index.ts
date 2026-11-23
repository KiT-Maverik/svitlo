import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "d94b6eb7-acf0-4a85-8131-8137e0faf589",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "У понеділок з Землі видно тонкий серп Місяця, а через кілька днів — майже весь світлий диск. Що насправді змінилося?",
      en: "On Monday, a thin crescent of the Moon was visible from Earth. A few days later, almost its entire bright disk was visible. What actually changed?",
      pl: "W poniedziałek z Ziemi było widać cienki sierp Księżyca, a kilka dni później — prawie całą jego jasną tarczę. Co naprawdę się zmieniło?",
      qm: "Bazartesi künü Yerden Ayniñ ince orağı köründi, bir qaç kün soñ ise emen bütün aydın diski köründi. Aslında ne deñişti?"
    }
  }
});
