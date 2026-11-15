// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: b248bbfd4ef140daec4ad772aefeaf7f3fbad2d26b4e816444f1f44ef0173dcf
import { defineCheckpointAnswer } from '@svitlo/engine/build';
import { answerDiagram } from "./answerDiagram";
import { whyFiveMatches } from "./whyFiveMatches";
import type { LessonLanguages } from "../../../../../constants";

export const item_answer = defineCheckpointAnswer<"answer", typeof content.items, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000031",
  slug: "answer",
  type: "checkpointAnswer",
  content: {
    items: {
      whyFiveMatches,
      answerDiagram
    },
    order: [
      "whyFiveMatches",
      "answerDiagram"
    ]
  }
});
