import { defineVideo } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const shapeChange = defineVideo<"shapeChange", typeof languages>({
  "id": "3425043b-47e9-4961-a869-4152fcee84a3",
  "slug": "shapeChange",
  "type": "video",
  "params": {},
  "locale": {
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for video 3425043b-47e9-4961-a869-4152fcee84a3.
"00000000-0000-0000-0000-000000000000.mp4",
  "posterFileName": // TODO (BLOCKER): Supply verified posterFileName asset (reserved Nil UUID is not an asset) for video 3425043b-47e9-4961-a869-4152fcee84a3.
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
