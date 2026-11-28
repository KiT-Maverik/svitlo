import { defineModule } from '@svitlo/engine/build';

import { devicesAndInformation } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/content/digitalWorldAndInstructions/devicesAndInformation/index";
import { sequencesAndCorrections } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/content/digitalWorldAndInstructions/sequencesAndCorrections/index";
import type { CourseLanguages } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/constants";

const items = {
  devicesAndInformation,
  sequencesAndCorrections,
};

export const digitalWorldAndInstructions = defineModule<"digitalWorldAndInstructions", typeof items, CourseLanguages>({
  type: "module",
  id: "da23ab9e-52ad-5731-90e2-d3d330f23ac1",
  slug: "digitalWorldAndInstructions",
  params: {},
  locale: {
    title: {
      uk: "Цифровий світ і послідовність дій"
    }
  },
  content: {
    items,
    order: [
      "devicesAndInformation",
      "sequencesAndCorrections"
    ]
  }
});
