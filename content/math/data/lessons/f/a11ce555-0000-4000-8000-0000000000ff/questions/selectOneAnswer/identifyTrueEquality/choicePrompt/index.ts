// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 0c38773f78ecad8a5e4a91bf2d77b8486bf79a923b176a0bd3bb3013065e5383
import { defineText } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../../constants";

export const choicePrompt = defineText<"choicePrompt", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-00000000001a",
  slug: "choicePrompt",
  type: "text",
  params: {},
  locale: {
    value: {
      en: "Which statement is true?"
    }
  }
});
