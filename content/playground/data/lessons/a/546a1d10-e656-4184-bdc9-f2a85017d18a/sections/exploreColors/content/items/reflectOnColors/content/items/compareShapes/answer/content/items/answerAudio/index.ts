import { defineAudio } from '@svitlo/engine/build';
import { languages } from "../../../../../../../../../../../../languages";

export const answerAudio = defineAudio<"answerAudio", typeof languages>({
  "id": "36faebf6-d88a-4af9-acc0-fc02059e0747",
  "slug": "answerAudio",
  "type": "audio",
  "params": {},
  "locale": {
  "fileName": {
  "en": // TODO(asset): Replace reserved Nil UUID with a verified asset.
// TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for audio 36faebf6-d88a-4af9-acc0-fc02059e0747.
"00000000-0000-0000-0000-000000000000.mp3"
},
  "title": {
  "en": "Listen to the color words"
},
  "description": {
  "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. Here the cup is blue and the toy car is red. A cup can also be red, and a toy car can be blue. Shape, size and position do not tell you the color."
},
  "fallback": {
  "offline": {
  "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. Here the cup is blue and the toy car is red. A cup can also be red, and a toy car can be blue. Shape, size and position do not tell you the color."
},
  "unavailable": {
  "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. Here the cup is blue and the toy car is red. A cup can also be red, and a toy car can be blue. Shape, size and position do not tell you the color."
},
  "playbackError": {
  "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. Here the cup is blue and the toy car is red. A cup can also be red, and a toy car can be blue. Shape, size and position do not tell you the color."
},
  "retry": {
  "en": "Try again"
}
}
}
});
