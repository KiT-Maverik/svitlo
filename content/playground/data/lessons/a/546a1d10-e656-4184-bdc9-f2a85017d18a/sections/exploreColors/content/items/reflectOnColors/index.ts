import { defineCheckpoint } from '@svitlo/engine/build';
import { languages } from "../../../../../languages";
import { compareShapes as item_compareShapes } from "./content/items/compareShapes";
import { changeColor as item_changeColor } from "./content/items/changeColor";

const content = {
  items: {
    "compareShapes": item_compareShapes,
    "changeColor": item_changeColor,
  },
  order: ["compareShapes", "changeColor"],
};

export const reflectOnColors = defineCheckpoint<"reflectOnColors", typeof content.items, typeof languages>({
  "id": "f6d544da-bc5e-43c6-b79f-40f1cc438750",
  "slug": "reflectOnColors",
  "type": "checkpoint",
  "params": {
    "headingLevel": 3,
    "showIndices": true,
    "showChevron": true,
    "enableChecks": true,
    "requireCompletion": true,
    "renderAsGroup": true
  },
  "locale": {
    "title": {
      "en": "Think and reveal"
    }
  },
  content,
});
