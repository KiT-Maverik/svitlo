import { defineImage, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

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
