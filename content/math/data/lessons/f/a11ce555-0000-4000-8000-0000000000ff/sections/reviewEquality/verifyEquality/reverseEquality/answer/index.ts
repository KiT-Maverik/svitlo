import { defineCheckpointAnswer } from '@svitlo/engine/build';
import { reverseAnswer } from "./reverseAnswer";
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

const content = {
  items: {
    reverseAnswer
  },
  order: [
    "reverseAnswer"
  ]
};

export const item_answer = defineCheckpointAnswer<"answer", typeof content.items, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000032",
  slug: "answer",
  type: "checkpointAnswer",
  content
});
