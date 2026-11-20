import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/739337c4-fa60-580a-8cf1-6aa7e0720905/constants";

import { aClueBeforeAnswer } from "./aClueBeforeAnswer";
import { firstGuess } from "./firstGuess";
import { meetObjects } from "./meetObjects";

const content = {
  items: {
    meetObjects,
    firstGuess,
    aClueBeforeAnswer
  },
  order: [
    "meetObjects",
    "firstGuess",
    "aClueBeforeAnswer"
  ]
};

export const noticeEverydayThings = defineContentSection<"noticeEverydayThings", typeof content.items, LessonLanguages>({
  id: "b6f90e2a-4df0-4dbf-83a1-a00000000001",
  slug: "noticeEverydayThings",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Знайомі предмети"
    },
    navigationLabel: {
      uk: "Приглянься"
    }
  },
  content
});
