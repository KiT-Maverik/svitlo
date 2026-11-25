import { defineCarousel } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
import { answerDiagram } from "./slides/answerDiagram";

const slides = {
  items: {
    answerDiagram,
  },
  order: ["answerDiagram"],
};

export const answerCarousel = defineCarousel<"answerCarousel", typeof slides.items, typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94723",
  "slug": "answerCarousel",
  "type": "carousel",
  "params": {
    "showArrows": true
  },
  "locale": {
    "title": {
      "en": "Compare two light positions"
    }
  },
  slides,
});
