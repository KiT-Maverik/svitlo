import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const twoPlaces = defineMarkdown<"twoPlaces", LessonLanguages>({
  id: "871e9e7a-0e2b-428d-95e8-3ca59104d28b",
  slug: "twoPlaces",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
