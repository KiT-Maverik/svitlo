import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "64f78553-7f2d-47f9-8ba0-df60d81e18c0",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Дитина каже: «Місяць яскравий уночі, отже він зоря». Яка відповідь найточніше виправляє помилку?",
      en: "A child says, “The Moon is bright at night, so it must be a star.” Which answer most accurately corrects the mistake?",
      pl: "Dziecko mówi: „Księżyc jasno świeci w nocy, więc jest gwiazdą”. Która odpowiedź najtrafniej poprawia ten błąd?",
      qm: "Bir bala: «Ay gece parlaq körüne, demek ki yıldızdır», — dey. Angi cevap bu hatanı eñ doğru tüzete?"
    }
  }
});
