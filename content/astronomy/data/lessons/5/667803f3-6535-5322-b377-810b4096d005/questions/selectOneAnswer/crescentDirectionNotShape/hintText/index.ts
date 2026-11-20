import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "ce19d62b-3114-4231-8e53-0be9d2c26cb4",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Поміркуй, чи може той самий предмет на двох знімках бути повернутим по-різному.",
      en: "Think about whether the same object can be turned differently in two pictures.",
      pl: "Zastanów się, czy ten sam przedmiot może być inaczej obrócony na dwóch zdjęciach.",
      qm: "Aynı cisim eki resimde türlüce çevrilgen ola bilirmi? Tüşün."
    }
  }
});
