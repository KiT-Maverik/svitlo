import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

import { moonAudio } from "./moonAudio";
import { moonExplain } from "./moonExplain";
import { moonIntro } from "./moonIntro";
import { moonRecap } from "./moonRecap";
import { MoonSceneConfig } from "./moonScene";

const content = {
  items: {
    moonIntro,
    moonAudio,
    moonScene: MoonSceneConfig,
    moonExplain,
    moonRecap
  },
  order: [
    "moonIntro",
    "moonAudio",
    "moonScene",
    "moonExplain",
    "moonRecap"
  ]
};

export const sMoon = defineContentSection<"sMoon", typeof content.items, LessonLanguages>({
  id: "d4fa419e-75bf-4df7-a414-e2613e4227c8",
  slug: "sMoon",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Один Місяць — різні вигляди",
      en: "One Moon, Different Appearances",
      pl: "Jeden Księżyc — różne wyglądy",
      qm: "Bir Ay — türlü körünişler"
    },
    navigationLabel: {
      uk: "Місяць",
      en: "The Moon",
      pl: "Księżyc",
      qm: "Ay"
    }
  },
  content
});
