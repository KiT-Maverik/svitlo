import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { skyCompareCheck } from "./skyCompareCheck";
import { skyExamples } from "./skyExamples";
import { welcome } from "./welcome";

const content = {
  items: {
    welcome,
    skyExamples,
    skyCompareCheck
  },
  order: [
    "welcome",
    "skyExamples",
    "skyCompareCheck"
  ]
};

export const skyAroundUs = defineContentSection<"skyAroundUs", typeof content.items, LessonLanguages>({
  id: "3e911ad2-0530-57f8-8aa5-10819d205c59",
  slug: "skyAroundUs",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Що можна помітити на небі?"
    },
    navigationLabel: {
      uk: "Помічаємо небо"
    }
  },
  content
});
