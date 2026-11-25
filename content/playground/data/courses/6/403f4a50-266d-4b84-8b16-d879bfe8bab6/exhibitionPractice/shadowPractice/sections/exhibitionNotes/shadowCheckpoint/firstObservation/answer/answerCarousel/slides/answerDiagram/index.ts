import { defineImage } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";

export const answerDiagram = defineImage<"answerDiagram", typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94724",
  "slug": "answerDiagram",
  "type": "image",
  "params": {
  "width": 640,
  "height": 360
},
  "locale": {
  "alt": {
  "en": "A lamp casts a shadow from an opaque object."
},
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for image e6073d92-4b8c-4c6f-8920-6ab25ca94724.
"00000000-0000-0000-0000-000000000000.webp"
}
});
/*
 * TODO (BLOCKER): Remove the temporary Image specification after this content item is implemented and verified.
 *
 * # purpose
 *
 * Exercise the Image materializer.
 *
 * # specification
 *
 * Produce an original, accessible lamp-and-shadow diagram.
 *
 * # accessibility
 *
 * Provide equivalent readable text and accessible control/focus; do not rely on color or audio alone.
 *
 * # offline
 *
 * The final verified asset or interaction must work offline; it is not yet produced.
 *
 * # readiness
 *
 * production-pending
 */
