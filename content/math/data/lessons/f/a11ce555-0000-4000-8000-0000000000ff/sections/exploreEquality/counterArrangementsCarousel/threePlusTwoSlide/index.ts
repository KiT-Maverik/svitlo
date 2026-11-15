// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 92850402865a0fb2f413bf88d44929f1a5c5b059dcc77fc9542f17f6439680d9
import { defineScene } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../../constants";

export const threePlusTwoSlide = defineScene<"threePlusTwoSlide", LessonLanguages>({
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
