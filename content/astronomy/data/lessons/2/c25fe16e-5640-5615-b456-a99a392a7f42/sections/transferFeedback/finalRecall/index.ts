import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const finalRecall = defineMarkdown<"finalRecall", LessonLanguages>({
  id: "db2fdc79-fed3-4fb8-8417-b824103f99e7",
  slug: "finalRecall",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
