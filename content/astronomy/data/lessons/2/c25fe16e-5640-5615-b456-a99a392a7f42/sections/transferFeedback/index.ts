import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

import { finalRecall } from "./finalRecall";
import { newPlaceAnswer } from "./newPlaceAnswer";

const content = {
  items: {
    newPlaceAnswer,
    finalRecall
  },
  order: [
    "newPlaceAnswer",
    "finalRecall"
  ]
};

export const transferFeedback = defineContentSection<"transferFeedback", typeof content.items, LessonLanguages>({
  id: "c3748c13-cc80-4df6-a9ae-57a5c3cd49a3",
  slug: "transferFeedback",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Порівняй пояснення"
    },
    navigationLabel: {
      uk: "Прогноз і пригадування"
    }
  },
  content
});
