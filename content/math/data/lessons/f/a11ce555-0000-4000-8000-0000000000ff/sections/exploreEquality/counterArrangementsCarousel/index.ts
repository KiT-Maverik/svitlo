import { defineCarousel } from '@svitlo/engine/build';
import { fiveCountersSlide } from "./fiveCountersSlide";
import { ThreePlusTwoSlideConfig } from "./threePlusTwoSlide";
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

const slides = {
  items: {
    fiveCountersSlide,
    threePlusTwoSlide: ThreePlusTwoSlideConfig
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
