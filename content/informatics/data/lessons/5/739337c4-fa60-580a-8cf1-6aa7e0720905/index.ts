import { defineLesson } from '@svitlo/engine/build';

import { section } from "./sections";
import { languages } from './constants';
import type { LessonLanguages } from './constants';
import { identifyDigitalDevices } from "../../../skills/digitalSystemsAndNetworks/digitalDeviceComponents/identifyDigitalDevices";

export const identifyDigitalDevices = defineLesson<"identifyDigitalDevices", LessonLanguages, typeof section.items>({
  id: "739337c4-fa60-580a-8cf1-6aa7e0720905",
  slug: "identifyDigitalDevices",
  type: "lesson",
  skills: [identifyDigitalDevices.id],
  params: {
    languages,
    quizRequiredForCompletion: false,
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: true
    }
  },
  locale: {
    title: {
      uk: "Які пристрої є цифровими?"
    }
  },
  section
});
