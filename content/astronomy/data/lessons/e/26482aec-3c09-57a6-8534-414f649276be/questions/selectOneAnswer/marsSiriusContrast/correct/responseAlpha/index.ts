import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const responseAlpha = defineText<"responseAlpha", LessonLanguages>({
  id: "cef5cbf5-65ed-4d1c-8382-098c1cf6e972",
  slug: "responseAlpha",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сіріус — зоря, що випромінює світло; Марс — планета, яку ми бачимо завдяки відбитому сонячному світлу.",
      en: "Sirius is a star that gives off light; Mars is a planet we can see because it reflects sunlight.",
      pl: "Syriusz jest gwiazdą, która wysyła światło; Mars jest planetą widoczną dzięki odbijaniu światła słonecznego.",
      qm: "Sirius — öz yarığını saçqan yıldızdır; Merih ise Küneş yarığını qaytarğanı içün körüngen seyyaredir."
    }
  }
});
