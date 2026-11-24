import {defineContentSection} from "@svitlo/engine/build";

import {greeting} from "./greeting";
import {choosePath} from "./choosePath";

// agent note. add all content blocks in this section. i want to test how they are generated.
export const welcome = defineContentSection({
  "id": "8a9f6c0b-7d11-432a-9f8e-9e6ee1a6ac01",
  "slug": "welcome",
  "type": "content",
  "params": {},
  "locale": {
    "title": {
      "en": "Welcome to the lab",
    },
    "navigationLabel": {
      "en": "Introduction",
    },
  },
  "content": {
    "items": {
      // agent note: use same structure as for lessons. maybe eve same materializers.
      greeting,
      choosePath,
    },
    "order": [
      "greeting",
      "choosePath",
    ],
  },
})
