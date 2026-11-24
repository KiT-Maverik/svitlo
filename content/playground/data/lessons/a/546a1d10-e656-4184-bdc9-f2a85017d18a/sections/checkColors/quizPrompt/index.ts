import { defineText } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const quizPrompt = defineText<"quizPrompt", typeof languages>({
  "id": "c0ff1ae7-54db-4ee1-bc8f-28076b313a9f",
  "slug": "quizPrompt",
  "type": "text",
  "params": {},
  "locale": {
  "value": {
  "en": "For each example, focus on its color rather than relying on shape or position. Take your time and try to answer independently. If you cannot distinguish the colors, the written descriptions in the lesson can still help you learn the words."
}
}
});
