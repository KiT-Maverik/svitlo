import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const moonIntro = defineMarkdown<"moonIntro", LessonLanguages>({
  id: "a3abf8be-5714-4a13-96ed-b864e60f9fff",
  slug: "moonIntro",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl", "qm"])
  }
});
