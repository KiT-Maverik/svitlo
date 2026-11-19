import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const closingMessage = defineMarkdown<"closingMessage", LessonLanguages>({
  id: "ed026657-d710-5376-bf67-6668ba8b5f5d",
  slug: "closingMessage",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
