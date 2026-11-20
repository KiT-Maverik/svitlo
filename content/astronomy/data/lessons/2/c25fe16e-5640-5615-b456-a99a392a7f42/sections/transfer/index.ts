import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

import { misconceptions } from "./misconceptions";
import { newPlace } from "./newPlace";

const content = {
  items: {
    misconceptions,
    newPlace
  },
  order: [
    "misconceptions",
    "newPlace"
  ]
};

export const transfer = defineContentSection<"transfer", typeof content.items, LessonLanguages>({
  id: "ccfc0b58-2d23-47ea-9b67-22458aa57324",
  slug: "transfer",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Поясни по-новому"
    },
    navigationLabel: {
      uk: "Перевір пояснення"
    }
  },
  content
});
