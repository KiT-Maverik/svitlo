import { defineCarousel } from '@svitlo/engine/build';
import { languages } from "../../../../../../../../../../../../languages";
import { answerGalleryImage as slide_answerGalleryImage } from "./slides/items/answerGalleryImage";
import { answerGalleryScene as slide_answerGalleryScene } from "./slides/items/answerGalleryScene";

const slides = {
  items: {
    "answerGalleryImage": slide_answerGalleryImage,
    "answerGalleryScene": slide_answerGalleryScene,
  },
  order: ["answerGalleryImage", "answerGalleryScene"],
};

export const answerGallery = defineCarousel<"answerGallery", typeof slides.items, typeof languages>({
  "id": "9bbb3def-8ca2-4860-a2cd-2961f32e991c",
  "slug": "answerGallery",
  "type": "carousel",
  "params": {
    "aspectRatio": 1.6,
    "objectFit": "contain",
    "loop": false,
    "autoplay": false,
    "showArrows": true,
    "showIndicators": true,
    "allowSwipe": true,
    "allowFullscreen": false
  },
  "locale": {
    "title": {
      "en": "Same color, different shapes"
    }
  },
  slides,
});
