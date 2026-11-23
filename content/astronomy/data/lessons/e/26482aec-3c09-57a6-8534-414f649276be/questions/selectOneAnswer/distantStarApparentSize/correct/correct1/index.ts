import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const correct1 = defineText<"correct1", LessonLanguages>({
  id: "cf5e4d92-4d0a-4f95-9185-320d3049d2a1",
  slug: "correct1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Вона все одно зоря; за тим, якою маленькою вона здається, не можна визначити її справжній розмір.",
      en: "It is still a star; the fact that it looks tiny does not tell us its real size.",
      pl: "Nadal jest gwiazdą; to, że wydaje się malutka, nie pozwala określić jej rzeczywistej wielkości.",
      qm: "O yene de yıldızdır; kiçik körüngenine köre kerçek büyüklügini bilip olmay."
    }
  }
});
