import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "fe6f03b8-bab0-4e47-a800-d963b69b0c2e",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Темна частина Місяця фізично залишається на місці. Ми просто бачимо освітленою лише певну частину його поверхні."
    }
  }
});
