import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const recordGuide = defineMarkdown<"recordGuide", LessonLanguages>({
  id: "940cef95-fe46-5e87-bd83-0ad989163439",
  slug: "recordGuide",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl"])
  }
});
