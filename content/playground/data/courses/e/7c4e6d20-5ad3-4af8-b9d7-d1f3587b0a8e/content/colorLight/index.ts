import { defineModule } from '@svitlo/engine/build';

// TODO (BLOCKER): Uncomment when lesson is ready:
// import { colorReflection } from "#lessonsData/3/536f09dd-ec29-535a-94c6-ae629e3149f3/index";
import type { CourseLanguages } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/constants";

import { illumination } from "./illumination/index";

const items = {
  // colorReflection,
  illumination,
};

export const colorLight = defineModule<"colorLight", typeof items, CourseLanguages>({
  type: "module",
  id: "ea12ecc1-6844-57dc-9786-b64fea59ffc6",
  slug: "colorLight",
  params: {},
  locale: {
    title: {
      en: "Color and Light"
    }
  },
  content: {
    items,
    order: [
      "colorReflection",
      "illumination"
    ]
  }
});
