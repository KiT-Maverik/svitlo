import { defineCheckpointItem } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";
import { changePrompt as question } from "./question";
import { changeAnswer as answer } from "./answer";

export const changeColor = defineCheckpointItem<"changeColor", typeof answer, typeof question, typeof languages>({
  id: "9c851290-3833-4a98-bff6-13f8f9f30c3c",
  slug: "changeColor",
  type: 'checkpointItem',
  check: true,
  question,
  answer,
});
