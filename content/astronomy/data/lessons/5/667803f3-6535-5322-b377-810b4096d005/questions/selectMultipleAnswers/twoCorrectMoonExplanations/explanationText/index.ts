import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "6812c42f-46cc-4307-a182-73b0548ad944",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Справжній Місяць залишається тією самою кулею, а Сонце освітлює її поверхню. Спостерігач із Землі бачить різну частку освітленої половини."
    }
  }
});
