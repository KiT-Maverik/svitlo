import { defineText } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

export const reverseAnswer = defineText<"reverseAnswer", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-00000000000b",
  slug: "reverseAnswer",
  type: "text",
  params: {},
  locale: {
    value: {
      en: "Yes. Both sides equal five; the order does not change equality."
    }
  }
});
