import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "f0697588-1637-4074-a3f8-b648e0cf2f70",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Спробуй уявити кулю, половина якої лишається в тіні.",
      en: "Try to imagine a ball with one half in shadow.",
      pl: "Spróbuj wyobrazić sobie kulę, której połowa znajduje się w cieniu.",
      qm: "Yarısı kölegede qalğan şarnı tasavvur et."
    }
  }
});
