import { defineCheckpointAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { cloudsPracticeExplanation } from "./cloudsPracticeExplanation";

const content = {
  items: {
    cloudsPracticeExplanation
  },
  order: [
    "cloudsPracticeExplanation"
  ]
};

export const cloudsPracticeAnswer = defineCheckpointAnswer<"cloudsPracticeAnswer", typeof content.items, LessonLanguages>({
  id: "80a53494-62b7-59d3-b4d5-20bcf9c521c7",
  slug: "cloudsPracticeAnswer",
  type: "checkpointAnswer",
  content
});
