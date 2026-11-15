// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 2cd0f185e0f011b6795cebc97240a9c8271436de46c7d21728280750c84670e7
import { defineImage, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../../../../constants";

export const answerDiagram = defineImage<"answerDiagram", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000008",
  slug: "answerDiagram",
  type: "image",
  params: {
    fill: true,
    aspectRatio: 1.7,
    objectFit: "contain"
  },
  locale: {
    src: {
      en: resolveLessonMedia(import.meta.url, "image", "source", "en")
    },
    alt: {
      en: "Three plus two objects on one side, five on the other."
    },
    caption: {
      en: "Both sides represent five."
    },
    fallback: {
      offline: {
        en: "Image unavailable offline."
      },
      unavailable: {
        en: "Image pending production."
      },
      retry: {
        en: "Try again."
      }
    }
  }
});
