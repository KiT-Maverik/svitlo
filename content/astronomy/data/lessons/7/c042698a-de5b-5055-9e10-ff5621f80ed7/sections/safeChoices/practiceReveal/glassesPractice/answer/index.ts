import { defineCheckpointAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { glassesPracticeExplanation } from "./glassesPracticeExplanation";

const content = {
  items: {
    glassesPracticeExplanation
  },
  order: [
    "glassesPracticeExplanation"
  ]
};

export const glassesPracticeAnswer = defineCheckpointAnswer<"glassesPracticeAnswer", typeof content.items, LessonLanguages>({
  id: "8bb50daa-f060-5d12-b9a0-193e5e2773f8",
  slug: "glassesPracticeAnswer",
  type: "checkpointAnswer",
  content
});
