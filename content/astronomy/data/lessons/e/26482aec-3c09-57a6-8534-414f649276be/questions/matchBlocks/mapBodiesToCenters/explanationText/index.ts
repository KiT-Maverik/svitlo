import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "90233a6b-8a75-48d5-8616-a1a08ad38dd6",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Земля рухається навколо Сонця; Місяць рухається навколо Землі. Водночас Місяць разом із Землею подорожує навколо Сонця — це не скасовує його руху навколо Землі.",
      en: "Earth travels around the Sun; the Moon travels around Earth. At the same time, the Moon travels around the Sun together with Earth. This does not cancel out its motion around Earth.",
      pl: "Ziemia krąży wokół Słońca, a Księżyc wokół Ziemi. Jednocześnie Księżyc razem z Ziemią wędruje wokół Słońca. Nie oznacza to, że przestaje krążyć wokół Ziemi.",
      qm: "Yer Küneş etrafında, Ay ise Yer etrafında aylana. Aynı vaqıtta Ay Yer ile beraber Küneş etrafında da areket ete. Bu, Aynıñ Yer etrafındaki areketini yoqqa çıqarmay."
    }
  }
});
