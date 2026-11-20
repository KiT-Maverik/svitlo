import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000002",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "У двох далеких місцях Землі зараз по-різному: у місці К — день, а в місці Л — ніч. Сонце продовжує світити. Чому так може бути?"
    }
  }
});
