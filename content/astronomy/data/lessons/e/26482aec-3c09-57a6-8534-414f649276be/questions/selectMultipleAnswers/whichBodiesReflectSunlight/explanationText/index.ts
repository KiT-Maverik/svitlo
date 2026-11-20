import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "9e711e60-e442-4af0-ba4b-4f00cc5952de",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце й Сіріус — зорі, які самі випромінюють світло. Земля, Марс і Місяць не є зорями; їхні видимі освітлені частини відбивають сонячне світло.",
      en: "The Sun and Sirius are stars that produce their own light. Earth, Mars and the Moon are not stars; their visible illuminated parts reflect sunlight.",
      pl: "Słońce i Syriusz są gwiazdami wysyłającymi własne światło. Ziemia, Mars i Księżyc nie są gwiazdami; ich widoczne oświetlone części odbijają światło słoneczne.",
      qm: "Küneş ve Sirius öz yarığını saçqan yıldızlardır. Yer, Merih ve Ay yıldız degiller; olarnıñ körüngen aydınlatılğan qısımları Küneş yarığını qaytara."
    }
  }
});
