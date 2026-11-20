import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const incorrect1 = defineText<"incorrect1", LessonLanguages>({
  id: "ecf6f8ba-a1c3-47ba-97f8-edf19bcaafbe",
  slug: "incorrect1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Усе, що виглядає яскравим уночі, обов’язково є зорею.",
      en: "Everything that looks bright at night must be a star.",
      pl: "Wszystko, co jasno świeci w nocy, na pewno jest gwiazdą.",
      qm: "Gece parlaq körüngen er şey mıtlaqa yıldızdır."
    }
  }
});
