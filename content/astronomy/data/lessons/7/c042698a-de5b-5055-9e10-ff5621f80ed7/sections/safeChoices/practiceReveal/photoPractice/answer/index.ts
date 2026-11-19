import { defineCheckpointAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { photoPracticeExplanation } from "./photoPracticeExplanation";

const content = {
  items: {
    photoPracticeExplanation
  },
  order: [
    "photoPracticeExplanation"
  ]
};

export const photoPracticeAnswer = defineCheckpointAnswer<"photoPracticeAnswer", typeof content.items, LessonLanguages>({
  id: "06f9e319-bc2b-53ba-9276-6250efc33c5f",
  slug: "photoPracticeAnswer",
  type: "checkpointAnswer",
  content
});
