import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "a1075ddf-b374-44db-90bb-614dd98a19e3",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць не є зорею, адже не випромінює власного світла, як Сонце. Він відбиває сонячне світло та обертається навколо Землі.",
      en: "The Moon is not a star because it does not produce its own light as the Sun does. It reflects sunlight and travels around Earth.",
      pl: "Księżyc nie jest gwiazdą, ponieważ nie wysyła własnego światła tak jak Słońce. Odbija światło słoneczne i krąży wokół Ziemi.",
      qm: "Ay yıldız degildir, çünki Küneş kibi öz yarığını saçmay. O, Küneş yarığını qaytara ve Yer etrafında aylana."
    }
  }
});
