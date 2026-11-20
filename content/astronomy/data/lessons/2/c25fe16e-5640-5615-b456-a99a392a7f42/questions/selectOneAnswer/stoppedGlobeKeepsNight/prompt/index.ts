import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000010",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "На кульці є позначка Г, яка зараз на темному боці. Лампа світить, але ні лампу, ні кульку більше не рухають. Що буде в місці Г, доки модель залишається нерухомою?"
    }
  }
});
