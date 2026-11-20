import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const otherChoice3 = defineText<"otherChoice3", LessonLanguages>({
  id: "6b6eac82-4c33-5a83-b627-193c28914228",
  slug: "otherChoice3",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Попросити друга подивитися замість нього й розповісти.",
      en: "Ask a friend to look at it instead and describe it.",
      pl: "Poprosić kolegę, żeby spojrzał zamiast niego i opowiedział, co widział.",
      qm: "Arqadaşından özü yerine Küneşke baqıp, soñra anlatmasını istemek."
    }
  }
});
