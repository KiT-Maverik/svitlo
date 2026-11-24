import { defineText } from '@svitlo/engine/build';
import { languages } from "../../../../../languages";

export const videoIntro = defineText<"videoIntro", typeof languages>({
  "id": "7c2ae19d-4f6e-4930-8015-02d017260277",
  "slug": "videoIntro",
  "type": "text",
  "params": {},
  "locale": {
  "value": {
  "en": "Predict what will stay the same when a red circle becomes a red square. The silent video shows this change, then a blue square becoming a blue circle. In both examples the shape changes, but the color stays the same. You can use this description instead of playing the video. The separate timed-text link describes the changes; it is not a caption switch in the player."
}
}
});
