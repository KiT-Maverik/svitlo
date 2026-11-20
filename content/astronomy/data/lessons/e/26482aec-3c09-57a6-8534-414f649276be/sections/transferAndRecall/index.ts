import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { marsExample } from "./marsExample";
import { misconceptions } from "./misconceptions";
import { recallPrompt } from "./recallPrompt";

const content = {
  items: {
    marsExample,
    misconceptions,
    recallPrompt
  },
  order: [
    "marsExample",
    "misconceptions",
    "recallPrompt"
  ]
};

export const transferAndRecall = defineContentSection<"transferAndRecall", typeof content.items, LessonLanguages>({
  id: "05a79a36-771c-45f9-aab1-c70bc77af902",
  slug: "transferAndRecall",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Що ще можна впізнати?"
    },
    navigationLabel: {
      uk: "Що ще можна впізнати?"
    }
  },
  content
});
