import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const incorrect1 = defineText<"incorrect1", LessonLanguages>({
  id: "423c511a-e5d4-4cff-8933-afdbce1beb62",
  slug: "incorrect1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Якщо Місяць намальований майже як Сонце, насправді вони майже однакового розміру.",
      en: "If the Moon is drawn almost as large as the Sun, they must really be nearly the same size.",
      pl: "Jeśli Księżyc jest narysowany prawie tak duży jak Słońce, w rzeczywistości są niemal tej samej wielkości.",
      qm: "Eger Ay resimde Küneş qadar büyük körsetilse, kerçekte de olarnıñ büyüklükleri deyerli aynı."
    }
  }
});
