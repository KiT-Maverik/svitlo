import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "28f07343-10e8-4db3-b62f-0357cda78098",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Порівняй не розмір Місяця, а частину його диска, яку можна назвати світлою.",
      en: "Compare not the Moon's size, but how much of its disk looks bright.",
      pl: "Porównaj nie wielkość Księżyca, lecz to, jak duża część jego tarczy jest jasna.",
      qm: "Ayniñ büyükligini degil, diskiniñ ne qadar qısmı aydın körüngenini teñeştir."
    }
  }
});
