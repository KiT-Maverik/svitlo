import { defineCheckpointItem } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { onlyNightAnswer } from "./answer";
import { onlyNightQuestion } from "./question";

const question = onlyNightQuestion;
const answer = onlyNightAnswer;

export const onlyNight = defineCheckpointItem<"onlyNight", typeof answer, typeof question, LessonLanguages>({
  id: "a6a6a46c-0ab0-5e19-ab26-d24f73c54774",
  slug: "onlyNight",
  type: "checkpointItem",
  question,
  answer
});
