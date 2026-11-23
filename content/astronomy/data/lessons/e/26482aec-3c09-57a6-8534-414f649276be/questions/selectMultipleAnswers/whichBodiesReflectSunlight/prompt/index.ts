import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "61fc200e-c226-45ab-85fe-95f4c7f4a2f1",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Обери ВСІ правильні твердження про джерело світла, яке ми бачимо від різних небесних тіл.",
      en: "Choose ALL correct statements about the source of the light we see from different celestial bodies.",
      pl: "Wybierz WSZYSTKIE poprawne stwierdzenia o źródle światła, które widzimy od różnych ciał niebieskich.",
      qm: "Çeşitli kök cisimlerinden körgen yarıqnıñ menbası aqqındaki BÜTÜN doğru fikirlerni sayla."
    }
  }
});
