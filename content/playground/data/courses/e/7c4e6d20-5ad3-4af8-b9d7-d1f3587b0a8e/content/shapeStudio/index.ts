import { defineModule } from '@svitlo/engine/build';

import { patterns } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/content/shapeStudio/patterns/index";
import { recognition } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/content/shapeStudio/recognition/index";
import { shapeWarmup } from "#lessonsData/3/5b9ec1a5-821e-597f-973a-7dfd15e4a4d3/index";
import type { CourseLanguages } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/constants";

const items = {
  shapeWarmup,
  recognition,
  patterns,
};

export const shapeStudio = defineModule<"shapeStudio", typeof items, CourseLanguages>({
  type: "module",
  id: "879be914-88e1-50d1-b3d9-172c55f1cfac",
  slug: "shapeStudio",
  params: {},
  locale: {
    title: {
      en: "Shape Studio"
    }
  },
  content: {
    items,
    order: [
      "shapeWarmup",
      "recognition",
      "patterns"
    ]
  }
});
