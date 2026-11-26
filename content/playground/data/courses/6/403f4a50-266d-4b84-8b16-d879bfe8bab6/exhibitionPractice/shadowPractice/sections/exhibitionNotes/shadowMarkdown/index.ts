import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";

export const shadowMarkdown = defineMarkdown<"shadowMarkdown", typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94713",
  "slug": "shadowMarkdown",
  "type": "markdown",
  "params": {},
  "locale": {
  "value": readMarkdown(import.meta.url, ["en"])
}
});
