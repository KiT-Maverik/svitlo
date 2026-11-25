import { defineText } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const introduce = defineText<"introduce", typeof languages>({
  "id": "11aec0cb-b6f8-480b-81d4-7c10ea88c857",
  "slug": "introduce",
  "type": "text",
  "params": {
  "variables": {
  "redWord": {
  "applyStyle": ["bold"],
  "tone": "neutral"
},
  "blueWord": {
  "applyStyle": ["bold"],
  "tone": "neutral"
}
}
},
  "locale": {
  "value": {
  "en": "Look at the two circles in the picture, or read their description. One is %_%id: redWord; value: red%_%. The other is %_%id: blueWord; value: blue%_%. Both are circles, but their colors are different."
}
}
});
