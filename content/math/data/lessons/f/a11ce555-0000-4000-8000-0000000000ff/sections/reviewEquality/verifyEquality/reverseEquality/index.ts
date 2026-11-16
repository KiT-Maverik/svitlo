import { defineCheckpointItem } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

import { item_answer } from "./answer";
import { reverseEqualityQuestion } from "./question";

const question = reverseEqualityQuestion;
const answer = item_answer;

export const reverseEquality = defineCheckpointItem<"reverseEquality", typeof answer, typeof question, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-00000000000c",
  slug: "reverseEquality",
  type: "checkpointItem",
  check: true,
  question,
  answer
});
