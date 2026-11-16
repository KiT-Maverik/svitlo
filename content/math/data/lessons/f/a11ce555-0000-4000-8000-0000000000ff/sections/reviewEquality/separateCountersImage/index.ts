import { defineImage, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

export const separateCountersImage = defineImage<"separateCountersImage", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000015",
  slug: "separateCountersImage",
  type: "image",
  params: {
    width: 640,
    height: 360,
    objectFit: "contain",
    unoptimized: true
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
