import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "edca3448-f423-4403-93cc-0d300834f8fa",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Згадай, хто світить власним світлом, а хто відбиває сонячне.",
      en: "Recall which bodies produce their own light and which reflect sunlight.",
      pl: "Przypomnij sobie, które ciała wysyłają własne światło, a które odbijają światło słoneczne.",
      qm: "Angi cisimler öz yarığını saçqanını, angileri ise Küneş yarığını qaytarğanını hatırla."
    }
  }
});
