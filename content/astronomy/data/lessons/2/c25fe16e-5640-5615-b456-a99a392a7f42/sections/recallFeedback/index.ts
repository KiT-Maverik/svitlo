import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

import { finalRecallAnswer } from "./finalRecallAnswer";

const content = {
  items: {
    finalRecallAnswer
  },
  order: [
    "finalRecallAnswer"
  ]
};

export const recallFeedback = defineContentSection<"recallFeedback", typeof content.items, LessonLanguages>({
  id: "e4f4ccfb-1285-47f8-89e0-32ce6017bbab",
  slug: "recallFeedback",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Перевір свої відповіді"
    },
    navigationLabel: {
      uk: "Підсумкове пояснення"
    }
  },
  content
});
