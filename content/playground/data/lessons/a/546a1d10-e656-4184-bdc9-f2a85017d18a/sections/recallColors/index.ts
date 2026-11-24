import { defineFlashcardsSection } from '@svitlo/engine/build';
import { languages } from "../../languages";
import { recallPrompt as child_content_items_recallPrompt } from "./content/items/recallPrompt";

// TODO (BLOCKER): Select verified Flashcard Bank UUIDs; no Flashcards have been fabricated.
const content = {
  "items": {
    "recallPrompt": child_content_items_recallPrompt,
  },
  "order": ["recallPrompt"],
};

export const recallColors = defineFlashcardsSection<"recallColors", typeof content.items, typeof languages>(
{
  "id": "fdbcf911-4b36-4f11-802e-1a00d6efa7bb",
  "slug": "recallColors",
  "type": "flashcards",
  "params": {},
  "locale": {
    "title": {
      "en": "Remember the color names",
    },
    "navigationLabel": {
      "en": "Flashcards",
    },
  },
  "content": content,
});
