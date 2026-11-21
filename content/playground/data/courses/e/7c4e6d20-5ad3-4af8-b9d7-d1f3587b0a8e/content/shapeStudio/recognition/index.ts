import { defineChapter } from '@svitlo/engine/build';

import { shapesAssessment } from "#lessonsData/1/747b377b-3d8c-5b76-ad80-02b9ab0b9d31/index";
import { circleAndOval } from "#lessonsData/9/535a3733-9720-5b84-90fd-24e3e5aa1e19/index";
import { polygonIntro } from "#lessonsData/e/f8cd3578-5c9a-5935-b070-6064acf2b1be/index";
import type { CourseLanguages } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/constants";

const items = {
  polygonIntro,
  circleAndOval,
  shapesAssessment,
};

export const recognition = defineChapter<"recognition", typeof items, CourseLanguages>({
  type: "chapter",
  id: "62f48d9f-c4f2-53f7-a4ec-363a3366a283",
  slug: "recognition",
  params: {},
  locale: {
    title: {
      en: "Recognizing shapes"
    }
  },
  content: {
    items,
    order: [
      "polygonIntro",
      "circleAndOval",
      "shapesAssessment"
    ]
  }
});
