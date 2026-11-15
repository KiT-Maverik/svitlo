// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: bed3f152b853e31a825ee50ba74d9c27490e1ffd31d0552f0ba85e9a5affe239
import { defineImage, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../constants";

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
