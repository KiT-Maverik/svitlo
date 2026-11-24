import { defineImage } from '@svitlo/engine/build';
import { languages } from "../../../../../languages";

export const colorPair = defineImage<"colorPair", typeof languages>({
  "id": "02def914-3c64-408c-ba0a-9d127ca9d51d",
  "slug": "colorPair",
  "type": "image",
  "params": {
  "width": 640,
  "height": 400,
  "objectFit": "contain"
},
  "locale": {
  "fileName": // TODO(asset): Replace reserved Nil UUID with a verified asset.
// TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for image 02def914-3c64-408c-ba0a-9d127ca9d51d.
"00000000-0000-0000-0000-000000000000.webp",
  "alt": {
  "en": "Two circles of the same size: a red circle on the left and a blue circle on the right."
},
  "caption": {
  "en": "Red circle and blue circle: same shape, different colors."
},
  "fallback": {
  "offline": {
  "en": "Imagine two equally sized circles, one red and one blue. They have the same shape but different colors."
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
