import { defineMarkdown } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

export const explainWithMarkdown = defineMarkdown<"explainWithMarkdown", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000013",
  slug: "explainWithMarkdown",
  type: "markdown",
  params: {},
  locale: {},
  files: {
    moduleUrl: import.meta.url,
    languages: [
      "en"
    ]
  }
});
