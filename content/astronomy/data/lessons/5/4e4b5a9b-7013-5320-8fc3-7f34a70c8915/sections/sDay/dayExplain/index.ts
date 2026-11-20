import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const dayExplain = defineMarkdown<"dayExplain", LessonLanguages>({
  id: "f7ac388e-f6b5-4521-a67c-18a80ab96ac2",
  slug: "dayExplain",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
