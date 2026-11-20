import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const marsExample = defineMarkdown<"marsExample", LessonLanguages>({
  id: "ee6fba9c-8f02-4dc9-8b2d-fbec71e2462b",
  slug: "marsExample",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
