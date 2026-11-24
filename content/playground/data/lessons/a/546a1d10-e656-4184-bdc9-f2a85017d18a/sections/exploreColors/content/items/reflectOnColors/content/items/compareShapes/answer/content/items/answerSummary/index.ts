import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';
import { languages } from "../../../../../../../../../../../../languages";

export const answerSummary = defineMarkdown<"answerSummary", typeof languages>({
  "id": "fda1cca5-fab9-4216-b5a2-19a78806b09e",
  "slug": "answerSummary",
  "type": "markdown",
  "params": {},
  "locale": {
  "value": readMarkdown(import.meta.url, ["en"]),
  "variables": {
  "FIRST_COLOR": {
  "en": "Red"
},
  "SECOND_COLOR": {
  "en": "blue"
}
}
}
});
