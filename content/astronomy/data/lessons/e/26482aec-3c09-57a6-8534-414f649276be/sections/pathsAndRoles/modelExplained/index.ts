import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const modelExplained = defineMarkdown<"modelExplained", LessonLanguages>({
  id: "3cb62087-ee57-4bc8-a994-631a37aa249c",
  slug: "modelExplained",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
