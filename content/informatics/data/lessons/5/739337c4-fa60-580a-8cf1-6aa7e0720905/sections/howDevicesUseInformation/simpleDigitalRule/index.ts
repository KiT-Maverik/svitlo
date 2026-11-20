import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/739337c4-fa60-580a-8cf1-6aa7e0720905/constants";

export const simpleDigitalRule = defineMarkdown<"simpleDigitalRule", LessonLanguages>({
  id: "b6f90e2a-4df0-4dbf-83a1-b00000000005",
  slug: "simpleDigitalRule",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
