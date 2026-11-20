import { defineChapter } from '@svitlo/engine/build';

import { dayNightBasics } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/index";
import type { CourseLanguages } from "#coursesData/b/1e79d8fc-2223-4fa7-bc64-70d8172d3e8b/constants";

const items = {
  dayNightBasics,
};

export const dayAndNight = defineChapter<"dayAndNight", typeof items, CourseLanguages>({
  type: "chapter",
  id: "7960fa2f-7f3a-5f8f-b68a-b0bce842c07b",
  slug: "dayAndNight",
  params: {},
  locale: {
    title: {
      uk: "Чому бувають день і ніч"
    }
  },
  content: {
    items,
    order: [
      "dayNightBasics"
    ]
  }
});
