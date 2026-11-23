import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "3ddc564a-8271-4124-ad89-3cdf56b5907b",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце освітлює Місяць. Його поверхня відбиває частину сонячного світла до наших очей.",
      en: "The Sun illuminates the Moon. The Moon's surface reflects some of that sunlight toward our eyes.",
      pl: "Słońce oświetla Księżyc. Jego powierzchnia odbija część światła słonecznego w stronę naszych oczu.",
      qm: "Küneş Ayni aydınlata. Ayniñ yüzü Küneş yarığınıñ bir qısmını közlerimizge doğru aks ettire."
    }
  }
});
