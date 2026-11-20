import { defineChapter } from '@svitlo/engine/build';

import { identifyDigitalDevices } from "#lessonsData/5/739337c4-fa60-580a-8cf1-6aa7e0720905/index";
import { dataBecomeInformation } from "#lessonsData/a/a4de8992-611f-5f2c-baab-84e37fe78b8a/index";
import type { CourseLanguages } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/constants";

const items = {
  identifyDigitalDevices,
  dataBecomeInformation,
};

export const devicesAndInformation = defineChapter<"devicesAndInformation", typeof items, CourseLanguages>({
  type: "chapter",
  id: "5db6f050-d800-51d6-be69-80d5b78e14a2",
  slug: "devicesAndInformation",
  params: {},
  locale: {
    title: {
      uk: "Цифрові пристрої та інформація"
    }
  },
  content: {
    items,
    order: [
      "identifyDigitalDevices",
      "dataBecomeInformation"
    ]
  }
});
