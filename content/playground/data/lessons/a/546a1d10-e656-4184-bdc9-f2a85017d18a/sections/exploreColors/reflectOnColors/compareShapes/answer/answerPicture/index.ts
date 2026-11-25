import { defineImage } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const answerPicture = defineImage<"answerPicture", typeof languages>({
  "id": "63c46493-0048-4e01-8040-1fe14eac4a0f",
  "slug": "answerPicture",
  "type": "image",
  "params": {
  "width": 640,
  "height": 400,
  "objectFit": "contain"
},
  "locale": {
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for image 63c46493-0048-4e01-8040-1fe14eac4a0f.
"00000000-0000-0000-0000-000000000000.webp",
  "alt": {
  "en": "A blue cup on the left and a red toy car on the right."
},
  "caption": {
  "en": "The cup is blue; the toy car is red. Different objects can have either color."
},
  "fallback": {
  "offline": {
  "en": "Imagine a blue cup and a red toy car. A cup could also be red, and a toy car could be blue."
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
 * Transfer the two learned color names from simple shapes to different everyday objects; counter position and object-identity shortcuts.
 *
 * # specification
 *
 * Show a clearly blue cup on the left and a clearly red toy car on the right in the English illustration, on a neutral light background. Keep both objects large enough to recognize at mobile widths. Use solid, unambiguous dominant colors without competing decorations or multicolored accents. Reverse the opening image's color positions. The cup and car are examples, not objects that must always have these colors. Keep actual spatial description consistent across localized versions.
 *
 * # accessibility
 *
 * Provide matching caption and alt, with spoken or written descriptions as supported vocabulary-learning alternatives. The labeled illustration is a guided example, not independent visual assessment. Keep object outlines distinguishable without depending on color alone.
 *
 * # offline
 *
 * Bundle a local WebP and retain the descriptive example and its counterexamples.
 *
 * # readiness
 *
 * production-pending
 *
 * # prompt
 *
 * A solid blue cup beside a solid red toy car, cup on the left, toy car on the right, neutral background, no text or competing colors.
 */
