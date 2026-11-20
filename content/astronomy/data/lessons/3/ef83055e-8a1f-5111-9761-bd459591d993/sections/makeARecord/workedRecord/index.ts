import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const workedRecord = defineMarkdown<"workedRecord", LessonLanguages>({
  id: "e637e30e-06c0-54ae-a1eb-98a66b0f70c1",
  slug: "workedRecord",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl"])
  }
});
