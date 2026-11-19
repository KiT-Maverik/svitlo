import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const starPrediction = defineMarkdown<"starPrediction", LessonLanguages>({
  id: "5534a30b-4e23-4625-99d0-3f0b04c8e46c",
  slug: "starPrediction",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
