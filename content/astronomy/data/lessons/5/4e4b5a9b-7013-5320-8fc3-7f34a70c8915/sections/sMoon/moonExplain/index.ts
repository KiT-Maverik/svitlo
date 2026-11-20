import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const moonExplain = defineMarkdown<"moonExplain", LessonLanguages>({
  id: "be948409-31e8-4d41-a417-a6b864c9ba6a",
  slug: "moonExplain",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
