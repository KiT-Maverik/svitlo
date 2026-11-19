import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const newPlace = defineMarkdown<"newPlace", LessonLanguages>({
  id: "c6cf9260-b0f3-450f-9966-a6fdbd70168b",
  slug: "newPlace",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
