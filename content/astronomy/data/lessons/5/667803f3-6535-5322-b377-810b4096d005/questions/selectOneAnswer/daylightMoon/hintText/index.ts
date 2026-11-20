import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "4ce584ae-24a0-430d-8b23-bfca7b51cdce",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подумай, чи обов’язково має настати ніч, щоб Місяць відбивав сонячне світло.",
      en: "Think about whether it has to be night for the Moon to reflect sunlight.",
      pl: "Zastanów się, czy musi być noc, żeby Księżyc odbijał światło Słońca.",
      qm: "Ay Küneş yarığını aks ettirsin dep gece olmaq şartmı? Tüşün."
    }
  }
});
