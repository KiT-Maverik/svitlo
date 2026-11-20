import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "9e711e60-e442-4af0-ba4b-4f00cc5952de",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце й Сіріус — зорі, які самі випромінюють світло. Земля, Марс і Місяць не є зорями; їхні видимі освітлені частини відбивають сонячне світло."
    }
  }
});
