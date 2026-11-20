import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const otherChoice2 = defineText<"otherChoice2", LessonLanguages>({
  id: "9dfb0a7c-cecb-5609-890a-bce644f1894c",
  slug: "otherChoice2",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Спрямувати бінокль на Сонце, щоб роздивитися його ближче.",
      en: "Point binoculars at the Sun to see it more closely.",
      pl: "Skierować lornetkę na Słońce, żeby przyjrzeć mu się z bliska.",
      qm: "Küneşni yaqından körmek içün dürbinni oña çevirip baqmaq."
    }
  }
});
