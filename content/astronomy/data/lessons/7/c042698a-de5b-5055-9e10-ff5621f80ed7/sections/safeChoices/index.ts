import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { afterPractice } from "./afterPractice";
import { practiceIntro } from "./practiceIntro";
import { practiceReveal } from "./practiceReveal";
import { SafeChoiceLabConfig } from "./safeChoiceLab";

const content = {
  items: {
    practiceIntro,
    safeChoiceLab: SafeChoiceLabConfig,
    afterPractice,
    practiceReveal
  },
  order: [
    "practiceIntro",
    "afterPractice",
    "practiceReveal",
    "safeChoiceLab"
  ]
};

export const safeChoices = defineContentSection<"safeChoices", typeof content.items, LessonLanguages>({
  id: "382eacbe-b1a2-5988-9469-2dc6ed35d707",
  slug: "safeChoices",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Обираємо безпечні дії"
    },
    navigationLabel: {
      uk: "Тренуємо вибір"
    }
  },
  content
});
