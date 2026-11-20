import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "baf7f966-8ae9-425d-bd0f-ac193a95aa65",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сам вигляд «світиться» ще не показує, чи тіло саме випромінює світло."
    }
  }
});
