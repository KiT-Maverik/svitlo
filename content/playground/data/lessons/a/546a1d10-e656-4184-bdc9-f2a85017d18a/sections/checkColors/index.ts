import { defineQuizSection } from '@svitlo/engine/build';
import { languages } from "../../languages";
import { quizPrompt as child_content_items_quizPrompt } from "./content/items/quizPrompt";

// TODO (BLOCKER): Complete reviewed Quiz params.selection.
// TODO (BLOCKER): Complete reviewed Quiz params.layout.
// TODO (BLOCKER): Complete reviewed Quiz params.feedbackMode.
// TODO (BLOCKER): Complete reviewed Quiz params.interaction.
// TODO (BLOCKER): Complete reviewed Quiz params.results.
// TODO (BLOCKER): Select verified Question Bank UUIDs; no Questions have been fabricated.
const content = {
  "items": {
    "quizPrompt": child_content_items_quizPrompt,
  },
  "order": ["quizPrompt"],
};

export const checkColors = defineQuizSection<"checkColors", typeof content.items, typeof languages>(
{
  "id": "2a46ac8b-d81a-45fe-8042-771c7a61344c",
  "slug": "checkColors",
  "type": "quiz",
  "params": {},
  "locale": {
    "title": {
      "en": "Check your understanding",
    },
    "navigationLabel": {
      "en": "Quiz",
    },
  },
  "content": content,
});
