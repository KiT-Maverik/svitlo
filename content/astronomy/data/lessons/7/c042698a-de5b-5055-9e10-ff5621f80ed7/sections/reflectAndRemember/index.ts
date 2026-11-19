import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { closingMessage } from "./closingMessage";
import { reflectIntro } from "./reflectIntro";
import { reflectionCheck } from "./reflectionCheck";

const content = {
  items: {
    reflectIntro,
    reflectionCheck,
    closingMessage
  },
  order: [
    "reflectIntro",
    "reflectionCheck",
    "closingMessage"
  ]
};

export const reflectAndRemember = defineContentSection<"reflectAndRemember", typeof content.items, LessonLanguages>({
  id: "48cf58e9-bac2-503c-9c03-397eb753c765",
  slug: "reflectAndRemember",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Поясни своїми словами"
    },
    navigationLabel: {
      uk: "Пригадай"
    }
  },
  content
});
