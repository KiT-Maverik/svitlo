import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000000a",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Уяви кульку з позначкою будинку й лампу. Що має змінитися, щоб біля будинку стало темніше?",
      en: "Imagine a ball marked with a house and a lamp. What would need to change for it to become darker near the house?",
      pl: "Wyobraź sobie kulę z zaznaczonym domem i lampę. Co musi się zmienić, żeby w pobliżu domu zrobiło się ciemniej?",
      qm: "Üzerinde ev belgisi olğan küreni ve lampanı tasavur et. Ev yanında qarañğı olmaq içün ne deñişmeli?"
    }
  }
});
