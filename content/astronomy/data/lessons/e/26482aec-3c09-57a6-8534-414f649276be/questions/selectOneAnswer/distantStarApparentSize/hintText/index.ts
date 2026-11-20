import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "05b3d724-d607-4b46-86b3-cdbfda307fae",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Уяви однакові за розміром предмети: близький і дуже далекий.",
      en: "Imagine two objects of the same size: one nearby and one very far away.",
      pl: "Wyobraź sobie dwa przedmioty tej samej wielkości: jeden blisko, a drugi bardzo daleko.",
      qm: "Aynı büyüklükte eki eşyanı tasavur et: biri yaqında, ekincisi pek uzaqta."
    }
  }
});
