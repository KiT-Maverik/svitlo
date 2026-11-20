import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

import { noticeExample } from "./noticeExample";
import { welcome } from "./welcome";

const content = {
  items: {
    welcome,
    noticeExample
  },
  order: [
    "welcome",
    "noticeExample"
  ]
};

export const noticeOrGuess = defineContentSection<"noticeOrGuess", typeof content.items, LessonLanguages>({
  id: "603dbc63-be9c-5a5a-92fe-c877090cecfe",
  slug: "noticeOrGuess",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Що я помітив?",
        en: "What Did I Notice?",
        pl: "Co udało mi się zauważyć?",
        qm: "Ne kördim?"
    },
    navigationLabel: {
      uk: "Що я помітив?",
        en: "What Did I Notice?",
        pl: "Co udało mi się zauważyć?",
        qm: "Ne kördim?"
    }
  },
  content
});
