import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const welcome = defineMarkdown<"welcome", LessonLanguages>({
  id: "18ba7cd1-b973-57a6-bee5-86b50328a4da",
  slug: "welcome",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
