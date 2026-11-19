import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const skyExamples = defineMarkdown<"skyExamples", LessonLanguages>({
  id: "827b5df7-917c-5e7e-9e21-65048f89e8a9",
  slug: "skyExamples",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
