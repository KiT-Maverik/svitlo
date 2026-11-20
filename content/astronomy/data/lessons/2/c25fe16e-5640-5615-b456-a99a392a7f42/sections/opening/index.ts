import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

import { openingQuestion } from "./openingQuestion";
import { sunKeepsShining } from "./sunKeepsShining";

const content = {
  items: {
    openingQuestion,
    sunKeepsShining
  },
  order: [
    "openingQuestion",
    "sunKeepsShining"
  ]
};

export const opening = defineContentSection<"opening", typeof content.items, LessonLanguages>({
  id: "22b4ca93-c0c9-4cc7-9de8-7c7c3523d09b",
  slug: "opening",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Де зараз день?"
    },
    navigationLabel: {
      uk: "День і ніч"
    }
  },
  content
});
