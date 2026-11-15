// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 20b8a2b98002c09efc9af8ea76b4d5437d19dbca7971aaec29a7bb5676d8c550
import { defineCarousel } from '@svitlo/engine/build';
import { fiveCountersSlide } from "./fiveCountersSlide";
import { threePlusTwoSlide } from "./threePlusTwoSlide";
import type { LessonLanguages } from "../../../constants";

const slides = {
  items: {
    fiveCountersSlide,
    threePlusTwoSlide
  },
  order: [
    "fiveCountersSlide",
    "threePlusTwoSlide"
  ]
};

export const counterArrangementsCarousel = defineCarousel<"counterArrangementsCarousel", typeof slides.items, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000003",
  slug: "counterArrangementsCarousel",
  type: "carousel",
  params: {
    aspectRatio: 1.5,
    objectFit: "contain",
    loop: true,
    autoplay: false,
    autoplayIntervalMs: 5000,
    transition: "fade",
    transitionDurationMs: 350,
    showArrows: true,
    showIndicators: true,
    allowFullscreen: true,
    allowSwipe: true,
    startIndex: 0,
    pauseOnHover: true
  },
  locale: {
    title: {
      en: "Arrangements of five objects"
    }
  },
  slides
});
