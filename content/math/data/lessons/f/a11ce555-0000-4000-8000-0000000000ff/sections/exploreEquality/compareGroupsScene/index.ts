// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 145eb81374be1b40c578b75c93bdfc17ba2fcdab7bf3bc3423efa585bbdc402d
import { defineScene } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../constants";

export const compareGroupsScene = defineScene<"compareGroupsScene", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000004",
  slug: "compareGroupsScene",
  type: "scene",
  params: {},
  locale: {
    value: {
      instruction: {
        en: "Compare both sides."
      },
      left: {
        label: {
          en: "Left"
        },
        value: "3 + 2"
      },
      right: {
        label: {
          en: "Right"
        },
        value: "5"
      },
      feedback: {
        correct: {
          en: "Both sides are five."
        },
        incorrect: {
          en: "Count again."
        }
      }
    }
  }
});
