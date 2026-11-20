import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const wrong1 = defineText<"wrong1", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000001b",
  slug: "wrong1",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "У місті Д день залишиться назавжди, бо воно вже стало освітленим.",
      en: "It will stay daytime in «Д» forever, because the town has already been lit up.",
      pl: "W mieście «Д» dzień pozostanie na zawsze, bo zostało już oświetlone.",
      qm: "«Д» şeerinde daima kündüz olacaq, çünki anda bir kere yarıq oldı."
    }
  }
});
