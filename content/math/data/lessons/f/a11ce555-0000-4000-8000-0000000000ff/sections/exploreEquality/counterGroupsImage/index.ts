// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 437ec24e1ad5a62571db9d919feb787ba25d45dc2ad6d1de5b68d0e36e425641
import { defineImage, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../constants";

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
