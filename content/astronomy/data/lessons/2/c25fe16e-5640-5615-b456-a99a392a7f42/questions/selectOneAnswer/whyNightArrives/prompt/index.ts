import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000009",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Біля одного будинку вдень було світло, а згодом настала ніч. Яка зміна це пояснює?",
      en: "It was light near a house during the day, but later night came. What change explains this?",
      pl: "W ciągu dnia obok pewnego domu było jasno, ale później zapadła noc. Jaka zmiana to wyjaśnia?",
      qm: "Bir evniñ yanında kündüz yarıq edi, soñra gece oldı. Bunı angi deñişiklik añlata?"
    }
  }
});
