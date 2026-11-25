import { defineCheckpoint } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
import { firstObservation } from "./firstObservation";

const content = {
  items: {
    firstObservation,
  },
  order: ["firstObservation"],
};

export const shadowCheckpoint = defineCheckpoint<"shadowCheckpoint", typeof content.items, typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca9471e",
  "slug": "shadowCheckpoint",
  "type": "checkpoint",
  "params": {
    "showIndices": true,
    "requireCompletion": false
  },
  "locale": {
    "title": {
      "en": "Check the shadow observation"
    }
  },
  content,
});
