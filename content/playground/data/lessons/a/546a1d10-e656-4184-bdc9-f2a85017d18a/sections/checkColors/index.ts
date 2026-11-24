import { defineQuizSection } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";
import { quizPrompt as child_content_items_quizPrompt } from "./quizPrompt";

// TODO (BLOCKER): Design and complete reviewed Quiz parameters.
// TODO (BLOCKER): Select verified Question Bank IDs.
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
