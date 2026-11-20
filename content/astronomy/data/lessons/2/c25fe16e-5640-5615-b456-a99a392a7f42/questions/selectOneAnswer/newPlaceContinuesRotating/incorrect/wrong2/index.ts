import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const wrong2 = defineText<"wrong2", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000001c",
  slug: "wrong2",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місто Д стане темним лише тоді, коли вимкнуть лампу.",
      en: "The town «Д» will become dark only when the lamp is switched off.",
      pl: "W mieście «Д» zrobi się ciemno dopiero wtedy, gdy ktoś wyłączy lampę.",
      qm: "«Д» şeeri faqat lampa söndürilgende qarañğı olacaq."
    }
  }
});
