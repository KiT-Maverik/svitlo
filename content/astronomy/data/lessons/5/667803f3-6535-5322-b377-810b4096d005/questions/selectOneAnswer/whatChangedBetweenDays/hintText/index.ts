import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "4600cddd-27b3-4fd8-a70b-c97a54e43657",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подумай, чи може одна й та сама куля мати різний освітлений вигляд.",
      en: "Think about whether the same ball can look differently lit.",
      pl: "Zastanów się, czy ta sama kula może wyglądać inaczej, gdy jest oświetlona.",
      qm: "Aynı şar türlü şekilde aydın körüne bilirmi? Şunı tüşün."
    }
  }
});
