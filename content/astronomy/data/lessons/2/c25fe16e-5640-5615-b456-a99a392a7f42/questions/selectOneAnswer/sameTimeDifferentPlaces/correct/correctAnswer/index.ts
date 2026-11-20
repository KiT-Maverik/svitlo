import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const correctAnswer = defineText<"correctAnswer", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000005",
  slug: "correctAnswer",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місце К повернене до Сонця, а місце Л — від Сонця.",
      en: "Place K faces the Sun, while place L faces away from it.",
      pl: "Miejsce K jest zwrócone ku Słońcu, a miejsce L — w przeciwną stronę.",
      qm: "K yeri Küneşke doğru qaratılğan, L yeri ise Küneşten ters tarafqa qaratılğan."
    }
  }
});
