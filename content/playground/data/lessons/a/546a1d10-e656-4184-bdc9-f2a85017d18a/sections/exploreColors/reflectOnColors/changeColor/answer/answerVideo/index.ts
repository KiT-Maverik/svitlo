import { defineVideo } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const answerVideo = defineVideo<"answerVideo", typeof languages>({
  "id": "7446f1f1-6766-4f69-890a-94983db5a537",
  "slug": "answerVideo",
  "type": "video",
  "params": {},
  "locale": {
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for video 7446f1f1-6766-4f69-890a-94983db5a537.
"00000000-0000-0000-0000-000000000000.mp4",
  "posterFileName": // TODO (BLOCKER): Supply verified posterFileName asset (reserved Nil UUID is not an asset) for video 7446f1f1-6766-4f69-890a-94983db5a537.
"00000000-0000-0000-0000-000000000000.webp",
  "title": {
  "en": "Compare red and blue"
},
  "label": {
  "en": "Short silent color comparison"
},
  "fallback": {
  "offline": {
  "en": "A red circle becomes a red square. A blue square becomes a blue circle."
},
  "unavailable": {
  "en": "A red circle becomes a red square. A blue square becomes a blue circle."
},
  "playbackError": {
  "en": "A red circle becomes a red square. A blue square becomes a blue circle."
},
  "retry": {
  "en": "Try again"
}
}
}
});
