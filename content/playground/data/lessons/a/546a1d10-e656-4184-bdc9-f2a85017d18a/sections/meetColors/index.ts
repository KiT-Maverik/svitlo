import { defineContentSection } from '@svitlo/engine/build';
import { languages } from "../../languages";
import { colorNames as child_content_items_colorNames } from "./content/items/colorNames";
import { colorNamesSummary as child_content_items_colorNamesSummary } from "./content/items/colorNamesSummary";
import { colorPair as child_content_items_colorPair } from "./content/items/colorPair";
import { introduce as child_content_items_introduce } from "./content/items/introduce";
import { shapeSymbols as child_content_items_shapeSymbols } from "./content/items/shapeSymbols";
import { symbolExplanation as child_content_items_symbolExplanation } from "./content/items/symbolExplanation";

const content = {
  "items": {
    "colorNames": child_content_items_colorNames,
    "colorNamesSummary": child_content_items_colorNamesSummary,
    "colorPair": child_content_items_colorPair,
    "introduce": child_content_items_introduce,
    "shapeSymbols": child_content_items_shapeSymbols,
    "symbolExplanation": child_content_items_symbolExplanation,
  },
  "order": ["introduce", "colorPair", "colorNames", "colorNamesSummary", "shapeSymbols", "symbolExplanation"],
};

export const meetColors = defineContentSection<"meetColors", typeof content.items, typeof languages>(
{
  "id": "6e7b8fc7-bb04-49bf-8a93-1718f5216672",
  "slug": "meetColors",
  "type": "content",
  "params": {},
  "locale": {
    "title": {
      "en": "Meet red and blue",
    },
    "navigationLabel": {
      "en": "Meet colors",
    },
  },
  "content": content,
});
