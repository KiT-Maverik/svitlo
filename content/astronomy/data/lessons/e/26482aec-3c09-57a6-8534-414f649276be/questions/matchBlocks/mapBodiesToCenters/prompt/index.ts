import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "75786229-78e9-4de4-b0f1-6f221745199c",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Для кожного тіла обери те, навколо якого воно безпосередньо рухається в нашій схемі. Ми позначаємо найближчий головний орбітальний зв’язок.",
      en: "For each body, choose the one it directly orbits in our diagram. We are showing the main, closest orbital relationship.",
      pl: "Dla każdego ciała wybierz to, wokół którego bezpośrednio krąży na naszym schemacie. Pokazujemy najbliższą główną zależność orbitalną.",
      qm: "Er bir cisim içün, bizim şemamızda o doğrudan etrafında aylanğan cismini sayla. Biz eñ yaqın esas orbital bağnı kösteremiz."
    }
  }
});
