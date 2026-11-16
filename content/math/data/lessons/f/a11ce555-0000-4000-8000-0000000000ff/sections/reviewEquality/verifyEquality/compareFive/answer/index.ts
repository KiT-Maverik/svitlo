import { defineCheckpointAnswer } from '@svitlo/engine/build';
import { answerDiagram } from "./answerDiagram";
import { whyFiveMatches } from "./whyFiveMatches";
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

const content = {
  items: {
    whyFiveMatches,
    answerDiagram
  },
  order: [
    "whyFiveMatches",
    "answerDiagram"
  ]
};

export const item_answer = defineCheckpointAnswer<"answer", typeof content.items, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000031",
  slug: "answer",
  type: "checkpointAnswer",
  content
});
