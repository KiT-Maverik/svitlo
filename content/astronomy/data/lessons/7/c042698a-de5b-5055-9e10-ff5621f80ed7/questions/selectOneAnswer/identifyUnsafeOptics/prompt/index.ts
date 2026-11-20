import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "b8a0eb4b-4824-5279-99e8-d2f51e1c5b7e",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Який із цих способів дізнаватися про Сонце небезпечний для очей?",
      en: "Which of these ways of learning about the Sun is dangerous for your eyes?",
      pl: "Który z tych sposobów poznawania Słońca jest niebezpieczny dla oczu?"
    }
  }
});
