import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "a8518513-c747-45ed-a97b-4cfc9478877c",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Основні спрямовані зв’язки: Земля → Сонце та Місяць → Земля. Обернені стрілки хибно міняють місцями тіло й центр орбіти.",
      en: "The main directed relationships are Earth → Sun and Moon → Earth. Reversed arrows incorrectly swap the moving body and the center of its orbit.",
      pl: "Główne zależności pokazane strzałkami to Ziemia → Słońce i Księżyc → Ziemia. Odwrócone strzałki błędnie zamieniają miejscami ciało i środek jego orbity.",
      qm: "Esas yöneltilgen bağlar: Yer → Küneş ve Ay → Yer. Ters oqlar areket etken cisim ile orbitasınıñ merkezini yanlış yerlerge qoya."
    }
  }
});
