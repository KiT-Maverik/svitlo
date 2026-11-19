import { defineCheckpointItem } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { photoPracticeAnswer } from "./answer";
import { photoPracticeQuestion } from "./question";

const question = photoPracticeQuestion;
const answer = photoPracticeAnswer;

export const photoPractice = defineCheckpointItem<"photoPractice", typeof answer, typeof question, LessonLanguages>({
  id: "f4501e02-5b1f-5bc5-91a1-caf24ae056fd",
  slug: "photoPractice",
  type: "checkpointItem",
  question,
  answer
});
