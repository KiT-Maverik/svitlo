import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const quizIntro = defineMarkdown<"quizIntro", LessonLanguages>({
  id: "2b550f05-8866-583f-a8f4-391e6d3eec4e",
  slug: "quizIntro",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl"])
  }
});
