import { definePracticeSection } from '@svitlo/engine/build';
import { languages } from "../../languages";
import { colorExplorer as child_content_items_colorExplorer } from "./content/items/colorExplorer";
import { explorePrompt as child_content_items_explorePrompt } from "./content/items/explorePrompt";
import { reflectOnColors as child_content_items_reflectOnColors } from "./content/items/reflectOnColors";

const content = {
  "items": {
    "colorExplorer": child_content_items_colorExplorer,
    "explorePrompt": child_content_items_explorePrompt,
    "reflectOnColors": child_content_items_reflectOnColors,
  },
  "order": ["explorePrompt", "colorExplorer", "reflectOnColors"],
};

export const exploreColors = definePracticeSection<"exploreColors", typeof content.items, typeof languages>(
{
  "id": "c50239cb-4f55-4661-b035-706c0fa0eef5",
  "slug": "exploreColors",
  "type": "practice",
  "params": {},
  "locale": {
    "title": {
      "en": "Try changing colors",
    },
    "navigationLabel": {
      "en": "Practice",
    },
  },
  "content": content,
});
