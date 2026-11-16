import { defineText } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

export const meaningOfEquality = defineText<"meaningOfEquality", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000012",
  slug: "meaningOfEquality",
  type: "text",
  params: {
    wrap: {
      enabled: true,
      typographyProps: {
        component: "p"
      }
    }
  },
  locale: {
    value: {
      en: "The equals sign shows two expressions with the same numerical value."
    }
  }
});
