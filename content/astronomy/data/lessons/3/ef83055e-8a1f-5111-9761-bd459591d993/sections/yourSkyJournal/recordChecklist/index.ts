import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const recordChecklist = defineMarkdown<"recordChecklist", LessonLanguages>({
  id: "8c9db21f-d9ed-59a0-80d3-4a2a5979eadc",
  slug: "recordChecklist",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl", "qm"])
  }
});
