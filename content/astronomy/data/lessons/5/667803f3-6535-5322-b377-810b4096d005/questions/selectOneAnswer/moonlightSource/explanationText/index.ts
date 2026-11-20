import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "3ddc564a-8271-4124-ad89-3cdf56b5907b",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце освітлює Місяць. Його поверхня відбиває частину сонячного світла до наших очей."
    }
  }
});
