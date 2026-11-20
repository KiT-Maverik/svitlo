import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "ef8d3631-3dd0-42cd-85d4-01d81ae8863b",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Не переплутай тіло, яке рухається, з тілом, навколо якого воно рухається."
    }
  }
});
