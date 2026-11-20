import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const reflectClose = defineMarkdown<"reflectClose", LessonLanguages>({
  id: "de3f8a21-132e-4f9d-a287-b124daf381a5",
  slug: "reflectClose",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl", "qm"])
  }
});
