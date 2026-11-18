import { defineModule } from '@svitlo/engine/build';

import { solarSystemBasics } from "#coursesData/b/1e79d8fc-2223-4fa7-bc64-70d8172d3e8b/content/solarSystem/solarSystemBasics/index";
import type { CourseLanguages } from "#coursesData/b/1e79d8fc-2223-4fa7-bc64-70d8172d3e8b/constants";

const items = {
  solarSystemBasics,
};

export const solarSystem = defineModule<"solarSystem", typeof items, CourseLanguages>({
  type: "module",
  id: "3277397b-0a67-55d2-8ca3-1138717c58d9",
  slug: "solarSystem",
  params: {},
  locale: {
    title: {
      uk: "Наші космічні сусіди"
    }
  },
  content: {
    items,
    order: [
      "solarSystemBasics"
    ]
  }
});
