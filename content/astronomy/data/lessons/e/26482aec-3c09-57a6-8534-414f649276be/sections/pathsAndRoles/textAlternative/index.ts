import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const textAlternative = defineMarkdown<"textAlternative", LessonLanguages>({
  id: "cf394958-7885-45e5-b2ea-bd3176d1dd88",
  slug: "textAlternative",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
