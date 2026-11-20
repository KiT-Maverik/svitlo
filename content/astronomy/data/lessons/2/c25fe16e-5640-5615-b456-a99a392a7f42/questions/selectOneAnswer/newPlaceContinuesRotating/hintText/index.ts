import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000018",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Простеж подумки за позначкою Д, поки кулька обертається, а лампа стоїть на місці."
    }
  }
});
