import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "115105b2-14e4-48fa-a089-f7df0bd99468",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Обидва зв’язки правильні одночасно: Місяць обертається навколо Землі, а система Земля—Місяць рухається навколо Сонця.",
      en: "Both relationships are true at the same time: the Moon orbits Earth, and the Earth–Moon system travels around the Sun.",
      pl: "Obie zależności są jednocześnie prawdziwe: Księżyc krąży wokół Ziemi, a układ Ziemia–Księżyc porusza się wokół Słońca.",
      qm: "Eki bağ da aynı vaqıtta doğrudır: Ay Yer etrafında aylana, Yer–Ay sisteması ise Küneş etrafında areket ete."
    }
  }
});
