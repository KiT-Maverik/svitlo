import { defineVideo } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";

export const shadowVideo = defineVideo<"shadowVideo", typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94716",
  "slug": "shadowVideo",
  "type": "video",
  "params": {},
  "locale": {
  "label": {
  "en": "Lamp and shadow demonstration"
},
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for video e6073d92-4b8c-4c6f-8920-6ab25ca94716.
"00000000-0000-0000-0000-000000000000.mp4",
  "posterFileName": // TODO (BLOCKER): Supply verified posterFileName asset (reserved Nil UUID is not an asset) for video e6073d92-4b8c-4c6f-8920-6ab25ca94716.
"00000000-0000-0000-0000-000000000000.webp"
}
});
/*
 * TODO (BLOCKER): Remove the temporary Video specification after this content item is implemented and verified.
 *
 * # specification
 *
 * Produce a short captioned video with an equivalent text explanation.
 */
