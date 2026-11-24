import { defineText } from '@svitlo/engine/build';
import { languages } from "../../../../../languages";

export const recallPrompt = defineText<"recallPrompt", typeof languages>({
  "id": "d4bc8e45-68f0-4205-8481-670ba73a1304",
  "slug": "recallPrompt",
  "type": "text",
  "params": {},
  "locale": {
  "value": {
  "en": "Look at the front of each card and try to remember the color name before revealing the answer. Check your recall and practice at your own pace. You do not have to say the answer aloud."
}
}
});
