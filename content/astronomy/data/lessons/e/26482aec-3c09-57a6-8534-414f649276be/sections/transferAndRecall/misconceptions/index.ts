import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const misconceptions = defineMarkdown<"misconceptions", LessonLanguages>({
  id: "ab4356a1-d73b-4928-b0f1-d2c6269266f0",
  slug: "misconceptions",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
