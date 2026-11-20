import { defineChapter } from '@svitlo/engine/build';

import { evaluateIfThenConditions } from "#lessonsData/1/3e6d529f-0b6e-5b44-b9a0-1630a49d3ed1/index";
import { recognizeAndCheckPatterns } from "#lessonsData/9/4ffb4ad6-9309-5fb6-85fc-d9a4a28f5b59/index";
import type { CourseLanguages } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/constants";

const items = {
  recognizeAndCheckPatterns,
  evaluateIfThenConditions,
};

export const patternsAndSimpleRules = defineChapter<"patternsAndSimpleRules", typeof items, CourseLanguages>({
  type: "chapter",
  id: "f51dd615-8e11-5fb5-a272-6ccd37a7c7d6",
  slug: "patternsAndSimpleRules",
  params: {},
  locale: {
    title: {
      uk: "Закономірності та прості умови"
    }
  },
  content: {
    items,
    order: [
      "recognizeAndCheckPatterns",
      "evaluateIfThenConditions"
    ]
  }
});
