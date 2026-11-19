import { defineCheckpoint } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { twoSkyDescriptions } from "./twoSkyDescriptions";

const content = {
  items: {
    twoSkyDescriptions
  },
  order: [
    "twoSkyDescriptions"
  ]
};

export const skyCompareCheck = defineCheckpoint<"skyCompareCheck", typeof content.items, LessonLanguages>({
  id: "0121e00a-ab04-57f1-be3a-ea1f5571895d",
  slug: "skyCompareCheck",
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
      uk: "Перевір порівняння"
    }
  },
  content
});
