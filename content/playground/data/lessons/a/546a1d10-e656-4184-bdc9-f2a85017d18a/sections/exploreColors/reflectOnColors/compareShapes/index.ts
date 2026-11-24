import { defineCheckpointItem } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";
import { comparePrompt as question } from "./question";
import { compareAnswer as answer } from "./answer";

export const compareShapes = defineCheckpointItem<"compareShapes", typeof answer, typeof question, typeof languages>({
  id: "54d3b6e2-725f-4dcd-842e-b0b379ab4ace",
  slug: "compareShapes",
  type: 'checkpointItem',
  check: true,
  question,
  answer,
});
