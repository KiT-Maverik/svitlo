import { defineChapter } from '@svitlo/engine/build';

import { sunEarthMoonRoles } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/index";
import type { CourseLanguages } from "#coursesData/b/1e79d8fc-2223-4fa7-bc64-70d8172d3e8b/constants";

const items = {
  sunEarthMoonRoles,
};

export const solarSystemBasics = defineChapter<"solarSystemBasics", typeof items, CourseLanguages>({
  type: "chapter",
  id: "81229557-11c2-538f-99d0-20728d361f20",
  slug: "solarSystemBasics",
  params: {},
  locale: {
    title: {
      uk: "Сонце, Земля та їхні сусіди"
    }
  },
  content: {
    items,
    order: [
      "sunEarthMoonRoles"
    ]
  }
});
