import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "beacfe83-9e7c-4f41-9827-4ccb0ba35bc3",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подумай про тіло, яке рухається навколо іншого тіла, а те — навколо Сонця."
    }
  }
});
