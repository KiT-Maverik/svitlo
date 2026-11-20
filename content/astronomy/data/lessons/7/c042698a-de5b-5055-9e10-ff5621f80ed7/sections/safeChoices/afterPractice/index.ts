import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const afterPractice = defineMarkdown<"afterPractice", LessonLanguages>({
  id: "15501927-9c5e-570d-aee6-8b22efa0ef31",
  slug: "afterPractice",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
