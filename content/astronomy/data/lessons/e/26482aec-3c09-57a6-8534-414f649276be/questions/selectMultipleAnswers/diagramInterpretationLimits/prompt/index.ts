import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "a61181ee-b267-43e8-8f21-37af3d2b8fa9",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Навчальна схема Сонця, Землі та Місяця НЕ показує справжній масштаб. Обери ВСІ правильні висновки, які можна зробити без довіри до намальованих розмірів і кольорів.",
      en: "An educational diagram of the Sun, Earth and Moon is NOT drawn to scale. Choose ALL valid conclusions you can make without relying on the drawn sizes or colors.",
      pl: "Schemat edukacyjny Słońca, Ziemi i Księżyca NIE przedstawia rzeczywistej skali. Wybierz WSZYSTKIE poprawne wnioski, które można z niego wyciągnąć bez polegania na narysowanych rozmiarach i kolorach.",
      qm: "Küneş, Yer ve Aynı köstergen oquv şeması kerçek ölçekte ÇİZİLMEGEN. Resimdeki büyüklüklerge ve renklerge tayanmadan çıqarılğan BÜTÜN doğru neticelerni sayla."
    }
  }
});
