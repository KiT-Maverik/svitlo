import { defineContentSection } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
// agent note: no rename
import { shadowObservation } from "./shadowObservation";

// TODO (BLOCKER): Transfer reviewed content Section notes (purpose) into the owning Lesson methodology and verify the transfer before removing this marker.
const content = {
  "items": {
    // note: use this syntax
    shadowObservation,
  },
  "order": ["shadowObservation"],
};

export const exhibitionNotes = defineContentSection<"exhibitionNotes", typeof content.items, typeof languages>(
{
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94711",
  "slug": "exhibitionNotes",
  "type": "content",
  "params": {},
  "locale": {
    "title": {
      "en": "Exhibition shadow observations",
    },
    "navigationLabel": "Exhibition notes",
  },
  "content": content,
});
