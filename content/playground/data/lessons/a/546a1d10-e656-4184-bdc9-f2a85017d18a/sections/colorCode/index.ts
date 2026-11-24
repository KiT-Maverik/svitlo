import { defineCodingTaskSection } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";
import { codeIntro as child_content_items_codeIntro } from "./codeIntro";
import { codeReflection as child_content_items_codeReflection } from "./codeReflection";
import { colorNameCode as child_content_items_colorNameCode } from "./colorNameCode";

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
