// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 1d903e5c695bab4fe47703af62d29c852acc6fe3f1765719e083a76f5e66e0d3
import { defineText } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../constants";

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
