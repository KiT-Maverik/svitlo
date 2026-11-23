import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const reflectsInDay = defineText<"reflectsInDay", LessonLanguages>({
  id: "b9a0bf0c-f61d-47d5-a1ec-5eccb3860467",
  slug: "reflectsInDay",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць іноді буває на денному небі, а його поверхня відбиває світло Сонця.",
      en: "The Moon is sometimes in the daytime sky, and its surface reflects sunlight.",
      pl: "Księżyc bywa widoczny na dziennym niebie, a jego powierzchnia odbija światło Słońca.",
      qm: "Ay bazan küntüz kökte körüne ve yüzü Küneş yarığını aks ettire."
    }
  }
});
