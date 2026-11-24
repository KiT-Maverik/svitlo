import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';
import { languages } from "../../../../../languages";

export const shapeSymbols = defineMarkdown<"shapeSymbols", typeof languages>({
  "id": "f19a39f9-f1b3-438d-bd02-d2eb021e49e6",
  "slug": "shapeSymbols",
  "type": "markdown",
  "params": {},
  "locale": {
  "value": readMarkdown(import.meta.url)
}
});
