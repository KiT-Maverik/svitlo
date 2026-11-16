import { defineScene } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

export const ThreePlusTwoSlideConfig = defineScene<"threePlusTwoSlide", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000002",
  slug: "threePlusTwoSlide",
  type: "scene",
  params: {},
  locale: {
    value: {
      instruction: {
        en: "Arrange three counters and two more to show five."
      },
      feedback: {
        correct: {
          en: "Three plus two equals five."
        },
        incorrect: {
          en: "Count the groups and try again."
        }
      }
    }
  }
});
