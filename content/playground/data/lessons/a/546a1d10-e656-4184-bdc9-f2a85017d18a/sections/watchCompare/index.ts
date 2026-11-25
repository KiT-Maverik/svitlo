import { defineLearningFlowSection } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";
import { colorGallery as child_content_items_colorGallery } from "./colorGallery";
import { externalEmbed as child_content_items_externalEmbed } from "./externalEmbed";
import { extraVideoIntro as child_content_items_extraVideoIntro } from "./extraVideoIntro";
import { shapeCaptions as child_content_items_shapeCaptions } from "./shapeCaptions";
import { shapeChange as child_content_items_shapeChange } from "./shapeChange";
import { videoIntro as child_content_items_videoIntro } from "./videoIntro";

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
