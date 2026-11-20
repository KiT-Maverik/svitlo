import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const openingQuestion = defineMarkdown<"openingQuestion", LessonLanguages>({
  id: "7dc8cb5b-fc1c-42e4-aae7-f9f521a1c7ac",
  slug: "openingQuestion",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
