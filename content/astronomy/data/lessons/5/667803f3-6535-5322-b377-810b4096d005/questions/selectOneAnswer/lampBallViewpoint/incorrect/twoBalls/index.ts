import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const twoBalls = defineText<"twoBalls", LessonLanguages>({
  id: "8b3ef332-e351-46aa-9efe-f2b9116881ef",
  slug: "twoBalls",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Кожній дитині показали іншу кулю.",
      en: "Each child was shown a different ball.",
      pl: "Każdemu dziecku pokazano inną kulę.",
      qm: "Er balağa başqa şar kösterildi."
    }
  }
});
