import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "4574f397-5fb4-4d9a-a877-57177f46ab0c",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Спочатку назви рухоме тіло, потім центр його орбіти. Стрілка починається з рухомого тіла.",
      en: "Name the moving body first, then the center of its orbit. The arrow starts at the moving body.",
      pl: "Najpierw nazwij poruszające się ciało, a potem środek jego orbity. Strzałka zaczyna się przy poruszającym się ciele.",
      qm: "Evvel areket etken cismini, soñ onıñ orbitasınıñ merkezini ayt. Oq areket etken cisimden başlay."
    }
  }
});
