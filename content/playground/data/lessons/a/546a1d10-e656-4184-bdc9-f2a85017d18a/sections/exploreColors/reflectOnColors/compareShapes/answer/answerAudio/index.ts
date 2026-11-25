import { defineAudio } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const answerAudio = defineAudio<"answerAudio", typeof languages>({
  "id": "36faebf6-d88a-4af9-acc0-fc02059e0747",
  "slug": "answerAudio",
  "type": "audio",
  "params": {},
  "locale": {
  "fileName": {
  "en": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for audio 36faebf6-d88a-4af9-acc0-fc02059e0747.
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
// TODO (BLOCKER): Remove the temporary Audio specification after this content item is implemented and verified.
/**
 * # purpose
 *
 * Hear the color names.
 *
 * # specification
 *
 * Produce a clear spoken English recording of the script; no music, no sound effects; short pause between examples.
 *
 * # accessibility
 *
 * The complete spoken script appears in the visible Audio description; user-controlled playback. The adjacent written and visual examples support the same color vocabulary and conceptual contrast.
 *
 * # offline
 *
 * Bundle source-language MP3; text remains available.
 *
 * # readiness
 *
 * production-pending
 *
 * # script
 *
 * A red circle and a red square have the same color. A blue circle and a blue square have the same color. Here the cup is blue and the toy car is red. A cup can also be red, and a toy car can be blue. Shape, size and position do not tell you the color.
 */
