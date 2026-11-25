import { defineImage } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";

export const lampSlide = defineImage<"lampSlide", typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca9471c",
  "slug": "lampSlide",
  "type": "image",
  "params": {
  "width": 640,
  "height": 360
},
  "locale": {
  "alt": {
  "en": "A lamp casts a shadow from an opaque object."
},
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for image e6073d92-4b8c-4c6f-8920-6ab25ca9471c.
"00000000-0000-0000-0000-000000000000.webp"
}
});
/*
 * TODO (BLOCKER): Remove the temporary Image specification after this content item is implemented and verified.
 *
 * # prompt
 *
 * Generate a clear 640×360 first-view illustration for a two-slide shadow comparison. Put a lamp at left, a single opaque object in the middle, and a pale vertical screen at right. Draw several straight rays from the lamp, with the object blocking the middle rays and a dark shadow on the screen. Use an uncluttered side view, consistent perspective and readable contrast; no text or decorative imagery.
 */
