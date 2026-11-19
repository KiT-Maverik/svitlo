import { defineCheckpoint } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { cloudsPractice } from "./cloudsPractice";
import { glassesPractice } from "./glassesPractice";
import { photoPractice } from "./photoPractice";

const content = {
  items: {
    photoPractice,
    glassesPractice,
    cloudsPractice
  },
  order: [
    "photoPractice",
    "glassesPractice",
    "cloudsPractice"
  ]
};

export const practiceReveal = defineCheckpoint<"practiceReveal", typeof content.items, LessonLanguages>({
  id: "470bc5ac-4631-56ab-970c-7416ad1f338f",
  slug: "practiceReveal",
  type: "checkpoint",
  params: {
    headingLevel: 3,
    showIndices: true,
    showChevron: true,
    enableChecks: false,
    requireCompletion: false
  },
  locale: {
    title: {
      uk: "Розкрий пояснення після вибору"
    }
  },
  content
});
