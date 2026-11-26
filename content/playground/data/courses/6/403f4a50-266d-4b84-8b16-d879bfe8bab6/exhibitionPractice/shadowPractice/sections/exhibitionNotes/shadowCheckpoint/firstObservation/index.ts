import { defineCheckpointItem } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
import { question } from "./question";
import { answer } from "./answer";

export const firstObservation = defineCheckpointItem<"firstObservation", typeof answer, typeof question, typeof languages>({
  id: "e6073d92-4b8c-4c6f-8920-6ab25ca9471f",
  slug: "firstObservation",
  type: 'checkpointItem',
  check: true,
  question,
  answer,
});
