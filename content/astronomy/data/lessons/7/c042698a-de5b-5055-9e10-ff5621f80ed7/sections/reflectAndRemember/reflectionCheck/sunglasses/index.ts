import { defineCheckpointItem } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { sunglassesAnswer } from "./answer";
import { sunglassesQuestion } from "./question";

const question = sunglassesQuestion;
const answer = sunglassesAnswer;

export const sunglasses = defineCheckpointItem<"sunglasses", typeof answer, typeof question, LessonLanguages>({
  id: "271d90d1-d7e9-58ee-a771-caa913e6cd00",
  slug: "sunglasses",
  type: "checkpointItem",
  question,
  answer
});
