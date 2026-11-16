import { defineImage, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

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
