import { defineImage } from '@svitlo/engine/build';
import { languages } from "../../../../../../../../../../../../languages";

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
  "fileName": // TODO(asset): Replace reserved Nil UUID with a verified asset.
// TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for image 63c46493-0048-4e01-8040-1fe14eac4a0f.
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
