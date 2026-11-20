import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "3f7a848e-6892-4b22-96fe-3ff448871f13",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Обирай за джерелом світла, а не за тим, наскільки яскравим здається тіло.",
      en: "Choose based on the source of the light, not on how bright the body looks.",
      pl: "Kieruj się źródłem światła, a nie tym, jak jasno dane ciało wygląda.",
      qm: "Cisim ne qadar parlaq körüngenine degil, yarıqnıñ menbasına esaslanıp sayla."
    }
  }
});
