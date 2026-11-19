import { defineCheckpointAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { twoSkyDescriptionsExplanation } from "./twoSkyDescriptionsExplanation";

const content = {
  items: {
    twoSkyDescriptionsExplanation
  },
  order: [
    "twoSkyDescriptionsExplanation"
  ]
};

export const twoSkyDescriptionsAnswer = defineCheckpointAnswer<"twoSkyDescriptionsAnswer", typeof content.items, LessonLanguages>({
  id: "31f4461b-62ab-50e1-b0fd-215764c09447",
  slug: "twoSkyDescriptionsAnswer",
  type: "checkpointAnswer",
  content
});
