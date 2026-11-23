import { defineCheckpoint } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { onlyNight } from "./onlyNight";
import { sunglasses } from "./sunglasses";

const content = {
  items: {
    sunglasses,
    onlyNight
  },
  order: [
    "sunglasses",
    "onlyNight"
  ]
};

export const reflectionCheck = defineCheckpoint<"reflectionCheck", typeof content.items, LessonLanguages>({
  id: "1c9b440c-58f2-5fa0-b9fb-a293122f7d95",
  slug: "reflectionCheck",
  type: "checkpoint",
  params: {
    headingLevel: 3,
    showIndices: true,
    showChevron: true,
    enableChecks: false,
    requireCompletion: false
  },
  locale: {
    title: {
      uk: "Перевір свої пояснення"
    }
  },
  content
});
