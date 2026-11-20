import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "ed0ffd2f-d32e-4e2a-b4cb-7365f3d2f5cd",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "На вечірньому небі світиться Місяць. Звідки береться світло, яке ми бачимо від Місяця?",
      en: "The Moon glows in the evening sky. Where does the light we see coming from the Moon originate?",
      pl: "Księżyc świeci na wieczornym niebie. Skąd pochodzi światło, które widzimy od Księżyca?",
      qm: "Aqşam kökte Ay yarqıray. Biz Aydan körgen yarıq qaydan kele?"
    }
  }
});
