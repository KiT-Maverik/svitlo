import { defineChapter } from '@svitlo/engine/build';

import { observationJournal } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/index";
import type { CourseLanguages } from "#coursesData/b/1e79d8fc-2223-4fa7-bc64-70d8172d3e8b/constants";

const items = {
  observationJournal,
};

export const safeObservation = defineChapter<"safeObservation", typeof items, CourseLanguages>({
  type: "chapter",
  id: "b4d6f6d5-ec72-5bef-841c-15765b6fc171",
  slug: "safeObservation",
  params: {},
  locale: {
    title: {
      uk: "Спостерігаємо за небом безпечно"
    }
  },
  content: {
    items,
    order: [
      "observationJournal"
    ]
  }
});
