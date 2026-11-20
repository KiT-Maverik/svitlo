import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "85ec3447-fa30-4ebf-8cd8-85b8fbeee499",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць відбиває сонячне світло і вдень, і вночі. Його видимість залежить від положення на небі й умов спостереження."
    }
  }
});
