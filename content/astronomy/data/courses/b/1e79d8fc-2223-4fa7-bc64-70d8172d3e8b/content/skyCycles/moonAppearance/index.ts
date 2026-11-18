import { defineChapter } from '@svitlo/engine/build';

import { moonAppearanceBasics } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/index";
import type { CourseLanguages } from "#coursesData/b/1e79d8fc-2223-4fa7-bc64-70d8172d3e8b/constants";

const items = {
  moonAppearanceBasics,
};

export const moonAppearance = defineChapter<"moonAppearance", typeof items, CourseLanguages>({
  type: "chapter",
  id: "0ebfcaa3-fca3-5bfd-becf-23c1edaf3bef",
  slug: "moonAppearance",
  params: {},
  locale: {
    title: {
      uk: "Місяць змінює свій вигляд"
    }
  },
  content: {
    items,
    order: [
      "moonAppearanceBasics"
    ]
  }
});
