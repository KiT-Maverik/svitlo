import { defineCarousel } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
import { lampSlide } from "./slides/lampSlide";
import { interactiveSlide } from "./slides/interactiveSlide";

const slides = {
  items: {
    lampSlide,
    interactiveSlide,
  },
  order: ["lampSlide", "interactiveSlide"],
};

export const shadowCarousel = defineCarousel<"shadowCarousel", typeof slides.items, typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca9471b",
  "slug": "shadowCarousel",
  "type": "carousel",
  "params": {
    "showArrows": true,
    "showIndicators": true
  },
  "locale": {
    "title": {
      "en": "Two views of the shadow"
    }
  },
  slides,
});
