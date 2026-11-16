import { defineCheckpoint } from '@svitlo/engine/build';
import { compareFive } from "./compareFive";
import { reverseEquality } from "./reverseEquality";
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

const content = {
  items: {
    compareFive,
    reverseEquality
  },
  order: [
    "compareFive",
    "reverseEquality"
  ]
};

export const verifyEquality = defineCheckpoint<"verifyEquality", typeof content.items, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-00000000000d",
  slug: "verifyEquality",
  type: "checkpoint",
  params: {
    headingLevel: 3,
    showIndices: true,
    showChevron: true,
    showIcon: true,
    indexPosition: "left",
    iconPosition: "right",
    chevronPosition: "right",
    enableChecks: true,
    requireCompletion: false,
    renderAsGroup: true
  },
  locale: {
    title: {
      en: "Check your understanding"
    }
  },
  content
});
