import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const sunKeepsShining = defineMarkdown<"sunKeepsShining", LessonLanguages>({
  id: "f582bd87-2764-411a-ba0c-9a1001947509",
  slug: "sunKeepsShining",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
