import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const noticeExample = defineMarkdown<"noticeExample", LessonLanguages>({
  id: "7f19ac6f-2907-5889-aff3-ce29fe24f7a1",
  slug: "noticeExample",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl", "qm"])
  }
});
