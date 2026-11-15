// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: c4bca81c3388e276bc40211df5755f1ddf7a9f290d2263c1ccb1964fc12631c8
import { defineCheckpointAnswer } from '@svitlo/engine/build';
import { reverseAnswer } from "./reverseAnswer";
import type { LessonLanguages } from "../../../../../constants";

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
