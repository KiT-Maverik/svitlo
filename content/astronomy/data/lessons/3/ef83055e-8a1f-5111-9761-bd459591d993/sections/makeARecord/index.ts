import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

import { recordGuide } from "./recordGuide";
import { recordMistakes } from "./recordMistakes";
import { workedRecord } from "./workedRecord";

const content = {
  items: {
    recordGuide,
    workedRecord,
    recordMistakes
  },
  order: [
    "recordGuide",
    "workedRecord",
    "recordMistakes"
  ]
};

export const makeARecord = defineContentSection<"makeARecord", typeof content.items, LessonLanguages>({
  id: "7d07f12a-bdaa-55d5-bb9a-b85bb06974e9",
  slug: "makeARecord",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "П'ять підказок",
        en: "Five Helpful Questions",
        pl: "Pięć pomocnych pytań"
    },
    navigationLabel: {
      uk: "П'ять підказок",
        en: "Five Helpful Questions",
        pl: "Pięć pomocnych pytań"
    }
  },
  content
});
