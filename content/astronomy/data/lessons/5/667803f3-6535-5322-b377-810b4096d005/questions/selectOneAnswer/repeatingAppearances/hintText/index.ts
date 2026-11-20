import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "b2387413-9bc0-4946-b638-4e28cd037a66",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Згадай, що один і той самий вигляд може з’явитися знову після інших.",
      en: "Remember that the same appearance can return after other appearances.",
      pl: "Przypomnij sobie, że po innych wyglądach Księżyc może znów wyglądać tak samo.",
      qm: "Aynı körüniş başqa körünişlerden soñ kene peyda ola bilgenini hatırla."
    }
  }
});
