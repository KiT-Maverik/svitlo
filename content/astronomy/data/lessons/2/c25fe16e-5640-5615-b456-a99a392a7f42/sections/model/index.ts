import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

import { globeLamp } from "./globeLamp";
import { twoPlaces } from "./twoPlaces";

const content = {
  items: {
    globeLamp,
    twoPlaces
  },
  order: [
    "globeLamp",
    "twoPlaces"
  ]
};

export const model = defineContentSection<"model", typeof content.items, LessonLanguages>({
  id: "75d03bfe-882a-4ef1-8eee-b3c7a02026ff",
  slug: "model",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Модель із кулькою"
    },
    navigationLabel: {
      uk: "Світло й тінь"
    }
  },
  content
});
