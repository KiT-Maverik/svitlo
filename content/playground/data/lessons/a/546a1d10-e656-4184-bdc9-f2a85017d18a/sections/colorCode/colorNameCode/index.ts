import { defineCode, readCodeSource } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const colorNameCode = defineCode<"colorNameCode", typeof languages>({
  "id": "fb339121-bc3b-43ea-8fb8-0ce01a7e2f82",
  "slug": "colorNameCode",
  "type": "code",
  "params": {
  "language": "javascript",
  "codeAsText": readCodeSource(import.meta.url, "js")
},
  "locale": {
  "title": {
  "en": "Color names as words"
},
  "variables": {
  "COLOR_LABEL": {
  "en": "A red example and a blue example"
}
}
}
});
