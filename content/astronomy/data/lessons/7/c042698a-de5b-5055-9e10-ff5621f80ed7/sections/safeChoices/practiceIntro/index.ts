import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const practiceIntro = defineMarkdown<"practiceIntro", LessonLanguages>({
  id: "d172d47e-8c5b-57e5-95d5-590783750974",
  slug: "practiceIntro",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
