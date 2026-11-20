import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "542a1bbf-efbd-4354-9ce6-50d6bcc86d18",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Вигляд змінюється, бо ми бачимо іншу частку освітленої Сонцем поверхні. Форма й саме небесне тіло не змінюються.",
      en: "The appearance changes because we see a different portion of the Sun-lit surface. The Moon's shape and the Moon itself do not change.",
      pl: "Wygląd się zmienia, ponieważ widzimy inną część powierzchni oświetlonej przez Słońce. Kształt Księżyca ani sam Księżyc się nie zmieniają.",
      qm: "Körüniş deñişe, çünki biz Küneş aydınlatqan yüzniñ başqa payını köremiz. Ayniñ şekli de, özü de deñişmey."
    }
  }
});
