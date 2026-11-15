// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 4358e40c658f4d4b1e2ebb756d258f6be16c48643ff87a81b503e64e3a4df97c
import { defineCheckpointItem } from '@svitlo/engine/build';
import { item_answer } from "./answer";
import { reverseEqualityQuestion } from "./question";
import type { LessonLanguages } from "../../../../constants";

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
