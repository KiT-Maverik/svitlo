import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "85ec3447-fa30-4ebf-8cd8-85b8fbeee499",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць відбиває сонячне світло і вдень, і вночі. Його видимість залежить від положення на небі й умов спостереження.",
      en: "The Moon reflects sunlight both during the day and at night. Whether we can see it depends on its position in the sky and the viewing conditions.",
      pl: "Księżyc odbija światło Słońca zarówno w dzień, jak i w nocy. To, czy go widzimy, zależy od jego położenia na niebie i warunków obserwacji.",
      qm: "Ay küntüz de, gece de Küneş yarığını aks ettire. Onı körmek kökteki vaziyetine ve közetüv şartlarına bağlı."
    }
  }
});
