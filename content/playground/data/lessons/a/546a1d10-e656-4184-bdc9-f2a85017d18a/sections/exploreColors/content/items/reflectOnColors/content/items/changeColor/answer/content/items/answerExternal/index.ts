import { defineYoutube } from '@svitlo/engine/build';
import { languages } from "../../../../../../../../../../../../languages";

export const answerExternal = defineYoutube<"answerExternal", typeof languages>({
  "id": "f97d713e-65eb-4a3f-b6a4-eb35259e200e",
  "slug": "answerExternal",
  "type": "youtube",
  "params": {
  "mode": "link"
},
  "locale": {
  "href": "https://www.youtube.com/watch?v=1qtPcVpkaKU",
  "title": {
  "en": "More color examples"
},
  "label": {
  "en": "Red, Blue, and Yellow — Khan Academy Kids"
},
  "fallback": {
  "offline": {
  "en": "Use the local examples: a red circle and a blue square. Objects may have the same color even when their shapes differ."
},
  "unavailable": {
  "en": "The optional video is unavailable. Continue with the local examples."
},
  "retry": {
  "en": "Try again"
}
}
}
});
