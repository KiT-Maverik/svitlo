import { defineCode, readCodeSource } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";

export const shadowCode = defineCode<"shadowCode", typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94714",
  "slug": "shadowCode",
  "type": "code",
  "params": {
  "language": "typescript",
  "codeAsText": readCodeSource(import.meta.url, "ts")
},
  "locale": {
  "title": {
  "en": "A simple shadow model"
}
}
});
