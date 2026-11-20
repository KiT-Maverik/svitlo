import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "076a0475-6789-400a-93db-3e21aadccb88",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сіріус — зоря, а Марс — планета Сонячної системи. Вони можуть виглядати схоже з великої відстані, але їхня природа різна.",
      en: "Sirius is a star, while Mars is a planet in the Solar System. They can look similar from far away, but they are different kinds of celestial bodies.",
      pl: "Syriusz jest gwiazdą, a Mars planetą Układu Słonecznego. Z dużej odległości mogą wyglądać podobnie, lecz są różnymi rodzajami ciał niebieskich.",
      qm: "Sirius — yıldız, Merih ise Küneş sistemasındaki seyyaredir. Uzaqtan olar birbirine oşağan kibi körüne bile, amma türleri farqlıdır."
    }
  }
});
