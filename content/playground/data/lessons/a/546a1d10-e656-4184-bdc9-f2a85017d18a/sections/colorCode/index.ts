import { defineCodingTaskSection } from '@svitlo/engine/build';
import { languages } from "../../languages";
import { codeIntro as child_content_items_codeIntro } from "./content/items/codeIntro";
import { codeReflection as child_content_items_codeReflection } from "./content/items/codeReflection";
import { colorNameCode as child_content_items_colorNameCode } from "./content/items/colorNameCode";

const content = {
  "items": {
    "codeIntro": child_content_items_codeIntro,
    "codeReflection": child_content_items_codeReflection,
    "colorNameCode": child_content_items_colorNameCode,
  },
  "order": ["codeIntro", "colorNameCode", "codeReflection"],
};

export const colorCode = defineCodingTaskSection<"colorCode", typeof content.items, typeof languages>(
{
  "id": "acd43a98-4bc2-415f-b4e5-9cd6011dff04",
  "slug": "colorCode",
  "type": "codingTask",
  "params": {
    "skippable": true,
  },
  "locale": {
    "title": {
      "en": "Color words in code",
    },
    "navigationLabel": {
      "en": "Code",
    },
  },
  "content": content,
});
