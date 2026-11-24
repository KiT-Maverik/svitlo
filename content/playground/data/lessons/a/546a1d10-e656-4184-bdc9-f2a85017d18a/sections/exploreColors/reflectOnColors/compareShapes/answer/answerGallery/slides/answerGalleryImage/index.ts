import { defineImage } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const answerGalleryImage = defineImage<"answerGalleryImage", typeof languages>({
  "id": "e3a10c4b-2325-41c0-b0b6-5dc4a4eb4e26",
  "slug": "answerGalleryImage",
  "type": "image",
  "params": {
  "fill": true,
  "aspectRatio": 1.6,
  "objectFit": "contain"
},
  "locale": {
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for image e3a10c4b-2325-41c0-b0b6-5dc4a4eb4e26.
"00000000-0000-0000-0000-000000000000.webp",
  "alt": {
  "en": "A red circle beside a red square."
},
  "caption": {
  "en": "A red circle beside a red square."
},
  "fallback": {
  "offline": {
  "en": "A red circle beside a red square."
},
  "unavailable": {
  "en": "The picture is unavailable. Read its description."
},
  "retry": {
  "en": "Try again"
}
}
}
});
// TODO (BLOCKER): Remove the temporary Image specification after this content item is implemented and verified.
/**
 * # purpose
 *
 * Compare color independently of shape.
 *
 * # specification
 *
 * Show a red circle and a red square of equal visual weight on a neutral background.
 *
 * # accessibility
 *
 * No embedded words; the adjacent caption and alt describe the objects and their colors. These labels teach vocabulary, not scored visual recognition.
 *
 * # offline
 *
 * Bundle a local WebP and retain the written description.
 *
 * # readiness
 *
 * production-pending
 *
 * # prompt
 *
 * Show a red circle and a red square of equal visual weight on a neutral background.
 */
