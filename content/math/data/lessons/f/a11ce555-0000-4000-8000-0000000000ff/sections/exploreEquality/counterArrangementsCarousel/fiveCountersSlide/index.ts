// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: cea7da1f9fd45bcb2e5641181c8ecf34b138d5bfc2eb652e02cc1f7c8632cc3c
import { defineImage, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../../constants";

export const fiveCountersSlide = defineImage<"fiveCountersSlide", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000001",
  slug: "fiveCountersSlide",
  type: "image",
  params: {
    fill: true,
    aspectRatio: 1.5,
    objectFit: "contain"
  },
  locale: {
    src: resolveLessonMedia(import.meta.url, "image", "source"),
    alt: {
      en: "Five counters in one row."
    },
    caption: {
      en: "Five counters."
    }
  }
});
