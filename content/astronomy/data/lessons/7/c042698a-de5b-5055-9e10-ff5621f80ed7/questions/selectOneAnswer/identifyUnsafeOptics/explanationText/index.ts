import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "fa51424d-b38b-5efe-8437-594e136461f0",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Бінокль без належного спеціального сонячного фільтра робить пряме споглядання Сонця особливо небезпечним. Готові перевірені знімки та описи дозволяють дізнаватися про Сонце без цього ризику.",
      en: "Looking directly at the Sun through binoculars without a proper, specially designed solar filter is especially dangerous. Verified photographs and descriptions let us learn about the Sun without taking that risk.",
      pl: "Bezpośrednie patrzenie na Słońce przez lornetkę bez odpowiedniego, specjalnego filtra słonecznego jest szczególnie niebezpieczne. Sprawdzone zdjęcia i opisy pozwalają poznawać Słońce bez takiego ryzyka.",
      qm: "Mahsus küneş filtri olmağan dürbinnen Küneşke doğrudan-doğru baqmaq közler içün pek telükeli. Tekşirilgen azır ilmiy fotoresimler ve tarifler közlerni telükege atmayıp Küneş aqqında malümat almağa yardım ete."
    }
  }
});
