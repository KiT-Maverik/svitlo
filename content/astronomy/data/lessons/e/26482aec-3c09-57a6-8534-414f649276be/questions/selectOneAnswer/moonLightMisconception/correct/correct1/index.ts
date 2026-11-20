import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const correct1 = defineText<"correct1", LessonLanguages>({
  id: "d7a2b9d0-6488-4674-afce-38ccd9332484",
  slug: "correct1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць — природний супутник Землі; ми бачимо сонячне світло, відбите ним, а не його власне світло.",
      en: "The Moon is Earth's natural satellite; we see sunlight reflected by it, not its own light.",
      pl: "Księżyc jest naturalnym satelitą Ziemi. Widzimy odbite od niego światło słoneczne, a nie jego własne światło.",
      qm: "Ay — Yerniñ tabiiy yoldaşıdır; biz onıñ öz yarığını degil, ondan qaytqan Küneş yarığını köremiz."
    }
  }
});
