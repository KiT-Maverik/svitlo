import { defineCheckpointAnswer } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
import { explanation } from "./explanation";
import { answerDiagram } from "./answerDiagram";

const content = {
  items: {
    explanation,
    answerDiagram,
  },
  order: ["explanation", "answerDiagram"],
};

export const answer = defineCheckpointAnswer<"answer", typeof content.items, typeof languages>({
  id: "e6073d92-4b8c-4c6f-8920-6ab25ca94721",
  slug: "answer",
  type: 'checkpointAnswer',
  content,
});
