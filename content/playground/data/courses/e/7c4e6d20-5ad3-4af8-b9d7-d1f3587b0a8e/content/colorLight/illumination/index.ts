import { defineChapter } from '@svitlo/engine/build';

// TODO (BLOCKER): Uncomment when lesson is ready:
// import { colorTransfer } from "#lessonsData/7/d83d31d6-5c27-5174-93aa-c933419f37b7/index";
import { howLightMoves as lightPath } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
import type { CourseLanguages } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/constants";

const items = {
  lightPath,
  // TODO (BLOCKER): Uncomment when lesson is ready:
  // colorTransfer,
};

export const illumination = defineChapter<"illumination", typeof items, CourseLanguages>({
  type: "chapter",
  id: "813a7a57-4e91-560f-b77e-4a2228fa6f8e",
  slug: "illumination",
  params: {},
  locale: {
    title: {
      en: "Light and color experiments"
    }
  },
  content: {
    items,
    order: [
      "lightPath",
      "colorTransfer"
    ]
  }
});
