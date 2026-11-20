import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000004",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце освітлює не всю Землю одночасно. Місце К зараз на освітленому боці, а місце Л — на неосвітленому."
    }
  }
});
