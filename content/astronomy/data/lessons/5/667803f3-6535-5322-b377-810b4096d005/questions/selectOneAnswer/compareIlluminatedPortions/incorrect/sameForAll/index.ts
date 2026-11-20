import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const sameForAll = defineText<"sameForAll", LessonLanguages>({
  id: "08ab3c96-c31a-4a46-8d2d-d9a4f203b7bd",
  slug: "sameForAll",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Усі троє бачили однакову освітлену частину.",
      en: "All three saw the same amount of the lit part.",
      pl: "Wszyscy troje widzieli tak samo dużą oświetloną część.",
      qm: "Üçü de aydın qısımnı aynı miqdarda kördi."
    }
  }
});
