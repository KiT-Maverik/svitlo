import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const globeLamp = defineMarkdown<"globeLamp", LessonLanguages>({
  id: "c24e84f0-5766-4ace-a72b-69894a846f05",
  slug: "globeLamp",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
