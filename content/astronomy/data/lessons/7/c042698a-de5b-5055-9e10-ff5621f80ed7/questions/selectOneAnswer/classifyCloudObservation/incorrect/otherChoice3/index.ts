import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const otherChoice3 = defineText<"otherChoice3", LessonLanguages>({
  id: "a9de8af1-ca6b-5202-bec4-dc9d7139393f",
  slug: "otherChoice3",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Відкласти дослідження неба до ночі, бо вдень це неможливо.",
      en: "Wait until night to study the sky because it is impossible during the day.",
      pl: "Odłożyć badanie nieba do nocy, bo w dzień nie jest to możliwe."
    }
  }
});
