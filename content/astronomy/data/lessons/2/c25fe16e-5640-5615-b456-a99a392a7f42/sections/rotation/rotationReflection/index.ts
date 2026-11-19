import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const rotationReflection = defineMarkdown<"rotationReflection", LessonLanguages>({
  id: "66adbb17-22a3-4b9e-b080-020cd34e6be9",
  slug: "rotationReflection",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
