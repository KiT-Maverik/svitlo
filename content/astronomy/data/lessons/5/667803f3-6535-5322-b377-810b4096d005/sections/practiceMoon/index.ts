import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { detectiveIntro } from "./detectiveIntro";
import { MoonDetectiveConfig } from "./moonDetective";
import { verbalCases } from "./verbalCases";
import { verbalFeedback } from "./verbalFeedback";

const content = {
  items: {
    detectiveIntro,
    moonDetective: MoonDetectiveConfig,
    verbalCases,
    verbalFeedback
  },
  order: [
    "detectiveIntro",
    "moonDetective",
    "verbalCases",
    "verbalFeedback"
  ]
};

export const practiceMoon = defineContentSection<"practiceMoon", typeof content.items, LessonLanguages>({
  id: "aeb987c1-704e-4ef6-8a93-000000000003",
  slug: "practiceMoon",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Знайди правильне пояснення"
    },
    navigationLabel: {
      uk: "Тренуємося"
    }
  },
  content
});
