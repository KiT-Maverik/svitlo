import { defineImage, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

export const counterGroupsImage = defineImage<"counterGroupsImage", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000014",
  slug: "counterGroupsImage",
  type: "image",
  params: {
    fill: true,
    aspectRatio: 1.5,
    objectFit: "contain",
    sizes: "100vw",
    unoptimized: true
  },
  locale: {
    src: resolveLessonMedia(import.meta.url, "image", "source"),
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
