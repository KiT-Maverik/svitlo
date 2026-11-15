// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 1a835dc0c485b12b2b3930cf3fa4e078fbaef77189f62c3dd8111bf821c4b7fe
import { defineCode, readCodeSource } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../constants";

export const compareValuesCode = defineCode<"compareValuesCode", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000005",
  slug: "compareValuesCode",
  type: "code",
  params: {
    language: "typescript",
    codeAsText: readCodeSource(import.meta.url, "ts")
  },
  locale: {
    title: {
      en: "Verify equality with TypeScript"
    }
  }
});
