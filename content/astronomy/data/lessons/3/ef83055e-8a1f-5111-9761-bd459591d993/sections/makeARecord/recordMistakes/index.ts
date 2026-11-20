import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const recordMistakes = defineMarkdown<"recordMistakes", LessonLanguages>({
  id: "1cbca476-86d5-55c7-8247-b9f8b096f3c0",
  slug: "recordMistakes",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl"])
  }
});
