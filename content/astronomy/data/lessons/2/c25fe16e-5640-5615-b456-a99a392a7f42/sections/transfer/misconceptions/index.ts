import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const misconceptions = defineMarkdown<"misconceptions", LessonLanguages>({
  id: "f70a1c23-be27-48dc-a6ab-75ee993932c1",
  slug: "misconceptions",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
