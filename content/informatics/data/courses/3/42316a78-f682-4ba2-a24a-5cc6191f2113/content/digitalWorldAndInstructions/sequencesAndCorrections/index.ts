import { defineChapter } from '@svitlo/engine/build';

import { checkAndRepairSequence } from "#lessonsData/1/b25ceeeb-9b18-5a85-80a3-c455812214e1/index";
import { buildASequence } from "#lessonsData/1/d0e8892c-0c7f-58bd-a651-f77fdf0e9e11/index";
import type { CourseLanguages } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/constants";

const items = {
  buildASequence,
  checkAndRepairSequence,
};

export const sequencesAndCorrections = defineChapter<"sequencesAndCorrections", typeof items, CourseLanguages>({
  type: "chapter",
  id: "e8023e9e-3479-5c20-8c99-aea5d2cb39dd",
  slug: "sequencesAndCorrections",
  params: {},
  locale: {
    title: {
      uk: "Послідовності команд і пошук помилок"
    }
  },
  content: {
    items,
    order: [
      "buildASequence",
      "checkAndRepairSequence"
    ]
  }
});
