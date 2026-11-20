import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/739337c4-fa60-580a-8cf1-6aa7e0720905/constants";

import { calculatorStepByStep } from "./calculatorStepByStep";
import { paperDoesNotCalculate } from "./paperDoesNotCalculate";
import { simpleDigitalRule } from "./simpleDigitalRule";

const content = {
  items: {
    simpleDigitalRule,
    calculatorStepByStep,
    paperDoesNotCalculate
  },
  order: [
    "simpleDigitalRule",
    "calculatorStepByStep",
    "paperDoesNotCalculate"
  ]
};

export const howDevicesUseInformation = defineContentSection<"howDevicesUseInformation", typeof content.items, LessonLanguages>({
  id: "b6f90e2a-4df0-4dbf-83a1-a00000000002",
  slug: "howDevicesUseInformation",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Що робить пристрій цифровим?"
    },
    navigationLabel: {
      uk: "Зрозумій"
    }
  },
  content
});
