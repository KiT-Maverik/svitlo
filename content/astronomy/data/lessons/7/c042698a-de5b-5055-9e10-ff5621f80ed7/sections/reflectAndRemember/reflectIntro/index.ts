import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const reflectIntro = defineMarkdown<"reflectIntro", LessonLanguages>({
  id: "0e3caedf-62b9-530b-a656-997e62720845",
  slug: "reflectIntro",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
