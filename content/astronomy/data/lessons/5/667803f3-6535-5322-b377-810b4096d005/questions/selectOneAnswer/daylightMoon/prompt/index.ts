import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "c616d007-6469-40ea-b0be-2c54e22b1304",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Дитина помітила Місяць удень, коли ще світило Сонце. Чому це не дивно?",
      en: "A child noticed the Moon during the day, while the Sun was still shining. Why is this not surprising?",
      pl: "Dziecko zauważyło Księżyc w dzień, gdy wciąż świeciło Słońce. Dlaczego nie jest to nic dziwnego?",
      qm: "Bala Küneş daa yarıq bergen küntüz Ayni kördi. Bu niçün şaşırtıcı degil?"
    }
  }
});
