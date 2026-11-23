import { defineCheckpointAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { sunglassesExplanation } from "./sunglassesExplanation";

const content = {
  items: {
    sunglassesExplanation
  },
  order: [
    "sunglassesExplanation"
  ]
};

export const sunglassesAnswer = defineCheckpointAnswer<"sunglassesAnswer", typeof content.items, LessonLanguages>({
  id: "8dea9292-8741-5f40-a7d2-4a2433e6a2ec",
  slug: "sunglassesAnswer",
  type: "checkpointAnswer",
  content
});
