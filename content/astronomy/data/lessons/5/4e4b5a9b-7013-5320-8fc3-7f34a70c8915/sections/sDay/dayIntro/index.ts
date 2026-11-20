import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const dayIntro = defineMarkdown<"dayIntro", LessonLanguages>({
  id: "cd9659dc-1a6c-444f-a402-4800645b2fc6",
  slug: "dayIntro",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl", "qm"])
  }
});
