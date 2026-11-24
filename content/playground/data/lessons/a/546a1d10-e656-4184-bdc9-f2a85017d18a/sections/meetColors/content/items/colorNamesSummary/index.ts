import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';
import { languages } from "../../../../../languages";

export const colorNamesSummary = defineMarkdown<"colorNamesSummary", typeof languages>({
  "id": "6dde817b-b8e7-465b-936a-9bb6439db130",
  "slug": "colorNamesSummary",
  "type": "markdown",
  "params": {},
  "locale": {
  "value": readMarkdown(import.meta.url, ["en"]),
  "variables": {
  "RED_NAME": {
  "en": "Red"
},
  "BLUE_NAME": {
  "en": "blue"
}
}
}
});
