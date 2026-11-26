import { defineImage } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";

export const shadowDiagram = defineImage<"shadowDiagram", typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94715",
  "slug": "shadowDiagram",
  "type": "image",
  "params": {
  "width": 640,
  "height": 360
},
  "locale": {
  "alt": {
  "en": "A lamp casts a shadow from an opaque object."
},
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for image e6073d92-4b8c-4c6f-8920-6ab25ca94715.
"00000000-0000-0000-0000-000000000000.webp"
}
});
/*
 * TODO (BLOCKER): Remove the temporary Image specification after this content item is implemented and verified.
 *
 * # prompt
 *
 * Create an original 640×360 instructional diagram. At left, show a lamp shining straight light rays toward one opaque cube between the lamp and a vertical screen on the right. Show which rays reach the screen around the cube and which are blocked, producing a sharply defined shadow behind it. Keep correct alignment, clear high-contrast shapes, and a plain background without embedded text.
 */
