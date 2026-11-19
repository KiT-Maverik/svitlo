import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const whyProtectEyes = defineMarkdown<"whyProtectEyes", LessonLanguages>({
  id: "5ae8cf30-7084-5d1f-aa8a-79701cca070c",
  slug: "whyProtectEyes",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
