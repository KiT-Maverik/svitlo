import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const welcome = defineMarkdown<"welcome", LessonLanguages>({
  id: "ab32a0f0-49e0-5c69-a34f-cec8436c33cd",
  slug: "welcome",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl"])
  }
});
