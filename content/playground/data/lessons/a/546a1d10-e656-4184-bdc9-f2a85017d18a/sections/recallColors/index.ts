import { defineFlashcardsSection } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";
import { recallPrompt as child_content_items_recallPrompt } from "./recallPrompt";

const content = {
  "items": {
    "recallPrompt": child_content_items_recallPrompt,
  },
  "order": ["recallPrompt"],
};

// TODO (BLOCKER): Implement reviewed Flashcards Section with real flashcard.id imports; remove this TODO after bank integration.
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
