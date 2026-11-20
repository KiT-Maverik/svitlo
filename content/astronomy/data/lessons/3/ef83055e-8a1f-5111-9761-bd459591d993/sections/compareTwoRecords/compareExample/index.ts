import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const compareExample = defineMarkdown<"compareExample", LessonLanguages>({
  id: "ed86e7e9-b945-526c-8c88-dcf00571d2d6",
  slug: "compareExample",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl"])
  }
});
