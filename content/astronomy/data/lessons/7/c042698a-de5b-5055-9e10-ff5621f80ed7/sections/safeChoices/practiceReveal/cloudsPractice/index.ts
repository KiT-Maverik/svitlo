import { defineCheckpointItem } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { cloudsPracticeAnswer } from "./answer";
import { cloudsPracticeQuestion } from "./question";

const question = cloudsPracticeQuestion;
const answer = cloudsPracticeAnswer;

export const cloudsPractice = defineCheckpointItem<"cloudsPractice", typeof answer, typeof question, LessonLanguages>({
  id: "8bd54f37-7309-5f5a-96ee-26b818c72e44",
  slug: "cloudsPractice",
  type: "checkpointItem",
  question,
  answer
});
