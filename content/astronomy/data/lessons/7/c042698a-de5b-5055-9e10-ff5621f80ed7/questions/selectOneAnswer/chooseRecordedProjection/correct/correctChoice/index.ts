import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const correctChoice = defineText<"correctChoice", LessonLanguages>({
  id: "b4237ae4-3cb2-580f-8e52-3aed43f8a880",
  slug: "correctChoice",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Попросити показати готовий запис проєкції, підготовлений фахівцями."
    }
  }
});
