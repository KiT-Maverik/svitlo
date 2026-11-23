import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const quizInvitation = defineMarkdown<"quizInvitation", LessonLanguages>({
  id: "aeb987c1-704e-4ef6-8a93-000000000051",
  slug: "quizInvitation",
  type: "markdown",
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ["uk", "en", "pl", "qm"])
  }
});
