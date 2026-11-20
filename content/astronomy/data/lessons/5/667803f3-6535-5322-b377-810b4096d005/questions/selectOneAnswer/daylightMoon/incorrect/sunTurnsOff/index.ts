import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const sunTurnsOff = defineText<"sunTurnsOff", LessonLanguages>({
  id: "549f7348-7b68-42c6-a1b2-d3fc9b8cd1d7",
  slug: "sunTurnsOff",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце на мить вимкнуло своє світло.",
      en: "The Sun briefly turned off its light.",
      pl: "Słońce na chwilę przestało świecić.",
      qm: "Küneş bir anğa yarığını söndürdi."
    }
  }
});
