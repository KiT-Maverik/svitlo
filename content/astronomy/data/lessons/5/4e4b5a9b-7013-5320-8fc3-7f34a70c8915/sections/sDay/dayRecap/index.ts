import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const dayRecap = defineText<"dayRecap", LessonLanguages>({
  id: "63dc6b4b-c9e7-4b20-b424-8a0811b443d0",
  slug: "dayRecap",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Скажи або покажи: «На одному зображенні світліше, на іншому — темніше». Це спостереження.",
      en: "Say or point out: “One picture is brighter, the other is darker.” That is an observation.",
      pl: "Powiedz albo pokaż: „Na jednym obrazku jest jaśniej, na drugim — ciemniej”. To jest obserwacja.",
      qm: "Söyle ya da köster: «Bir resimde daha aydın, digerinde ise daha qaranlıq». Bu — közetüv."
    }
  }
});
