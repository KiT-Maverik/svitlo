import { defineText } from '@svitlo/engine/build';
import { languages } from "../../../../../../../../../../../../languages";

export const changeExplanation = defineText<"changeExplanation", typeof languages>({
  "id": "1a093072-bf2f-48ec-aee6-f671f1355ad9",
  "slug": "changeExplanation",
  "type": "text",
  "params": {},
  "locale": {
  "value": {
  "en": "The color changed from red to blue. The shape did not change: it is still a circle. Now consider a different action: the silent video shows a red circle becoming a red square and a blue square becoming a blue circle. In those examples, the shape changes but the color stays the same. The separate timed-text link repeats those descriptions. In the activity, try both kinds of change. The code example names two colors; you do not need to run it. The online video is optional. Use the check button at the end when you have considered the explanation."
}
}
});
