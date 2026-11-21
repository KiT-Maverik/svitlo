import { defineChapter } from '@svitlo/engine/build';

import { integratedAssessment } from "#lessonsData/f/f465f0d6-4ebf-5add-9a25-ff24e5fefbdf/index";
import type { CourseLanguages } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/constants";

const items = {
  integratedAssessment,
};

export const capstone = defineChapter<"capstone", typeof items, CourseLanguages>({
  type: "chapter",
  id: "9d426296-345e-5730-b5a0-90aad95a3876",
  slug: "capstone",
  params: {},
  locale: {
    title: {
      en: "Independent transfer"
    }
  },
  content: {
    items,
    order: [
      "integratedAssessment"
    ]
  }
});
