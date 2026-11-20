import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "faef47b7-dc42-4dd6-8e58-4d5d70fa87a7",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Зоря сама випромінює світло, планета рухається навколо зорі, а природний супутник — навколо планети."
    }
  }
});
