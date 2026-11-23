import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const otherChoice1 = defineText<"otherChoice1", LessonLanguages>({
  id: "c05e2112-2754-590d-84fc-93086306986f",
  slug: "otherChoice1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Розглянути підписаний науковий знімок Сонця.",
      en: "Look at a labeled scientific photograph of the Sun.",
      pl: "Obejrzeć podpisane zdjęcie naukowe Słońca.",
      qm: "İzaat yazısı olğan ilmiy Küneş fotoresmini körmek."
    }
  }
});
