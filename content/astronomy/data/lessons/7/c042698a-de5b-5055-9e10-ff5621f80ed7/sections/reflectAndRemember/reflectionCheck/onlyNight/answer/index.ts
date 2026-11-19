import { defineCheckpointAnswer } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { onlyNightExplanation } from "./onlyNightExplanation";

const content = {
  items: {
    onlyNightExplanation
  },
  order: [
    "onlyNightExplanation"
  ]
};

export const onlyNightAnswer = defineCheckpointAnswer<"onlyNightAnswer", typeof content.items, LessonLanguages>({
  id: "359e20f9-4074-5254-9f4d-e14dbb290961",
  slug: "onlyNightAnswer",
  type: "checkpointAnswer",
  content
});
