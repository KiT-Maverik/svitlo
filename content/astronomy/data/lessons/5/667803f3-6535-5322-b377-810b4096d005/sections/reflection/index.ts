import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { daylightTransfer } from "./daylightTransfer";
import { sayItBack } from "./sayItBack";
import { shortRecall } from "./shortRecall";

const content = {
  items: {
    daylightTransfer,
    sayItBack,
    shortRecall
  },
  order: [
    "daylightTransfer",
    "sayItBack",
    "shortRecall"
  ]
};

export const reflection = defineContentSection<"reflection", typeof content.items, LessonLanguages>({
  id: "aeb987c1-704e-4ef6-8a93-000000000004",
  slug: "reflection",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Що ти зрозумів"
    },
    navigationLabel: {
      uk: "Пригадуємо"
    }
  },
  content
});
