import { defineModule } from '@svitlo/engine/build';

import { aiTasksAndLearningExamples } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/content/rulesAndAI/aiTasksAndLearningExamples/index";
import { patternsAndSimpleRules } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/content/rulesAndAI/patternsAndSimpleRules/index";
import type { CourseLanguages } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/constants";

const items = {
  patternsAndSimpleRules,
  aiTasksAndLearningExamples,
};

export const rulesAndAI = defineModule<"rulesAndAI", typeof items, CourseLanguages>({
  type: "module",
  id: "420ade22-9284-542c-b892-3c9bea45f055",
  slug: "rulesAndAI",
  params: {},
  locale: {
    title: {
      uk: "Закономірності, правила й перше знайомство із ШІ"
    }
  },
  content: {
    items,
    order: [
      "patternsAndSimpleRules",
      "aiTasksAndLearningExamples"
    ]
  }
});
