import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const rotationExplanation = defineMarkdown<"rotationExplanation", LessonLanguages>({
  id: "b43aef54-9d62-4f89-a473-11755c89a7f5",
  slug: "rotationExplanation",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
