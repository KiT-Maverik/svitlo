import { defineCode, readCodeSource } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const answerCode = defineCode<"answerCode", typeof languages>({
  "id": "e6566d06-1284-4cbe-a87f-ca178b05fe26",
  "slug": "answerCode",
  "type": "code",
  "params": {
  "language": "javascript",
  "codeAsText": readCodeSource(import.meta.url, "js")
},
  "locale": {
  "title": {
  "en": "Two color names before and after a change"
}
}
});
