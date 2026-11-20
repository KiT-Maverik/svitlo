import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/739337c4-fa60-580a-8cf1-6aa7e0720905/constants";

import { DeviceInvestigatorConfig } from "./deviceInvestigator";
import { paperAndVoiceRoute } from "./paperAndVoiceRoute";
import { threeClueQuestions } from "./threeClueQuestions";

const content = {
  items: {
    threeClueQuestions,
    deviceInvestigator: DeviceInvestigatorConfig,
    paperAndVoiceRoute
  },
  order: [
    "threeClueQuestions",
    "deviceInvestigator",
    "paperAndVoiceRoute"
  ]
};

export const exploreDeviceClues = defineContentSection<"exploreDeviceClues", typeof content.items, LessonLanguages>({
  id: "b6f90e2a-4df0-4dbf-83a1-a00000000003",
  slug: "exploreDeviceClues",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Досліди, як це працює"
    },
    navigationLabel: {
      uk: "Досліди"
    }
  },
  content
});
