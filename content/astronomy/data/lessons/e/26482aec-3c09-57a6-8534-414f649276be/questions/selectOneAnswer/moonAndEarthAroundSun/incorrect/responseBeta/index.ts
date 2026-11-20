import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const responseBeta = defineText<"responseBeta", LessonLanguages>({
  id: "b4a126d9-6521-48e7-be15-16d9f4ea0c60",
  slug: "responseBeta",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць може рухатися тільки навколо Землі й ніколи разом із нею навколо Сонця.",
      en: "The Moon can only orbit Earth and never travel around the Sun together with it.",
      pl: "Księżyc może krążyć tylko wokół Ziemi i nigdy razem z nią wokół Słońca.",
      qm: "Ay faqat Yer etrafında aylana bile ve onıñnen beraber Küneş etrafında iç bir vaqıt areket etmey."
    }
  }
});
