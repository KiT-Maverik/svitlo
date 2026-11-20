import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { firstThought } from "./firstThought";
import { threeRoles } from "./threeRoles";

const content = {
  items: {
    firstThought,
    threeRoles
  },
  order: [
    "firstThought",
    "threeRoles"
  ]
};

export const meetThreeBodies = defineContentSection<"meetThreeBodies", typeof content.items, LessonLanguages>({
  id: "c63a00b7-83ef-4c34-9f7e-91109480f2a8",
  slug: "meetThreeBodies",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Три знайомі небесні тіла"
    },
    navigationLabel: {
      uk: "Три знайомі небесні тіла"
    }
  },
  content
});
