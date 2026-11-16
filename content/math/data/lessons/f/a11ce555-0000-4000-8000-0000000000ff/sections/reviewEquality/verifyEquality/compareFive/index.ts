import { defineCheckpointItem } from '@svitlo/engine/build';
import { compareFiveQuestion } from "./question";
import { item_answer } from "./answer";
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

const question = compareFiveQuestion;
const answer = item_answer;

export const compareFive = defineCheckpointItem<"compareFive", typeof answer, typeof question, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000009",
  slug: "compareFive",
  type: "checkpointItem",
  check: true,
  question,
  answer
});
