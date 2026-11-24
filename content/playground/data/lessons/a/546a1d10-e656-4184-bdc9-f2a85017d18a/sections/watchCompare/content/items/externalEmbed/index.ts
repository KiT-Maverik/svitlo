import { defineYoutube } from '@svitlo/engine/build';
import { languages } from "../../../../../languages";

export const externalEmbed = defineYoutube<"externalEmbed", typeof languages>({
  "id": "90115025-1794-47da-b101-cde8d5e8e397",
  "slug": "externalEmbed",
  "type": "youtube",
  "params": {
  "mode": "embed"
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
