import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/739337c4-fa60-580a-8cf1-6aa7e0720905/constants";

import { batteryAndScreen } from "./batteryAndScreen";
import { repairYourReason } from "./repairYourReason";
import { unknownDevices } from "./unknownDevices";

const content = {
  items: {
    batteryAndScreen,
    unknownDevices,
    repairYourReason
  },
  order: [
    "batteryAndScreen",
    "unknownDevices",
    "repairYourReason"
  ]
};

export const avoidFalseClues = defineContentSection<"avoidFalseClues", typeof content.items, LessonLanguages>({
  id: "b6f90e2a-4df0-4dbf-83a1-a00000000004",
  slug: "avoidFalseClues",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Не обманюйся зовнішнім виглядом"
    },
    navigationLabel: {
      uk: "Перевір ознаки"
    }
  },
  content
});
