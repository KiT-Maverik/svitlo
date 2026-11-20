import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const newPlaceAnswer = defineMarkdown<"newPlaceAnswer", LessonLanguages>({
  id: "ae42ff6d-3673-4d59-bfe0-ec3fc51f01c0",
  slug: "newPlaceAnswer",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk"])
  }
});
