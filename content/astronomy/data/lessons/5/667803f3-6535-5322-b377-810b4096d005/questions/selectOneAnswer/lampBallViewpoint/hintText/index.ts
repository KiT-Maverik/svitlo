import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "d3b95d3e-11a1-4b8e-83e7-48888ae09aaa",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Поглянь подумки на предмет із двох боків. Чи мусить змінитися сам предмет?"
    }
  }
});
