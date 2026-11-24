import { defineChapter } from '@svitlo/engine/build';

import { patternMaker } from "#lessonsData/3/8ba3bfbd-8dcb-558b-b09b-8cde589259c3/index";
import type { CourseLanguages } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/constants";

const items = {
  patternMaker,
};

export const patterns = defineChapter<"patterns", typeof items, CourseLanguages>({
  type: "chapter",
  id: "4e184410-32ad-5f51-9e71-b217047bb088",
  slug: "patterns",
  params: {},
  locale: {
    title: {
      en: "Shape patterns"
    }
  },
  content: {
    items,
    order: [
      "patternMaker"
    ]
  }
});
