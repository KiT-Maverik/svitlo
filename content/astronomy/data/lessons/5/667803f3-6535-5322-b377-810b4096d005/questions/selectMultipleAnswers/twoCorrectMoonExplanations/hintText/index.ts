import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "cbedb75a-1581-4afb-a404-1bfd48125060",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Перевір окремо, чи змінюється саме тіло і звідки береться його світло."
    }
  }
});
