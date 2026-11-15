// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 2455dae43db93cc5efa8afea74a88d5ca12c01d5cb94aa498b21767cf885e655
import { defineCheckpoint } from '@svitlo/engine/build';
import { compareFive } from "./compareFive";
import { reverseEquality } from "./reverseEquality";
import type { LessonLanguages } from "../../../constants";

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
  content: {
    items: {
      compareFive,
      reverseEquality
    },
    order: [
      "compareFive",
      "reverseEquality"
    ]
  }
});
