import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const finalReflection = defineMarkdown<"finalReflection", LessonLanguages>({
  id: "3ae15609-4ae4-5966-a4a7-89fc7e48e5d3",
  slug: "finalReflection",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl"])
  }
});
