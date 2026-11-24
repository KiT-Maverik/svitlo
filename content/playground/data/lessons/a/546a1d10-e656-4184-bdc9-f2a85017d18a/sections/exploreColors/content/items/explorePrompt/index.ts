import { defineText } from '@svitlo/engine/build';
import { languages } from "../../../../../languages";

export const explorePrompt = defineText<"explorePrompt", typeof languages>({
  "id": "ac24a784-4036-4596-8bc3-f019bf40f754",
  "slug": "explorePrompt",
  "type": "text",
  "params": {},
  "locale": {
  "value": {
  "en": "Choose Red or Blue and think of the color name. Predict what will happen before you change the shape. Does the color stay the same? Then predict what will happen before you change the color. Does the shape stay the same? Try Reset if you want to start again. You can also follow the written or spoken examples. For the two reflections below, think of an answer, reveal the explanation, then use the check button below each answer when you are ready. These checks mean you have considered the explanation; they are not a score. You do not need to play every video or activity."
}
}
});
