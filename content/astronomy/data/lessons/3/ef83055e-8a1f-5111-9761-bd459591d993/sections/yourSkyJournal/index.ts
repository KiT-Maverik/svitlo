import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

import { recordChecklist } from "./recordChecklist";
import { recordTask } from "./recordTask";
import { RecordWorkbenchConfig } from "./recordWorkbench";

const content = {
  items: {
    recordTask,
    recordWorkbench: RecordWorkbenchConfig,
    recordChecklist
  },
  order: [
    "recordTask",
    "recordWorkbench",
    "recordChecklist"
  ]
};

export const yourSkyJournal = defineContentSection<"yourSkyJournal", typeof content.items, LessonLanguages>({
  id: "2891b2b8-469d-5772-af1d-af309d5b6fb0",
  slug: "yourSkyJournal",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Мій запис",
      en: "My Record",
      pl: "Mój zapis",
      qm: "Meniñ qaydım"
    },
    navigationLabel: {
      uk: "Мій запис",
      en: "My Record",
      pl: "Mój zapis",
      qm: "Meniñ qaydım"
    }
  },
  content
});
