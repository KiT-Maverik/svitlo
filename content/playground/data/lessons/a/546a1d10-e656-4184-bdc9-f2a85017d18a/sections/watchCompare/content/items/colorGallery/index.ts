import { defineCarousel } from '@svitlo/engine/build';
import { languages } from "../../../../../languages";
import { colorGalleryImage as slide_colorGalleryImage } from "./slides/items/colorGalleryImage";
import { colorGalleryScene as slide_colorGalleryScene } from "./slides/items/colorGalleryScene";

const slides = {
  items: {
    "colorGalleryImage": slide_colorGalleryImage,
    "colorGalleryScene": slide_colorGalleryScene,
  },
  order: ["colorGalleryImage", "colorGalleryScene"],
};

export const colorGallery = defineCarousel<"colorGallery", typeof slides.items, typeof languages>({
  "id": "788c38e2-efb0-43eb-8234-8250a5047636",
  "slug": "colorGallery",
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
