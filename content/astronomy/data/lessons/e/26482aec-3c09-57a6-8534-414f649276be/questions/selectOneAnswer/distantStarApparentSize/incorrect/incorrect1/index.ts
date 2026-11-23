import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const incorrect1 = defineText<"incorrect1", LessonLanguages>({
  id: "9a8cefa0-d98b-4554-8227-bdd1931ddd38",
  slug: "incorrect1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Вона обов’язково менша за Сонце, бо здається крихітною.",
      en: "It must be smaller than the Sun because it looks tiny.",
      pl: "Na pewno jest mniejsza od Słońca, bo wydaje się malutka.",
      qm: "O, Küneşten mıtlaqa kiçiktir, çünki pek kiçik körüne."
    }
  }
});
