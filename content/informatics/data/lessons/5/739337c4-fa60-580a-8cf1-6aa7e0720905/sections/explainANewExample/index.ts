import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/739337c4-fa60-580a-8cf1-6aa7e0720905/constants";

import { finalRecall } from "./finalRecall";
import { sentenceStarter } from "./sentenceStarter";
import { thermometerChallenge } from "./thermometerChallenge";
import { thermometerExplanation } from "./thermometerExplanation";

const content = {
  items: {
    thermometerChallenge,
    sentenceStarter,
    thermometerExplanation,
    finalRecall
  },
  order: [
    "thermometerChallenge",
    "sentenceStarter",
    "thermometerExplanation",
    "finalRecall"
  ]
};

export const explainANewExample = defineContentSection<"explainANewExample", typeof content.items, LessonLanguages>({
  id: "b6f90e2a-4df0-4dbf-83a1-a00000000005",
  slug: "explainANewExample",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Спробуй з новою річчю"
    },
    navigationLabel: {
      uk: "Поясни"
    }
  },
  content
});
