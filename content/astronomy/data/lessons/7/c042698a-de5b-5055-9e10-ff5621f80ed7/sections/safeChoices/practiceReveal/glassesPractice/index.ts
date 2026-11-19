import { defineCheckpointItem } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { glassesPracticeAnswer } from "./answer";
import { glassesPracticeQuestion } from "./question";

const question = glassesPracticeQuestion;
const answer = glassesPracticeAnswer;

export const glassesPractice = defineCheckpointItem<"glassesPractice", typeof answer, typeof question, LessonLanguages>({
  id: "b9c22837-6b9b-54e7-bac0-ebb8ed7d80ab",
  slug: "glassesPractice",
  type: "checkpointItem",
  question,
  answer
});
