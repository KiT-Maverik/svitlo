import { defineScene } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

export const CompareGroupsSceneConfig = defineScene<"compareGroupsScene", LessonLanguages>({
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
