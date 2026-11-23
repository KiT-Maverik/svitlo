import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { openingQuestion } from "./openingQuestion";
import { threeMoonViews } from "./threeMoonViews";
import { whatChanged } from "./whatChanged";

const content = {
  items: {
    openingQuestion,
    threeMoonViews,
    whatChanged
  },
  order: [
    "openingQuestion",
    "threeMoonViews",
    "whatChanged"
  ]
};

export const noticeMoon = defineContentSection<"noticeMoon", typeof content.items, LessonLanguages>({
  id: "aeb987c1-704e-4ef6-8a93-000000000001",
  slug: "noticeMoon",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Один Місяць — різні зображення"
    },
    navigationLabel: {
      uk: "Спостерігаємо"
    }
  },
  content
});
