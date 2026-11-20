import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "ad42485a-664c-5255-88e1-5cd773cdc7cd",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подумай, чи можна побачити результат, не спрямовуючи власні очі або прилади на Сонце.",
      en: "Think about whether you can see the result without looking at the Sun or pointing equipment at it.",
      pl: "Zastanów się, czy możesz zobaczyć rezultat bez patrzenia na Słońce i bez kierowania na nie żadnych przyrządów.",
      qm: "Öz közleriñni ya da cihazlarnı Küneşke doğrultmadan neticeni körmek mümkünmi, tüşün."
    }
  }
});
