import { defineImage } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const colorGalleryImage = defineImage<"colorGalleryImage", typeof languages>({
  "id": "a5766cfd-6755-46aa-b316-6bb805932c6a",
  "slug": "colorGalleryImage",
  "type": "image",
  "params": {
  "fill": true,
  "aspectRatio": 1.6,
  "objectFit": "contain"
},
  "locale": {
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for image a5766cfd-6755-46aa-b316-6bb805932c6a.
"00000000-0000-0000-0000-000000000000.webp",
  "alt": {
  "en": "A blue circle and a blue square."
},
  "caption": {
  "en": "A blue circle and a blue square."
},
  "fallback": {
  "offline": {
  "en": "A blue circle and a blue square."
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
 * Two clearly blue shapes, a circle and a square, side by side.
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
 * Two clearly blue shapes, a circle and a square, side by side.
 */
