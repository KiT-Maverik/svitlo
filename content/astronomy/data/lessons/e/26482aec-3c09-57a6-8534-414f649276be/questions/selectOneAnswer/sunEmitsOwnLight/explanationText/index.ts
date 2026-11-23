import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "55663329-e549-4462-8bca-acef47f94ccd",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Зорі самі випромінюють світло. Сонце — зоря; те, що воно велике або яскраве на нашому небі, не є визначенням зорі.",
      en: "Stars produce their own light. The Sun is a star. Its large size or brightness in our sky is not what defines a star.",
      pl: "Gwiazdy wysyłają własne światło. Słońce jest gwiazdą. To, że na naszym niebie wydaje się duże lub jasne, nie stanowi definicji gwiazdy.",
      qm: "Yıldızlar öz yarığını saça. Küneş de yıldızdır. Bizim kökte büyük ya da parlaq körünmesi yıldıznıñ tarifi degildir."
    }
  }
});
