import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "d8381ba6-9a5e-40df-a932-3d7e458ce07d",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Освітлена половина кулі залишається тією самою, але спостерігачі бачать різні її частини. Таку ідею використовують для пояснення вигляду Місяця."
    }
  }
});
