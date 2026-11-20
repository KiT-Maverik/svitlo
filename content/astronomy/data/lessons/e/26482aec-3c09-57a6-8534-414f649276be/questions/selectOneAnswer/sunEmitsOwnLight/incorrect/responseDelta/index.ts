import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const responseDelta = defineText<"responseDelta", LessonLanguages>({
  id: "c3493d28-68e3-46c8-bfec-79866b8aabfd",
  slug: "responseDelta",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце — одна з планет, бо навколо нього є інші планети.",
      en: "The Sun is a planet because other planets orbit it.",
      pl: "Słońce jest jedną z planet, bo wokół niego znajdują się inne planety.",
      qm: "Küneş seyyarelerden biridir, çünki onıñ etrafında başqa seyyareler bar."
    }
  }
});
