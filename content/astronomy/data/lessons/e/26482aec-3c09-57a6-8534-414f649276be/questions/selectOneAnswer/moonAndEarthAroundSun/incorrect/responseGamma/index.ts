import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const responseGamma = defineText<"responseGamma", LessonLanguages>({
  id: "94b34eb3-39dc-4240-a11d-a897fe12a777",
  slug: "responseGamma",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць рухається тільки навколо Сонця й зовсім не рухається навколо Землі.",
      en: "The Moon travels only around the Sun and does not orbit Earth at all.",
      pl: "Księżyc krąży tylko wokół Słońca i wcale nie krąży wokół Ziemi.",
      qm: "Ay faqat Küneş etrafında aylana ve Yer etrafında asla aylamay."
    }
  }
});
