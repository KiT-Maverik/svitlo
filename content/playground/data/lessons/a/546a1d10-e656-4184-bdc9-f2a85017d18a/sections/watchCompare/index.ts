import { defineLearningFlowSection } from '@svitlo/engine/build';
import { languages } from "../../languages";
import { colorGallery as child_content_items_colorGallery } from "./content/items/colorGallery";
import { externalEmbed as child_content_items_externalEmbed } from "./content/items/externalEmbed";
import { extraVideoIntro as child_content_items_extraVideoIntro } from "./content/items/extraVideoIntro";
import { shapeCaptions as child_content_items_shapeCaptions } from "./content/items/shapeCaptions";
import { shapeChange as child_content_items_shapeChange } from "./content/items/shapeChange";
import { videoIntro as child_content_items_videoIntro } from "./content/items/videoIntro";

const content = {
  "items": {
    "colorGallery": child_content_items_colorGallery,
    "externalEmbed": child_content_items_externalEmbed,
    "extraVideoIntro": child_content_items_extraVideoIntro,
    "shapeCaptions": child_content_items_shapeCaptions,
    "shapeChange": child_content_items_shapeChange,
    "videoIntro": child_content_items_videoIntro,
  },
  "order": ["videoIntro", "shapeChange", "shapeCaptions", "colorGallery", "extraVideoIntro", "externalEmbed"],
};

export const watchCompare = defineLearningFlowSection<"watchCompare", typeof content.items, typeof languages>(
{
  "id": "8a16a435-d6f2-4ed8-af43-aca56ca4b165",
  "slug": "watchCompare",
  "type": "learningFlow",
  "params": {},
  "locale": {
    "title": {
      "en": "Watch and compare",
    },
    "navigationLabel": {
      "en": "Compare",
    },
  },
  "content": content,
});
