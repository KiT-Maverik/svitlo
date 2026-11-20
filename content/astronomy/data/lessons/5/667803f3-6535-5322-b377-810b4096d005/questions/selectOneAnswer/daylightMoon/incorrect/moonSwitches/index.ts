import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const moonSwitches = defineText<"moonSwitches", LessonLanguages>({
  id: "6f5735b0-d9eb-4e8d-b78e-438f47de71bb",
  slug: "moonSwitches",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Місяць може світитися лише після заходу Сонця.",
      en: "The Moon can glow only after sunset.",
      pl: "Księżyc może świecić tylko po zachodzie Słońca.",
      qm: "Ay yalnız Küneş batqandan soñ yarqıray bile."
    }
  }
});
