import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

import { compareExample } from "./compareExample";
import { CompareWorkbenchConfig } from "./compareWorkbench";
import { finalReflection } from "./finalReflection";

const content = {
  items: {
    compareExample,
    compareWorkbench: CompareWorkbenchConfig,
    finalReflection
  },
  order: [
    "compareExample",
    "compareWorkbench",
    "finalReflection"
  ]
};

export const compareTwoRecords = defineContentSection<"compareTwoRecords", typeof content.items, LessonLanguages>({
  id: "a8f88fac-026b-5767-b167-b14e7060e180",
  slug: "compareTwoRecords",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Порівняй записи",
      en: "Compare the Records",
      pl: "Porównaj zapisy",
      qm: "Qaydlarnı qıyasla"
    },
    navigationLabel: {
      uk: "Порівняй записи",
      en: "Compare the Records",
      pl: "Porównaj zapisy",
      qm: "Qaydlarnı qıyasla"
    }
  },
  content
});
