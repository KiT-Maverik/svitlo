import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const safeWays = defineMarkdown<"safeWays", LessonLanguages>({
  id: "62dfa921-fff7-5b31-b975-882f8ce70b8a",
  slug: "safeWays",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
