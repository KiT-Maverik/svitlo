import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const finalRecallAnswer = defineMarkdown<"finalRecallAnswer", LessonLanguages>({
  id: "d3aec8b2-c303-4f80-94a2-6e62617635de",
  slug: "finalRecallAnswer",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
