import { defineChapter } from '@svitlo/engine/build';

import { whatCanAIDo } from "#lessonsData/e/d28c4325-90db-54db-8de7-c1a960f610ee/index";
import { rulesVersusLearnedModels } from "#lessonsData/f/7ece310c-12e4-50bb-9b8b-66e480ea82df/index";
import type { CourseLanguages } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/constants";

const items = {
  whatCanAIDo,
  rulesVersusLearnedModels,
};

export const aiTasksAndLearningExamples = defineChapter<"aiTasksAndLearningExamples", typeof items, CourseLanguages>({
  type: "chapter",
  id: "e95548b9-299e-5934-aad0-13823e067ca4",
  slug: "aiTasksAndLearningExamples",
  params: {},
  locale: {
    title: {
      uk: "Завдання ШІ та навчання на прикладах"
    }
  },
  content: {
    items,
    order: [
      "whatCanAIDo",
      "rulesVersusLearnedModels"
    ]
  }
});
