import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const recallPrompt = defineMarkdown<"recallPrompt", LessonLanguages>({
  id: "e5a48469-ec9c-4f65-9b63-4bcd50eb8a0b",
  slug: "recallPrompt",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
