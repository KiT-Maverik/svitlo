import { defineCode, readCodeSource } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

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
