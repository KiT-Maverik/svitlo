import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { starPrediction } from "./starPrediction";
import { starsAtNight } from "./starsAtNight";

const content = {
  items: {
    starsAtNight,
    starPrediction
  },
  order: [
    "starsAtNight",
    "starPrediction"
  ]
};

export const sunAmongStars = defineContentSection<"sunAmongStars", typeof content.items, LessonLanguages>({
  id: "eadc40d8-f950-44a5-9bc0-b96c7b239045",
  slug: "sunAmongStars",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Сонце й далекі зорі"
    },
    navigationLabel: {
      uk: "Сонце й далекі зорі"
    }
  },
  content
});
