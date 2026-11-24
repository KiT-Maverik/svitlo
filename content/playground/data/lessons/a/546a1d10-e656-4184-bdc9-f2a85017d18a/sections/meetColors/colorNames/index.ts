import { defineAudio } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

// TODO (BLOCKER): Remove the temporary Audio specification after the asset is generated and verified for audio e1fa6127-8ef0-465a-9ec7-fe3c8c371fa4.
export const colorNames = defineAudio<"colorNames", typeof languages>({
  "id": "e1fa6127-8ef0-465a-9ec7-fe3c8c371fa4",
  "slug": "colorNames",
  "type": "audio",
  "params": {},
  "locale": {
  "fileName": {
  "en": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for audio e1fa6127-8ef0-465a-9ec7-fe3c8c371fa4.
"00000000-0000-0000-0000-000000000000.mp3"
},
  "title": {
  "en": "Listen to the color words"
},
  "description": {
  "en": "The picture shows a red circle on the left and a blue circle on the right. Both are circles. Red and blue are different color names."
},
  "fallback": {
  "offline": {
  "en": "The picture shows a red circle on the left and a blue circle on the right. Both are circles. Red and blue are different color names."
},
  "unavailable": {
  "en": "The picture shows a red circle on the left and a blue circle on the right. Both are circles. Red and blue are different color names."
},
  "playbackError": {
  "en": "The picture shows a red circle on the left and a blue circle on the right. Both are circles. Red and blue are different color names."
},
  "retry": {
  "en": "Try again"
}
}
}
});
