import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const threeRoles = defineMarkdown<"threeRoles", LessonLanguages>({
  id: "21a62cc4-3710-423e-b21d-caf490461429",
  slug: "threeRoles",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
