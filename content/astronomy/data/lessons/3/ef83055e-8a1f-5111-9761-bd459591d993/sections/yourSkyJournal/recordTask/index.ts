import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const recordTask = defineMarkdown<"recordTask", LessonLanguages>({
  id: "52d283ad-a994-5329-8845-6b542a48f49d",
  slug: "recordTask",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl", "qm"])
  }
});
