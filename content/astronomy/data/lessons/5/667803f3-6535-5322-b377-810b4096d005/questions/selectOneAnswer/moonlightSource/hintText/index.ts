import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "f4b51b2b-7c73-4c15-a5ee-5d2b6c6e6c92",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Згадай різницю між джерелом світла і предметом, який це світло відбиває."
    }
  }
});
