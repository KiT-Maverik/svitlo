// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 64724e6cc4b462905a032d8384ee127a7b5e94c8b0bb81d818b28cd2ac621294
import { defineCheckpointItem } from '@svitlo/engine/build';
import { compareFiveQuestion } from "./question";
import { item_answer } from "./answer";
import type { LessonLanguages } from "../../../../constants";

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
