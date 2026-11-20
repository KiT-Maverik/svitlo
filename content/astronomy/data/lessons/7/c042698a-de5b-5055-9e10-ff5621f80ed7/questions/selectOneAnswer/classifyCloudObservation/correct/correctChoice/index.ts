import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const correctChoice = defineText<"correctChoice", LessonLanguages>({
  id: "8675b5fd-f59d-5b43-b1bc-055863ede5cb",
  slug: "correctChoice",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Порівняти форми хмар на двох готових фотографіях денного неба.",
      en: "Compare the shapes of clouds in two existing photographs of the daytime sky.",
      pl: "Porównać kształty chmur na dwóch gotowych zdjęciach dziennego nieba.",
      qm: "Kündüzgi semanıñ eki azır fotoresminde bulutlarnıñ şekillerini teñeştirmek."
    }
  }
});
