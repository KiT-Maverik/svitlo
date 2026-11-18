import { defineModule } from '@svitlo/engine/build';

import { dayAndNight } from "#coursesData/b/1e79d8fc-2223-4fa7-bc64-70d8172d3e8b/content/skyCycles/dayAndNight/index";
import { moonAppearance } from "#coursesData/b/1e79d8fc-2223-4fa7-bc64-70d8172d3e8b/content/skyCycles/moonAppearance/index";
import { skyChangesOverview } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/index";
import type { CourseLanguages } from "#coursesData/b/1e79d8fc-2223-4fa7-bc64-70d8172d3e8b/constants";

const items = {
  skyChangesOverview,
  dayAndNight,
  moonAppearance,
};

export const skyCycles = defineModule<"skyCycles", typeof items, CourseLanguages>({
  type: "module",
  id: "0402991c-fd06-5f57-b7cb-84e45f5ae12d",
  slug: "skyCycles",
  params: {},
  locale: {
    title: {
      uk: "Як змінюється небо"
    }
  },
  content: {
    items,
    order: [
      "skyChangesOverview",
      "dayAndNight",
      "moonAppearance"
    ]
  }
});
