import { defineCheckpointItem } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { twoSkyDescriptionsAnswer } from "./answer";
import { twoSkyDescriptionsQuestion } from "./question";

const question = twoSkyDescriptionsQuestion;
const answer = twoSkyDescriptionsAnswer;

export const twoSkyDescriptions = defineCheckpointItem<"twoSkyDescriptions", typeof answer, typeof question, LessonLanguages>({
  id: "155f2765-cca3-54f9-b8cc-1f012312919e",
  slug: "twoSkyDescriptions",
  type: "checkpointItem",
  question,
  answer
});
