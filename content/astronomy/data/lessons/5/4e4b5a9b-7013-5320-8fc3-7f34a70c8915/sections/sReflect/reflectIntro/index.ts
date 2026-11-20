import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const reflectIntro = defineMarkdown<"reflectIntro", LessonLanguages>({
  id: "c1505ae0-7006-4e33-bcf6-2c1fd354876f",
  slug: "reflectIntro",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
